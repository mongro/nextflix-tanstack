import z from "zod";
//#region src/lib/auth/schema.ts
var signUpFormSchema = z.object({
	name: z.string().min(2, { message: "Username must be at least 2 characters." }),
	password: z.string().min(6, { message: "Password must be at least 6 characters." }),
	email: z.string().email({ message: "Invalid email address." })
});
var signInFormSchema = z.object({
	password: z.string().min(6, { message: "Password must be at least 6 characters." }),
	email: z.string().email({ message: "Invalid email address." })
});
//#endregion
export { signUpFormSchema as n, signInFormSchema as t };
