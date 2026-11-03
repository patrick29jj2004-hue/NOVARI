import { describe, expect, it } from "vitest";
import {
  calculateSubtotal,
  filterProducts,
  updateCart,
  type Product,
} from "@/lib/store";

const products: Product[] = [
  { id: "coat", name: "Coat", category: "outerwear", price: 400, color: "demo" },
  { id: "shirt", name: "Shirt", category: "essentials", price: 200, color: "demo" },
];

describe("fashion demo cart and filters", () => {
  it("filters products without changing the source list", () => {
    expect(filterProducts(products, "outerwear")).toEqual([products[0]]);
    expect(filterProducts(products, "all")).toEqual(products);
    expect(products).toHaveLength(2);
  });

  it("adds and updates quantities by product and size", () => {
    const first = updateCart([], products[0], "M", 1);
    const second = updateCart(first, products[0], "M", 2);
    const third = updateCart(second, products[0], "L", 1);
    expect(second[0].quantity).toBe(3);
    expect(third).toHaveLength(2);
  });

  it("removes a line when its quantity reaches zero and totals correctly", () => {
    const cart = updateCart([], products[0], "M", 2);
    const updated = updateCart(cart, products[1], "S", 1);
    expect(calculateSubtotal(updated)).toBe(1000);
    expect(updateCart(updated, products[0], "M", -2)).toEqual([
      { product: products[1], size: "S", quantity: 1 },
    ]);
  });
});
