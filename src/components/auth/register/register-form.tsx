"use client";

import { BASE_URL } from "@/constants/BASE_URL";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

type FormFields = {
	name: string;
	email: string;
	password: string;
};

export default function RegisterForm() {
	const router = useRouter();
	const [showPassword, setShowPassword] = useState(false);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormFields>();

	const onSubmit: SubmitHandler<FormFields> = async (data) => {
		try {
			console.log(data);
			const res = await axios.post(`${BASE_URL}/api/auth/register`, data);
			console.log(res);
			reset();
			toast.success("ثبت‌نام با موفقیت انجام شد.");
			setTimeout(() => {
				router.push("/login");
			}, 1000);
		} catch (error) {
			console.error(error);
			toast.error("ایمیل وارد شده از قبل وجود دارد.");
		}
	};
	return (
		<form
			className="flex flex-col justify-between items-center gap-10 bg-white rounded-2xl p-8"
			dir="rtl"
			onSubmit={handleSubmit(onSubmit)}
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
			<div className="flex flex-col gap-5">
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
							{...register("name", {
								required: "نام کامل الزامی است",
								pattern: {
									value: /^[آ-ی]{2,}(\s[آ-ی]{2,})+$/,
									message: "نام کامل (فقط حروف فارسی) را وارد کنید",
								},
							})}
							type="text"
							className="text-[14px] border border-gray-400 outline-none rounded-xl p-3 pr-9 pl-9"
							placeholder="نام کامل خود را وارد کنید"
						/>
						{errors.name && (
							<p className="absolute right-2 text-[12px] text-red-600">
								{errors.name.message}
							</p>
						)}
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
							{...register("email", {
								required: "ایمیل الزامی است",
								pattern: {
									value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
									message: "فرمت ایمیل معتبر نیست",
								},
							})}
							type="email"
							dir="ltr"
							className="text-[14px] text-right border border-gray-400 outline-none rounded-xl p-3 pr-9 pl-9"
							placeholder="ایمیل خود را وارد کنید"
						/>
						{errors.email && (
							<p className="absolute right-2 text-[12px] text-red-600">
								{errors.email.message}
							</p>
						)}
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
							onClick={() => setShowPassword((prev) => !prev)}
						/>
						<input
							{...register("password", {
								required: "رمز عبور الزامی است",
								minLength: {
									value: 8,
									message: "رمز عبور باید حداقل 8 کاراکتر باشد",
								},
								pattern: {
									value:
										/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
									message:
										"رمز عبور باید شامل حروف بزرگ، کوچک، عدد و کاراکتر خاص باشد",
								},
							})}
							type={showPassword ? "text" : "password"}
							dir="ltr"
							className="text-[14px] text-right border border-gray-400 outline-none rounded-xl p-3 pr-9 pl-9"
							placeholder="رمز عبور خود را وارد کنید"
						/>
						{errors.password && (
							<p className="absolute right-2 text-[12px] text-red-600">
								{errors.password.message}
							</p>
						)}
					</label>
				</div>
			</div>
			<button
				className="flex justify-center items-center text-white bg-blue-800 hover:opacity-60 cursor-pointer rounded-xl p-3 pr-22.5 pl-22.5"
				type="submit"
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
