export default async function salesCustomer(formData) {
  const sales_customer_name = formData.get("customer_name");
  const sales_customer_id = formData.get("customer_id");
  const sales_ken = formData.get("ken");
  const sales_city = formData.get("city");
  const sales_sicName = formData.get("sicName");
  const sales_simcName = formData.get("simcName");

  const body_msg = JSON.stringify({
    customer_name: sales_customer_name,
    customer_id: sales_customer_id,
    ken: sales_ken,
    city: sales_city,
    sicName: sales_sicName,
    simcName: sales_simcName,
  });

  console.log("nakano sales_update body_msg",body_msg);

  //const res = await fetch(`http://localhost:8000/sales_update`, {
  const res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/sales_update`,{

    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: body_msg,
  });

  if (!res.ok) {
    throw new Error("Failed to update sales",body_msg);
  }
}
