"use client";

import FilterItem from "@/components/shop/components/filter-item";

type ProductsClientProps = {
	category: string;
	brand: string;
	sort: string;
};

export default function ProductsClient({
	category,
	brand,
	sort,
}: ProductsClientProps) {
	return (
		<FilterItem
			selectedCategory={category}
			selectedBrand={brand}
			selectedSort={sort}
		/>
	);
}
