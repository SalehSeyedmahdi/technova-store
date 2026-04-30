"use client";

import { useRouter } from "next/navigation";

export default function RegisterForm() {
	const router = useRouter();
	return (
		<form
			className="flex flex-col justify-between items-center gap-10 bg-white rounded-2xl p-8"
			dir="rtl"
		>
			<div className="flex flex-col justify-center items-center">
				<img
					src="/assets/images/logo.png"
					className="w-[180px] h-[90px] cursor-pointer"
					onClick={() => router.push("/")}
				/>
				<p className="text-[10px] text-gray-600">
					اطلاعات خود را برای ثبت نام وارد کنید
				</p>
			</div>
			<div className="flex flex-col gap-4">
				<div className="flex flex-col justify-center items-start gap-1">
					<label className="text-[14px] text-gray-700">
						نام و نام خانوادگی
					</label>
					<label className="relative">
						<img
							src="assets/svg/user-input.svg"
							className="w-5 h-5 absolute right-2 top-3"
						/>
						<input
							type="email"
							className="text-[14px] border border-gray-400 outline-none rounded-xl p-3 pr-9 pl-9"
							placeholder="نام کامل خود را وارد کنید"
						/>
					</label>
				</div>
				<div className="flex flex-col justify-center items-start gap-1">
					<label className="text-[14px] text-gray-700">ایمیل</label>
					<label className="relative">
						<img
							src="assets/svg/user-input.svg"
							className="w-5 h-5 absolute right-2 top-3"
						/>
						<input
							type="email"
							className="text-[14px] border border-gray-400 outline-none rounded-xl p-3 pr-9 pl-9"
							placeholder="ایمیل خود را وارد کنید"
						/>
					</label>
				</div>
				<div className="flex flex-col justify-center items-start gap-1">
					<label className="text-[14px] text-gray-700">رمز عبور</label>
					<label className="relative">
						<img
							src="assets/svg/lock.svg"
							className="w-5 h-5 absolute right-2 top-3"
						/>
						<img
							src="assets/svg/show.svg"
							className="w-5.5 h-5.5 absolute top-3 left-2 hover:opacity-60 cursor-pointer"
						/>
						<input
							type="password"
							className="text-[14px] border border-gray-400 outline-none rounded-xl p-3 pr-9 pl-9"
							placeholder="رمز عبور خود را وارد کنید"
						/>
					</label>
				</div>
			</div>
			<button
				className="flex justify-center items-center text-white bg-blue-800 hover:opacity-60 cursor-pointer rounded-xl p-3 pr-22.5 pl-22.5"
				type="button"
			>
				ثبت نام
			</button>
			<p className="text-[12px] text-gray-700">
				قبلاً عضو شده اید؟{" "}
				<span
					className="text-blue-700 cursor-pointer hover:border-b hover:border-blue-700"
					onClick={() => router.push("/login")}
				>
					ورود به حساب کاربری
				</span>
			</p>
		</form>
	);
}
