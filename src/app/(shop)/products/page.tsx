import ProductsClient from "@/components/shop/components/product-client";

export default function ProductsPage() {
	return (
		<div className="w-full h-full flex justify-center items-start gap-5 font-[YekanBakh] text-black bg-[#eaebfc] overflow-y-visible pt-[84px] md:pt-[140px] p-[20px]">
			<ProductsClient />
		</div>
	);
}
