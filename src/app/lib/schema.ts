import { z } from "zod";

export const onBoardingSchema = z.object({
  industry: z.string({
    required_error: "Please provide industry record",
  }),
  subIndustry: z.string({
    required_error: "Please provide subindustry record",
  }),
  bio: z.string().max(500).optional(),
  experience: z
    .string()
    .transform((value) => parseInt(value, 10))
    .pipe(
      z
        .number()
        .min(0, "Atleast 0 years of experience")
        .max(50, "Max to Max you can have 50 years of experience")
    ),

  skills: z.string().transform((val) =>
    val
      ? val
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : undefined
  ),
});

export const contactSchema = z.object({
  email: z.string().email("Invalid email address"),
  mobile: z.string().optional(),
  linkedin: z.string().optional(),
  twitter: z.string().optional(),
});

export const entrySchema = z
  .object({
    title: z.string().min(1, "Title is Required"),
    organization: z.string().min(1, "Organization is needed"),
    startDate: z.string().min(1, "StartDate is Required"),
    endDate: z.string(),
    description: z.string().min(1, "Description is needed"),
    current: z.boolean().default(false),
  })
  .refine(
    (data) => {
      if (!data.current && !data.endDate) {
        return false;
      }
      return true;
    },
    {
      message:
        "If you are not working in current company you need to give endDate",
      path: ["endDate"],
    }
  );

export const resumeSchema = z.object({
  contactInfo: contactSchema,
  summary: z.string().min(1, "Summary is required"),
  skills: z.string().min(1, "Skills are required"),
  experience: z.array(entrySchema),
  education: z.array(entrySchema),
  projects: z.array(entrySchema),
});

