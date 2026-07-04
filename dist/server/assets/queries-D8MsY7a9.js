import { n as createServerFn } from "../server.js";
import { t as createSsrRpc } from "./createSsrRpc-MzbqKxU4.js";
//#region src/lib/dal/my-list/queries.ts
var getMyList = createServerFn({ method: "GET" }).handler(createSsrRpc("d3cba362987ac1eb8ff163b882829d7a96eb4c73b707dcf83b11afdab2515b35"));
createServerFn({ method: "GET" }).validator((data) => data).handler(createSsrRpc("506eea61eb3001c55df0727a555e9eca608d112737ba6859485a827676869f0c"));
var isInMyList = createServerFn({ method: "GET" }).validator((data) => data).handler(createSsrRpc("2b1c90eed7113b4faf068d499ab0a0523ea5fff6dd0337a06a8d9e0ae60f846c"));
//#endregion
export { isInMyList as n, getMyList as t };
