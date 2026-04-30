import RegisterForm from "./register-form";

export const metadata = {
	title: "احراز هویت | ثبت نام",
};

export default function RegisterPage() {
	return (
		<div className="w-full h-screen flex flex-col justify-center items-center font-[yekanBakh] bg-[#eaebfc]">
			<RegisterForm />
		</div>
	);
}
