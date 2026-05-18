import { OrderStatus } from "./OrderStatus";

export type Order = {
	_id: string;
	shippingAddress?: {
		fullName?: string;
	};
	fullName?: string;
	totalPrice: number;
	createdAt?: string;
	time?: string;
	status: OrderStatus;
};
