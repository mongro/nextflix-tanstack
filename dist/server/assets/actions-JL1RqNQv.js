import { n as createServerFn } from "../server.js";
import { t as createSsrRpc } from "./createSsrRpc-MzbqKxU4.js";
//#region src/lib/auth/actions.ts
var signIn = createServerFn({ method: "POST" }).validator((data) => {
	if (!(data instanceof FormData)) throw new Error("Expected FormData");
	return {
		password: data.get("password")?.toString() || "",
		email: data.get("email")?.toString() || ""
	};
}).handler(createSsrRpc("159d84c25e42ff785280b41058b666690aff175cea472ac7f476673d06408406"));
var signUp = createServerFn({ method: "GET" }).validator((data) => {
	if (!(data instanceof FormData)) throw new Error("Expected FormData");
	return {
		password: data.get("password")?.toString() || "",
		email: data.get("email")?.toString() || "",
		name: data.get("name")?.toString() || ""
	};
}).handler(createSsrRpc("203bc9bc8d4bd20618e0d927e463675184a9d2ba4052168fc9eee74d9d99e1d1"));
var signUpAnonym = createServerFn({ method: "GET" }).handler(createSsrRpc("590cde8bf1c8d186d8dfd3a06f4a2ae995910ef1de80b479026d2f8c18c6884a"));
createServerFn({ method: "GET" }).handler(createSsrRpc("0294f90a2e2180fb6741d8f59a13123357d14b7a302a3c2061b2e1f0693e67ac"));
//#endregion
export { signUp as n, signUpAnonym as r, signIn as t };
