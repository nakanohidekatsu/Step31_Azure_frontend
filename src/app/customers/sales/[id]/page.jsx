"use client";
import OneCustomerSalesCard from "@/app/components/one_customer_sales_card.jsx";
import { useEffect, useState, useRef, use } from "react";
import { useRouter } from "next/navigation";
import fetchCustomer from "./fetchCustomer";
import fetchSales from "./fetchSales";
import salesCustomer from "./salesCustomer";

export default function SalesPage(props) {
  const params = use(props.params);
  const router = useRouter();
  const id = params.id;
  const formRef = useRef();

  // nakano add start

  const [customerInfo, setCustomerInfo] = useState({ customer_name: "", customer_id: "" });
  const [salesInfo, setSalesInfo] = useState({ ken: "", city: "", sicName: "", simcName: "" });
  
  useEffect(() => {
    const fetchAndSetCustomer = async () => {
      const customerData = await fetchCustomer(id);
      setCustomerInfo(customerData);
    };
    fetchAndSetCustomer();
  }, []);
  
  useEffect(() => {
    const fetchAndSetSales = async () => {
      const salesData = await fetchSales(id);
      setSalesInfo(salesData);
    };
    fetchAndSetSales();
  }, []);

  const previous_customer_name = customerInfo.customer_name;
  const previous_customer_id = customerInfo.customer_id;
  
  let previous_ken = ("");
  let previous_city = ("");
  let previous_sicName = ("");
  let previous_simcName = ("");

   if (salesInfo) {
    previous_ken = salesInfo.ken;
    previous_city = salesInfo.city;
    previous_sicName = salesInfo.sicName;
    previous_simcName = salesInfo.simcName;
   }

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedKen, setSelectedKen] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

// salesInfo の変更を監視し、値をセット
  useEffect(() => {
    if (salesInfo) {
      setSelectedKen(salesInfo.ken || "");
      setSelectedCity(salesInfo.city || "");
      setSelectedCategory(salesInfo.sicName || "");
      setSelectedSubCategory(salesInfo.simcName || "");
    }
  }, [salesInfo]); 
    const [categories, setCategories] = useState(() => {
      if (previous_sicName) {
        return [previous_sicName];     }
      return [];
    }); // 業種大分類リスト
   // const [selectedCategory, setSelectedCategory] = useState(previous_sicName); // 選択された業種大分類
//    const [selectedCategory, setSelectedCategory] = useState(previous_sicName || "");
// 
    const [subCategories, setSubCategories] = useState(() => {
      if (previous_simcName) {
        return [previous_simcName];
      }
      return [];
    }); // 業種中分類リスト
  // const [selectedSubCategory, setSelectedSubCategory] = useState(previous_simcName); // 選択された業種中分類
//    const [selectedSubCategory, setSelectedSubCategory] = useState(previous_simcName || "");
   
    const [kens, setkens] = useState(() => {
      if (previous_ken) {
        return [previous_ken];
      }
      return [];
    });

    const [cities, setCities] = useState(() => {
      if (previous_city) {
        return [previous_city];
      }
      return [];
    });
    

  useEffect(() => {
    // 業種大分類データを取得
    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/industries")
      .then((res) => res.json())
      .then((data) => setCategories(data.categories))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    setSelectedSubCategory(""); // 業種中分類をリセット

    // 業種中分類データを取得
    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/sub-industries/${category}`)
      .then((res) => res.json())
      .then((data) => setSubCategories(data.sub_categories))
      .catch((error) => console.error("Error fetching subcategories:", error));
  };

  useEffect(() => {
    // 県データを取得
    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/ken")
      .then((res) => res.json())
      .then((data) => setkens(data.kens))
      .catch((error) => console.error("Error fetching ken:", error));
  }, []);

  const handlekenChange = (e) => {
    const ken = e.target.value;
    setSelectedKen(ken);
    setSelectedCity(""); // 市をリセット

    // 市データを取得
    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/cities/${ken}`)
      .then((res) => res.json())
      .then((data) => setCities(data.cities))
      .catch((error) => console.error("Error fetching Cities:", error));
  };

  // nakano add end
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    await salesCustomer(formData);
    router.push(`./${formData.get("customer_id")}/confirm`);
  };  
  return (
    <>
      <div className="card bordered bg-white border-blue-200 border-2 max-w-md m-4">
        <div className="m-4 card bordered bg-blue-200 duration-200 hover:border-r-red">
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="card-body">
              <h2 className="card-title">
                <p>
                <input type="hidden" name="customer_name" value={previous_customer_name} />
                {previous_customer_name}さん
                </p>
              </h2>
              <p>
                <input type="hidden" name="customer_id" value={previous_customer_id} />
                Customer ID:{previous_customer_id}
              </p>
              <p>
                都道府県:{previous_ken}
                <br />
                <select name="ken" value={selectedKen} onChange={handlekenChange}>
                  <option value="">選択してください</option>
                  {kens.map((tmp) => (
                    <option key={tmp} value={tmp}>{tmp}</option>
                  ))}
                </select>
              </p>
              <p>
                市町村　:{previous_city}
                <br />
                <select 
                  name="city"
                  value={selectedCity} 
                  onChange={(e) => setSelectedCity(e.target.value)} 
                  disabled={!selectedKen}
                >
                <option value="">選択してください</option>
                {cities.map((sub) => (
                  <option key={sub} value={sub}>{sub}</option>
                ))} 
                </select>
              </p>
              <p>
                業種大分類:{previous_sicName}
                <br />
                <select name="sicName" value={selectedCategory} onChange={handleCategoryChange}>
                  <option value="">選択してください</option>
                  {categories.map((tmp) => (
                    <option key={tmp} value={tmp}>{tmp}</option>
                  ))}
                </select>
              </p>
              <p>
                業種中分類:{previous_simcName}
                <br />
                <select 
                  name="simcName"
                  value={selectedSubCategory} 
                  onChange={(e) => setSelectedSubCategory(e.target.value)} 
                  disabled={!selectedCategory}
                >
                <option value="">選択してください</option>
                {subCategories.map((sub) => (
                  <option key={sub} value={sub}>{sub}</option>
                ))} 
                </select>
              </p>
            </div>
            <div className="flex justify-center">
              <button className="btn btn-primary m-4 text-2xl">更新</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
