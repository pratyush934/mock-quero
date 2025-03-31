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
