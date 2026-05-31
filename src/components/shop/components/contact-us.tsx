export default function ContactUs() {
	return (
		<div
			className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10"
			dir="rtl"
		>
			<h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
				تماس با تکنوا
			</h1>

			<div className="space-y-6 text-gray-700 leading-9 text-justify">
				<p>
					اگر در زمینه محصولات، ثبت سفارش پیگیری خرید یا خدمات پس از فروش سوالی
					دارید، تیم پشتیبانی ما آماده پاسخگویی به شما است. شما می‌توانید از
					طریق شماره تماس یا سایر راه‌های ارتباطی درج‌شده در این صفحه با ما در
					ارتباط باشید. رضایت و اعتماد شما بزرگ‌ترین سرمایه ماست و همواره از
					دریافت نظرات، پیشنهادات و انتقادات ارزشمندتان استقبال می‌کنیم.
				</p>
			</div>

			<div className="mt-12 border-t border-gray-500 pt-8">
				<h2 className="text-2xl font-bold text-gray-800 mb-5">دفتر مرکزی</h2>

				<p className="text-gray-700 leading-9 text-justify">
					آدرس ساختمان مرکزی تکنوا: تهران، خیابان ولیعصر
				</p>
			</div>

			<div className="mt-12 border-t border-gray-500 pt-8">
				<h2 className="text-2xl font-bold text-gray-800 mb-5">
					خدمات پس از فروش
				</h2>

				<p className="text-gray-700 leading-9 text-justify">
					کلیه بسته‌های ارسالی و محصولاتی که قرار است از خدمات پس از فروش
					استفاده کنند را صرفا به صندوق پستی ارسال فرمایید.
				</p>
				<p className="text-gray-700 leading-9 text-justify">
					تهران - صندوق پستی: ۱۲۳۴۵۶۷۸
				</p>
			</div>

			<div className="mt-12 border-t border-gray-500 pt-8">
				<h2 className="text-2xl font-bold text-gray-800 mb-5">اطلاعات تماس</h2>

				<div className="space-y-3 text-gray-700">
					<p>
						<span className="font-bold text-left">تلفن پشتیبانی:</span>{" "}
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
