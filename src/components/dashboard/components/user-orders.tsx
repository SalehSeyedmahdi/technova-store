"use client";

import { BASE_URL } from "@/constants/BASE_URL";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const statusMap: Record<string, string> = {
	pending: "در انتظار تایید",
	confirmed: "تایید شده",
	shipping: "در حال ارسال",
	delivered: "تحویل داده شده",
	cancelled: "لغو شده",
};

const getStatusColor = (status: string) => {
	switch (status) {
		case "pending":
			return "bg-yellow-100 text-yellow-700";
		case "confirmed":
			return "bg-blue-100 text-blue-700";
		case "shipping":
			return "bg-purple-100 text-purple-700";
		case "delivered":
			return "bg-green-100 text-green-700";
		case "cancelled":
			return "bg-red-100 text-red-700";
		default:
			return "bg-gray-100 text-gray-700";
	}
};

export default function UserOrders() {
	const [orders, setOrders] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [cookies] = useCookies(["token"]);

	useEffect(() => {
		async function getOrders() {
			try {
				const res = await axios.get(`${BASE_URL}/api/orders`, {
					headers: {
						Authorization: `Bearer ${cookies.token}`,
					},
				});

				setOrders(res.data.data);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		}

		if (cookies.token) getOrders();
	}, [cookies.token]);

	if (loading) {
		return <p className="text-center">در حال دریافت سفارش‌ها...</p>;
	}

	if (orders.length === 0) {
		return <p className="text-center">هنوز سفارشی ثبت نکرده‌اید.</p>;
	}

	return (
		<div className="w-full flex flex-col gap-4" dir="rtl">
			<h1 className="font-bold text-xl text-gray-700">سفارش‌های من</h1>

			{orders.map((order) => (
				<div key={order._id} className="bg-white rounded-xl p-5 shadow-sm">
					<div className="flex justify-between items-center gap-3 mb-4">
						<span
							className={`text-xs md:text-sm rounded-full px-3 py-1 ${getStatusColor(
								order.status,
							)}`}
						>
							{statusMap[order.status] || order.status}
						</span>

						<span className="text-xs text-gray-400">
							{new Date(order.createdAt).toLocaleDateString("fa-IR")}
						</span>
					</div>

					<div className="flex flex-col gap-2 text-sm text-gray-600">
						<p>
							<span className="font-bold text-gray-700">شماره سفارش:</span>{" "}
							{order._id.slice(-8)}
						</p>

						<p>
							<span className="font-bold text-gray-700">روش پرداخت:</span>{" "}
							{order.paymentMethod === "cash"
								? "پرداخت در محل"
								: order.paymentMethod}
						</p>
					</div>

					<div className="border-t mt-4 pt-4 flex flex-col gap-3">
						{order.orderItems?.map((item: any) => (
							<div
								key={item._id}
								className="flex justify-between items-center gap-3"
							>
								<div className="flex items-center gap-3">
									<img
										src={item.image}
										alt={item.name}
										className="w-16 h-16 object-contain rounded-lg"
									/>

									<div className="flex flex-col gap-1">
										<p className="font-bold text-sm text-gray-700">
											{item.name}
										</p>

										<p className="text-xs text-gray-500">
											تعداد: {item.quantity.toLocaleString("fa-IR")}
										</p>

										<p className="text-xs text-gray-500">
											قیمت واحد: {item.price.toLocaleString("fa-IR")} تومان
										</p>
									</div>
								</div>

								<p className="font-bold text-sm text-blue-800">
									{(item.price * item.quantity).toLocaleString("fa-IR")} تومان
								</p>
							</div>
						))}
					</div>

					<div className="border-t mt-4 pt-4 flex justify-between items-center">
						<span className="font-bold text-gray-700">مبلغ کل:</span>

						<span className="font-bold text-blue-800">
							{order.totalPrice.toLocaleString("fa-IR")} تومان
						</span>
					</div>
				</div>
			))}
		</div>
	);
}
