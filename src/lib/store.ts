export type Product = {
  id: string;
  name: string;
  category: "outerwear" | "essentials" | "accessories";
  price: number;
  color: string;
};

export type CartLine = {
  product: Product;
  size: string;
  quantity: number;
};

export function filterProducts(
  products: Product[],
  category: string,
): Product[] {
  if (category === "all") return products;
  return products.filter((product) => product.category === category);
}

export function calculateSubtotal(lines: CartLine[]): number {
  return lines.reduce(
    (subtotal, line) => subtotal + line.product.price * line.quantity,
    0,
  );
}

export function updateCart(
  lines: CartLine[],
  product: Product,
  size: string,
  change: number,
): CartLine[] {
  const existing = lines.find(
    (line) => line.product.id === product.id && line.size === size,
  );

  if (!existing) {
    return change > 0
      ? [...lines, { product, size, quantity: change }]
      : lines;
  }

  return lines
    .map((line) =>
      line.product.id === product.id && line.size === size
        ? { ...line, quantity: line.quantity + change }
        : line,
    )
    .filter((line) => line.quantity > 0);
}
