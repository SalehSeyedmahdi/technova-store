export default function NotFound() {
	return (
		<div className="w-full h-screen flex justify-center items-center text-[20px] bg-[#c2deef]">
			<div className="flex justify-center items-center relative bg-[#ffffff] rounded-xl p-10 pr-15 pl-15">
				<div className="w-full h-3/30 absolute top-0 bg-blue-700 rounded-t-xl"></div>
				<div className="flex flex-col justify-center items-center">
					<h1 className="font-bold text-[120px]">404</h1>
					<h2 className="font-bold font-[YekanBakh] text-[24px]">
						صفحه مورد نظر یافت نشد
					</h2>
				</div>
			</div>
		</div>
	);
}
