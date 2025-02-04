export default function OneCustomerSalesEdit({
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
          <h2 className="card-title">
            <p>
              {customer_name}さん
            </p>
          </h2>
          <p>Customer ID: {customer_id} </p>
          <p>
            都道府県:
            <input
              type="text"
              name="ken"
              // defaultValue={ken}
              className="input input-bordered"
            />
          </p>
          <p>
            市町村　:
            <input
              type="text"
              name="city"
              // defaultValue={city}
              className="input input-bordered"
            />
          </p>
          <p>
            業種大分類:
            <input
              type="text"
              name="sicName"
              // defaultValue={sicName}
              className="input input-bordered"
            />
          </p>
          <p>
          業種中分類:
            <input
              type="text"
              name="simcName"
              // defaultValue={simcName}
              className="input input-bordered"
            />
          </p>
        </div>
        <button className="btn btn-primary m-4 text-2xl">更新</button>
      </div>
    </>
  );
}
