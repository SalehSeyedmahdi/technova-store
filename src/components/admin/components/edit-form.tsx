"use client";

import { BASE_URL } from "@/constants/BASE_URL";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

type FormFields = {
	name: string;
	brand: string;
	price: number;
	images: string[];
};

type EditFormProps = {
	id: string;
};

export default function EditForm({ id }: EditFormProps) {
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const [cookies] = useCookies(["token"]);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<FormFields>();

	useEffect(() => {
		async function getProduct() {
			try {
				console.log(id);

				const res = await axios.get(`${BASE_URL}/api/products/${id}`);
				const product = res.data.data;
				reset({
					name: product.name,
					brand: product.brand,
					price: product.price,
					images: product.images || [],
				});
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		}
		getProduct();
	}, [id, reset]);

	const onSubmit: SubmitHandler<FormFields> = async (data) => {
		try {
			const payload = {
				name: data.name,
				brand: data.brand,
				price: data.price,
				images: data.images,
			};
			console.log(cookies.token);

			const res = await axios.put(`${BASE_URL}/api/products/${id}`, payload, {
				headers: {
					Authorization: `Bearer ${cookies.token}`,
				},
			});
			console.log(res);

			toast.success("محصول با موفقیت ویرایش شد");
			setTimeout(() => {
				router.replace("/admin/products");
			}, 1000);
		} catch (error) {
			console.error(error);
			toast.error("ویرایش محصول انجام نشد");
		} finally {
			setLoading(false);
		}
	};
	if (loading) {
		return <p className="text-center">در حال دریافت اطلاعات محصول...</p>;
	}

	return (
		<form
			className="flex flex-col justify-between items-center gap-10 bg-[#ffffff] rounded-2xl p-8"
			onSubmit={handleSubmit(onSubmit)}
		>
			<h1 className="font-bold text-[20px]">ویرایش محصول</h1>
			<div className="grid grid-cols-1 gap-6" dir="rtl">
				<label className="relative">
					<input
						{...register("name", { required: "نام محصول الزامی است" })}
						type="text"
						placeholder="نام محصول"
						dir="rtl"
						className="text-[14px] text-right border border-gray-400 outline-none rounded-xl p-3"
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
						dir="rtl"
						className="text-[14px] text-right border border-gray-400 outline-none rounded-xl p-3"
					/>
					{errors.brand && (
						<p className="absolute right-2 text-[12px] text-red-600">
							{errors.brand.message}
						</p>
					)}
				</label>
				<label className="relative">
					<input
						{...register("price", { required: "قیمت الزامی است" })}
						type="text"
						placeholder="قیمت"
						dir="rtl"
						className="text-[14px] text-right border border-gray-400 outline-none rounded-xl p-3"
					/>
					{errors.price && (
						<p className="absolute right-2 text-[12px] text-red-600">
							{errors.price.message}
						</p>
					)}
				</label>
				<label className="relative">
					<input
						{...register("images", { required: "لینک تصویر الزامی است" })}
						type="text"
						placeholder="لینک تصویر"
						dir="rtl"
						className="text-[14px] text-right border border-gray-400 outline-none rounded-xl p-3"
					/>
					{errors.images && (
						<p className="absolute right-2 text-[12px] text-red-600">
							{errors.images.message}
						</p>
					)}
				</label>
			</div>
			<button className="flex justify-center items-center font-bold text-[#ffffff] bg-blue-800 hover:opacity-60 cursor-pointer rounded-xl p-3 pr-17 pl-17">
				ویرایش
			</button>
		</form>
	);
}
