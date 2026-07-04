import { n as createServerFn } from "../server.js";
import { t as createSsrRpc } from "./createSsrRpc-MzbqKxU4.js";
//#region src/lib/dal/profile.ts
var getProfile = createServerFn({ method: "GET" }).validator((data) => data).handler(createSsrRpc("8bd06d3dd76f298c08a72d2d584775696c147d16cfde3830076e2a3139c8a0ea"));
var createProfile = createServerFn({ method: "POST" }).validator((data) => {
	if (!(data instanceof FormData)) throw new Error("Expected FormData");
	return data;
}).handler(createSsrRpc("77925d6e0cb86fe6b8affb09fa37d6cae3972257b6da22b952cc50bcaeebc4f4"));
var updateProfile = createServerFn({ method: "POST" }).validator((data) => {
	if (!(data instanceof FormData)) throw new Error("Expected FormData");
	return data;
}).handler(createSsrRpc("0288ff3451e406ce2f9b848aae4068b183445ebc5ca8cbaa5d86806fce6215a1"));
var deleteProfile = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("73d858e86497aace7735a431483de8fef306d0a24ef56bbf88be8a4015db7209"));
var selectProfile = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("8d2e472c216a37b44f02f966a647f8da831b0d805c4e0ec23569189aa0e16d65"));
var getAllProfilesOfUser = createServerFn({ method: "GET" }).handler(createSsrRpc("8bf6bb33872b0f3405558578f918eec86dcbba2d8ec59c2d0a86ab51fcc4eb5e"));
//#endregion
export { selectProfile as a, getProfile as i, deleteProfile as n, updateProfile as o, getAllProfilesOfUser as r, createProfile as t };
