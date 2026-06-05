import { Product } from "@/components/admin/types/Product";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
	return (
		<Link
			href={`/products/${product._id}`}
			className="flex flex-col justify-center items-center gap-4 border border-gray-200 rounded-lg cursor-pointer hover:shadow-2xl p-[16px]"
		>
			<img src={product.images?.[0]} alt={product.name} />

			<h2 className="text-center text-[14px] text-gray-600" dir="rtl">
				{product.title}
			</h2>

			<p dir="rtl">{product.price?.toLocaleString("fa-IR")} تومان</p>
		</Link>
	);
}
