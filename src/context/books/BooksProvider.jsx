import { createContext } from "react";

export const BooksStateContext = createContext();

export default function BooksProvider({ children }) {
  return (
    <BooksStateContext.Provider value={[]}>
      {children}
    </BooksStateContext.Provider>
  );
}
