/**
 * Filters data based on search terms and specified fields.
 * @param {Array<Object>} data - The data to be filtered.
 * @param {string} search - The search term.
 * @param {boolean} exactMatch - Whether to use exact match or partial match.
 * @param {string} searchWithin - Fields to search within (comma-separated list).
 * @returns {Array<Object>} The filtered data.
 */
export const filterBySearch = (data, search, exactMatch, searchWithin) => {
	if (!search) return data;

	const searchLower = search.toLowerCase();
	let fieldsToSearch = [];

	// Define fields to search in
	if (searchWithin === "all" || !searchWithin) {
		fieldsToSearch = [
			"couplet_hindi",
			"couplet_english",
			"translation_hindi",
			"translation_english",
			"explanation_hindi",
			"explanation_english",
		];
	} else {
		const searchWithinArray = searchWithin.split(",").map((field) => field.trim().toLowerCase());
		if (searchWithinArray.includes("couplet")) {
			fieldsToSearch.push("couplet_hindi", "couplet_english");
		}
		if (searchWithinArray.includes("translation")) {
			fieldsToSearch.push("translation_hindi", "translation_english");
		}
		if (searchWithinArray.includes("explanation")) {
			fieldsToSearch.push("explanation_hindi", "explanation_english");
		}
	}

	return exactMatch
		? data.filter((post) => fieldsToSearch.some((field) => post[field]?.toLowerCase() === searchLower))
		: data.filter((post) =>
				fieldsToSearch.some((field) =>
					searchLower.split(" ").every((term) => post[field]?.toLowerCase().includes(term))
				)
			);
};

/**
 * Filters data based on tags.
 * @param {Array<Object>} data - The data to be filtered.
 * @param {string} tags - Comma-separated list of tags to filter by.
 * @returns {Array<Object>} The filtered data.
 */
export const filterByTags = (data, tags) => {
	if (!tags) return data;

	const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());
	return data.filter((post) => post.tags.some((tag) => tagsArray.includes(tag.slug.toLowerCase())));
};

/**
 * Filters data based on popularity status.
 * @param {Array<Object>} data - The data to be filtered.
 * @param {boolean} popular - Whether to filter by popularity status.
 * @returns {Array<Object>} The filtered data.
 */
export const filterByPopularity = (data, popular) => {
	if (popular === false) return data;
	return data.filter((post) => post.popular === popular);
};

/**
 * Sorts data based on the specified field and order.
 * @param {Array<Object>} data - The data to be sorted.
 * @param {string} orderBy - The field to sort by (in lowercase).
 * @param {string} order - The sort order ("ASC" or "DESC", in uppercase).
 * @returns {Array<Object>} The sorted data.
 */
export const sortData = (data, orderBy, order) => {
	// Normalize orderBy to lowercase and order to uppercase
	const normalizedOrderBy = orderBy.toLowerCase();
	const normalizedOrder = order.toUpperCase();

	return data.sort((a, b) => {
		if (normalizedOrderBy === "random") {
			return Math.random() - 0.5;
		}

		if (normalizedOrderBy === "couplet_english") {
			return normalizedOrder === "ASC"
				? a.couplet_english.localeCompare(b.couplet_english)
				: b.couplet_english.localeCompare(a.couplet_english);
		}

		if (normalizedOrderBy === "couplet_hindi") {
			return normalizedOrder === "ASC"
				? a.couplet_hindi.localeCompare(b.couplet_hindi, "hi")
				: b.couplet_hindi.localeCompare(a.couplet_hindi, "hi");
		}

		if (normalizedOrderBy === "popular") {
			if (a.popular === b.popular) {
				return normalizedOrder === "ASC"
					? a.couplet_hindi.localeCompare(b.couplet_hindi, "hi")
					: b.couplet_hindi.localeCompare(a.couplet_hindi, "hi");
			}
			return normalizedOrder === "ASC" ? (a.popular ? -1 : 1) : a.popular ? 1 : -1;
		}

		if (normalizedOrderBy === "id") {
			const aId = Number(a.id);
			const bId = Number(b.id);
			return normalizedOrder === "ASC" ? aId - bId : bId - aId;
		}

		const valA = a[normalizedOrderBy];
		const valB = b[normalizedOrderBy];
		if (valA < valB) return normalizedOrder === "DESC" ? 1 : -1;
		if (valA > valB) return normalizedOrder === "DESC" ? -1 : 1;
		return 0;
	});
};

/**
 * Paginates the data based on the current page and items per page.
 * @param {Array<Object>} data - The data to be paginated.
 * @param {number} page - The current page number.
 * @param {number} perPage - The number of items per page.
 * @param {boolean} pagination - Whether to include pagination info.
 * @returns {Object} The paginated data along with pagination details.
 */
export const paginateData = (data, page, perPage, pagination) => {
	const isPaginationEnabled = typeof pagination === "boolean" ? pagination : pagination === "true";

	if (perPage === -1) perPage = data.length;
	if (perPage <= 0 || isNaN(perPage)) perPage = 10;

	const pageNumber = Math.max(parseInt(page, 10) || 1, 1);
	const limit = parseInt(perPage, 10);
	const start = (pageNumber - 1) * limit;
	const end = start + limit;
	const total = data.length;
	const totalPages = Math.ceil(total / limit);

	const paginatedData = pageNumber > totalPages ? [] : data.slice(start, end);

	return {
		couplets: paginatedData,
		total: isPaginationEnabled ? total : paginatedData.length,
		totalPages: isPaginationEnabled ? totalPages : 1,
		page: pageNumber,
		perPage: limit,
		pagination: isPaginationEnabled,
	};
};
