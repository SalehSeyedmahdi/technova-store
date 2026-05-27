import DashboardFooter from "@/layout/dashboard-footer/dashboard-footer";
import DashboardHeader from "@/layout/dashboard-header/dashboard-header";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "حساب کاربری",
	description: "مدیریت حساب کاربری، سفارش‌ها و اطلاعات شخصی در تکنوا",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<DashboardHeader />
			{children}
			<DashboardFooter />
		</>
	);
}
