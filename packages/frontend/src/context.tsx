/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useState } from 'react';

export const AppContext = createContext({
  lastPage: "",
  lastPagePath: "",
  setLastPage: (_page: string) => {},
  setLastPagePath: (_page: string) => {},
});

export const AppProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [lastPage, setLastPage] = useState("");
  const [lastPagePath, setLastPagePath] = useState("");

  return (
    <AppContext.Provider value={{ lastPage, setLastPage, lastPagePath, setLastPagePath }}>
      {children}
    </AppContext.Provider>
  );
};

