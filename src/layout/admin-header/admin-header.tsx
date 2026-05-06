"use client";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

export default function AdminHeader() {
	const router = useRouter();
	const [, , removeCookie] = useCookies(["token", "refresh_token", "role"]);
	return (
		<header className="w-full fixed top-0 flex justify-between items-center font-[yekanBakh] text-[20px] bg-[#ffffff] shadow-sm p-[8px] pl-[14px] pr-[14px]">
			<div
				className="w-[40px] h-[40px] p-[8px] bg-[#f0f0f0] hover:opacity-60 rounded-lg cursor-pointer"
				onClick={() => {
					removeCookie("refresh_token", { path: "/" });
					removeCookie("token", { path: "/" });
					removeCookie("role", { path: "/" });
					router.replace("/login");
				}}
			>
				<img src="/assets/svg/logout.svg" className="w-[24px] h-[24px]" />
			</div>
			<h1 className="font-extrabold text-xl md:text-2xl text-blue-800">
				پنل مدیریت فروشگاه
			</h1>
			<div className="w-[40px] h-[40px] p-[8px] bg-[#f0f0f0] hover:opacity-60 rounded-lg cursor-pointer">
				<img
					src="/assets/svg/home.svg"
					className="w-[24px] h-[24px]"
					onClick={() => router.push("/")}
				/>
			</div>
		</header>
	);
}
