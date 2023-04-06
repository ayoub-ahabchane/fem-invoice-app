import invoiceData from "../store/data.json";
import { ReactNode, createContext, useEffect, useState } from "react";

interface InvoiceItem {
  name: string;
  quantity: number;
  price: number;
  total: number;
}
interface InvoiceAddress {
  street: string;
  city: string;
  postCode: string;
  country: string;
}
interface Invoice {
  id: string;
  createdAt: string;
  paymentDue: Date;
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
  clientAddress: InvoiceAddress;
  items: InvoiceItem[];
  total: number;
}
interface Context {
  isMobile: boolean;
  isDarkTheme: boolean | null;
  toggleTheme: () => void | null;
  invoices: Invoice[] | null;
}

export const UserCtx = createContext<Context>({
  isMobile: window.matchMedia("(max-width: 767px)").matches,
  isDarkTheme: false,
  invoices: null,
  toggleTheme: () => {},
});

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const toggleDarkTheme = () => setIsDarkTheme((prevTheme) => !prevTheme);
  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 767px)").matches
  );

  const [invoices, setInvoices] = useState<Invoice[]>(
    invoiceData.map((invoice) => {
      return { ...invoice, paymentDue: new Date(invoice.paymentDue) };
    })
  );

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const updateMedia = () => {
      setIsMobile(media.matches);
    };
    media.addEventListener("change", updateMedia);
    return () => {
      media.removeEventListener("change", updateMedia);
    };
  });
  return (
    <UserCtx.Provider
      value={{
        isDarkTheme,
        toggleTheme: toggleDarkTheme,
        invoices,
        isMobile,
      }}
    >
      {children}
    </UserCtx.Provider>
  );
};
