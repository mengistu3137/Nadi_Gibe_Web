import mongoose from "mongoose";
const CabineType = {
  EXECUTIVE: "Executive Cabine",
  HEALTH: "Health Cabine",
  EDUCATION: "Education Cabine",
  AGRICULTURE: "Agriculture Cabine",
  FINANCE: "Finance & Economy Cabine",
  INFRASTRUCTURE: "Infrastructure Cabine",
};

const cabineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Cabine name is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[a-z0-9-]+$/,
        "Name can only contain lowercase letters, numbers, and hyphens",
      ],
    },
    title: {
      type: String,
      required: [true, "Cabine title is required"],
      enum: {
        values: Object.values(CabineType),
        message: `Title must be one of: ${Object.values(CabineType).join(
          ", "
        )}`,
      },
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [200, "Description cannot exceed 200 characters"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
cabineSchema.index({ name: 1 }); // Changed from id to name
cabineSchema.index({ title: 1 });
cabineSchema.index({ isActive: 1, order: 1 });

export const Cabine = mongoose.model("Cabine", cabineSchema);
