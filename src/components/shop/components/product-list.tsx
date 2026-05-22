"use client";

import { Product } from "@/components/admin/types/Product";
import { BASE_URL } from "@/constants/BASE_URL";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductList() {
	const [loading, setLoading] = useState(false);
	const [products, setProducts] = useState<Product[]>([]);
	const router = useRouter();

	useEffect(() => {
		async function getProducts() {
			try {
				setLoading(true);

				const res = await axios.get(`${BASE_URL}/api/products`);

				console.log(res.data.data);

				setProducts(res.data.data);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		}

		getProducts();
	}, []);

	return (
		<div className="w-full md:w-3/4 flex flex-col justify-center items-center gap-10 bg-[#ffffff] rounded-lg p-[16px]">
			<h1 className="font-extrabold text-[24px] text-gray-600">لیست محصولات</h1>
			{loading ? (
				<div className="w-full h-80 flex items-center justify-center">
					<div className="w-8 h-8 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600"></div>
				</div>
			) : (
				<div className="w-full grid grid-cols-1 gap-2 md:grid-cols-3">
					{products.map((product) => (
						<div
							key={product.id}
							className="flex flex-col justify-center items-center gap-4 border border-gray-200 rounded-lg cursor-pointer hover:shadow-2xl p-[16px]"
							onClick={() => router.push(`/products/${product._id}`)}
						>
							<img src={product.images[0]} />
							<h2 className="text-center text-[14px] text-gray-600" dir="rtl">
								{product.title}
							</h2>
							<p dir="rtl">{`${product.price?.toLocaleString("fa-IR")} تومان`}</p>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
