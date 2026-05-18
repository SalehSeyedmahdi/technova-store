"use client";

import { useEffect, useState } from "react";
import { OrderStatus } from "../types/OrderStatus";
import { OrderStatusModalProps } from "../types/OrderStatusModalProps";

export default function ChangeOrderStatusModal({
	fullName,
	status,
	updating,
	onClose,
	onConfirm,
}: OrderStatusModalProps) {
	const [statusValue, setStatusValue] = useState(status);

	useEffect(() => {
		setStatusValue(status);
	}, [status]);

	const handleSubmit = () => {
		onConfirm(statusValue);
	};

	return (
		<div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
			<div className="w-[90%] max-w-sm bg-white p-6 rounded-2xl shadow-lg">
				<h2 className="text-lg font-bold mb-2 text-center">
					ویرایش وضعیت سفارش
				</h2>

				<p className="mb-4 text-sm text-gray-600 text-center" dir="rtl">
					وضعیت سفارش را ویرایش کنید.
				</p>

				<label className="relative">
					<select
						value={statusValue}
						onChange={(e) => setStatusValue(e.target.value as OrderStatus)}
						className="w-full text-[14px] text-right border border-gray-400 outline-none rounded-xl p-3"
					>
						<option value="pending">در انتظار تایید</option>
						<option value="confirmed">تایید شده</option>
						<option value="shipping">در حال ارسال</option>
						<option value="delivered">تحویل داده شده</option>
						<option value="cancelled">لغو شده</option>
					</select>
				</label>

				<div className="flex justify-center gap-2 mt-5">
					<button
						type="button"
						onClick={onClose}
						disabled={updating}
						className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:opacity-80 disabled:opacity-50"
					>
						لغو
					</button>

					<button
						type="button"
						onClick={handleSubmit}
						disabled={updating}
						className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:opacity-80 disabled:opacity-50"
					>
						{updating ? "در حال ویرایش..." : "تأیید"}
					</button>
				</div>
			</div>
		</div>
	);
}
