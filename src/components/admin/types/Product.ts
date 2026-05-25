export type Product = {
	_id: string;
	id: string;
	title: string;
	name: string;
	brand: string;
	price: number;
	category: string;
	description: string;
	stock: number;
	colors: { name: string; hex: string }[];
	specifications: { display: string; ram: string; battery: string; os: string };
	storageOptions: string[];
	images: string[];
};
