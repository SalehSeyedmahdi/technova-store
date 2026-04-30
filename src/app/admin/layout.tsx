import AdminFooter from "@/layout/admin-footer/admin-footer";
import AdminHeader from "@/layout/admin-header/admin-header";
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
	title: "پنل مدیریت تکنوا",
	description: "مدیریت فروشگاه تکنوا",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="fa"
			className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
		>
			<body className="min-h-full flex flex-col">
				<AdminHeader />
				{children}
				<AdminFooter />
			</body>
		</html>
	);
}
