"use client";

import { BASE_URL } from "@/constants/BASE_URL";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

type FormFields = {
	name: string;
	brand: string;
	price: number;
	category: string;
	stock: number;
	description: string;
	images: FileList;
};

export default function AddForm() {
	const router = useRouter();
	const [cookies] = useCookies(["token"]);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<FormFields>();

	const onSubmit: SubmitHandler<FormFields> = async (data) => {
		try {
			const formData = new FormData();

			formData.append("name", data.name);
			formData.append("brand", data.brand);
			formData.append("price", String(data.price));
			formData.append("category", data.category);
			formData.append("stock", String(data.stock));
			formData.append("description", data.description);
			formData.append("isActive", "true");

			Array.from(data.images).forEach((file) => {
				formData.append("images", file);
			});

			await axios.post(`${BASE_URL}/api/products`, formData, {
				headers: {
					Authorization: `Bearer ${cookies.token}`,
				},
			});

			toast.success("محصول با موفقیت اضافه شد");
			reset();

			setTimeout(() => {
				router.replace("/admin/products");
			}, 1000);
		} catch (error) {
			console.error(error);
			toast.error("اضافه کردن محصول انجام نشد");
		}
	};

	return (
		<form
			className="flex flex-col justify-between items-center gap-6 bg-[#ffffff] rounded-2xl p-8"
			onSubmit={handleSubmit(onSubmit)}
			dir="rtl"
		>
			<h1 className="font-bold text-[20px]">اضافه کردن محصول</h1>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<label className="relative">
					<input
						{...register("name", { required: "نام محصول الزامی است" })}
						type="text"
						placeholder="نام محصول"
						className="w-full text-[14px] text-right border border-gray-400 outline-none rounded-xl p-3"
					/>
					{errors.name && (
						<p className="absolute right-2 text-[12px] text-red-600">
							{errors.name.message}
						</p>
					)}
				</label>

				<label className="relative">
					<input
						{...register("brand", { required: "برند الزامی است" })}
						type="text"
						placeholder="برند"
						className="w-full text-[14px] text-right border border-gray-400 outline-none rounded-xl p-3"
					/>
					{errors.brand && (
						<p className="absolute right-2 text-[12px] text-red-600">
							{errors.brand.message}
						</p>
					)}
				</label>

				<label className="relative">
					<input
						{...register("price", {
							required: "قیمت الزامی است",
							valueAsNumber: true,
						})}
						type="number"
						placeholder="قیمت"
						className="w-full text-[14px] text-right border border-gray-400 outline-none rounded-xl p-3"
					/>
					{errors.price && (
						<p className="absolute right-2 text-[12px] text-red-600">
							{errors.price.message}
						</p>
					)}
				</label>

				<label className="relative">
					<select
						{...register("category", {
							required: "دسته بندی الزامی است",
							validate: (value) => value !== "" || "دسته بندی الزامی است",
						})}
						defaultValue=""
						className="w-full text-[14px] text-right border border-gray-400 outline-none rounded-xl p-3"
					>
						<option value="" disabled>
							دسته بندی
						</option>
						<option value="smartphone">Smartphone</option>
						<option value="laptop">Laptop</option>
					</select>
					{errors.category && (
						<p className="absolute right-2 text-[12px] text-red-600">
							{errors.category.message}
						</p>
					)}
				</label>

				<label className="relative">
					<input
						{...register("stock", {
							required: "موجودی الزامی است",
							valueAsNumber: true,
						})}
						type="number"
						placeholder="موجودی"
						className="w-full text-[14px] text-right border border-gray-400 outline-none rounded-xl p-3"
					/>
					{errors.stock && (
						<p className="absolute right-2 text-[12px] text-red-600">
							{errors.stock.message}
						</p>
					)}
				</label>

				<label className="relative">
					<input
						{...register("images", { required: "تصویر الزامی است" })}
						type="file"
						multiple
						accept="image/*"
						className="w-full text-[14px] border border-gray-400 outline-none rounded-xl p-3"
					/>
					{errors.images && (
						<p className="absolute right-2 text-[12px] text-red-600">
							{errors.images.message}
						</p>
					)}
				</label>

				<label className="relative md:col-span-2">
					<textarea
						{...register("description", { required: "توضیحات الزامی است" })}
						placeholder="توضیحات"
						className="w-full min-h-24 text-[14px] text-right border border-gray-400 outline-none rounded-xl p-3"
					/>
					{errors.description && (
						<p className="absolute right-2 text-[12px] text-red-600">
							{errors.description.message}
						</p>
					)}
				</label>
			</div>

			<button
				type="submit"
				disabled={isSubmitting}
				className="w-full flex justify-center items-center font-bold text-[#ffffff] bg-blue-800 hover:opacity-60 disabled:opacity-50 cursor-pointer rounded-xl p-3"
			>
				{isSubmitting ? "در حال اضافه کردن..." : "اضافه کردن"}
			</button>
		</form>
	);
}
