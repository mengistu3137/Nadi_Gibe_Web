import { Cabine } from "../../models/Cabine.model.js";
import { Member } from "../../models/member.model.js";
import { cabineSchema, memberSchema } from "./cabine.schema.js";

// Helper function to transform cabine data
const transformCabineData = (cabine) => {
  const cabineData = cabine.toObject ? cabine.toObject() : cabine;
  return {
    id: cabineData._id,
    name: cabineData.name,
    title: cabineData.title,
    description: cabineData.description,
    isActive: cabineData.isActive,
    order: cabineData.order,
    createdAt: cabineData.createdAt,
    updatedAt: cabineData.updatedAt,
  };
};

// Helper function to transform member data
const transformMemberData = (member) => {
  const memberData = member.toObject ? member.toObject() : member;
  return {
    id: memberData._id,
    name: memberData.name,
    position: memberData.position,
    image: memberData.image,
    department: memberData.department,
    email: memberData.email,
    phone: memberData.phone,
    cabine: memberData.cabine,
    isActive: memberData.isActive,
    order: memberData.order,
    createdAt: memberData.createdAt,
    updatedAt: memberData.updatedAt,
  };
};

const cabineController = {
  // CREATE - Create cabine with members
  createCabine: async (req, res) => {
    try {
      const { cabine: cabineData, members = [] } = req.body;

      // Validate cabine data
      const validatedCabineData = cabineSchema.create.parse(cabineData);

      // Check if cabine name already exists
      const existingCabine = await Cabine.findOne({
        name: validatedCabineData.name,
      });
      if (existingCabine) {
        return res.status(400).json({
          success: false,
          message: "Cabine name already exists",
        });
      }

      // Create the cabine
      const newCabine = new Cabine(validatedCabineData);
      await newCabine.save();

      let createdMembers = [];

      // Create members if provided
      if (members.length > 0) {
        const memberPromises = members.map(async (memberData) => {
          const validatedMemberData = memberSchema.create.parse({
            ...memberData,
            cabine: newCabine._id.toString(), // Ensure it's a string
          });

          const newMember = new Member(validatedMemberData);
          await newMember.save();
          return transformMemberData(newMember);
        });

        createdMembers = await Promise.all(memberPromises);
      }

      return res.status(201).json({
        success: true,
        message: "Cabine created successfully",
        data: {
          cabine: transformCabineData(newCabine),
          members: createdMembers,
        },
      });
    } catch (error) {
      if (error.name === "ZodError") {
        console.log("Zod validation error:", error.errors);
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors,
        });
      }
      console.error("Create cabine error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message, // Added for debugging
      });
    }
  },

  // UPDATE - Update cabine and manage members
  updateCabine: async (req, res) => {
    try {
      const { id } = req.params;
      const { cabine: cabineData, members } = req.body;

      // Validate cabine exists
      const existingCabine = await Cabine.findById(id);
      if (!existingCabine) {
        return res.status(404).json({
          success: false,
          message: "Cabine not found",
        });
      }

      let validatedCabineData = {};

      // Validate cabine data if provided
      if (cabineData) {
        validatedCabineData = cabineSchema.update.parse(cabineData);

        // If name is being updated, check if new name already exists
        if (validatedCabineData.name) {
          const cabineWithSameName = await Cabine.findOne({
            name: validatedCabineData.name,
            _id: { $ne: id },
          });
          if (cabineWithSameName) {
            return res.status(400).json({
              success: false,
              message: "Cabine name already exists",
            });
          }
        }
      }

      let updatedCabine = existingCabine;

      // Update cabine properties if provided
      if (cabineData) {
        updatedCabine = await Cabine.findByIdAndUpdate(
          id,
          { $set: validatedCabineData },
          {
            new: true,
            runValidators: true,
            select: "-__v",
          }
        );
      }

      // Handle members based on the scenario
      let updatedMembers = [];

      if (members === undefined) {
        // Scenario 1: Members not provided - keep existing members unchanged
        const existingMembers = await Member.find({ cabine: id }).select(
          "-__v"
        );
        updatedMembers = existingMembers.map((member) =>
          transformMemberData(member)
        );
      } else if (Array.isArray(members) && members.length === 0) {
        // Scenario 2: Empty members array - remove all members
        await Member.deleteMany({ cabine: id });
        updatedMembers = [];
      } else if (Array.isArray(members) && members.length > 0) {
        // Scenario 3: Members array provided - replace all members
        // Remove all existing members
        await Member.deleteMany({ cabine: id });

        // Create new members
        const memberPromises = members.map(async (memberData) => {
          const validatedMemberData = memberSchema.create.parse({
            ...memberData,
            cabine: id,
          });

          const newMember = new Member(validatedMemberData);
          await newMember.save();
          return transformMemberData(newMember);
        });

        updatedMembers = await Promise.all(memberPromises);
      }

      return res.status(200).json({
        success: true,
        message: "Cabine updated successfully",
        data: {
          cabine: transformCabineData(updatedCabine),
          members: updatedMembers,
        },
      });
    } catch (error) {
      if (error.name === "ZodError") {
        console.log("Zod validation error:", error.errors);
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors,
        });
      }
      console.error("Update cabine error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  // READ - Get all cabines with their members
  getCabines: async (req, res) => {
    try {
      const validatedQuery = cabineSchema.query.parse(req.query);

      const filter = {};
      if (validatedQuery.isActive !== undefined) {
        filter.isActive = validatedQuery.isActive === "true";
      }

      const cabines = await Cabine.find(filter)
        .sort({ order: 1, createdAt: 1 })
        .select("-__v");

      // Get members for each cabine
      const cabinesWithMembers = await Promise.all(
        cabines.map(async (cabine) => {
          const members = await Member.find({ cabine: cabine._id })
            .sort({ order: 1, createdAt: 1 })
            .select("-__v");

          return {
            ...transformCabineData(cabine),
            members: members.map((member) => transformMemberData(member)),
          };
        })
      );

      return res.status(200).json({
        success: true,
        message: "Cabines retrieved successfully",
        data: cabinesWithMembers,
      });
    } catch (error) {
      if (error.name === "ZodError") {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors,
        });
      }
      console.error("Get cabines error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },

  // READ - Get single cabine with members
  getCabine: async (req, res) => {
    try {
      const validatedParams = cabineSchema.byId.parse(req.params);

      const cabine = await Cabine.findById(validatedParams.id).select("-__v");
      if (!cabine) {
        return res.status(404).json({
          success: false,
          message: "Cabine not found",
        });
      }

      const members = await Member.find({ cabine: validatedParams.id })
        .sort({ order: 1, createdAt: 1 })
        .select("-__v");

      return res.status(200).json({
        success: true,
        message: "Cabine retrieved successfully",
        data: {
          ...transformCabineData(cabine),
          members: members.map((member) => transformMemberData(member)),
        },
      });
    } catch (error) {
      if (error.name === "ZodError") {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors,
        });
      }
      console.error("Get cabine error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },

  // DELETE - Delete cabine and its members
  deleteCabine: async (req, res) => {
    try {
      const validatedParams = cabineSchema.byId.parse(req.params);

      const cabine = await Cabine.findById(validatedParams.id);
      if (!cabine) {
        return res.status(404).json({
          success: false,
          message: "Cabine not found",
        });
      }

      // Delete all members associated with this cabine
      await Member.deleteMany({ cabine: validatedParams.id });

      // Delete the cabine
      await Cabine.findByIdAndDelete(validatedParams.id);

      return res.status(200).json({
        success: true,
        message: "Cabine and its members deleted successfully",
      });
    } catch (error) {
      if (error.name === "ZodError") {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors,
        });
      }
      console.error("Delete cabine error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
};

export default cabineController;
