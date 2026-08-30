import * as z from "zod";

const loginSchema = z.object({
  email: z.string().email("Must be a valid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[0-9]/, "Must contain at least one number")
    .regex(/[^a-zA-Z0-9]/, "Must contain at least one special character"),
});

export type LoginFormInput = z.input<typeof loginSchema>;
export type LoginFormData = z.output<typeof loginSchema>;

export default loginSchema;
