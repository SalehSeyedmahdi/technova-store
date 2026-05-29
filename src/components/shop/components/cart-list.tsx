"use client";

import { BASE_URL } from "@/constants/BASE_URL";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getCartId } from "../utils/cart-id";

export default function CartList() {
	const [cart, setCart] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [updatingItemId, setUpdatingItemId] = useState<string | null>(null);
	const router = useRouter();

	useEffect(() => {
		async function getCart() {
			try {
				const cartId = getCartId();
				const res = await axios.get(`${BASE_URL}/api/cart?cartId=${cartId}`);

				setCart(res.data.data);
			} catch (error) {
				console.error(error);
				toast.error("خطا در دریافت سبد خرید");
			} finally {
				setLoading(false);
			}
		}

		getCart();
	}, []);

	const increaseQuantity = async (item: any) => {
		try {
			setUpdatingItemId(item._id);

			const cartId = getCartId();

			if (item.quantity >= item.product.stock) {
				toast.error("موجودی کافی نیست");
				return;
			}

			const res = await axios.put(`${BASE_URL}/api/cart/update/${item._id}`, {
				cartId,
				quantity: item.quantity + 1,
			});

			setCart(res.data.data);
		} catch (error) {
			console.error(error);
			toast.error("افزایش تعداد انجام نشد");
		} finally {
			setUpdatingItemId(null);
		}
	};

	const decreaseQuantity = async (item: any) => {
		try {
			setUpdatingItemId(item._id);

			const cartId = getCartId();

			if (item.quantity <= 1) {
				const res = await axios.delete(
					`${BASE_URL}/api/cart/remove/${item._id}`,
					{
						data: { cartId },
					},
				);

				setCart(res.data.data);
				return;
			}

			const res = await axios.put(`${BASE_URL}/api/cart/update/${item._id}`, {
				cartId,
				quantity: item.quantity - 1,
			});

			setCart(res.data.data);
		} catch (error) {
			console.error(error);
			toast.error("کاهش تعداد انجام نشد");
		} finally {
			setUpdatingItemId(null);
		}
	};

	if (loading) {
		return (
			<div className="w-full h-80 flex items-center justify-center">
				<div className="w-8 h-8 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600"></div>
			</div>
		);
	}

	if (!cart || cart.items.length === 0) {
		return (
			<div className="w-full min-h-80 flex items-center justify-center bg-white rounded-xl">
				<p className="text-gray-500">سبد خرید شما خالی است</p>
			</div>
		);
	}

	return (
		<div className="w-full flex flex-col gap-4" dir="rtl">
			{cart.items.map((item: any) => (
				<div
					key={item._id}
					className="w-full flex flex-col md:flex-row justify-between items-center gap-4 bg-white rounded-xl p-4"
				>
					<div className="w-full md:w-auto flex items-center gap-4">
						<img
							src={item.product.images[0]}
							alt={item.product.name}
							className="w-24 h-24 object-contain"
						/>

						<div className="flex flex-col gap-2 text-right">
							<h2 className="font-bold text-gray-700">{item.product.name}</h2>

							<p className="text-sm text-gray-500">
								قیمت: {item.price.toLocaleString("fa-IR")} تومان
							</p>

							{item.color?.hex && (
								<div className="flex items-center gap-2 text-sm text-gray-500">
									<span>رنگ:</span>
									<span
										className="w-5 h-5 rounded-full border"
										style={{ backgroundColor: item.color.hex }}
									></span>
									{item.color?.name && <span>{item.color.name}</span>}
								</div>
							)}
						</div>
					</div>

					<div className="flex items-center gap-3">
						<button
							type="button"
							onClick={() => decreaseQuantity(item)}
							disabled={updatingItemId === item._id}
							className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-100 hover:bg-gray-200 cursor-pointer disabled:opacity-50"
						>
							-
						</button>

						<span className="min-w-6 text-center font-bold">
							{item.quantity.toLocaleString("fa-IR")}
						</span>

						<button
							type="button"
							onClick={() => increaseQuantity(item)}
							disabled={updatingItemId === item._id}
							className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-100 hover:bg-gray-200 cursor-pointer disabled:opacity-50"
						>
							+
						</button>
					</div>

					<div className="font-bold text-blue-800">
						{(item.price * item.quantity).toLocaleString("fa-IR")} تومان
					</div>
				</div>
			))}

			<div className="w-full flex flex-row-reverse justify-between items-center rounded-xl bg-white px-8 py-6">
				<button
					className="text-[12px] md:text-[15px] text-[#ffffff] rounded-md bg-blue-600 hover:bg-blue-700 cursor-pointer px-3 py-2 md:px-6 md:py-3"
					onClick={() => router.push("/checkout")}
				>
					تایید و تکمیل سفارش
				</button>
				<div className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2">
					<span className="font-bold text-[12px] md:text-[15px] text-gray-500">
						جمع کل:
					</span>
					<span className="font-bold text-[15px] md:text-[18px] text-blue-800">
						{cart.totalPrice.toLocaleString("fa-IR")} تومان
					</span>
				</div>
			</div>
		</div>
	);
}
