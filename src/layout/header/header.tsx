export default function Header() {
	return (
		<header className="w-full fixed top-0 flex justify-between items-center font-[Hamishe] text-[20px] bg-[#ffffff] shadow-sm p-[2px] pl-[14px] pr-[14px]">
			<img
				src="/assets/svg/user.svg"
				className="w-[23px] h-[23px] cursor-pointer md:hidden"
			/>
			<div className="hidden md:flex md:justify-center md:items-center md:gap-[16px]">
				<div className="w-[40px] h-[40px] p-[8px] bg-[#f0f0f0] hover:opacity-60 rounded-lg cursor-pointer">
					<img src="/assets/svg/user.svg" className="w-[24px] h-[24px]" />
				</div>
				<div className="w-[40px] h-[40px] p-[8px] bg-[#f0f0f0] hover:opacity-60 rounded-lg cursor-pointer">
					<img src="/assets/svg/cart.svg" className="w-[24px] h-[24px]" />
				</div>
				<div className="w-[40px] h-[40px] p-[8px] bg-[#f0f0f0] hover:opacity-60 rounded-lg cursor-pointer">
					<img src="/assets/svg/search.svg" className="w-[24px] h-[24px]" />
				</div>
			</div>
			<ol className="hidden md:flex md:justify-center md:items-center md:gap-4 lg:gap-10 md:text-gray-600">
				<li className="cursor-pointer hover:text-blue-700 hover:border-b-2 hover:rounded-sm">
					درباره ما
				</li>
				<li className="cursor-pointer hover:text-blue-700 hover:border-b-2 hover:rounded-sm">
					لپ تاپ
				</li>
				<li className="cursor-pointer hover:text-blue-700 hover:border-b-2 hover:rounded-sm">
					موبایل
				</li>
				<li className="cursor-pointer hover:text-blue-700 hover:border-b-2 hover:rounded-sm">
					محصولات
				</li>
			</ol>
			<div className="hidden md:flex md:justify-center md:items-center md:gap-5">
				<img
					src="/assets/images/logo.png"
					alt="لوگو"
					className="w-[140px] h-[70px] cursor-pointer"
				/>
			</div>
			<img
				src="/assets/images/logo.png"
				alt="لوگو"
				className="w-[110px] h-[55px] md:hidden"
			/>
			<img src="/assets/svg/menu.svg" className="w-[24px] h-[24px] md:hidden" />
		</header>
	);
}
