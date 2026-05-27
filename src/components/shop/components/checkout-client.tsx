"use client";

import { BASE_URL } from "@/constants/BASE_URL";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { getCartId } from "../utils/cart-id";

type CheckoutFormFields = {
	fullName: string;
	phone: string;
	province: string;
	city: string;
	address: string;
	postalCode: string;
};

const shippingMethods = [
	{
		id: "express",
		title: "ارسال فوری",
		description: "تحویل سریع سفارش در کوتاه‌ترین زمان",
		price: 0,
	},
	{
		id: "pickup",
		title: "تحویل حضوری",
		description: "دریافت سفارش از فروشگاه",
		price: 0,
	},
];

export default function CheckoutClient() {
	const router = useRouter();
	const [cookies] = useCookies(["token"]);
	const [cart, setCart] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [selectedShippingId, setSelectedShippingId] = useState("express");

	const selectedShipping = useMemo(() => {
		return (
			shippingMethods.find((method) => method.id === selectedShippingId) ||
			shippingMethods[0]
		);
	}, [selectedShippingId]);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<CheckoutFormFields>();

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

	const onSubmit: SubmitHandler<CheckoutFormFields> = async (data) => {
		try {
			await axios.post(
				`${BASE_URL}/api/orders`,
				{
					shippingAddress: {
						name: data.fullName,
						phone: data.phone,
						province: data.province,
						city: data.city,
						address: data.address,
						postalCode: data.postalCode,
					},
					shippingMethod: {
						id: selectedShipping.id,
						title: selectedShipping.title,
						price: 0,
					},
					paymentMethod: "cash",
				},
				{
					headers: {
						Authorization: `Bearer ${cookies.token}`,
					},
				},
			);

			toast.success("سفارش با موفقیت ثبت شد");

			setTimeout(() => {
				router.replace("/dashboard/orders");
			}, 1000);
		} catch (error) {
			console.error(error);
			toast.error("ثبت سفارش انجام نشد");
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
			<div className="w-full bg-white rounded-xl p-6 text-center">
				<p className="text-gray-500">سبد خرید شما خالی است</p>
			</div>
		);
	}

	return (
		<div className="w-full flex flex-col md:flex-row-reverse gap-4">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="w-full md:w-2/3 bg-white rounded-xl p-6 flex flex-col gap-6"
				dir="rtl"
			>
				<div className="flex flex-col gap-4">
					<h1 className="font-bold text-xl text-gray-700">اطلاعات ارسال</h1>

					<label className="flex flex-col gap-1">
						<span className="text-sm text-gray-600">
							نام و نام خانوادگی گیرنده
						</span>
						<input
							{...register("fullName", {
								required: "نام گیرنده الزامی است",
							})}
							className="border border-gray-300 rounded-xl p-3 outline-none"
							placeholder="نام و نام خانوادگی"
						/>
						{errors.fullName && (
							<p className="text-xs text-red-600">{errors.fullName.message}</p>
						)}
					</label>

					<label className="flex flex-col gap-1">
						<span className="text-sm text-gray-600">شماره تماس</span>
						<input
							{...register("phone", {
								required: "شماره تماس الزامی است",
							})}
							className="border border-gray-300 rounded-xl p-3 outline-none"
							placeholder="شماره تماس"
							dir="ltr"
						/>
						{errors.phone && (
							<p className="text-xs text-red-600">{errors.phone.message}</p>
						)}
					</label>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<label className="flex flex-col gap-1">
							<span className="text-sm text-gray-600">استان</span>
							<input
								{...register("province", {
									required: "استان الزامی است",
								})}
								className="border border-gray-300 rounded-xl p-3 outline-none"
								placeholder="استان"
							/>
							{errors.province && (
								<p className="text-xs text-red-600">
									{errors.province.message}
								</p>
							)}
						</label>

						<label className="flex flex-col gap-1">
							<span className="text-sm text-gray-600">شهر</span>
							<input
								{...register("city", {
									required: "شهر الزامی است",
								})}
								className="border border-gray-300 rounded-xl p-3 outline-none"
								placeholder="شهر"
							/>
							{errors.city && (
								<p className="text-xs text-red-600">{errors.city.message}</p>
							)}
						</label>
					</div>

					<label className="flex flex-col gap-1">
						<span className="text-sm text-gray-600">آدرس کامل</span>
						<textarea
							{...register("address", {
								required: "آدرس الزامی است",
							})}
							className="border border-gray-300 rounded-xl p-3 outline-none min-h-32"
							placeholder="خیابان، کوچه، پلاک، واحد"
						/>
						{errors.address && (
							<p className="text-xs text-red-600">{errors.address.message}</p>
						)}
					</label>

					<label className="flex flex-col gap-1">
						<span className="text-sm text-gray-600">کد پستی</span>
						<input
							{...register("postalCode", {
								required: "کد پستی الزامی است",
							})}
							className="border border-gray-300 rounded-xl p-3 outline-none"
							placeholder="کد پستی"
							dir="rtl"
						/>
						{errors.postalCode && (
							<p className="text-xs text-red-600">
								{errors.postalCode.message}
							</p>
						)}
					</label>
				</div>

				<div className="flex flex-col gap-4">
					<h2 className="font-bold text-xl text-gray-700">نحوه ارسال</h2>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
						{shippingMethods.map((method) => (
							<button
								key={method.id}
								type="button"
								onClick={() => setSelectedShippingId(method.id)}
								className={`text-right border rounded-xl p-4 transition cursor-pointer ${
									selectedShippingId === method.id
										? "border-blue-700 bg-blue-50"
										: "border-gray-300 bg-white"
								}`}
							>
								<p className="font-bold text-gray-700">{method.title}</p>
								<p className="text-xs text-gray-500 mt-1">
									{method.description}
								</p>
								<p className="font-bold text-green-600 mt-3">رایگان</p>
							</button>
						))}
					</div>
				</div>

				<button
					type="submit"
					disabled={isSubmitting}
					className="w-full bg-blue-700 text-white rounded-xl p-3 hover:opacity-80 disabled:opacity-50 cursor-pointer"
				>
					{isSubmitting ? "در حال ثبت سفارش..." : "ثبت نهایی سفارش"}
				</button>
			</form>

			<div className="w-full md:w-1/3 bg-white rounded-xl p-6 flex flex-col gap-4 h-fit">
				<h2 className="font-bold text-lg text-gray-700 text-right">
					خلاصه سفارش
				</h2>

				{cart.items.map((item: any) => (
					<div
						key={item._id}
						className="flex justify-between items-center gap-3 border-b pb-3"
						dir="rtl"
					>
						<img
							src={item.product.images[0]}
							className="w-16 h-16 object-contain"
						/>

						<div className="flex-1 text-right">
							<p className="text-sm font-bold">{item.product.name}</p>
							<p className="text-xs text-gray-500">
								تعداد: {item.quantity.toLocaleString("fa-IR")}
							</p>
						</div>

						<p className="text-sm font-bold text-blue-800">
							{(item.price * item.quantity).toLocaleString("fa-IR")}
						</p>
					</div>
				))}

				<div className="flex justify-between items-center pt-3" dir="rtl">
					<span className="text-sm text-gray-600">جمع محصولات:</span>
					<span className="font-bold">
						{cart.totalPrice.toLocaleString("fa-IR")} تومان
					</span>
				</div>

				<div className="flex justify-between items-center" dir="rtl">
					<span className="text-sm text-gray-600">هزینه ارسال:</span>
					<span className="font-bold text-green-600">رایگان</span>
				</div>

				<div
					className="flex justify-between items-center border-t pt-4"
					dir="rtl"
				>
					<span className="font-bold">مبلغ نهایی:</span>
					<span className="font-bold text-blue-800">
						{cart.totalPrice.toLocaleString("fa-IR")} تومان
					</span>
				</div>
			</div>
		</div>
	);
}
