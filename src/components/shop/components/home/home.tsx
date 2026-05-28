"use client";

import { useRouter } from "next/navigation";

export default function Home() {
	const router = useRouter();

	return (
		<div className="w-full flex flex-col gap-8" dir="rtl">
			{/* Hero Section */}
			<section className="w-full bg-gradient-to-l from-blue-900 to-blue-700 rounded-3xl overflow-hidden">
				<div className="flex flex-col-reverse md:flex-row justify-between items-center p-6 md:p-12 gap-8">
					<div className="flex flex-col gap-5 text-white text-center md:text-right">
						<h1 className="text-3xl md:text-5xl font-extrabold leading-[60px]">
							مرجع تخصصی خرید
							<br />
							موبایل و لپ‌تاپ
						</h1>

						<p className="text-blue-100 text-sm md:text-base leading-8 max-w-xl">
							جدیدترین گوشی‌های موبایل و لپ‌تاپ‌های حرفه‌ای را با بهترین قیمت،
							ضمانت اصالت و ارسال سریع خریداری کنید.
						</p>

						<div className="flex flex-col md:flex-row gap-3 justify-center md:justify-start">
							<button
								onClick={() => router.push("/products?category=mobile")}
								className="bg-white text-blue-800 rounded-xl px-6 py-3 font-bold hover:opacity-80 cursor-pointer"
							>
								مشاهده موبایل‌ها
							</button>

							<button
								onClick={() => router.push("/products?category=laptop")}
								className="bg-blue-500 text-white rounded-xl px-6 py-3 font-bold hover:opacity-80 cursor-pointer"
							>
								مشاهده لپ‌تاپ‌ها
							</button>
						</div>
					</div>
				</div>
			</section>

			{/* Categories */}
			<section className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<button
					onClick={() => router.push("/products?category=mobile")}
					className="bg-white rounded-2xl p-6 flex justify-between items-center hover:shadow-lg transition cursor-pointer"
				>
					<div className="text-right">
						<h2 className="text-2xl font-extrabold text-gray-800">
							گوشی موبایل
						</h2>

						<p className="text-sm text-gray-500 mt-2">
							اپل، سامسونگ، شیائومی و ...
						</p>
					</div>

					<img
						src="https://dkstatics-public.digikala.com/digikala-products/26aa21dc59b10010c1a338d0266f532d67148711_1758351224.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90"
						className="w-28 h-28 object-contain rounded-2xl"
					/>
				</button>

				<button
					onClick={() => router.push("/products?category=laptop")}
					className="bg-white rounded-2xl p-6 flex justify-between items-center hover:shadow-lg transition cursor-pointer"
				>
					<div className="text-right">
						<h2 className="text-2xl font-extrabold text-gray-800">لپ‌تاپ</h2>

						<p className="text-sm text-gray-500 mt-2">
							ایسوس، لنوو، اپل، اچ پی و ...
						</p>
					</div>

					<img
						src="https://dkstatics-public.digikala.com/digikala-products/dae5618f3f702e1954d1a4a2ee65e03f82db0f2b_1777811267.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90"
						className="w-28 h-28 object-contain rounded-2xl"
					/>
				</button>
			</section>

			{/* Features */}
			<section className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div className="bg-white rounded-2xl p-6 text-center">
					<h3 className="font-bold text-gray-800">ارسال سریع</h3>

					<p className="text-sm text-gray-500 mt-2 leading-7">
						ارسال فوری سفارشات به سراسر کشور
					</p>
				</div>

				<div className="bg-white rounded-2xl p-6 text-center">
					<h3 className="font-bold text-gray-800">ضمانت اصالت</h3>

					<p className="text-sm text-gray-500 mt-2 leading-7">
						تمام کالاها با ضمانت اصالت ارائه می‌شوند
					</p>
				</div>

				<div className="bg-white rounded-2xl p-6 text-center">
					<h3 className="font-bold text-gray-800">پشتیبانی تخصصی</h3>

					<p className="text-sm text-gray-500 mt-2 leading-7">
						مشاوره تخصصی خرید موبایل و لپ‌تاپ
					</p>
				</div>
			</section>

			{/* Laptop Banner */}
			<section className="bg-black rounded-3xl overflow-hidden">
				<div className="flex flex-col md:flex-row justify-between items-center p-8 md:p-12 gap-8">
					<div className="text-white text-center md:text-right">
						<h2 className="text-3xl md:text-4xl font-extrabold">
							لپ‌تاپ‌های حرفه‌ای
						</h2>

						<p className="text-gray-300 mt-4 leading-8">
							مناسب برنامه‌نویسی، طراحی، گیمینگ و کارهای حرفه‌ای
						</p>

						<button
							onClick={() => router.push("/products?category=laptop")}
							className="bg-white text-black rounded-xl px-6 py-3 mt-6 font-bold hover:opacity-80 cursor-pointer"
						>
							مشاهده لپ‌تاپ‌ها
						</button>
					</div>

					<img
						src="https://cdn.fararu.com/thumbnail/YTFmYjIfVrED/fCohl8MdDeqLuUiNxwx9X4gYrgKL9XBZBWdbZWUJQbHweEbOeibJ3lKhwCXPcymMenByfMSSpsbh46ioIqLjxbHMRm21_h7HQpcPeRTlTup9Fg2BIMEOf3jclM_4J6zeNSYMgfXaohuWBQ42JrDEQXKnTAO_9NQ3/YTFmYjIfVrED.jpg"
						className="w-64 md:w-96 object-contain rounded-2xl"
					/>
				</div>
			</section>
		</div>
	);
}
