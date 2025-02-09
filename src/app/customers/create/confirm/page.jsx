"use client";
import React, { Suspense, useEffect, useState } from "react";
import OneCustomerInfoCard from "@/app/components/one_customer_info_card.jsx";
import fetchCustomer from "./fetchCustomer";
import { useRouter, useSearchParams } from "next/navigation";

function ConfirmPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
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
    if (customer_id) {
      fetchAndSetCustomer();
    }
  }, [customer_id]);

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

// ページコンポーネントで Suspense 境界を設定
export default function ConfirmPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConfirmPageContent />
    </Suspense>
  );
}
