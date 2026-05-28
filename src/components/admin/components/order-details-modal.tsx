import { Order } from "../types/Order";

const statusLabels: Record<string, string> = {
	pending: "در انتظار تایید",
	confirmed: "تایید شده",
	shipping: "در حال ارسال",
	delivered: "تحویل داده شده",
	cancelled: "لغو شده",
};

export default function OrderDetailsModal({
	order,
	onClose,
}: {
	order: Order;
	onClose: () => void;
}) {
	return (
		<div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
			<div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl p-6">
				<div className="flex justify-between items-center mb-6" dir="rtl">
					<h2 className="font-bold text-xl text-gray-700">جزئیات سفارش</h2>

					<button
						type="button"
						onClick={onClose}
						className="text-red-600 font-bold cursor-pointer"
					>
						بستن
					</button>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4" dir="rtl">
					<div className="bg-gray-50 rounded-xl p-4">
						<h3 className="font-bold mb-3 text-gray-700">اطلاعات مشتری</h3>
						<p>نام: {order.shippingAddress?.fullName || "-"}</p>
						<p>شماره تماس: {order.shippingAddress?.phone || "-"}</p>
						<p>استان: {order.shippingAddress?.province || "-"}</p>
						<p>شهر: {order.shippingAddress?.city || "-"}</p>
						<p>کد پستی: {order.shippingAddress?.postalCode || "-"}</p>
					</div>

					<div className="bg-gray-50 rounded-xl p-4">
						<h3 className="font-bold mb-3 text-gray-700">اطلاعات سفارش</h3>
						<p>وضعیت: {statusLabels[order.status] || order.status}</p>
						<p>
							تاریخ ثبت:{" "}
							{order.createdAt
								? new Date(order.createdAt).toLocaleDateString("fa-IR")
								: "-"}
						</p>
						<p>مبلغ کل: {order.totalPrice?.toLocaleString("fa-IR")} تومان</p>
					</div>

					<div className="md:col-span-2 bg-gray-50 rounded-xl p-4">
						<h3 className="font-bold mb-3 text-gray-700">آدرس کامل</h3>
						<p>{order.shippingAddress?.address || "-"}</p>
					</div>

					<div className="md:col-span-2 bg-gray-50 rounded-xl p-4">
						<h3 className="font-bold mb-3 text-gray-700">محصولات سفارش</h3>

						<div className="flex flex-col gap-3">
							{order.orderItems?.map((item: any) => (
								<div
									key={item._id}
									className="flex justify-between items-center gap-3 border-b pb-3"
								>
									<div className="flex items-center gap-3">
										<img
											src={item.image}
											alt={item.name}
											className="w-16 h-16 object-contain rounded-lg"
										/>

										<div>
											<p className="font-bold text-sm">{item.name}</p>
											<p className="text-xs text-gray-500">
												تعداد: {item.quantity?.toLocaleString("fa-IR")}
											</p>
											<p className="text-xs text-gray-500">
												قیمت واحد: {item.price?.toLocaleString("fa-IR")} تومان
											</p>
										</div>
									</div>

									<p className="font-bold text-blue-800 text-sm">
										{(item.price * item.quantity).toLocaleString("fa-IR")} تومان
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
