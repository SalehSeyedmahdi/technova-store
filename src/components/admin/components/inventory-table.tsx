"use client";

import { BASE_URL } from "@/constants/BASE_URL";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { Product } from "../types/Product";
import ChangeInventoryModal from "./change-inventory-modal";

export default function InventoryTable() {
	const [products, setProducts] = useState<Product[]>([]);
	const [cookies] = useCookies(["token"]);
	const [page, setPage] = useState(1);
	const [pages, setPages] = useState(1);
	const [loading, setLoading] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
	const [changeInventoryModalOpen, setChangeInventoryModalOpen] =
		useState(false);
	const [changeInventory, setChangeInventory] = useState(false);

	useEffect(() => {
		async function getProducts() {
			try {
				setLoading(true);

				const res = await axios.get(
					`${BASE_URL}/api/products?page=${page}&limit=5`,
				);

				setProducts(res.data.data);
				setPages(res.data.pages);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		}

		getProducts();
	}, [page]);

	const openChangeInventoryModal = (product: Product) => {
		setSelectedProduct(product);
		setChangeInventoryModalOpen(true);
	};

	const handleChangeInventory = async (data: {
		stock: number;
		price: number;
	}) => {
		if (!selectedProduct) return;

		try {
			setChangeInventory(true);

			await axios.put(
				`${BASE_URL}/api/products/${selectedProduct._id}`,
				{
					stock: data.stock,
					price: data.price,
				},
				{
					headers: {
						Authorization: `Bearer ${cookies.token}`,
					},
				},
			);

			setProducts((prev) =>
				prev.map((product) =>
					product._id === selectedProduct._id
						? {
								...product,
								stock: data.stock,
								price: data.price,
							}
						: product,
				),
			);

			toast.success("موجودی و قیمت با موفقیت ویرایش شد");

			setChangeInventoryModalOpen(false);
			setSelectedProduct(null);
		} catch (error) {
			console.error(error);
			toast.error("ویرایش موجودی و قیمت با خطا مواجه شد");
		} finally {
			setChangeInventory(false);
		}
	};

	return (
		<div className="w-full flex flex-col justify-start items-center gap-2 pr-2 pl-2">
			{loading ? (
				<div className="w-full h-80 flex items-center justify-center">
					<div className="w-8 h-8 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600"></div>
				</div>
			) : (
				<table className="w-full border-collapse text-center">
					<thead className="bg-[#193cb8] text-[12px] md:text-[16px] text-white">
						<tr>
							<td className="p-2">عملیات</td>
							<td className="border-l p-2">موجودی</td>
							<td className="border-l p-2">قیمت</td>
							<td className="border-l p-2">برند</td>
							<td className="border-l p-2">نام محصول</td>
							<td className="border-l p-2">تصویر</td>
						</tr>
					</thead>

					<tbody className="bg-white">
						{products.map((product) => (
							<tr key={product._id} className="text-[12px] md:text-[14px]">
								<td className="p-2">
									<div className="flex justify-center items-center gap-2">
										<button
											type="button"
											onClick={() => openChangeInventoryModal(product)}
											className="bg-blue-500 cursor-pointer hover:opacity-60 rounded-md p-0.5 md:p-1"
										>
											<img
												src="../assets/svg/edit.svg"
												className="w-4 md:w-5 h-4 md:h-5"
											/>
										</button>
									</div>
								</td>

								<td className="p-2">
									{product.stock?.toLocaleString("fa-IR")}
								</td>

								<td className="p-2">
									{product.price?.toLocaleString("fa-IR")}
								</td>

								<td className="p-2">{product.brand}</td>

								<td className="p-2">{product.name}</td>

								<td className="p-2">
									<div className="flex justify-center items-center">
										<img
											src={product.images[0]}
											alt={product.name}
											className="w-10 h-10 object-cover"
										/>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}

			<div className="flex gap-2">
				<button
					onClick={() => setPage((prev) => prev - 1)}
					className="text-[12px] md:text-[16px] text-white bg-red-700 rounded-md cursor-pointer disabled:opacity-20 hover:opacity-70 p-1 pr-3 pl-3"
					disabled={page === 1}
				>
					قبلی
				</button>

				<div
					dir="rtl"
					className="flex justify-center items-center border rounded-md p-1 pr-3 pl-3"
				>
					{`${pages.toLocaleString("fa-IR")} از ${page.toLocaleString(
						"fa-IR",
					)}`}
				</div>

				<button
					onClick={() => setPage((prev) => prev + 1)}
					className="text-[12px] md:text-[16px] text-white bg-red-700 rounded-md cursor-pointer disabled:opacity-20 hover:opacity-70 p-1 pr-3 pl-3"
					disabled={page === pages}
				>
					بعدی
				</button>
			</div>

			{changeInventoryModalOpen && selectedProduct && (
				<ChangeInventoryModal
					productName={selectedProduct.name}
					stock={selectedProduct.stock}
					price={selectedProduct.price}
					updating={changeInventory}
					onClose={() => {
						setChangeInventoryModalOpen(false);
						setSelectedProduct(null);
					}}
					onConfirm={handleChangeInventory}
				/>
			)}
		</div>
	);
}
