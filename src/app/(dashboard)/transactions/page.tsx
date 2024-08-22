import Link from "next/link";

export default function TransactionPage() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="flex h-full w-full flex-col items-center">
      <div className="rounded-box shadow-lg m-10 p-5 w-5/6 flex justify-center bg-gray-100">
        <div className="flex flex-col gap-5 w-11/12">
          <div className="flex flex-col gap-y-3 gap-x-5 md:flex-row md:justify-between md:items-end">
            <h1 className="text-2xl font-extrabold">Transactions</h1>
            <Link
              href={"/transactions/add-transaction"}
              className="btn btn-primary text-white btn-circle w-52"
            >
              Add Transaction
            </Link>
          </div>
          <div className="flex w-full flex-col">
            <div className="divider mt-0"></div>
          </div>
          <div className="m-auto w-full">
            <div className="relative w-full py-8">
              <input
                type="range"
                min={0}
                max={11}
                defaultValue={5}
                className="w-full h-1 bg-gray-300 appearance-none focus:outline-non hero-overlay"
                step="1"
              />
              <div className="flex justify-between absolute top-6 w-full text-xs">
                {months.map((month, index) => (
                  <span
                    key={index}
                    className={`absolute text-black transition-all duration-200 ${
                      5 === index ? "text-blue-600 text-sm font-bold" : ""
                    }`}
                    style={{
                      left: `${(index / 11) * 100}%`,
                      transform: "translateX(-50%)",
                    }}
                  >
                    {month}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
