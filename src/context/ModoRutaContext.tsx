import { createContext, useContext, useState, ReactNode } from "react";

interface ModoRutaContextType {
  modoCrearRuta: boolean;
  setModoCrearRuta: (valor: boolean) => void;
}

const ModoRutaContext = createContext<ModoRutaContextType | undefined>(undefined);

export const useModoRuta = () => {
  const context = useContext(ModoRutaContext);
  if (!context) throw new Error("useModoRuta debe usarse dentro de ModoRutaProvider");
  return context;
};

export const ModoRutaProvider = ({ children }: { children: ReactNode }) => {
  const [modoCrearRuta, setModoCrearRuta] = useState(false);
  return (
    <ModoRutaContext.Provider value={{ modoCrearRuta, setModoCrearRuta }}>
      {children}
    </ModoRutaContext.Provider>
  );
};
