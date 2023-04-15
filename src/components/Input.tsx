import React from "react";
import { FieldError, UseFormReturn } from "react-hook-form";
import { InvoiceFormType } from "./InvoiceForm";

const Input = ({
  methods,
  id,
  label,
  type,
  error,
  fieldName,
}: {
  methods: UseFormReturn<InvoiceFormType, any>;
  id: string;
  label: string;
  type: React.HTMLInputTypeAttribute;
  error: FieldError | undefined;
  fieldName:
    | "senderAddress.street"
    | "senderAddress.city"
    | "senderAddress.postCode"
    | "senderAddress.country"
    | "clientName"
    | "clientEmail"
    | "clientAddress.street"
    | "clientAddress.city"
    | "clientAddress.postCode"
    | "clientAddress.country"
    | "createdAt"
    | "paymentTerms";
}) => {
  return (
    <>
      <div className="mb-2 flex items-center justify-between">
        <label className="input-label" htmlFor={id}>
          {label}
        </label>
        {error && (
          <span className="muted-heading font-medium text-fem-red-400">
            Required
          </span>
        )}
      </div>
      <input
        id={id}
        type={type}
        {...methods.register(fieldName, {
          required: true,
        })}
        className={`w-full ${error && "border-fem-red-300"}`}
        aria-invalid={error ? true : false}
      />
    </>
  );
};

export default Input;
