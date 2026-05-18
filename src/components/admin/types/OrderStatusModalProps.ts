import { OrderStatus } from "./OrderStatus";

export type OrderStatusModalProps = {
	fullName: string;
	status: OrderStatus;
	updating: boolean;
	onClose: () => void;
	onConfirm: (newStatus: OrderStatus) => void;
};
