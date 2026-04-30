import LoginForm from "./login-form";

export const metadata = {
	title: "احراز هویت | ورود به حساب کاربری",
};

export default function LoginPage() {
	return (
		<div className="w-full h-screen flex flex-col justify-center items-center font-[yekanBakh] bg-[#eaebfc]">
			<LoginForm />
		</div>
	);
}
