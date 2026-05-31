import EditForm from "../../../../../components/admin/components/edit-form";

export default async function EditProductPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	return (
		<div className="w-full h-screen flex justify-center items-center font-[YekanBakh] bg-[#eaebfc] pt-[4px]">
			<EditForm id={id} />
		</div>
	);
}
