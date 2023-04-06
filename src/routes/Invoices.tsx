import { useContext, useState } from "react";
import Filter from "../components/Filter";
import { UserCtx } from "../store/UserContext";
import { InvoiceCard } from "../components/InvoiceCard";

const Invoices = () => {
  const { invoices, isMobile } = useContext(UserCtx);
  const filterOptions = [
    ...new Set(invoices?.map((invoice) => invoice.status)),
  ];
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const filteredInvoices = selectedFilters.length
    ? invoices?.filter((invoice) => selectedFilters.includes(invoice.status))
    : invoices;

  filteredInvoices?.sort((a, b) => {
    if (a.paymentDue > b.paymentDue) return -1;
    if (a.paymentDue < b.paymentDue) return 1;
    return 0;
  });

  return (
    <main className="px-6 pb-8 pt-[4.5rem] md:px-12 md:pt-20 lg:pt-0">
      <div className="mx-auto max-w-[45.625rem]">
        <header className="sticky top-[4.5rem] flex items-center justify-between bg-gradient-to-b from-fem-light from-85% to-transparent py-8 dark:bg-gradient-to-b dark:from-fem-blue-800 dark:from-85% dark:to-transparent md:top-20 md:py-14 lg:top-0 lg:pt-[4.875rem]">
          <div>
            <h1 className="text-heading-m leading-none md:mb-1.5 md:text-heading-l">
              Invoices
            </h1>
            <p className="text-heading-s-variant font-medium text-fem-blue-400">
              {" "}
              {!isMobile && "There "}
              {(!isMobile &&
                filteredInvoices &&
                filteredInvoices?.length > 1) ||
              (!isMobile && filteredInvoices && filteredInvoices.length == 0)
                ? "are "
                : isMobile
                ? null
                : "is "}
              {filteredInvoices?.length ? filteredInvoices.length : "no"}{" "}
              invoice
              {filteredInvoices &&
              (filteredInvoices.length > 1 || filteredInvoices.length == 0)
                ? "s"
                : null}
            </p>
          </div>
          <div className="flex items-center gap-5">
            <Filter
              options={filterOptions}
              selectedOptions={selectedFilters}
              setSelectedOptions={setSelectedFilters}
            />
            <button className="flex items-center rounded-3xl bg-fem-violet-400 p-1.5 text-heading-s text-white focus-within:bg-fem-violet-300 hover:bg-fem-violet-300">
              <span className="flex aspect-square w-8 items-center justify-center rounded-full bg-white">
                <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6.313 10.023v-3.71h3.71v-2.58h-3.71V.023h-2.58v3.71H.023v2.58h3.71v3.71z"
                    fill="#7C5DFA"
                    fillRule="nonzero"
                  />
                </svg>
              </span>
              <span className="inline-block px-4">
                New {!isMobile && "Invoice"}
              </span>
            </button>
          </div>
        </header>
        {invoices ? (
          <ul className=" flex flex-col gap-4">
            {filteredInvoices &&
              filteredInvoices.map((invoice) => {
                const { id, clientName, paymentDue, status, total } = invoice;
                return (
                  <InvoiceCard
                    key={id}
                    id={id}
                    clientName={clientName}
                    total={total}
                    paymentDue={paymentDue}
                    status={status}
                  />
                );
              })}
          </ul>
        ) : (
          <p>Woops, there's none</p>
        )}
      </div>
    </main>
  );
};

export default Invoices;
