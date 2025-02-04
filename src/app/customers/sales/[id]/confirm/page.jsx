"use client";
import OneCustomerSalesCard from "@/app/components/one_customer_sales_card.jsx";
import fetchSales from "./../fetchSales";
import { useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";

export default function ConfirmPage(props) {
  const params = use(props.params);
  const router = useRouter();
  const id = params.id;
  const [customer, setCustomer] = useState([]);

  useEffect(() => {
    const fetchAndSetSales = async () => {
      const customerData = await fetchSales(id);
      setCustomer(customerData);
    };
    fetchAndSetSales();
  }, []);

  return (
    <>
      <div className="card bordered bg-white border-blue-200 border-2 max-w-sm m-4">
        <div className="alert alert-success p-4 text-center">更新しました</div>
        <OneCustomerSalesCard {...customer} />
        <a href="/customers" className="flex justify-center">
          <button className="btn btn-outline btn-accent">一覧に戻る</button>
        </a>
      </div>
    </>
  );
}
