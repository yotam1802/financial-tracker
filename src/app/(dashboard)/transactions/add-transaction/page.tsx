import TransactionForm from "@/app/components/TransactionForm";

export default function TransactionPage() {
  return (
    <div className="flex h-full w-full flex-col items-center">
      <div className="rounded-box shadow-lg m-10 p-10 w-4/5 flex flex-col gap-5">
        <h1 className="text-2xl font-extrabold">Add New Transaction</h1>
        <div className="flex w-full flex-col">
          <div className="divider my-0"></div>
        </div>

        <TransactionForm />

        <form className="flex flex-col gap-5">
          <div className="flex px-4 py-3">
            <div className="flex h-12 flex-1 items-center justify-center rounded-lg p-1 gap-x-40">
              dfdfd
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-5">
            <div className="flex flex-row w-full justify-center">
              <label className="input input-bordered flex items-center gap-2 w-3/4">
                Title
                <input type="text" className="grow" placeholder="placeholder" />
              </label>
            </div>
            <div className="flex flex-row w-full justify-center">gg</div>
          </div>
        </form>
      </div>
    </div>
  );
}
