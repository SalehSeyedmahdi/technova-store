export default function AboutUs() {
	return (
		<div
			className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10"
			dir="rtl"
		>
			<h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
				درباره تکنوا
			</h1>

			<div className="space-y-6 text-gray-700 leading-9 text-justify">
				<p>
					فروشگاه اینترنتی <span className="font-bold">تکنوا</span> با هدف فراهم
					کردن بستری مطمئن برای خرید آنلاین موبایل و لپ‌تاپ راه‌اندازی شده است.
					ما تلاش می‌کنیم جدیدترین محصولات بازار را با اطلاعات کامل، قیمت مناسب
					و تجربه خریدی آسان در اختیار مشتریان قرار دهیم.
				</p>

				<p>
					در تکنوا اعتقاد داریم که خرید کالاهای دیجیتال باید شفاف، ساده و قابل
					اعتماد باشد. به همین دلیل تمامی محصولات موجود در فروشگاه با مشخصات فنی
					کامل، تصاویر باکیفیت و اطلاعات دقیق ارائه می‌شوند تا کاربران بتوانند
					با اطمینان بیشتری تصمیم‌گیری کنند.
				</p>

				<p>
					تمرکز اصلی ما بر عرضه انواع گوشی‌های موبایل و لپ‌تاپ از برندهای معتبر
					جهانی است. همواره تلاش می‌کنیم محصولات جدید و به‌روز را در سریع‌ترین
					زمان ممکن در اختیار کاربران قرار دهیم.
				</p>
			</div>

			<div className="mt-12 border-t border-gray-500 pt-8">
				<h2 className="text-2xl font-bold text-gray-800 mb-5">ماموریت ما</h2>

				<p className="text-gray-700 leading-9 text-justify">
					ماموریت ما در تکنوا ارائه تجربه‌ای مدرن و قابل اعتماد از خرید آنلاین
					محصولات دیجیتال است. ما تلاش می‌کنیم با ارائه اطلاعات دقیق، تنوع مناسب
					محصولات و بهبود مستمر خدمات، رضایت کاربران را جلب کنیم و به یکی از
					انتخاب‌های اصلی خریداران حوزه فناوری تبدیل شویم.
				</p>
			</div>

			<div className="mt-12 border-t border-gray-500 pt-8">
				<h2 className="text-2xl font-bold text-gray-800 mb-5">اطلاعات تماس</h2>

				<div className="space-y-3 text-gray-700">
					<p>
						<span className="font-bold">فروشگاه:</span> تکنوا
					</p>

					<p>
						<span className="font-bold">تلفن پشتیبانی:</span>{" "}
						<span dir="ltr">۰۲۱-۱۲۳۴۵۶۷۸</span>
					</p>

					<p>
						<span className="font-bold">ایمیل:</span> info@technova.ir
					</p>

					<p>
						<span className="font-bold">ساعات پاسخگویی:</span> شنبه تا پنجشنبه
						از ساعت ۹ تا ۱۸
					</p>
				</div>
			</div>
		</div>
	);
}
