import { Product } from "@/components/admin/types/Product";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }: { product: Product }) {
	const router = useRouter();
	return (
		<div
			className="flex flex-col justify-center items-center gap-4 border border-gray-200 rounded-lg cursor-pointer hover:shadow-2xl p-[16px]"
			onClick={() => router.push(`/products/${product._id}`)}
		>
			<img src={product.images[0]} alt={product.name} />
			<h2 className="text-center text-[14px] text-gray-600" dir="rtl">
				{product.title}
			</h2>
			<p dir="rtl">{`${product.price?.toLocaleString("fa-IR")} تومان`}</p>
		</div>
	);
}
