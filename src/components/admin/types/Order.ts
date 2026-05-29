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

	orderItems?: {
		_id?: string;
		name: string;
		image: string;
		price: number;
		quantity: number;
	}[];

	shippingMethod?: {
		id?: string;
		title?: string;
		price?: number;
	};

	deliveryDate?: string;

	paymentMethod?: string;

	totalPrice: number;

	createdAt?: string;

	time?: string;

	status: OrderStatus;
};
