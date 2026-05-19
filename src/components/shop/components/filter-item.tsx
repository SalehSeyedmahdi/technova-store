export default function FilterItem() {
	return (
		<div
			className="hidden md:w-1/4 md:flex md:flex-col md:justify-center md:items-start md:gap-8 md:bg-[#ffffff] md:rounded-lg md:p-[16px]"
			dir="rtl"
		>
			<h1 className="font-extrabold text-[18px] text-gray-600">فیلترها</h1>
			<div className="flex flex-col gap-4">
				<details className="flex flex-col justify-center items-start gap-4">
					<summary className="text-gray-500 cursor-pointer hover:text-blue-800">
						دسته بندی ها:
					</summary>
					<ol className="flex flex-col justify-center items-start gap-2 text-[14px]">
						<li
							className="flex justify-center items-center gap-2 cursor-pointer hover:text-blue-800"
							dir="ltr"
						>
							<label htmlFor="mobile">موبایل</label>
							<input type="checkbox" name="mobile" id="mobile" />
						</li>
						<li
							className="flex justify-center items-center gap-2 cursor-pointer hover:text-blue-800"
							dir="ltr"
						>
							<label htmlFor="laptop">لپ تاپ</label>
							<input type="checkbox" name="laptop" id="laptop" />
						</li>
					</ol>
				</details>
				<details className="flex flex-col justify-center items-start gap-4">
					<summary className="text-gray-500 cursor-pointer hover:text-blue-800">
						برند ها:
					</summary>
					<ol className="flex flex-col justify-center items-start gap-2 text-[14px]">
						<li
							className="flex justify-center items-center gap-2 cursor-pointer hover:text-blue-800"
							dir="ltr"
						>
							<label htmlFor="xiaomi">شیائومی</label>
							<input type="checkbox" name="xiaomi" id="xiaomi" />
						</li>
						<li
							className="flex justify-center items-center gap-2 cursor-pointer hover:text-blue-800"
							dir="ltr"
						>
							<label htmlFor="samsung">سامسونگ</label>
							<input type="checkbox" name="samsung" id="samsung" />
						</li>
						<li
							className="flex justify-center items-center gap-2 cursor-pointer hover:text-blue-800"
							dir="ltr"
						>
							<label htmlFor="apple">اپل</label>
							<input type="checkbox" name="apple" id="apple" />
						</li>
					</ol>
				</details>
				<details className="flex flex-col justify-center items-start gap-4">
					<summary className="text-gray-500 cursor-pointer hover:text-blue-800">
						بر اساس قیمت:
					</summary>
					<ol className="flex flex-col justify-center items-start gap-2 text-[14px]">
						<li
							className="flex justify-center items-center gap-2 cursor-pointer hover:text-blue-800"
							dir="ltr"
						>
							<label htmlFor="cheapest">ارزان ترین</label>
							<input type="checkbox" name="cheapest" id="cheapest" />
						</li>
						<li
							className="flex justify-center items-center gap-2 cursor-pointer hover:text-blue-800"
							dir="ltr"
						>
							<label htmlFor="expensive">گران ترین</label>
							<input type="checkbox" name="expensive" id="expensive" />
						</li>
					</ol>
				</details>
			</div>
		</div>
	);
}
