import { describe, it, expect } from "vitest";
import { filterPortfolio, findPortfolioItem, portfolioItems } from "./portfolio.js";

describe("filterPortfolio", () => {
  it("returns all items when key is 'all'", () => {
    expect(filterPortfolio(portfolioItems, "all")).toEqual(portfolioItems);
  });

  it("returns only items matching the category", () => {
    const result = filterPortfolio(portfolioItems, "laundry");
    expect(result.length).toBe(4);
    expect(result.every((item) => item.category === "laundry")).toBe(true);
  });

  it("returns an empty array for a category with no items", () => {
    expect(filterPortfolio(portfolioItems, "living")).toEqual([]);
  });
});

describe("findPortfolioItem", () => {
  it("returns the matching item by id", () => {
    expect(findPortfolioItem("kitchen-2").title).toBe("Navy & Brass Island Kitchen");
  });

  it("throws for an unknown id", () => {
    expect(() => findPortfolioItem("not-real")).toThrow('No portfolio item with id "not-real"');
  });
});
