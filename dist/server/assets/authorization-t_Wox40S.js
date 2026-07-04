import { n as createServerFn } from "../server.js";
import { t as createSsrRpc } from "./createSsrRpc-MzbqKxU4.js";
//#region src/lib/auth/authorization.ts
var getServerSession = createServerFn({ method: "GET" }).handler(createSsrRpc("b19149e8b34f356678324682e1b9530b9cdc489e235b7b6855ce9d187a76800e"));
var verifiyServerSession = createServerFn({ method: "GET" }).handler(createSsrRpc("4d69f329237fdfb00ad5d838cf1dc9de845458d453925eaa5056c1f9db9ee756"));
var canChangeProfile = (user, profile) => {
	return user.id === profile.userId;
};
//#endregion
export { getServerSession as n, verifiyServerSession as r, canChangeProfile as t };
