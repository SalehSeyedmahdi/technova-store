export default function AdminFooter() {
	return (
		<footer className="w-full fixed bottom-0 flex justify-center items-center font-[yekanBakh] text-[16px] bg-gray-600 p-[12px] pl-[14px] pr-[14px]">
			<ol className="flex gap-5">
				<li className="cursor-pointer hover:text-blue-700 hover:border-b-2 hover:rounded-sm">
					سفارش ها
				</li>
				<li className="cursor-pointer hover:text-blue-700 hover:border-b-2 hover:rounded-sm">
					موجودی
				</li>
				<li className="cursor-pointer hover:text-blue-700 hover:border-b-2 hover:rounded-sm">
					محصولات
				</li>
			</ol>
		</footer>
	);
}
