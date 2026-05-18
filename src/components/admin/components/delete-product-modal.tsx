"use client";

import { DeleteProductModalProps } from "../types/DeleteProductModalProps";

export default function DeleteProductModal({
	productName,
	deleting,
	onClose,
	onConfirm,
}: DeleteProductModalProps) {
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
			<div className="w-[80%] md:w-sm text-center bg-[#ffffff] rounded-2xl p-6">
				<h2 className="font-bold text-lg text-gray-800 mb-3">حذف محصول</h2>
				<p className="text-sm text-gray-600 mb-6">
					آیا از حذف محصول مطمئن هستید؟
				</p>
				<div className="flex justify-center gap-3">
					<button
						type="button"
						onClick={onClose}
						className="text-sm bg-gray-200 rounded-lg cursor-pointer hover:opacity-80 px-4 py-2"
					>
						انصراف
					</button>
					<button
						type="button"
						onClick={onConfirm}
						disabled={deleting}
						className="text-sm text-white bg-red-600 rounded-lg cursor-pointer hover:opacity-80 disabled:opacity-50 px-4 py-2"
					>
						{deleting ? "در حال حذف..." : "حذف"}
					</button>
				</div>
			</div>
		</div>
	);
}
