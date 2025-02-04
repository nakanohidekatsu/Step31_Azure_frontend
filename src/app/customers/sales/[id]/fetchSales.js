export default async function fetchSales(id) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_ENDPOINT + `/sales?customer_id=${id}`,
    { cache: "no-cache" }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch sales");
  }
  return res.json();
}
