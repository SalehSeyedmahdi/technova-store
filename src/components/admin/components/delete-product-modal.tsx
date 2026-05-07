"use client";

type DeleteProductModalProps = {
	productName: string;
	deleting: boolean;
	onClose: () => void;
	onConfirm: () => void;
};

export default function DeleteProductModal({
	productName,
	deleting,
	onClose,
	onConfirm,
}: DeleteProductModalProps) {
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
			<div className="w-[90%] max-w-sm rounded-2xl bg-white p-4 text-center shadow-lg">
				<h2 className="mb-3 text-lg font-bold text-gray-800">حذف محصول</h2>

				<p className="mb-6 text-sm text-gray-600">
					آیا از حذف محصول مطمئن هستید؟
				</p>

				<div className="flex justify-center gap-3">
					<button
						type="button"
						onClick={onClose}
						className="rounded-lg bg-gray-200 px-4 py-2 text-sm cursor-pointer hover:opacity-80"
					>
						انصراف
					</button>

					<button
						type="button"
						onClick={onConfirm}
						disabled={deleting}
						className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white cursor-pointer hover:opacity-80 disabled:opacity-50"
					>
						{deleting ? "در حال حذف..." : "حذف"}
					</button>
				</div>
			</div>
		</div>
	);
}
