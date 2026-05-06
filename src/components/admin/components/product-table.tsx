"use client";

import { BASE_URL } from "@/constants/BASE_URL";
import axios from "axios";
import { useEffect, useState } from "react";

type Product = {
	id: string;
	name: string;
	brand: string;
	price: number;
	category: string;
	images: string[];
};

async function getProducts(): Promise<Product[]> {
	try {
		const res = await axios.get(`${BASE_URL}/api/products?page=1&limit=6`);
		console.log(res.data.data);
		return res.data.data;
	} catch (error) {
		console.error("Failed to fetch products:", error);
		return [];
	}
}

export default function ProductTable() {
	const [products, setProducts] = useState<Product[]>([]);
	const [page, setPage] = useState(1);
	const [pages, setPages] = useState(1);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		async function getProducts() {
			try {
				setLoading(true);
				const res = await axios.get(
					`${BASE_URL}/api/products?page=${page}&limit=5`,
				);
				setProducts(res.data.data);
				setPages(res.data.pages);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		}
		getProducts();
	}, [page]);

	return (
		<div className="w-full flex flex-col justify-start items-center gap-2 pr-2 pl-2">
			<button className="flex justify-center items-center text-[12px] md:text-[16px] text-[#ffffff] bg-green-950 cursor-pointer hover:opacity-60 rounded-md pr-3 pl-3 p-1">
				افزودن محصول
			</button>
			{loading ? (
				<div className="w-full h-80 flex items-center justify-center">
					<div className="w-8 h-8 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600"></div>
				</div>
			) : (
				<table className="w-full border-collapse text-center">
					<thead className="bg-[#193cb8] text-[12px] md:text-[16px] text-white">
						<tr>
							<td className="p-2">عملیات</td>
							<td className="border-l p-2">قیمت</td>
							<td className="border-l p-2">دسته بندی</td>
							<td className="border-l p-2">برند</td>
							<td className="border-l p-2">نام محصول</td>
							<td className="border-l p-2">تصویر</td>
						</tr>
					</thead>
					<tbody>
						{products.map((product) => (
							<tr key={product.id} className="text-[12px] md:text-[14px]">
								<td className="p-2">
									<div className="flex justify-center items-center gap-2">
										<div className="bg-blue-500 cursor-pointer hover:opacity-60 rounded-md pr-1 pl-1 md:p-1">
											<img src="../assets/svg/edit.svg" className="w-5 h-5" />
										</div>
										<div className="bg-red-500 cursor-pointer hover:opacity-60 rounded-md pr-1 pl-1 md:p-1">
											<img src="../assets/svg/trash.svg" className="w-5 h-5" />
										</div>
									</div>
								</td>
								<td className="p-2">{product.price}</td>
								<td className="p-2">{product.category}</td>
								<td className="p-2">{product.brand}</td>
								<td className="p-2">{product.name}</td>
								<td className="p-2">
									<div className="flex justify-center items-center">
										<img
											src={product.images[0]}
											className="w-10 h-10 object-cover"
										/>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}

			<div className="flex gap-2">
				<button
					onClick={() => setPage((prev) => prev - 1)}
					className="text-[12px] md:text-[16px] text-[#ffffff] bg-red-700 rounded-md cursor-pointer disabled:opacity-20 hover:opacity-70 p-1 pr-3 pl-3"
					disabled={page === 1}
				>
					قبلی
				</button>
				<div
					dir="rtl"
					className="flex justify-center items-center border rounded-md p-1 pr-3 pl-3"
				>{`${pages} از ${page}`}</div>
				<button
					onClick={() => setPage((prev) => prev + 1)}
					className="text-[12px] md:text-[16px] text-[#ffffff] bg-red-700 rounded-md cursor-pointer disabled:opacity-20 hover:opacity-70 p-1 pr-3 pl-3"
					disabled={page === pages}
				>
					بعدی
				</button>
			</div>
		</div>
	);
}
