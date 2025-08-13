const BOOKS_API = 'https://fakerapi.it/api/v2/books';
const DOG_API = 'https://dog.ceo/api/breeds/image/random';

export async function fetchBooks(quantity = 4) {
    try {
        const res = await fetch(`${BOOKS_API}?_quantity=${quantity}`);
        const data = await res.json();
        return data.data || [];
    } catch (err) {
        console.log("Failed to fetch books:", err);
        return [];
    }
}

export async function fetchDogImage() {
    try {
        const res = await fetch(DOG_API);
        const data = await res.json();
        return data.message || '';
    } catch (err) {
        console.log("Failed to fetch dog image:", err);
        return '';
    }
}

export async function fetchBooksAndDog(quantity = 4) {
    try {
        const books = await fetchBooks(quantity);
        const dogImage = await fetchDogImage();
        return { books, dogImage };
    } catch (err) {
        console.log("Error fetching both:", err);
        return { books: [], dogImage: '' };
    }
}