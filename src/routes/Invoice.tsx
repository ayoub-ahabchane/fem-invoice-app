import React, { useContext } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { UserCtx } from "../store/UserContext";
import GoBack from "../components/GoBack";
import { InvoiceStatus } from "../components/StatusBadge";
import { asCurrency, toEnglishDate } from "../store/utils";
import { MobileInvoiceLines } from "../components/mobileInvoiceLines";

export async function loader({ params }) {
  return { params };
}

const Invoice = () => {
  const {
    params: { invoiceId },
  } = useLoaderData();
  const { invoices } = useContext(UserCtx);
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
            <button className="button accent focus-within:bg-fem-violet-300 hover:bg-fem-violet-300">
              Mark as Paid
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-8 rounded-lg bg-white p-6 shadow-[0px_10px_10px_-10px_rgba(72,84,159,0.100397)] dark:bg-fem-blue-700 dark:shadow-[0px_10px_10px_-10px_rgba(0,0,0,0.10)] md:p-8">
          <section className="flex- flex gap-[1.875rem] md:flex-row md:justify-between">
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
          <section className="overflow-hidden rounded-lg bg-fem-blue-100 dark:bg-fem-blue-500 md:mt-4">
            {/* <ul className="flex flex-col gap-6 p-6">
              {invoice!.items.map(({ name, price, quantity, total }) => (
                <li
                  className="flex items-center justify-between"
                  key={Math.random()}
                >
                  <p className="flex flex-col gap-2">
                    <span className="text-heading-s-variant">{name}</span>
                    <span className="text-heading-s-variant text-fem-blue-300 dark:text-fem-blue-400">
                      {quantity} x £ {asCurrency("en-GB", price)}
                    </span>
                  </p>
                  <p className="text-heading-s-variant">
                    £ {asCurrency("en-GB", total)}
                  </p>
                </li>
              ))}
            </ul> */}
            <div className="p-8">
              <table className="w-full table-auto">
                <thead className="border-b-[2rem] border-transparent text-[0.8125rem] font-medium leading-none text-fem-blue-300 dark:text-fem-blue-200">
                  <tr>
                    <th className="text-left">Item name</th>
                    <th className="text-center">QTY.</th>
                    <th className="text-right">Price</th>
                    <th className="text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="text-heading-s-variant">
                  {invoice!.items.map(({ name, quantity, price, total }) => (
                    <tr
                      key={Math.random()}
                      className="border-b-[2rem] border-transparent last:border-b-0"
                    >
                      <td>{name}</td>
                      <td className="text-center text-fem-blue-300 dark:text-fem-blue-200 ">
                        {quantity}
                      </td>
                      <td className="text-right text-fem-blue-300 dark:text-fem-blue-200 ">
                        £ {asCurrency("en-GB", price)}
                      </td>
                      <td className="text-right">
                        £ {asCurrency("en-GB", total)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="flex items-center justify-between bg-fem-blue-600 px-6 py-6 text-white dark:bg-fem-blue-900">
              <span className="text-[0.8125rem] leading-[1.384em]">
                Grand Total
              </span>
              <span className="text-2xl font-bold">
                £ {asCurrency("en-GB", invoice!.total)}
              </span>
            </p>
          </section>
        </div>
      </div>
      <div className="fixed inset-x-0 bottom-0 bg-white p-6 shadow-[0px_-20px_10px_-10px_rgba(72,84,159,0.100397)] dark:bg-fem-blue-700 dark:shadow-[0px_-20px_10px_-10px_rgba(0,0,0,0.10)] md:hidden">
        <div className="flex items-center justify-between">
          <button className="button muted">Edit</button>
          <button className="button danger">Delete</button>
          <button className="button accent">Mark as Paid</button>
        </div>
      </div>
    </main>
  );
};

export default Invoice;
