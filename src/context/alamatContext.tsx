import { Edit } from "lucide-react";
import React, { createContext, useState } from "react";

const EditAlamat = createContext<any>(null);
type AppShellProps = {
  children: React.ReactNode;
};

const EditAlamatContext = (props: AppShellProps) => {
  const [idalamat, setidalamat] = useState(undefined);
  const { children } = props;
  return (
    <EditAlamat.Provider value={{ idalamat, setidalamat }}>
      {children}
    </EditAlamat.Provider>
  );
};

export const EditAlamatCtx = EditAlamat;
export default EditAlamatContext;
