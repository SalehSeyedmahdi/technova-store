"use client";

import { useRouter, useSearchParams } from "next/navigation";

type FilterItemProps = {
	selectedCategory: string;
	selectedBrand: string;
	selectedSort: string;
};

export default function FilterItem({
	selectedCategory,
	selectedBrand,
	selectedSort,
}: FilterItemProps) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const currentCategory = searchParams.get("category") || selectedCategory;
	const currentBrand = searchParams.get("brand") || selectedBrand;
	const currentSort = searchParams.get("sort") || selectedSort;

	const updateFilter = (key: string, value: string) => {
		const params = new URLSearchParams(searchParams.toString());

		if (params.get(key) === value || value === "") {
			params.delete(key);
		} else {
			params.set(key, value);
		}

		const queryString = params.toString();

		router.push(queryString ? `/products?${queryString}` : "/products");
	};

	return (
		<div
			className="hidden md:w-1/4 md:flex md:flex-col md:justify-center md:items-start md:gap-8 md:bg-white md:rounded-lg md:p-[16px]"
			dir="rtl"
		>
			<h1 className="font-extrabold text-[18px] text-gray-600">فیلترها</h1>

			<div className="flex flex-col gap-4">
				<details className="flex flex-col justify-center items-start gap-4">
					<summary className="list-none text-gray-500 cursor-pointer hover:text-blue-800">
						دسته بندی ها:
					</summary>

					<ol className="flex flex-col justify-center items-start gap-2 text-[14px]">
						<li
							className="flex justify-center items-center gap-2 cursor-pointer hover:text-blue-800"
							dir="ltr"
						>
							<label htmlFor="mobile">موبایل</label>
							<input
								type="checkbox"
								name="mobile"
								id="mobile"
								checked={currentCategory === "smartphone"}
								onChange={() => updateFilter("category", "smartphone")}
							/>
						</li>

						<li
							className="flex justify-center items-center gap-2 cursor-pointer hover:text-blue-800"
							dir="ltr"
						>
							<label htmlFor="laptop">لپ تاپ</label>
							<input
								type="checkbox"
								name="laptop"
								id="laptop"
								checked={currentCategory === "laptop"}
								onChange={() => updateFilter("category", "laptop")}
							/>
						</li>
					</ol>
				</details>

				<details className="flex flex-col justify-center items-start gap-4">
					<summary className="list-none text-gray-500 cursor-pointer hover:text-blue-800">
						برند ها:
					</summary>

					<ol className="flex flex-col justify-center items-start gap-2 text-[14px]">
						<li
							className="flex justify-center items-center gap-2 cursor-pointer hover:text-blue-800"
							dir="ltr"
						>
							<label htmlFor="xiaomi">شیائومی</label>
							<input
								type="checkbox"
								name="xiaomi"
								id="xiaomi"
								checked={currentBrand === "Xiaomi"}
								onChange={() => updateFilter("brand", "Xiaomi")}
							/>
						</li>

						<li
							className="flex justify-center items-center gap-2 cursor-pointer hover:text-blue-800"
							dir="ltr"
						>
							<label htmlFor="samsung">سامسونگ</label>
							<input
								type="checkbox"
								name="samsung"
								id="samsung"
								checked={currentBrand === "Samsung"}
								onChange={() => updateFilter("brand", "Samsung")}
							/>
						</li>

						<li
							className="flex justify-center items-center gap-2 cursor-pointer hover:text-blue-800"
							dir="ltr"
						>
							<label htmlFor="apple">اپل</label>
							<input
								type="checkbox"
								name="apple"
								id="apple"
								checked={currentBrand === "Apple"}
								onChange={() => updateFilter("brand", "Apple")}
							/>
						</li>

						<li
							className="flex justify-center items-center gap-2 cursor-pointer hover:text-blue-800"
							dir="ltr"
						>
							<label htmlFor="asus">ایسوس</label>
							<input
								type="checkbox"
								name="asus"
								id="asus"
								checked={currentBrand === "ASUS"}
								onChange={() => updateFilter("brand", "ASUS")}
							/>
						</li>

						<li
							className="flex justify-center items-center gap-2 cursor-pointer hover:text-blue-800"
							dir="ltr"
						>
							<label htmlFor="lenovo">لنوو</label>
							<input
								type="checkbox"
								name="lenovo"
								id="lenovo"
								checked={currentBrand === "Lenovo"}
								onChange={() => updateFilter("brand", "Lenovo")}
							/>
						</li>
					</ol>
				</details>

				<details className="flex flex-col justify-center items-start gap-4">
					<summary className="list-none text-gray-500 cursor-pointer hover:text-blue-800">
						بر اساس قیمت:
					</summary>

					<ol className="flex flex-col justify-center items-start gap-2 text-[14px]">
						<li
							className="flex justify-center items-center gap-2 cursor-pointer hover:text-blue-800"
							dir="ltr"
						>
							<label htmlFor="cheapest">ارزان ترین</label>
							<input
								type="checkbox"
								name="cheapest"
								id="cheapest"
								checked={currentSort === "price_asc"}
								onChange={() => updateFilter("sort", "price_asc")}
							/>
						</li>

						<li
							className="flex justify-center items-center gap-2 cursor-pointer hover:text-blue-800"
							dir="ltr"
						>
							<label htmlFor="expensive">گران ترین</label>
							<input
								type="checkbox"
								name="expensive"
								id="expensive"
								checked={currentSort === "price_desc"}
								onChange={() => updateFilter("sort", "price_desc")}
							/>
						</li>
					</ol>
				</details>
			</div>
		</div>
	);
}
