"use client";

import { Product } from "@/components/admin/types/Product";
import { BASE_URL } from "@/constants/BASE_URL";
import axios from "axios";
import { useEffect, useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type SingleProductProps = {
	id: string;
};

export default function SingleProduct({ id }: SingleProductProps) {
	const [loading, setLoading] = useState(true);
	const [product, setProduct] = useState<Product | null>(null);

	useEffect(() => {
		async function getProduct() {
			try {
				const res = await axios.get(`${BASE_URL}/api/products/${id}`);

				setProduct(res.data.data);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		}

		getProduct();
	}, [id]);

	return (
		<div className="w-full min-h-screen flex flex-col justify-start items-center bg-white rounded-lg p-4">
			{loading ? (
				<div className="w-full h-80 flex items-center justify-center">
					<div className="w-8 h-8 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600"></div>
				</div>
			) : (
				product && (
					<div className="w-full flex flex-col md:flex-row-reverse justify-center items-center md:items-start gap-4">
						<div className="w-full md:w-2/3 flex flex-col md:flex-row-reverse justify-center items-center md:items-start gap-">
							<Swiper
								modules={[Navigation, Pagination]}
								navigation
								pagination={{ clickable: true }}
								spaceBetween={16}
								slidesPerView={1}
								className="w-full rounded-xl"
							>
								{product.images.map((image, index) => (
									<SwiperSlide key={index}>
										<img
											src={image}
											alt={product.name}
											className="w-full h-80 object-contain rounded-xl bg-white"
										/>
									</SwiperSlide>
								))}
							</Swiper>
							<h1 className="text-2xl text-center font-bold mt-4">
								{product.title}
							</h1>
							<div className="md:hidden w-full fixed bottom-0 left-0 right-0 flex justify-between items-center bg-[#ffffff] p-[16px]">
								<p>{product.price?.toLocaleString("fa-IR")} تومان</p>
								<button className="flex justify-center items-center text-[14px] text-[#ffffff] bg-blue-700 hover:opacity-80 rounded-lg cursor-pointer px-6 py-3">
									افزودن به سبد خرید
								</button>
							</div>
						</div>
						<div className="hidden md:w-full md:flex md:flex-col md:justify-center md:items-center md:gap-4 md:bg-[#ffffff] shadow-[0_4px_24px_rgba(0,0,0,0.08)] rounded-lg md:p-[16px]">
							<p>{product.price?.toLocaleString("fa-IR")} تومان</p>
							<button className="flex justify-center items-center text-[14px] text-[#ffffff] bg-blue-700 hover:opacity-80 rounded-lg cursor-pointer px-6 py-3">
								افزودن به سبد خرید
							</button>
						</div>
					</div>
				)
			)}
		</div>
	);
}
