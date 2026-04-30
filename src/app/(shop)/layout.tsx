import Header from "@/layout/header/header";
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
	title: "تکنوا | فروشگاه محصولات دیجیتال",
	description:
		"فروشگاه اینترنتی تکنوا برای خرید موبایل، لپ‌تاپ و لوازم جانبی دیجیتال",
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
				<Header />
				{children}
			</body>
		</html>
	);
}
