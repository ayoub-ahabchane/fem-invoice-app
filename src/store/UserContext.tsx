import invoiceData from "../store/data.json";
import { ReactNode, createContext, useState } from "react";

interface Invoice {
  id: string;
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  status: string;
  senderAddress: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
}

interface Context {
  isDarkTheme: boolean | null;
  toggleTheme: () => void | null;
  invoices: Invoice[] | null;
}

export const UserCtx = createContext<Context>({
  isDarkTheme: null,
  toggleTheme: () => {},
  invoices: [],
});

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);
  const toggleDarkTheme = () => setIsDarkTheme((prevTheme) => !prevTheme);
  const [invoices, setInvoices] = useState<Invoice[]>(data);
  return (
    <UserCtx.Provider value={{ isDarkTheme, toggleTheme: toggleDarkTheme }}>
      {children}
    </UserCtx.Provider>
  );
};
