"use client";

import { useRouter } from "next/navigation";

export default function DashboardFooter() {
	const router = useRouter();
	return (
		<footer className="w-full fixed bottom-0 flex justify-center items-center font-[yekanBakh] text-[16px] bg-[#ffffff] shadow-[0_-1px_4px_rgba(0,0,0,0.1)] p-[14px] pl-[14px] pr-[14px]">
			<ol className="flex gap-5 text-gray-700">
				<div
					className="flex justify-center items-cneter gap-1 cursor-pointer hover:text-blue-700"
					onClick={() => router.push("/dashboard/profile")}
				>
					<li className="cursor-pointer hover:text-[#0000ff]">پروفایل</li>
					<img src="/assets/svg/user.svg" className="w-5 h-5 opacity-45" />
				</div>
				<div
					className="flex justify-center items-cneter gap-1 cursor-pointer hover:text-blue-700"
					onClick={() => router.push("/dashboard/addresses")}
				>
					<li className="cursor-pointer hover:text-[#0000ff]">آدرس ها</li>
					<img src="/assets/svg/inventory.svg" className="w-5 h-5" />
				</div>
				<div
					className="flex justify-center items-cneter gap-1 cursor-pointer hover:text-blue-700"
					onClick={() => router.push("/dashboard/orders")}
				>
					<li className="cursor-pointer hover:text-[#0000ff]">سفارش ها</li>
					<img src="/assets/svg/check-box.svg" className="w-5 h-5" />
				</div>
			</ol>
		</footer>
	);
}
