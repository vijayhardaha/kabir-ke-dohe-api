# Kabir Ke Dohe API

An Express.js API for fetching and filtering Kabir's dohas, hosted on Vercel.

## Table of Contents

- [Introduction](#introduction)
- [API Endpoints](#api-endpoints)
- [Query Parameters](#query-parameters)
- [Examples](#examples)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Introduction

Kabir Ke Dohe API provides a collection of Kabir's dohas (couplets) that you can filter, sort, and paginate. This API is built with Express.js and is hosted on Vercel. It supports various query parameters to help you retrieve the exact data you need.

## API Endpoints

### `GET /api/couplets`

Fetch filtered and paginated couplets based on query parameters.

#### Query Parameters

- `s` (string): Search term.
- `exactMatch` (boolean): Whether to use exact match for search (`true` or `false`).
- `searchWithin` (string): Fields to search within (comma-separated list of `couplet`, `translation`, `explanation`).
- `tags` (string): Tags to filter by (comma-separated list of tags).
- `popular` (boolean): Whether to filter by popularity (`true` or `false`).
- `orderBy` (string): Field to sort by (`id`, `couplet_english`, `couplet_hindi`, `popular`).
- `order` (string): Sort order (`ASC` or `DESC`).
- `page` (number): Current page number.
- `perPage` (number): Number of items per page.
- `pagination` (boolean): Whether to include pagination info (`true` or `false`).

#### Response

```json
{
	couplets: [
		{
			id: "1",
			slug: "couplet-slug",
			unique_slug: "couplet-slug-with-id-and-unique-hash",
			couplet_hindi: "हिन्दी में दोहा",
			couplet_english: "English couplet",
			translation_hindi: "हिन्दी में अनुवाद",
			translation_english: "English translation",
			explanation_hindi: "हिन्दी में व्याख्या",
			explanation_english: "English explanation",
			tags: [
				{ slug: "tag1", name: "name1", count: 1 },
				{ slug: "tag2", name: "name1", count: 1 },
			],
			popular: true,
		},
	],
	total: 100,
	totalPages: 10,
	page: 1,
	perPage: 10,
	pagination: true,
},
```

## Examples

### 1. Fetch All Couplets

```bash
curl "https://kabir-ke-dohe-api.vercel.app/api/couplets"
```

### 2. Search for a Couplet

```bash
curl "https://kabir-ke-dohe-api.vercel.app/api/couplets?s=love&exactMatch=false"
```

### 3. Filter by Tags

```bash
curl "https://kabir-ke-dohe-api.vercel.app/api/couplets?tags=spiritual,life"
```

### 4. Filter by Popularity

```bash
curl "https://kabir-ke-dohe-api.vercel.app/api/couplets?popular=true"
```

### 5. Sort by Couplet in Hindi

```bash
curl "https://kabir-ke-dohe-api.vercel.app/api/couplets?orderBy=couplet_hindi&order=ASC"
```

### 6. Paginate Results

```bash
curl "https://kabir-ke-dohe-api.vercel.app/api/couplets?page=2&perPage=5"
```

### 7. Combining Multiple Filters

```bash
curl "https://kabir-ke-dohe-api.vercel.app/api/couplets?s=wisdom&exactMatch=true&searchWithin=translation,explanation&tags=philosophy&popular=false&orderBy=id&order=DESC&page=1&perPage=10"
```

## Installation

To run this project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/vijayhardaha/kabir-ke-dohe-api.git
   cd kabir-ke-dohe-api
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create an `.env` file in the root directory and add any necessary environment variables.**

4. **Start the server:**

   ```bash
   npm start
   ```

## Usage

Once the server is running, you can access the API at `http://localhost:3000/api/couplets`. Use the provided query parameters to filter, sort, and paginate the dohas as needed.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
