import { createContext, useState } from "react";

const OpenKategori = createContext<any>(null);
type AppShellProps2 = {
  children: React.ReactNode;
};

const OpenKategoriContext = (props: AppShellProps2) => {
  const [open, setopen] = useState(false);
  const { children } = props;
  return (
    <OpenKategori.Provider value={{ open, setopen }}>
      {children}
    </OpenKategori.Provider>
  );
};

export const OpenKategoriCtx = OpenKategori;
export default OpenKategoriContext;
