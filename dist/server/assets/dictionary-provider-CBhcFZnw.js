import { createContext, useContext } from "react";
import { jsx } from "react/jsx-runtime";
//#region src/components/provider/dictionary-provider.tsx
var DictionaryContext = createContext(null);
function useDictionary() {
	let context = useContext(DictionaryContext);
	if (context === null) throw Error("Used Context outside Provider");
	return context;
}
function DictionaryProvider({ children, dictionary, lang }) {
	return /* @__PURE__ */ jsx(DictionaryContext.Provider, {
		value: {
			dictionary,
			lang
		},
		children
	});
}
//#endregion
export { useDictionary as n, DictionaryProvider as t };
