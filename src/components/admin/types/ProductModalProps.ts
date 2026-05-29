export type ProductModalProps = {
	productName: string;
	stock: number;
	price: number;
	updating: boolean;
	onClose: () => void;
	onConfirm: (data: { stock: number; price: number }) => void;
};
