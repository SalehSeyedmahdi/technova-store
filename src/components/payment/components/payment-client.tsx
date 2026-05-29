"use client";

import { BASE_URL } from "@/constants/BASE_URL";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { PaymentFormFields } from "../types/PaymentFormFields";

export default function PaymentClient() {
	const router = useRouter();
	const [cookies] = useCookies(["token"]);
	const [loading, setLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<PaymentFormFields>();

	const onSubmit: SubmitHandler<PaymentFormFields> = async () => {
		try {
			setLoading(true);

			const checkoutData = sessionStorage.getItem("checkoutData");

			if (!checkoutData) {
				toast.error("اطلاعات سفارش یافت نشد");
				router.replace("/checkout");
				return;
			}

			await axios.post(`${BASE_URL}/api/orders`, JSON.parse(checkoutData), {
				headers: {
					Authorization: `Bearer ${cookies.token}`,
				},
			});

			sessionStorage.removeItem("checkoutData");

			toast.success("پرداخت و ثبت سفارش با موفقیت انجام شد");

			setTimeout(() => {
				router.replace("/dashboard/orders");
			}, 1000);
		} catch (error) {
			console.error(error);
			toast.error("پرداخت یا ثبت سفارش انجام نشد");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="w-full flex justify-center items-start" dir="rtl">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden"
			>
				<div className="bg-blue-800 text-white p-4 text-center">
					<h1 className="font-bold text-lg">پرداخت اینترنتی</h1>
					<p className="text-xs mt-1">درگاه پرداخت شاپرک</p>
				</div>

				<div className="p-5 flex flex-col gap-4">
					<div className="flex justify-between items-center bg-gray-50 rounded-xl p-3">
						<span className="text-sm text-gray-500">نام پذیرنده</span>
						<span className="font-bold text-gray-700">فروشگاه تکنوا</span>
					</div>

					<div className="flex flex-col gap-1">
						<label className="text-sm text-gray-600">شماره کارت</label>
						<input
							{...register("cardNumber", {
								required: "شماره کارت الزامی است",
								minLength: {
									value: 16,
									message: "شماره کارت باید ۱۶ رقم باشد",
								},
							})}
							dir="ltr"
							maxLength={19}
							placeholder="---- ---- ---- ----"
							className="border border-gray-300 rounded-xl p-3 outline-none text-center tracking-widest"
						/>
						{errors.cardNumber && (
							<p className="text-xs text-red-600">
								{errors.cardNumber.message}
							</p>
						)}
					</div>

					<div className="grid grid-cols-2 gap-3">
						<div className="flex flex-col gap-1">
							<label className="text-sm text-gray-600">CVV2</label>
							<input
								{...register("cvv2", {
									required: "CVV2 الزامی است",
									minLength: {
										value: 3,
										message: "CVV2 باید حداقل ۳ رقم باشد",
									},
								})}
								dir="ltr"
								maxLength={4}
								placeholder="CVV2"
								className="border border-gray-300 rounded-xl p-3 outline-none text-center"
							/>
							{errors.cvv2 && (
								<p className="text-xs text-red-600">{errors.cvv2.message}</p>
							)}
						</div>

						<div className="flex flex-col gap-1">
							<label className="text-sm text-gray-600">رمز دوم</label>
							<input
								{...register("secondPassword", {
									required: "رمز دوم الزامی است",
								})}
								dir="ltr"
								placeholder="رمز پویا"
								className="border border-gray-300 rounded-xl p-3 outline-none text-center"
							/>
							{errors.secondPassword && (
								<p className="text-xs text-red-600">
									{errors.secondPassword.message}
								</p>
							)}
						</div>
					</div>

					<div className="grid grid-cols-2 gap-3">
						<div className="flex flex-col gap-1">
							<label className="text-sm text-gray-600">ماه</label>
							<input
								{...register("month", {
									required: "ماه الزامی است",
								})}
								dir="ltr"
								maxLength={2}
								placeholder="MM"
								className="border border-gray-300 rounded-xl p-3 outline-none text-center"
							/>
							{errors.month && (
								<p className="text-xs text-red-600">{errors.month.message}</p>
							)}
						</div>

						<div className="flex flex-col gap-1">
							<label className="text-sm text-gray-600">سال</label>
							<input
								{...register("year", {
									required: "سال الزامی است",
								})}
								dir="ltr"
								maxLength={2}
								placeholder="YY"
								className="border border-gray-300 rounded-xl p-3 outline-none text-center"
							/>
							{errors.year && (
								<p className="text-xs text-red-600">{errors.year.message}</p>
							)}
						</div>
					</div>

					<div className="flex flex-col gap-1">
						<label className="text-sm text-gray-600">کد امنیتی</label>
						<div className="flex gap-2">
							<div className="w-28 flex justify-center items-center bg-gray-200 rounded-xl font-bold tracking-widest">
								۴۸۷۲
							</div>
							<input
								{...register("securityCode", {
									required: "کد امنیتی الزامی است",
									validate: (value) =>
										value === "4872" || "کد امنیتی صحیح نیست",
								})}
								dir="ltr"
								placeholder="کد امنیتی"
								className="flex-1 border border-gray-300 rounded-xl p-3 outline-none text-center"
							/>
						</div>
						{errors.securityCode && (
							<p className="text-xs text-red-600">
								{errors.securityCode.message}
							</p>
						)}
					</div>

					<button
						type="submit"
						disabled={loading}
						className="w-full bg-green-600 text-white rounded-xl p-3 hover:opacity-80 disabled:opacity-50 cursor-pointer"
					>
						{loading ? "در حال پرداخت..." : "پرداخت"}
					</button>

					<button
						type="button"
						onClick={() => router.replace("/checkout")}
						disabled={loading}
						className="w-full bg-red-100 text-red-700 rounded-xl p-3 hover:opacity-80 disabled:opacity-50 cursor-pointer"
					>
						انصراف
					</button>
				</div>
			</form>
		</div>
	);
}
