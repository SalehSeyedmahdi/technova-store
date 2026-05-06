"use client";

import { Bounce, ToastContainer } from "react-toastify";

export default function ToastProvider() {
	return (
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
	);
}
