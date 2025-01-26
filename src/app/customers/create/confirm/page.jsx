"use client";
import OneCustomerInfoCard from "@/app/components/one_customer_info_card.jsx";
import fetchCustomer from "./fetchCustomer";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ConfirmPage() {
  const router = useRouter();
  const customer_id = useSearchParams().get("customer_id");
  const [customer, setCustomer] = useState(null);

  // add start
  const msg = customer_id === "" ? "Customer IDに値が入っていません" : "正常に作成しました";
  // add end

  useEffect(() => {
    const fetchAndSetCustomer = async () => {
      const customerData = await fetchCustomer(customer_id);
      setCustomer(customerData);
    };
    fetchAndSetCustomer();
  }, []);

  return (
    <>
      <div className="card bordered bg-white border-blue-200 border-2 max-w-sm m-4">
        <div className="alert alert-success p-4 text-center">
          {msg}
        </div>
        <OneCustomerInfoCard {...customer} />
        <button onClick={() => router.push("./../../customers")}>
          <div className="btn btn-primary m-4 text-2xl">戻る</div>
        </button>
      </div>
    </>
  );
}
