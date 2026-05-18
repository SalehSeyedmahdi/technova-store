export type ProductModalProps = {
	productName: string;
	stock: number;
	updating: boolean;
	onClose: () => void;
	onConfirm: (newStock: number) => void;
};
