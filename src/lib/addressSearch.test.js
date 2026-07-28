import { describe, it, expect, vi, afterEach } from "vitest";
import { searchAddresses } from "./addressSearch.js";

describe("searchAddresses", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("requests Australian results and maps them to {id, label}", async () => {
    const mockResults = [
      { place_id: 123, display_name: "12 Test St, Fitzroy VIC 3065, Australia" },
      { place_id: 456, display_name: "14 Test St, Fitzroy VIC 3065, Australia" },
    ];
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResults),
    });

    const results = await searchAddresses("12 Test St");

    expect(global.fetch).toHaveBeenCalledTimes(1);
    const calledUrl = global.fetch.mock.calls[0][0];
    expect(calledUrl).toContain("countrycodes=au");
    expect(calledUrl).toContain("q=12+Test+St");
    expect(results).toEqual([
      { id: 123, label: "12 Test St, Fitzroy VIC 3065, Australia" },
      { id: 456, label: "14 Test St, Fitzroy VIC 3065, Australia" },
    ]);
  });

  it("throws a clear error when the response is not ok", async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false, status: 429 });

    await expect(searchAddresses("test")).rejects.toThrow("Address search failed: 429");
  });

  it("passes the abort signal through to fetch", async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve([]) });
    const controller = new AbortController();

    await searchAddresses("test", { signal: controller.signal });

    expect(global.fetch.mock.calls[0][1]).toEqual({ signal: controller.signal });
  });
});
