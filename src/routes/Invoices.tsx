import { useContext, useState } from "react";
import { UserCtx } from "../store/UserContext";
import { InvoiceCard } from "../components/InvoiceCard";
import { InvoicesToolbar } from "../components/InvoicesToolbar";

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
        <InvoicesToolbar
          isMobile={isMobile}
          filteredInvoices={filteredInvoices}
          filterOptions={filterOptions}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />
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
