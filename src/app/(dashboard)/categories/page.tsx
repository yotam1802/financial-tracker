import Link from "next/link";

export default function CategoriesPage() {
  return (
    <div className="flex w-full flex-col items-center">
      <div
        className={`shadow-lg p-10 w-full flex flex-col gap-5 mb-10 md:w-4/5 md:rounded-box md:my-10 xl:mt-20 xl:mb-10 bg-gray-50`}
      >
        <div className="flex flex-col gap-y-3 gap-x-5 md:flex-row md:justify-between md:items-end">
          <h1 className="text-2xl font-extrabold">Categories</h1>
          <Link
            href={"/categories/add-category"}
            className="btn btn-primary text-white btn-circle w-52"
          >
            Add Category
          </Link>
        </div>
        <div className="flex w-full flex-col">
          <div className="divider my-0"></div>
        </div>
      </div>
    </div>
  );
}
