export default function OneCustomerSalesCard({
  customer_id,
  customer_name,
  ken,
  city,
  sicName,
  simcName,
}) {
  return (
    <>
      <div className="m-4 card bordered bg-blue-200 duration-200 hover:border-r-red">
        <div className="card-body">
          <h2 className="card-title">{customer_name}さん</h2>
          <p>Customer ID: {customer_id}</p>
          <p>都道府県: {ken}</p>
          <p>市町村　: {city}</p>
          <p>業種大分類: {sicName}</p>
          <p>業種中分類: {simcName}</p>
        </div>
      </div>
    </>
  );
}
