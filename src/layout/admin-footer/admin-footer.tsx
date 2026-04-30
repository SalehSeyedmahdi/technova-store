export default function AdminFooter() {
	return (
		<footer className="w-full fixed bottom-0 flex justify-center items-center font-[yekanBakh] text-[16px] bg-[#f0f0f0] inset-shadow-sm p-[14px] pl-[14px] pr-[14px]">
			<ol className="flex gap-5">
				<li className="cursor-pointer hover:text-[#0000ff]">سفارش ها</li>
				<li className="cursor-pointer hover:text-[#0000ff]">موجودی</li>
				<li className="cursor-pointer hover:text-[#0000ff]">محصولات</li>
			</ol>
		</footer>
	);
}
