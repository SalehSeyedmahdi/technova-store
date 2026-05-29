import CartList from "@/components/shop/components/cart-list";

export default function CartPage() {
	return (
		<div className="w-full h-full flex justify-center items-start gap-5 font-[YekanBakh] text-black bg-[#eaebfc] overflow-y-visible pt-[84px] md:pt-[140px] pb-[112px] p-[20px]">
			<CartList />
		</div>
	);
}
