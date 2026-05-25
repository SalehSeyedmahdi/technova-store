"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCookies } from "react-cookie";
import MenuModal from "./menu-modal";

export default function Header() {
	const router = useRouter();
	const [cookies] = useCookies(["role"]);
	const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);

	return (
		<header className="w-full fixed top-0 flex flex-col justify-center items-end gap-[12px] z-99 font-[yekanBakh] text-[20px] bg-[#ffffff] shadow-sm p-[2px] pl-[14px] pr-[14px]">
			<div className="w-full flex justify-between items-center">
				<img
					src="/assets/svg/user.svg"
					className="w-[22px] h-[22px] cursor-pointer md:hidden"
					onClick={() => {
						if (!cookies.role) {
							router.push("/login");
						} else if (cookies.role === "admin") {
							router.push("/admin");
						} else {
							router.push("/dashboard");
						}
					}}
				/>
				<div className="hidden md:flex md:justify-center md:items-center md:gap-[12px]">
					<div
						className="p-[8px] bg-[#f0f0f0] hover:opacity-60 rounded-lg cursor-pointer"
						onClick={() => router.push("/cart")}
					>
						<img src="/assets/svg/cart.svg" className="w-[22px] h-[22px]" />
					</div>
					<div
						className="p-[8px] bg-[#f0f0f0] hover:opacity-60 rounded-lg cursor-pointer"
						onClick={() => {
							if (!cookies.role) {
								router.push("/login");
							} else if (cookies.role === "admin") {
								router.push("/admin");
							} else {
								router.push("/dashboard");
							}
						}}
					>
						<img src="/assets/svg/user.svg" className="w-[22px] h-[22px]" />
					</div>
				</div>
				<div className="hidden md:flex md:justify-center md:items-center md:gap-5">
					<label className="relative">
						<img
							src="/assets/svg/search.svg"
							className="w-[18px] h-[18px] absolute right-5 top-3"
						/>
						<input
							dir="rtl"
							type="text"
							placeholder="جستجو"
							className="w-100 text-[#a1a3a8] text-[14px] bg-[#f0f0f1] outline-none rounded-3xl p-3 pr-[50px]"
						/>
					</label>
					<img
						src="/assets/images/logo.png"
						alt="لوگو"
						className="w-[150px] h-[75px] cursor-pointer"
						onClick={() => router.push("/")}
					/>
				</div>
				<img
					src="/assets/images/logo.png"
					alt="لوگو"
					className="w-[120px] h-[60px] cursor-pointer md:hidden"
					onClick={() => router.push("/")}
				/>
				<img
					src="/assets/svg/menu.svg"
					className="w-[22px] h-[22px] cursor-pointer md:hidden"
					onClick={() => setIsMenuModalOpen(true)}
				/>
			</div>
			<ol className="hidden md:flex md:justify-center md:items-center md:gap-4 lg:gap-[24px] md:text-[14px] md:text-gray-500 md:pr-5 pb-2">
				<div
					className="flex justify-center items-center gap-1 cursor-pointer hover:text-blue-700"
					onClick={() => router.push("/contact-us")}
				>
					<li>تماس با ما</li>
					<img src="/assets/svg/phone.svg" className="w-4 h-4" />
				</div>
				<div
					className="flex justify-center items-center gap-1 cursor-pointer hover:text-blue-700"
					onClick={() => router.push("/about-us")}
				>
					<li>درباره ما</li>
					<img src="/assets/svg/info.svg" className="w-4 h-4" />
				</div>
				<div
					className="flex justify-center items-center gap-1 cursor-pointer hover:text-blue-700"
					onClick={() => router.push("/products?category=laptop")}
				>
					<li>لپ تاپ</li>
					<img src="/assets/svg/laptop.svg" className="w-4 h-4" />
				</div>
				<div
					className="flex justify-center items-center gap-1 cursor-pointer hover:text-blue-700"
					onClick={() => router.push("/products?category=smartphone")}
				>
					<li>موبایل</li>
					<img src="/assets/svg/mobile.svg" className="w-4 h-4" />
				</div>
				<div
					className="flex justify-center items-center gap-1 cursor-pointer hover:text-blue-700"
					onClick={() => router.push("/products")}
				>
					<li>محصولات</li>
					<img src="/assets/svg/products.svg" className="w-4 h-4" />
				</div>
			</ol>
			{isMenuModalOpen && (
				<MenuModal
					onClose={() => {
						setIsMenuModalOpen(false);
					}}
				/>
			)}
		</header>
	);
}
