"use client";

import { useRouter } from "next/navigation";

type MenuModalProps = {
	onClose: () => void;
};

export default function MenuModal({ onClose }: MenuModalProps) {
	const router = useRouter();
	return (
		<div
			className="fixed inset-0 z-50 flex justify-end bg-black/40"
			onClick={onClose}
		>
			<div
				className="w-[75%] h-screen relative flex flex-col justify-start items-end gap-4 bg-[#ffffff] p-4"
				onClick={(e) => e.stopPropagation()}
			>
				<img
					src="/assets/images/logo.png"
					alt="لوگو"
					className="w-60 h-30 cursor-pointer"
					onClick={() => {
						onClose();
						router.push("/");
					}}
				/>
				<img
					src="/assets/svg/close.svg"
					className="w-5 h-5 absolute top-2 left-2 cursor-pointer hover:opacity-70"
					onClick={onClose}
				/>
				<label className="w-full relative">
					<img
						src="/assets/svg/search.svg"
						className="w-[18px] h-[18px] absolute right-5 top-3"
					/>
					<input
						dir="rtl"
						type="text"
						placeholder="جستجو"
						className="w-full text-[#a1a3a8] text-[14px] bg-[#f0f0f1] outline-none rounded-3xl p-3 pr-[50px]"
					/>
				</label>
				<ol className="w-full flex flex-col justify-center items-end gap-4 text-[16px] text-gray-500 pr-5 pb-2">
					<div
						className="flex justify-center items-cneter gap-1 cursor-pointer hover:text-blue-700"
						onClick={() => {
							onClose();
							router.push("/");
						}}
					>
						<li>خانه</li>
						<img src="/assets/svg/home-menu.svg" className="w-5 h-5" />
					</div>
					<hr className="w-full border-t border-gray-300" />
					<div
						className="flex justify-center items-center gap-1 cursor-pointer hover:text-blue-700"
						onClick={() => {
							onClose();
							router.push("/products");
						}}
					>
						<li>محصولات</li>
						<img src="/assets/svg/products.svg" className="w-5 h-5" />
					</div>
					<hr className="w-full border-t border-gray-300" />
					<div
						className="flex justify-center items-center gap-1 cursor-pointer hover:text-blue-700"
						onClick={() => {
							onClose();
							router.push("/products");
						}}
					>
						<li>موبایل</li>
						<img src="/assets/svg/mobile.svg" className="w-5 h-5" />
					</div>
					<hr className="w-full border-t border-gray-300" />
					<div
						className="flex justify-center items-center gap-1 cursor-pointer hover:text-blue-700"
						onClick={() => {
							onClose();
							router.push("/products");
						}}
					>
						<li>لپ تاپ</li>
						<img src="/assets/svg/laptop.svg" className="w-5 h-5" />
					</div>
					<hr className="w-full border-t border-gray-300" />
					<div
						className="flex justify-center items-center gap-1 cursor-pointer hover:text-blue-700"
						onClick={() => {
							onClose();
							router.push("/about-us");
						}}
					>
						<li>درباره ما</li>
						<img src="/assets/svg/info.svg" className="w-5 h-5" />
					</div>
					<hr className="w-full border-t border-gray-300" />
					<div
						className="flex justify-center items-center gap-1 cursor-pointer hover:text-blue-700"
						onClick={() => {
							onClose();
							router.push("/contact-us");
						}}
					>
						<li>تماس با ما</li>
						<img src="/assets/svg/phone.svg" className="w-5 h-5" />
					</div>
				</ol>
			</div>
		</div>
	);
}
