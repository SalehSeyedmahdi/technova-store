"use client";

import { useRouter } from "next/navigation";

export default function AdminFooter() {
	const router = useRouter();
	return (
		<footer className="w-full fixed bottom-0 flex justify-center items-center font-[yekanBakh] text-[16px] bg-[#ffffff] shadow-[0_-1px_4px_rgba(0,0,0,0.1)] p-[14px] pl-[14px] pr-[14px]">
			<ol className="flex gap-5 text-gray-700">
				<li
					className="cursor-pointer hover:text-[#0000ff]"
					onClick={() => router.push("/admin/orders")}
				>
					سفارش ها
				</li>
				<li
					className="cursor-pointer hover:text-[#0000ff]"
					onClick={() => router.push("/admin/inventory")}
				>
					موجودی
				</li>
				<li
					className="cursor-pointer hover:text-[#0000ff]"
					onClick={() => router.push("/admin/products")}
				>
					محصولات
				</li>
			</ol>
		</footer>
	);
}
