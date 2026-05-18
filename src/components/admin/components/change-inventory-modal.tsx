"use client";

import { useEffect, useState } from "react";
import { ProductModalProps } from "../types/ProductModalProps";

export default function ChangeInventoryModal({
	productName,
	stock,
	updating,
	onClose,
	onConfirm,
}: ProductModalProps) {
	const [stockValue, setStockValue] = useState(stock);

	useEffect(() => {
		setStockValue(stock);
	}, [stock]);

	const handleSubmit = () => {
		if (stockValue < 0) return;
		onConfirm(stockValue);
	};

	return (
		<div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
			<div className="w-[90%] max-w-sm bg-white p-6 rounded-2xl shadow-lg">
				<h2 className="text-lg font-bold mb-2 text-center">
					ویرایش موجودی محصول
				</h2>

				<p className="mb-4 text-sm text-gray-600 text-center" dir="rtl">
					موجودی محصول را ویرایش کنید.
				</p>

				<input
					type="number"
					min={0}
					value={stockValue}
					onChange={(e) => setStockValue(Number(e.target.value))}
					className="w-full border border-gray-300 rounded-xl p-3 text-center outline-none focus:border-blue-600"
				/>

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
						disabled={updating || stockValue < 0}
						className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:opacity-80 disabled:opacity-50"
					>
						{updating ? "در حال ویرایش..." : "تأیید"}
					</button>
				</div>
			</div>
		</div>
	);
}
