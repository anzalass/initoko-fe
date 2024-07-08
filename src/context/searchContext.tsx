import { createContext, useState } from "react";

const SearchContext = createContext<any>(null);
type AppShellProps = {
  children: React.ReactNode;
};

const SearchProductContext = (props: AppShellProps) => {
  const [filter, setfilter] = useState({
    kategori: "",
    filter: "",
    min: 0,
    max: 99999999,
    cari: "",
  });
  const { children } = props;
  return (
    <SearchContext.Provider value={{ filter, setfilter }}>
      {children}
    </SearchContext.Provider>
  );
};

export const ContextSearch = SearchContext;
export default SearchProductContext;
