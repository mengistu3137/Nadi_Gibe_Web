import { z } from "zod";

// Enums matching your mongoose schema
export const CabineType = {
  EXECUTIVE: "Executive Cabine",
  HEALTH: "Health Cabine",
  EDUCATION: "Education Cabine",
  AGRICULTURE: "Agriculture Cabine",
  FINANCE: "Finance & Economy Cabine",
  INFRASTRUCTURE: "Infrastructure Cabine",
};

export const Department = {
  EXECUTIVE_OFFICE: "Executive Office",
  HEALTH_SERVICES: "Health Services",
  PUBLIC_HEALTH: "Public Health",
  EDUCATION: "Education",
  AGRICULTURE: "Agriculture",
  FINANCE: "Finance",
  INFRASTRUCTURE: "Infrastructure",
};

// Common validation schemas
const commonCabineValidations = {
  name: z
    .string()
    .min(1, "Cabine name is required")
    .regex(
      /^[a-z0-9-]+$/,
      "Name can only contain lowercase letters, numbers, and hyphens"
    )
    .trim()
    .toLowerCase(),
  title: z.string().min(1, "Cabine title is required").trim(),
  description: z
    .string()
    .min(1, "Description is required")
    .max(200, "Description cannot exceed 200 characters")
    .trim(),
  isActive: z.boolean().optional().default(true),
  order: z.number().int().min(0).optional().default(0),
};

const commonMemberValidations = {
  name: z
    .string()
    .min(1, "Member name is required")
    .max(100, "Name cannot exceed 100 characters")
    .trim(),
  position: z
    .string()
    .min(1, "Position is required")
    .max(100, "Position cannot exceed 100 characters")
    .trim(),
  image: z.string().min(1, "Image URL is required").trim(),
  department: z.enum(
    [
      Department.EXECUTIVE_OFFICE,
      Department.HEALTH_SERVICES,
      Department.PUBLIC_HEALTH,
      Department.EDUCATION,
      Department.AGRICULTURE,
      Department.FINANCE,
      Department.INFRASTRUCTURE,
    ],
    {
      required_error: "Department is required",
      invalid_type_error: `Department must be one of: ${Object.values(
        Department
      ).join(", ")}`,
    }
  ),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email")
    .trim()
    .toLowerCase(),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(
      /^(0\d{9}|\+\d{12})$/,
      "Please enter a valid phone number (0XXXXXXXXX or +251XXXXXXXXX)"
    )
    .trim(),
  isActive: z.boolean().optional().default(true),
  order: z.number().int().min(0).optional().default(0),
};

export const cabineSchema = {
  // CREATE - Create new cabine
  create: z.object({
    name: commonCabineValidations.name,
    title: commonCabineValidations.title,
    description: commonCabineValidations.description,
    isActive: commonCabineValidations.isActive,
    order: commonCabineValidations.order,
  }),

  // UPDATE - Update cabine
  update: z.object({
    name: commonCabineValidations.name.optional(),
    title: commonCabineValidations.title.optional(),
    description: commonCabineValidations.description.optional(),
    isActive: commonCabineValidations.isActive,
    order: commonCabineValidations.order,
  }),

  // GET/DELETE - by ID
  byId: z.object({
    id: z.string().min(1, "Cabine ID is required"),
  }),

  // Query parameters
  query: z.object({
    isActive: z.enum(["true", "false"]).optional(),
  }),
};

export const memberSchema = {
  // CREATE - Create new member
  create: z.object({
    name: commonMemberValidations.name,
    position: commonMemberValidations.position,
    image: commonMemberValidations.image,
    department: commonMemberValidations.department,
    email: commonMemberValidations.email,
    phone: commonMemberValidations.phone,
    cabine: z.string().min(1, "Cabine reference is required"), // This will be ObjectId string
    isActive: commonMemberValidations.isActive,
    order: commonMemberValidations.order,
  }),

  // UPDATE - Update member
  update: z.object({
    name: commonMemberValidations.name.optional(),
    position: commonMemberValidations.position.optional(),
    image: commonMemberValidations.image.optional(),
    department: commonMemberValidations.department.optional(),
    email: commonMemberValidations.email.optional(),
    phone: commonMemberValidations.phone.optional(),
    cabine: z.string().min(1, "Cabine reference is required").optional(),
    isActive: commonMemberValidations.isActive,
    order: commonMemberValidations.order,
  }),

  // GET/DELETE - by ID
  byId: z.object({
    id: z.string().min(1, "Member ID is required"),
  }),

  // Query parameters
  query: z.object({
    cabine: z.string().optional(),
    department: z
      .enum([
        Department.EXECUTIVE_OFFICE,
        Department.HEALTH_SERVICES,
        Department.PUBLIC_HEALTH,
        Department.EDUCATION,
        Department.AGRICULTURE,
        Department.FINANCE,
        Department.INFRASTRUCTURE,
      ])
      .optional(),
    isActive: z.enum(["true", "false"]).optional(),
  }),

  // Bulk operations
  bulkCreate: z.array(
    z.object({
      name: commonMemberValidations.name,
      position: commonMemberValidations.position,
      image: commonMemberValidations.image,
      department: commonMemberValidations.department,
      email: commonMemberValidations.email,
      phone: commonMemberValidations.phone,
      isActive: commonMemberValidations.isActive,
      order: commonMemberValidations.order,
    })
  ),
};

// Export for default import
export default {
  cabineSchema,
  memberSchema,
  CabineType,
  Department,
};
