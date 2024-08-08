import { z } from "zod";

export const RoleEnum = z.enum(["USER", "ADMIN"]);

export const SignUpSchema = z.object({
  username: z.string().min(4, { message: "Username must be at least 4 characters" }).max(12, { message: "Username must be maximum of 12 characters" }),
  password: z.string().min(7, { message: "Password must be at least 7 characters" }).max(12, { message: "Password must be maximum 12 characters" }),
  role: RoleEnum,
});

export const LoginSchema = z.object({
    username: z.string().min(4, { message: "Username must be at least 4 characters" }).max(12, { message: "Username must be maximum of 12 characters" }),
    password: z.string().min(7, { message: "Password must be at least 7 characters" }).max(12, { message: "Password must be maximum 12 characters" }),
})