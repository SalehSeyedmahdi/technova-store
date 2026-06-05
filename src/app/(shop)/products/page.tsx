import ProductsClient from "@/components/shop/components/product-client";
import ProductList from "@/components/shop/components/product-list";
import { BASE_URL } from "@/constants/BASE_URL";

type ProductsPageProps = {
	searchParams: Promise<{
		category?: string;
		brand?: string;
		sort?: string;
	}>;
};

export default async function ProductsPage({
	searchParams,
}: ProductsPageProps) {
	const paramsFromUrl = await searchParams;

	const params = new URLSearchParams();

	params.append("limit", "100");

	if (paramsFromUrl.category) {
		params.append("category", paramsFromUrl.category);
	}

	if (paramsFromUrl.brand) {
		params.append("brand", paramsFromUrl.brand);
	}

	if (paramsFromUrl.sort) {
		params.append("sort", paramsFromUrl.sort);
	}

	const res = await fetch(`${BASE_URL}/api/products?${params.toString()}`, {
		cache: "no-store",
	});

	const data = await res.json();

	const products = data.data || [];

	return (
		<div className="w-full h-full flex justify-center items-start gap-5 font-[YekanBakh] text-black bg-[#eaebfc] overflow-y-visible pt-[84px] md:pt-[140px] p-[20px]">
			<ProductList products={products} />
			<ProductsClient
				category={paramsFromUrl.category || ""}
				brand={paramsFromUrl.brand || ""}
				sort={paramsFromUrl.sort || ""}
			/>
		</div>
	);
}
