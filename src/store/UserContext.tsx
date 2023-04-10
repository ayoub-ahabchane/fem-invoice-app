import invoiceData from "../store/data.json";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useLocalStorage } from "./useLocalStorage";

export interface InvoiceItem {
  name: string;
  quantity: number;
  price: number;
  total: number;
}
export interface InvoiceAddress {
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
  setInvoices: React.DispatchWithoutAction;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

export const UserCtx = createContext<Context>({
  isMobile: window.matchMedia("(max-width: 767px)").matches,
  isDarkTheme: false,
  invoices: null,
  toggleDarkTheme: () => {},
  setInvoices: () => {},
  showModal: false,
  setShowModal: () => {},
});

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [invoices, setInvoices] = useReducer(
    invoicesReducer,
    invoiceData.map((invoice) => {
      return {
        ...invoice,
        paymentDue: new Date(invoice.paymentDue),
        createdAt: new Date(invoice.createdAt),
      };
    })
  );
  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 767px)").matches
  );
  const [isDarkTheme, setIsDarkTheme] = useLocalStorage(
    "invoiceAppDarkTheme",
    false
  );
  const [showModal, setShowModal] = useState(false);

  function toggleDarkTheme(): void {
    setIsDarkTheme(!isDarkTheme);
  }

  function invoicesReducer(
    state: Invoice[],
    action: { type: string; id: string; paylod?: Invoice }
  ) {
    switch (action.type) {
      case "paid":
        const paidInvoice = state.find((item) => item.id === action.id);
        const otherInvoices = state.filter((item) => item.id !== action.id);
        paidInvoice!.status = "paid";
        return [...otherInvoices, paidInvoice];
      case "delete":
        const filteredInvoices = state.filter((item) => item.id !== action.id);
        return filteredInvoices;
      case "edit":
        const uneditedInvoices = state.filter((item) => item.id !== action.id);
        return [...uneditedInvoices, action.paylod];
      default:
        break;
    }
  }

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
        setInvoices,
        showModal,
        setShowModal,
      }}
    >
      {children}
    </UserCtx.Provider>
  );
};
