export type ProductFilterProps = {
	selectedCategory: string;
	selectedBrand: string;
	selectedSort: string;
	onCategoryChange: (category: string) => void;
	onBrandChange: (brand: string) => void;
	onSortChange: (sort: string) => void;
};
