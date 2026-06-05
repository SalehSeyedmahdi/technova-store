import SingleProduct from "@/components/shop/components/single-product";
import { BASE_URL } from "@/constants/BASE_URL";

export default async function SingleProductPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	const res = await fetch(`${BASE_URL}/api/products/${id}`, {
		cache: "no-store",
	});

	if (!res.ok) {
		throw new Error("Failed to fetch product");
	}

	const data = await res.json();

	const product = data.data;

	return (
		<div className="w-full h-full flex justify-center items-start font-[YekanBakh] bg-[#eaebfc] pt-[84px] md:pt-[140px] pb-[100px] md:pb-[20px] p-[20px]">
			<SingleProduct product={product} />
		</div>
	);
}
