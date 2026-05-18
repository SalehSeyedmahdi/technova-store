"use client";

import { BASE_URL } from "@/constants/BASE_URL";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import ChangeOrderStatusModal from "./order-status-modal";

type OrderStatus =
	| "pending"
	| "confirmed"
	| "shipping"
	| "delivered"
	| "cancelled";

type Order = {
	_id: string;
	shippingAddress?: {
		fullName?: string;
	};
	fullName?: string;
	totalPrice: number;
	createdAt?: string;
	time?: string;
	status: OrderStatus;
};

export default function OrdersTable() {
	const statusLabels = {
		pending: "در انتظار تایید",
		confirmed: "تایید شده",
		shipping: "در حال ارسال",
		delivered: "تحویل داده شده",
		cancelled: "لغو شده",
	};
	const statusStyles = {
		pending: "text-[#ffffff] bg-yellow-400",
		confirmed: "text-[#ffffff] bg-blue-400",
		shipping: "text-[#ffffff] bg-purple-400",
		delivered: "text-[#ffffff] bg-green-400",
		cancelled: "text-[#ffffff] bg-red-400",
	};
	const [orders, setOrders] = useState<Order[]>([]);
	const [cookies] = useCookies(["token"]);
	const [page, setPage] = useState(1);
	const [pages, setPages] = useState(1);
	const [loading, setLoading] = useState(false);
	const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
	const [changeStatusModalOpen, setChangeStatusModalOpen] = useState(false);
	const [changeStatus, setChangeStatus] = useState(false);

	useEffect(() => {
		async function getOrders() {
			try {
				setLoading(true);
				const res = await axios.get(
					`${BASE_URL}/api/orders/admin/all?page=${page}&limit=5`,
					{
						headers: {
							Authorization: `Bearer ${cookies.token}`,
						},
					},
				);
				console.log(res.data);

				setOrders(res.data.data);
				setPages(res.data.pages);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		}

		getOrders();
	}, [page]);

	const openChangeStatusModal = (order: Order) => {
		setSelectedOrder(order);
		setChangeStatusModalOpen(true);
	};

	const handleChangeStatus = async (newStatus: OrderStatus) => {
		if (!selectedOrder) return;

		try {
			setChangeStatus(true);

			await axios.put(
				`${BASE_URL}/api/orders/${selectedOrder._id}`,
				{
					status: newStatus,
				},
				{
					headers: {
						Authorization: `Bearer ${cookies.token}`,
					},
				},
			);

			setOrders((prev) =>
				prev.map((order) =>
					order._id === selectedOrder._id
						? { ...order, status: newStatus }
						: order,
				),
			);

			toast.success("وضعیت سفارش با موفقیت تغییر کرد");

			setChangeStatusModalOpen(false);
			setSelectedOrder(null);
		} catch (error) {
			console.error(error);
			toast.error("تغییر وضعیت سفارش انجام نشد.");
		} finally {
			setChangeStatus(false);
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
							<td className="border-l p-2">وضعیت سفارش</td>
							<td className="border-l p-2">زمان ثبت سفارش</td>
							<td className="border-l p-2">مجموع مبلغ (تومان)</td>
							<td className="border-l p-2">نام کاربر</td>
						</tr>
					</thead>

					<tbody className="bg-[#ffffff]">
						{orders.map((order) => (
							<tr key={order._id} className="text-[12px] md:text-[14px]">
								<td className="p-2">
									<div className="flex justify-center items-center gap-2">
										<button
											type="button"
											onClick={() => openChangeStatusModal(order)}
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
									<span
										className={`px-1 py-0.5 md:px-2 md:py-1 rounded-md text-[6px] md:text-[12px] ${statusStyles[order.status]}`}
									>
										{statusLabels[order.status] || order.status}
									</span>
								</td>
								<td className="p-2">
									{order.createdAt
										? new Date(order.createdAt).toLocaleDateString("fa-IR")
										: order.time || "-"}
								</td>
								<td className="p-2">
									{order.totalPrice?.toLocaleString("fa-IR")}
								</td>
								<td className="p-2">
									{order.shippingAddress?.fullName || order.fullName || "-"}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}

			<div className="flex gap-2">
				<button
					onClick={() => setPage((prev) => prev - 1)}
					className="text-[12px] md:text-[16px] text-[#ffffff] bg-red-700 rounded-md cursor-pointer disabled:opacity-20 hover:opacity-70 p-1 pr-3 pl-3"
					disabled={page === 1}
				>
					قبلی
				</button>

				<div
					dir="rtl"
					className="flex justify-center items-center border rounded-md p-1 pr-3 pl-3"
				>
					{`${pages} از ${page}`}
				</div>

				<button
					onClick={() => setPage((prev) => prev + 1)}
					className="text-[12px] md:text-[16px] text-[#ffffff] bg-red-700 rounded-md cursor-pointer disabled:opacity-20 hover:opacity-70 p-1 pr-3 pl-3"
					disabled={page === pages}
				>
					بعدی
				</button>
			</div>

			{changeStatusModalOpen && selectedOrder && (
				<ChangeOrderStatusModal
					fullName={
						selectedOrder.shippingAddress?.fullName ||
						selectedOrder.fullName ||
						"-"
					}
					status={selectedOrder.status}
					updating={changeStatus}
					onClose={() => {
						setChangeStatusModalOpen(false);
						setSelectedOrder(null);
					}}
					onConfirm={handleChangeStatus}
				/>
			)}
		</div>
	);
}
