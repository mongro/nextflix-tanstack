import { n as createServerFn } from "../server.js";
import { t as createServerRpc } from "./createServerRpc-BSuLXgU0.js";
import { i as getAllProfilesOfUser$1, n as createProfile$1, o as updateProfile$1, r as deleteProfile$1, t as changeSelectedProfile } from "./profile-Bq22T2rH.js";
import { r as verifiyServerSession } from "./authorization-t_Wox40S.js";
import { t as verifyProfileAccess } from "./utils-MLp0iKnl.js";
import z from "zod";
//#region src/lib/dal/profile.ts?tss-serverfn-split
var getProfile_createServerFn_handler = createServerRpc({
	id: "8bd06d3dd76f298c08a72d2d584775696c147d16cfde3830076e2a3139c8a0ea",
	name: "getProfile",
	filename: "src/lib/dal/profile.ts"
}, (opts) => getProfile.__executeServer(opts));
var getProfile = createServerFn({ method: "GET" }).validator((data) => data).handler(getProfile_createServerFn_handler, async ({ data }) => {
	try {
		const { session, profile } = await verifyProfileAccess(data.id);
		return {
			profile,
			error: null
		};
	} catch (error) {
		console.log(error);
		return {
			error: { message: "something went wrong" },
			profile: null
		};
	}
});
var updateProfileFormSchema = z.object({
	name: z.string().min(2, { message: "Username must be at least 2 characters." }),
	avatar: z.string({ message: "avatar url must be a string" }),
	id: z.coerce.number({ message: "Invalid Profile Id" })
});
var createProfileFormSchema = z.object({
	name: z.string().min(2, { message: "Username must be at least 2 characters." }),
	avatar: z.string({ message: "avatar url must be a string" })
});
var createProfile_createServerFn_handler = createServerRpc({
	id: "77925d6e0cb86fe6b8affb09fa37d6cae3972257b6da22b952cc50bcaeebc4f4",
	name: "createProfile",
	filename: "src/lib/dal/profile.ts"
}, (opts) => createProfile.__executeServer(opts));
var createProfile = createServerFn({ method: "POST" }).validator((data) => {
	if (!(data instanceof FormData)) throw new Error("Expected FormData");
	return data;
}).handler(createProfile_createServerFn_handler, async ({ data }) => {
	const formData = Object.fromEntries(data);
	const parsedForm = createProfileFormSchema.safeParse(formData);
	if (!parsedForm.success) return {
		error: { message: z.prettifyError(parsedForm.error) },
		profile: null
	};
	try {
		return {
			profile: await createProfile$1((await verifiyServerSession()).user.id, parsedForm.data.name, parsedForm.data.avatar),
			error: null
		};
	} catch (error) {
		return {
			error: { message: "Couldnt create profile." },
			profile: null
		};
	}
});
var updateProfile_createServerFn_handler = createServerRpc({
	id: "0288ff3451e406ce2f9b848aae4068b183445ebc5ca8cbaa5d86806fce6215a1",
	name: "updateProfile",
	filename: "src/lib/dal/profile.ts"
}, (opts) => updateProfile.__executeServer(opts));
var updateProfile = createServerFn({ method: "POST" }).validator((data) => {
	if (!(data instanceof FormData)) throw new Error("Expected FormData");
	return data;
}).handler(updateProfile_createServerFn_handler, async ({ data }) => {
	const formData = Object.fromEntries(data);
	const parsedForm = updateProfileFormSchema.safeParse(formData);
	if (!parsedForm.success) return {
		error: { message: z.prettifyError(parsedForm.error) },
		profile: null
	};
	try {
		const { session } = await verifyProfileAccess(parsedForm.data.id);
		return {
			profile: await updateProfile$1(parsedForm.data.id, parsedForm.data.name, parsedForm.data.avatar),
			error: null
		};
	} catch (error) {
		return {
			error: { message: "Couldnt update profile." },
			profile: null
		};
	}
});
var deleteProfile_createServerFn_handler = createServerRpc({
	id: "73d858e86497aace7735a431483de8fef306d0a24ef56bbf88be8a4015db7209",
	name: "deleteProfile",
	filename: "src/lib/dal/profile.ts"
}, (opts) => deleteProfile.__executeServer(opts));
var deleteProfile = createServerFn({ method: "POST" }).validator((data) => data).handler(deleteProfile_createServerFn_handler, async ({ data }) => {
	try {
		const { session } = await verifyProfileAccess(data.id);
		return {
			profile: await deleteProfile$1(data.id),
			error: null
		};
	} catch (error) {
		return {
			error: { message: "Couldnt delete profile." },
			profile: null
		};
	}
});
var selectProfile_createServerFn_handler = createServerRpc({
	id: "8d2e472c216a37b44f02f966a647f8da831b0d805c4e0ec23569189aa0e16d65",
	name: "selectProfile",
	filename: "src/lib/dal/profile.ts"
}, (opts) => selectProfile.__executeServer(opts));
var selectProfile = createServerFn({ method: "POST" }).validator((data) => data).handler(selectProfile_createServerFn_handler, async ({ data }) => {
	try {
		const { session, profile } = await verifyProfileAccess(data.id);
		console.log(session.user.id);
		await changeSelectedProfile(session.session.id, data.id);
		return {
			success: true,
			error: null
		};
	} catch (error) {
		console.log(error);
		return {
			error: { message: "something went wrong" },
			success: false
		};
	}
});
var getAllProfilesOfUser_createServerFn_handler = createServerRpc({
	id: "8bf6bb33872b0f3405558578f918eec86dcbba2d8ec59c2d0a86ab51fcc4eb5e",
	name: "getAllProfilesOfUser",
	filename: "src/lib/dal/profile.ts"
}, (opts) => getAllProfilesOfUser.__executeServer(opts));
var getAllProfilesOfUser = createServerFn({ method: "GET" }).handler(getAllProfilesOfUser_createServerFn_handler, async ({ data }) => {
	return await getAllProfilesOfUser$1((await verifiyServerSession()).user.id);
});
//#endregion
export { createProfile_createServerFn_handler, deleteProfile_createServerFn_handler, getAllProfilesOfUser_createServerFn_handler, getProfile_createServerFn_handler, selectProfile_createServerFn_handler, updateProfile_createServerFn_handler };
