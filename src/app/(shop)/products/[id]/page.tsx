import SingleProduct from "@/components/shop/components/single-product";

export default async function SingleProductPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	return (
		<div className="w-full h-full flex justify-center items-start font-[YekanBakh] bg-[#eaebfc] pt-[84px] md:pt-[140px] pb-[100px] md:pb-[20px] p-[20px]">
			<SingleProduct id={id} />
		</div>
	);
}
