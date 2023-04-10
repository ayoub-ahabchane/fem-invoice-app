import invoiceData from "../store/data.json";
import { ReactNode, createContext, useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

export interface InvoiceItem {
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
export interface Invoice {
  id: string;
  createdAt: Date;
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
  toggleDarkTheme: () => void | null;
  invoices: Invoice[] | null;
}

export const UserCtx = createContext<Context>({
  isMobile: window.matchMedia("(max-width: 767px)").matches,
  isDarkTheme: false,
  invoices: null,
  toggleDarkTheme: () => {},
});

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkTheme, setIsDarkTheme] = useLocalStorage(
    "invoiceAppDarkTheme",
    false
  );

  function toggleDarkTheme(): void {
    setIsDarkTheme(!isDarkTheme);
  }
  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 767px)").matches
  );

  const [invoices, setInvoices] = useState<Invoice[]>(
    invoiceData.map((invoice) => {
      return {
        ...invoice,
        paymentDue: new Date(invoice.paymentDue),
        createdAt: new Date(invoice.createdAt),
      };
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
        toggleDarkTheme,
        invoices,
        isMobile,
      }}
    >
      {children}
    </UserCtx.Provider>
  );
};
