export function generateSKU(productName, category, id) {
    const namePart = productName.substring(0, 3).toUpperCase();
    const categoryPart = category.substring(0, 3).toUpperCase();
    const uniquePart = id.toString().padStart(4, '0'); // Ensures 4-digit ID

    return `${namePart}-${categoryPart}-${uniquePart}`;
}

// console.log(generateSKU("Laptop", "Electronics", 25)); // LAP-ELE-0025
