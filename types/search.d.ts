export type SearchParams = {
	content : string;
	method : "fuzzy" | "exact"
	country : "all" | "cn" | "us" | "eu";
	categoryId : "all" | string;
}