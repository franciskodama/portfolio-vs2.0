import { createContext } from "react";

interface AboutContextType {
  location: { data: string };
  setLocation: React.Dispatch<React.SetStateAction<{ data: string }>>;
}

export const AboutContext = createContext<AboutContextType>({
  location: { data: '' },
  setLocation: () => {},
});
