import { createContext, useState } from "react";

const OpenCart = createContext<any>(null);
type AppShellProps2 = {
  children: React.ReactNode;
};

const OpenCartContext = (props: AppShellProps2) => {
  const [opencart, setopencart] = useState(false);
  const { children } = props;
  return (
    <OpenCart.Provider value={{ opencart, setopencart }}>
      {children}
    </OpenCart.Provider>
  );
};

export const OpenCartCtx = OpenCart;
export default OpenCartContext;
