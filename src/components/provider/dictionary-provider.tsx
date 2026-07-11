import React, { createContext, useContext } from "react";

import type { Locale } from "~/i18n/config";
import type { Dictionary } from "~/i18n/type";

interface Props {
  children: React.ReactNode;
  dictionary: Dictionary;
  lang: Locale;
}
export interface DictionaryContextType {
  lang: Locale;
  dictionary: Dictionary;
}
const DictionaryContext = createContext<DictionaryContextType | null>(null);

export function useDictionary() {
  const context = useContext(DictionaryContext);
  if (context === null) {
    throw Error("Used Context outside Provider");
  }

  return context;
}

function DictionaryProvider({ children, dictionary, lang }: Props) {
  return (
    <DictionaryContext.Provider value={{ dictionary, lang }}>
      {children}
    </DictionaryContext.Provider>
  );
}

export default DictionaryProvider;
