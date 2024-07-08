import { createContext, useState } from "react";

const RenderTable = createContext<any>(null);
type AppShellProps = {
  children: React.ReactNode;
};

const RenderTableContext = (props: AppShellProps) => {
  const [render, setRender] = useState(false);
  const { children } = props;
  return (
    <RenderTable.Provider value={{ render, setRender }}>
      {children}
    </RenderTable.Provider>
  );
};

export const RenderTableUser = RenderTable;
export default RenderTableContext;
