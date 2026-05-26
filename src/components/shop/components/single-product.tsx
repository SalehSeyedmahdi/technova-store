"use client";

import { Product } from "@/components/admin/types/Product";
import { BASE_URL } from "@/constants/BASE_URL";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { Swiper as SwiperType } from "swiper";
import { FreeMode, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { SingleProductProps } from "../types/SingleProductProps";
import { getCartId } from "../utils/cart-id";

export default function SingleProduct({ id }: SingleProductProps) {
	const [loading, setLoading] = useState(true);
	const [product, setProduct] = useState<Product | null>(null);
	const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

	const [selectedColor, setSelectedColor] = useState<{
		name: string;
		hex: string;
	} | null>(null);

	const [cartQuantity, setCartQuantity] = useState(0);
	const [cartItemId, setCartItemId] = useState<string | null>(null);

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

	useEffect(() => {
		if (product?.colors?.length) {
			setSelectedColor(product.colors[0]);
		}
	}, [product]);

	useEffect(() => {
		async function checkProductInCart() {
			if (!product || !selectedColor) return;

			try {
				const cartId = getCartId();
				const res = await axios.get(`${BASE_URL}/api/cart?cartId=${cartId}`);

				const cartItem = res.data.data.items.find(
					(item: any) =>
						item.product?._id === product._id &&
						item.color?.hex === selectedColor.hex,
				);

				if (cartItem) {
					setCartQuantity(cartItem.quantity);
					setCartItemId(cartItem._id);
				} else {
					setCartQuantity(0);
					setCartItemId(null);
				}
			} catch (error) {
				console.error(error);
			}
		}

		checkProductInCart();
	}, [product, selectedColor]);

	const handleAddToCart = async () => {
		if (!product) return;

		if (!selectedColor) {
			toast.error("لطفاً رنگ محصول را انتخاب کنید");
			return;
		}

		try {
			const cartId = getCartId();

			const res = await axios.post(`${BASE_URL}/api/cart/add`, {
				cartId,
				productId: product._id,
				quantity: 1,
				color: selectedColor,
			});

			const cartItem = res.data.data.items.find(
				(item: any) =>
					item.product?._id === product._id &&
					item.color?.hex === selectedColor.hex,
			);

			setCartQuantity(cartItem?.quantity || 1);
			setCartItemId(cartItem?._id || null);

			toast.success("محصول به سبد خرید اضافه شد");
		} catch (error) {
			console.error(error);
			toast.error("افزودن محصول به سبد خرید انجام نشد");
		}
	};

	const increaseQuantity = async () => {
		if (!cartItemId || !product) return;

		if (cartQuantity >= product.stock) {
			toast.error("موجودی کافی نیست");
			return;
		}

		try {
			const cartId = getCartId();
			const newQuantity = cartQuantity + 1;

			const res = await axios.put(`${BASE_URL}/api/cart/update/${cartItemId}`, {
				cartId,
				quantity: newQuantity,
			});

			const cartItem = res.data.data.items.find(
				(item: any) => item._id === cartItemId,
			);

			setCartQuantity(cartItem?.quantity || newQuantity);
		} catch (error) {
			console.error(error);
			toast.error("تغییر تعداد انجام نشد");
		}
	};

	const decreaseQuantity = async () => {
		if (!cartItemId) return;

		try {
			const cartId = getCartId();

			if (cartQuantity <= 1) {
				await axios.delete(`${BASE_URL}/api/cart/remove/${cartItemId}`, {
					data: { cartId },
				});

				setCartQuantity(0);
				setCartItemId(null);
				return;
			}

			const newQuantity = cartQuantity - 1;

			const res = await axios.put(`${BASE_URL}/api/cart/update/${cartItemId}`, {
				cartId,
				quantity: newQuantity,
			});

			const cartItem = res.data.data.items.find(
				(item: any) => item._id === cartItemId,
			);

			setCartQuantity(cartItem?.quantity || newQuantity);
		} catch (error) {
			console.error(error);
			toast.error("تغییر تعداد انجام نشد");
		}
	};

	const CartAction = () =>
		cartQuantity === 0 ? (
			<button
				onClick={handleAddToCart}
				disabled={product?.stock === 0}
				className="bg-blue-700 font-bold text-white rounded-lg px-6 py-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
			>
				افزودن به سبد خرید
			</button>
		) : (
			<div className="flex items-center gap-3">
				<button
					onClick={decreaseQuantity}
					className="w-8 h-8 rounded-md bg-gray-100 cursor-pointer"
				>
					-
				</button>

				<span>{cartQuantity.toLocaleString("fa-IR")}</span>

				<button
					onClick={increaseQuantity}
					className="w-8 h-8 rounded-md bg-gray-100 cursor-pointer"
				>
					+
				</button>
			</div>
		);

	return (
		<div className="w-full min-h-screen flex flex-col justify-start items-center bg-white rounded-lg p-4 pb-24 md:pb-4">
			{loading ? (
				<div className="w-full h-80 flex items-center justify-center">
					<div className="w-8 h-8 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600"></div>
				</div>
			) : (
				product && (
					<div className="w-full flex flex-col md:flex-row-reverse justify-center items-center md:items-start gap-6">
						<div className="w-full md:w-2/3 flex flex-col md:flex-row-reverse justify-center items-center md:items-start gap-6">
							<div className="w-full md:w-[420px] flex flex-col gap-4">
								<Swiper
									modules={[Thumbs]}
									thumbs={{
										swiper:
											thumbsSwiper && !thumbsSwiper.destroyed
												? thumbsSwiper
												: null,
									}}
									spaceBetween={16}
									slidesPerView={1}
									className="w-full rounded-xl"
								>
									{product.images?.map((image, index) => (
										<SwiperSlide key={index}>
											<img
												src={image}
												alt={product.name}
												className="w-full h-80 md:h-[420px] object-contain rounded-xl bg-white"
											/>
										</SwiperSlide>
									))}
								</Swiper>

								<Swiper
									modules={[FreeMode, Thumbs]}
									onSwiper={setThumbsSwiper}
									spaceBetween={8}
									slidesPerView={4}
									freeMode
									watchSlidesProgress
									className="w-full"
								>
									{product.images?.map((image, index) => (
										<SwiperSlide key={index}>
											<div className="w-full h-20 border border-gray-200 rounded-lg p-1 cursor-pointer hover:border-blue-600">
												<img
													src={image}
													alt={product.name}
													className="w-full h-full object-contain"
												/>
											</div>
										</SwiperSlide>
									))}
								</Swiper>
							</div>

							<div className="w-full flex flex-col items-end gap-4">
								<h1 className="text-xl md:text-2xl font-bold leading-9 text-right">
									{product.title}
								</h1>

								<div className="flex justify-center items-center gap-2">
									{product.colors?.map((item, index) => (
										<div
											key={index}
											onClick={() => setSelectedColor(item)}
											className={`w-7 h-7 flex justify-center items-center cursor-pointer rounded-full ${
												selectedColor?.hex === item.hex
													? "border-2 border-blue-700"
													: "border border-gray-300"
											}`}
										>
											<div
												className="w-6 h-6 border border-gray-300 rounded-full"
												style={{ backgroundColor: item.hex }}
											></div>
										</div>
									))}
								</div>

								<p className="text-sm text-gray-500 text-right" dir="rtl">
									نام محصول: {product.name}
								</p>

								<p className="text-sm text-gray-500 text-right" dir="rtl">
									برند: {product.brand}
								</p>

								<p className="text-sm text-gray-500 text-right" dir="rtl">
									دسته‌بندی: {product.category}
								</p>

								<p
									className={`text-sm font-bold ${
										product.stock > 0 ? "text-green-600" : "text-red-600"
									}`}
									dir="rtl"
								>
									{product.stock > 0
										? `${product.stock.toLocaleString("fa-IR")} عدد در انبار باقی مانده`
										: "ناموجود"}
								</p>

								<div className="w-full bg-gray-50 rounded-xl p-4">
									<h2 className="font-bold mb-3 text-right" dir="rtl">
										توضیحات محصول
									</h2>
									<p
										className="text-sm leading-8 text-gray-700 text-justify"
										dir="rtl"
									>
										{product.description}
									</p>
								</div>

								<div className="w-full bg-gray-50 rounded-xl p-4">
									<h2 className="font-bold mb-3 text-right" dir="rtl">
										جزئیات محصول
									</h2>

									<div
										className="flex flex-col justify-center items-start gap-2"
										dir="rtl"
									>
										<p className="text-sm text-gray-500">
											حافظه: {product.storageOptions?.[0]}
										</p>
										<p className="text-sm text-gray-500">
											صفحه نمایش: {product.specifications?.display}
										</p>
										<p className="text-sm text-gray-500">
											رم: {product.specifications?.ram}
										</p>
										<p className="text-sm text-gray-500">
											باتری: {product.specifications?.battery}
										</p>
										<p className="text-sm text-gray-500">
											سیستم عامل: {product.specifications?.os}
										</p>
									</div>
								</div>
							</div>

							<div className="md:hidden w-full fixed bottom-0 left-0 right-0 z-40 flex justify-between items-center bg-white shadow-[0_-4px_16px_rgba(0,0,0,0.08)] p-4">
								<p className="font-bold text-blue-800">
									{product.price?.toLocaleString("fa-IR")} تومان
								</p>

								<CartAction />
							</div>
						</div>

						<div className="hidden md:w-[280px] md:flex md:flex-col md:justify-center md:items-center md:gap-4 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)] rounded-lg p-4">
							<p className="font-bold text-xl text-blue-800">
								{product.price?.toLocaleString("fa-IR")} تومان
							</p>

							<CartAction />

							<div
								className="flex flex-col justify-center items-start gap-5 text-[14px] text-gray-600"
								dir="rtl"
							>
								<div className="flex justify-center items-center gap-1">
									<img src="/assets/svg/delivery.svg" className="w-5 h-5" />
									<p>ارسال پستی رایگان</p>
								</div>

								<div className="flex justify-center items-center gap-1">
									<img src="/assets/svg/clock-time.svg" className="w-5 h-5" />
									<p>تحویل فوری</p>
								</div>

								<div className="flex justify-center items-center gap-1">
									<img src="/assets/svg/gift.svg" className="w-5 h-5" />
									<p>بسته بندی ویژه</p>
								</div>

								<div className="flex justify-center items-center gap-1">
									<img src="/assets/svg/verified.svg" className="w-5 h-5" />
									<p>ضمانت اصالت کالا</p>
								</div>
							</div>
						</div>
					</div>
				)
			)}
		</div>
	);
}
