import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { ToastContainer } from "react-toastify";
import { Bounce } from "react-toastify/unstyled";
import "./globals.css";

const yekanBakh = localFont({
	src: [
		{
			path: "../../public/assets/fonts/YekanBakh-Regular.woff",
			weight: "400",
			style: "normal",
		},
	],
	variable: "--font-YekanBakh",
});

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "TechNova | فروشگاه محصولات دیجیتال",
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
			className={`${geistSans.variable} ${geistMono.variable} ${yekanBakh.variable} h-full antialiased`}
		>
			<body className="min-h-full flex flex-col">
				{children}
				<ToastContainer
					position="top-right"
					autoClose={3000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick={false}
					rtl
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="colored"
					transition={Bounce}
					className="font-[YekanBakh] font-bold text-[14px]"
				/>
			</body>
		</html>
	);
}
