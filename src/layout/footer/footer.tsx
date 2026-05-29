import Link from "next/link";

export default function Footer() {
	return (
		<footer
			className="w-full font-[YekanBakh] bg-white shadow-[0_-1px_4px_rgba(0,0,0,0.1)]"
			dir="rtl"
		>
			<div className="max-w-7xl mx-auto px-4 py-8 flex flex-col gap-8">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					<div className="flex flex-col gap-3">
						<img
							src="/assets/images/logo.png"
							alt="تکنوا"
							className="w-36 h-auto"
						/>
						<p className="text-sm text-gray-500 leading-7">
							فروشگاه تخصصی موبایل و لپ‌تاپ با ضمانت اصالت کالا، ارسال سریع و
							پشتیبانی تخصصی.
						</p>
					</div>

					<div className="flex flex-col gap-3">
						<h3 className="font-bold text-gray-700">دسترسی سریع</h3>
						<Link
							href="/"
							className="text-sm text-gray-500 hover:text-blue-700"
						>
							صفحه اصلی
						</Link>
						<Link
							href="/products"
							className="text-sm text-gray-500 hover:text-blue-700"
						>
							محصولات
						</Link>
						<Link
							href="/cart"
							className="text-sm text-gray-500 hover:text-blue-700"
						>
							سبد خرید
						</Link>
						<Link
							href="/dashboard/orders"
							className="text-sm text-gray-500 hover:text-blue-700"
						>
							سفارش‌های من
						</Link>
					</div>

					<div className="flex flex-col gap-3">
						<h3 className="font-bold text-gray-700">دسته‌بندی‌ها</h3>
						<Link
							href="/products?category=smartphone"
							className="text-sm text-gray-500 hover:text-blue-700"
						>
							موبایل
						</Link>
						<Link
							href="/products?category=laptop"
							className="text-sm text-gray-500 hover:text-blue-700"
						>
							لپ‌تاپ
						</Link>
					</div>

					<div className="flex flex-col gap-3">
						<h3 className="font-bold text-gray-700">ارتباط با ما</h3>
						<p className="text-sm text-gray-500">تهران، خیابان ولیعصر</p>
						<p className="text-sm text-gray-500">۰۲۱-۱۲۳۴۵۶۷۸</p>
						<p className="text-sm text-gray-500">support@technova.ir</p>
					</div>
				</div>

				<div className="border-t border-gray-200 pt-4 flex flex-col md:flex-row justify-between items-center gap-3">
					<p className="text-xs text-gray-400">
						© تمامی حقوق این سایت متعلق به تکنوا است.
					</p>

					<div className="flex gap-4 text-xs text-gray-400">
						<span>ضمانت اصالت کالا</span>
						<span>پرداخت امن</span>
						<span>ارسال سریع</span>
					</div>
				</div>
			</div>
		</footer>
	);
}
