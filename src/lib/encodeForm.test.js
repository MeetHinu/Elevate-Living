import { describe, it, expect } from "vitest";
import { encodeForm } from "./encodeForm.js";

describe("encodeForm", () => {
  it("encodes a flat object as application/x-www-form-urlencoded", () => {
    const result = encodeForm({ "form-name": "consultation-request", name: "Jane Doe" });
    expect(result).toBe("form-name=consultation-request&name=Jane%20Doe");
  });

  it("percent-encodes special characters in both keys and values", () => {
    const result = encodeForm({ message: "Kitchen & bathroom, 20m²" });
    expect(result).toBe("message=Kitchen%20%26%20bathroom%2C%2020m%C2%B2");
  });

  it("encodes an empty string value as an empty string, not literal 'undefined'", () => {
    expect(encodeForm({ phone: "" })).toBe("phone=");
  });
});
