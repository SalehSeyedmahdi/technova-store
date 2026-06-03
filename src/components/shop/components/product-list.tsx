"use client";

import { Product } from "@/components/admin/types/Product";
import { BASE_URL } from "@/constants/BASE_URL";
import axios from "axios";
import { useEffect, useState } from "react";
import { ProductListProps } from "../types/ProductListProps";
import ProductCard from "./product-card";

export default function ProductList({
	category,
	brand,
	sort,
}: ProductListProps) {
	const [loading, setLoading] = useState(false);
	const [products, setProducts] = useState<Product[]>([]);

	useEffect(() => {
		async function getProducts() {
			try {
				setLoading(true);

				const params = new URLSearchParams();

				params.append("limit", "100");

				if (category) params.append("category", category);
				if (brand) params.append("brand", brand);
				if (sort) params.append("sort", sort);

				const queryString = params.toString();

				const res = await axios.get(
					`${BASE_URL}/api/products${queryString ? `?${queryString}` : ""}`,
				);

				setProducts(res.data.data);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		}

		getProducts();
	}, [category, brand, sort]);

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
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			)}
		</div>
	);
}
