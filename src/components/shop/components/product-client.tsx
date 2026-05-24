"use client";

import FilterItem from "@/components/shop/components/filter-item";
import ProductList from "@/components/shop/components/product-list";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductsClient() {
	const searchParams = useSearchParams();
	const categoryFromUrl = searchParams.get("category") || "";
	const [category, setCategory] = useState("");
	const [brand, setBrand] = useState("");
	const [sort, setSort] = useState("");

	useEffect(() => {
		setCategory(categoryFromUrl);
	}, [categoryFromUrl]);

	return (
		<>
			<ProductList category={category} brand={brand} sort={sort} />
			<FilterItem
				selectedCategory={category}
				selectedBrand={brand}
				selectedSort={sort}
				onCategoryChange={setCategory}
				onBrandChange={setBrand}
				onSortChange={setSort}
			/>
		</>
	);
}
