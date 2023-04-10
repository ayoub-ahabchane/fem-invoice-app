import React, { useContext } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { UserCtx } from "../store/UserContext";
import GoBack from "../components/GoBack";
import { InvoiceStatus } from "../components/StatusBadge";
import { toEnglishDate } from "../store/utils";
import { MobileInvoiceLines } from "../components/mobileInvoiceLines";
import { LargeInvoiceLines } from "../components/LargeInvoiceLines";

export async function loader({ params }) {
  return { params };
}

const Invoice = () => {
  const {
    params: { invoiceId },
  } = useLoaderData();
  const { invoices, setInvoices } = useContext(UserCtx);
  const invoice = invoices?.find((item) => item.id == invoiceId);

  return (
    <main className="relative px-6 pb-8 pt-[6.5625rem] md:px-12 md:pt-[8.0625rem] lg:pt-[4.875rem]">
      <div className="mx-auto flex max-w-[45.625rem] flex-col gap-4 pb-36 md:gap-6 md:pb-0">
        <GoBack />
        <div className="flex items-center justify-between rounded-lg bg-white p-6 dark:bg-fem-blue-700 md:px-8 md:shadow-soft">
          <div className="flex flex-grow items-center justify-between md:flex-grow-0 md:justify-normal md:gap-5">
            <span className="text-[0.8125rem] leading-none text-fem-blue-400">
              Status
            </span>
            <InvoiceStatus status={invoice!.status} />
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <button className="button muted focus-within:bg-fem-blue-200 hover:bg-fem-blue-200">
              Edit
            </button>
            <button className="button danger focus-within:bg-fem-red-300 hover:bg-fem-red-300">
              Delete
            </button>
            <button
              onClick={() => setInvoices({ type: "paid", id: invoiceId })}
              className="button accent focus-within:bg-fem-violet-300 hover:bg-fem-violet-300"
            >
              Mark as Paid
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-8 rounded-lg bg-white p-6 shadow-[0px_10px_10px_-10px_rgba(72,84,159,0.100397)] dark:bg-fem-blue-700 dark:shadow-[0px_10px_10px_-10px_rgba(0,0,0,0.10)] md:p-8">
          <section className="flex- flex justify-between gap-[1.875rem] md:flex-row">
            <div>
              <h1 className="mb-1.5 text-heading-s-variant">
                <span className="text-fem-blue-300">#</span>
                {invoice!.id}
              </h1>
              <p className="muted-heading">{invoice?.description}</p>
            </div>
            <address className="muted-heading flex flex-col gap-1.5 not-italic md:text-right">
              <p>{invoice!.senderAddress.street}</p>
              <p> {invoice!.senderAddress.city}</p>
              <p>{invoice!.senderAddress.postCode}</p>
              <p>{invoice!.senderAddress.country}</p>
            </address>
          </section>
          <section className="grid grid-cols-2 grid-rows-[1fr_1fr_auto] md:grid-cols-[5fr_5fr_6fr] md:grid-rows-[auto_auto]">
            <article className="col-span-1 col-start-1 row-span-1 row-start-1">
              <h2 className="muted-heading mb-3">Invoice Date</h2>
              <p className="text-heading-s-variant">
                {toEnglishDate(invoice!.createdAt)}
              </p>
            </article>
            <article className="col-span-1 col-start-1 row-span-1 row-start-2 self-end">
              <h2 className="muted-heading mb-3">Payment Due</h2>
              <p className="text-heading-s-variant">
                {toEnglishDate(invoice!.paymentDue)}
              </p>
            </article>
            <article className="col-span-1 col-start-2 row-span-2 row-start-1 md:row-span-2">
              <h2 className="muted-heading mb-3">Bill to</h2>
              <p className="mb-4 text-heading-s-variant">
                {invoice!.clientName}
              </p>
              <address className="muted-heading flex flex-col gap-1.5 not-italic">
                <p>{invoice!.clientAddress.street}</p>

                <p> {invoice!.clientAddress.city}</p>

                <p>{invoice!.clientAddress.postCode}</p>

                <p>{invoice!.clientAddress.country}</p>
              </address>
            </article>
            <article className="col-span-2 col-start-1 row-start-3 pt-8 md:col-start-3 md:row-span-2 md:row-start-1 md:pt-0">
              <h2 className="muted-heading mb-3">Sent to</h2>
              {invoice!.clientEmail ? (
                <a
                  href={`mailto:${invoice!.clientEmail}`}
                  className="block text-heading-s-variant"
                >
                  {invoice!.clientEmail}
                </a>
              ) : (
                <p className="text-heading-s-variant text-fem-blue-400 opacity-40">
                  No email
                </p>
              )}
            </article>
          </section>
          <MobileInvoiceLines
            invoiceLines={invoice!.items}
            total={invoice!.total}
          />
          <LargeInvoiceLines
            invoiceLines={invoice!.items}
            total={invoice!.total}
          />
        </div>
      </div>
      <div className="fixed inset-x-0 bottom-0 bg-white p-6 shadow-[0px_-20px_10px_-10px_rgba(72,84,159,0.100397)] dark:bg-fem-blue-700 dark:shadow-[0px_-20px_10px_-10px_rgba(0,0,0,0.10)] md:hidden">
        <div className="flex items-center justify-between">
          <button className="button muted focus-within:bg-fem-blue-200 hover:bg-fem-blue-200">
            Edit
          </button>
          <button className="button danger focus-within:bg-fem-red-300 hover:bg-fem-red-300">
            Delete
          </button>
          <button
            onClick={() => setInvoices({ type: "paid", id: invoiceId })}
            className="button accent focus-within:bg-fem-violet-300 hover:bg-fem-violet-300"
          >
            Mark as Paid
          </button>
        </div>
      </div>
    </main>
  );
};

export default Invoice;
