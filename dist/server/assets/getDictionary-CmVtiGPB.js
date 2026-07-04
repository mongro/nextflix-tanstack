//#region src/i18n/getDictionary.ts
var dictionaries = {
	en: () => import("./en-DnN81Bui.js").then((module) => module.default),
	de: () => import("./de-CPe4airq.js").then((module) => module.default)
};
var getDictionary = async (locale) => dictionaries[locale]();
function isValidLocale(value) {
	return ["en", "de"].includes(value);
}
//#endregion
export { isValidLocale as n, getDictionary as t };
