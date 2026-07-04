import { r as APIError, t as auth } from "./auth-c5YgNTdZ.js";
import { c as getRequestHeaders, n as createServerFn } from "../server.js";
import { t as createServerRpc } from "./createServerRpc-BSuLXgU0.js";
import { n as signUpFormSchema, t as signInFormSchema } from "./schema-B287OkrG.js";
import { n as createProfile } from "./profile-Bq22T2rH.js";
import { t as smiley_default } from "./smiley-nOJo0-QZ.js";
import { redirect } from "@tanstack/react-router";
//#region src/lib/auth/actions.ts?tss-serverfn-split
var signIn_createServerFn_handler = createServerRpc({
	id: "159d84c25e42ff785280b41058b666690aff175cea472ac7f476673d06408406",
	name: "signIn",
	filename: "src/lib/auth/actions.ts"
}, (opts) => signIn.__executeServer(opts));
var signIn = createServerFn({ method: "POST" }).validator((data) => {
	if (!(data instanceof FormData)) throw new Error("Expected FormData");
	return {
		password: data.get("password")?.toString() || "",
		email: data.get("email")?.toString() || ""
	};
}).handler(signIn_createServerFn_handler, async (data) => {
	const { email, password } = data.data;
	const parsedForm = signInFormSchema.safeParse({
		email,
		password
	});
	if (!parsedForm.success) return {
		formData: parsedForm.data,
		fieldErrors: parsedForm.error.flatten().fieldErrors,
		success: false
	};
	try {
		await auth.api.signInEmail({ body: {
			email,
			password
		} });
		return { success: true };
	} catch (error) {
		console.log("error", error);
		if (error instanceof APIError) return {
			formData: parsedForm.data,
			fieldErrors: { email: [error.message] },
			success: false,
			error: { message: error.message }
		};
		return {
			success: false,
			error: { message: "Something went wrong" }
		};
	}
});
var signUp_createServerFn_handler = createServerRpc({
	id: "203bc9bc8d4bd20618e0d927e463675184a9d2ba4052168fc9eee74d9d99e1d1",
	name: "signUp",
	filename: "src/lib/auth/actions.ts"
}, (opts) => signUp.__executeServer(opts));
var signUp = createServerFn({ method: "GET" }).validator((data) => {
	if (!(data instanceof FormData)) throw new Error("Expected FormData");
	return {
		password: data.get("password")?.toString() || "",
		email: data.get("email")?.toString() || "",
		name: data.get("name")?.toString() || ""
	};
}).handler(signUp_createServerFn_handler, async (data) => {
	const { email, password, name } = data.data;
	const parsedForm = signUpFormSchema.safeParse({
		email,
		password,
		name
	});
	console.log("signUp");
	if (!parsedForm.success) {
		console.log("validation failed");
		return {
			formData: parsedForm.data,
			fieldErrors: parsedForm.error.flatten().fieldErrors,
			success: false
		};
	}
	try {
		const res = await auth.api.signUpEmail({ body: {
			email,
			password,
			name
		} });
		await createProfile(res.user.id, res.user.name, smiley_default);
		return {
			formData: parsedForm.data,
			success: true
		};
	} catch (error) {
		console.log(process.env.DATABASE_URL);
		console.log(error);
		if (error instanceof APIError) return {
			formData: parsedForm.data,
			fieldErrors: { name: [error.message] },
			success: false,
			error: { message: error.message }
		};
		return {
			success: false,
			error: { message: "Something went wrong" }
		};
	}
});
var signUpAnonym_createServerFn_handler = createServerRpc({
	id: "590cde8bf1c8d186d8dfd3a06f4a2ae995910ef1de80b479026d2f8c18c6884a",
	name: "signUpAnonym",
	filename: "src/lib/auth/actions.ts"
}, (opts) => signUpAnonym.__executeServer(opts));
var signUpAnonym = createServerFn({ method: "GET" }).handler(signUpAnonym_createServerFn_handler, async () => {
	const name = "User";
	const password = "placeholder";
	const email = crypto.randomUUID() + "@placeholder.com";
	try {
		const res = await auth.api.signUpEmail({ body: {
			email,
			password,
			name
		} });
		await createProfile(res.user.id, res.user.name, smiley_default);
		return { success: true };
	} catch (error) {
		console.log(error);
		if (error instanceof APIError) return {
			success: false,
			error: { message: error.message }
		};
		return {
			success: false,
			error: { message: "Something went wrong" }
		};
	}
});
var signOut_createServerFn_handler = createServerRpc({
	id: "0294f90a2e2180fb6741d8f59a13123357d14b7a302a3c2061b2e1f0693e67ac",
	name: "signOut",
	filename: "src/lib/auth/actions.ts"
}, (opts) => signOut.__executeServer(opts));
var signOut = createServerFn({ method: "GET" }).handler(signOut_createServerFn_handler, async () => {
	const headers = getRequestHeaders();
	await auth.api.signOut({ headers });
	throw redirect({ to: "/" });
});
//#endregion
export { signIn_createServerFn_handler, signOut_createServerFn_handler, signUpAnonym_createServerFn_handler, signUp_createServerFn_handler };
