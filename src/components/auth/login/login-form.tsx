"use client";

import { BASE_URL } from "@/constants/BASE_URL";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

type FormFields = {
	email: string;
	password: string;
};

export default function LoginForm() {
	const router = useRouter();
	const [showPassword, setShowPassword] = useState(false);
	const [cookies, setCookies] = useCookies(["token", "refresh_token"]);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormFields>();

	const onSubmit: SubmitHandler<FormFields> = async (data) => {
		try {
			console.log(data);
			const res = await axios.post(`${BASE_URL}/api/auth/login`, data);
			console.log(res.data);
			const token = res.data.token;
			const refresh_token = res.data.refresh_token;
			setCookies("token", token, {
				path: "/",
				maxAge: 60 * 60 * 24 * 7,
				secure: true,
				sameSite: "strict",
			});

			setCookies("refresh_token", refresh_token, {
				path: "/",
				maxAge: 60 * 60 * 24 * 15,
				secure: true,
				sameSite: "strict",
			});
			reset();
			toast.success("ورود با موفقیت انجام شد.");
			setTimeout(() => {
				router.push("/");
			}, 1500);
		} catch (error) {
			console.error(error);
			toast.error("ایمیل یا رمز عبور اشتباه است.");
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
				<p className="text-[12px] text-gray-600">وارد حساب کاربری خود شوید</p>
			</div>
			<div className="flex flex-col gap-5">
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
							className="relative text-[14px] text-right border border-gray-400 outline-none rounded-xl p-3 pr-9 pl-9"
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
				className="flex justify-center items-center text-white bg-blue-800 hover:opacity-60 cursor-pointer rounded-xl p-3 pr-17 pl-17"
				type="submit"
			>
				ورود به حساب
			</button>
			<p className="text-[12px] text-gray-700">
				هنوز عضو نشده اید؟{" "}
				<span
					className="text-blue-700 cursor-pointer hover:border-b hover:border-blue-700"
					onClick={() => router.push("/register")}
				>
					ثبت نام در سایت
				</span>
			</p>
		</form>
	);
}
