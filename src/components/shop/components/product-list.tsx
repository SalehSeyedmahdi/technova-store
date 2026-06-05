import { Product } from "@/components/admin/types/Product";
import ProductCard from "./product-card";

type ProductListProps = {
	products: Product[];
};

export default function ProductList({ products }: ProductListProps) {
	return (
		<div className="w-full md:w-3/4 flex flex-col justify-center items-center gap-10 bg-white rounded-lg p-[16px]">
			<h1 className="font-extrabold text-[24px] text-gray-600">لیست محصولات</h1>

			{products.length === 0 ? (
				<div className="w-full h-80 flex items-center justify-center">
					<p className="text-gray-500">محصولی یافت نشد.</p>
				</div>
			) : (
				<div className="w-full grid grid-cols-1 gap-2 md:grid-cols-3">
					{products.map((product) => (
						<ProductCard key={product._id} product={product} />
					))}
				</div>
			)}
		</div>
	);
}
