import { OrderStatus } from "./OrderStatus";

export type Order = {
	_id: string;

	shippingAddress?: {
		fullName?: string;
		phone?: string;
		province?: string;
		city?: string;
		address?: string;
		postalCode?: string;
	};

	totalPrice: number;

	createdAt?: string;

	time?: string;

	status: OrderStatus;
};
