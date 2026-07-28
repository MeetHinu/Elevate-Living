import { describe, it, expect } from "vitest";
import { isValidEmail, isValidAuMobile } from "./validation.js";

describe("isValidEmail", () => {
  it("accepts a normal email address", () => {
    expect(isValidEmail("jane@example.com")).toBe(true);
  });

  it("accepts an Australian .com.au address", () => {
    expect(isValidEmail("jane@example.com.au")).toBe(true);
  });

  it("rejects a value with no @", () => {
    expect(isValidEmail("not-an-email")).toBe(false);
  });

  it("rejects a value with no domain dot", () => {
    expect(isValidEmail("jane@example")).toBe(false);
  });

  it("rejects a value with spaces", () => {
    expect(isValidEmail("jane doe@example.com")).toBe(false);
  });

  it("rejects an empty string", () => {
    expect(isValidEmail("")).toBe(false);
  });
});

describe("isValidAuMobile", () => {
  it("accepts a plain 04 mobile number", () => {
    expect(isValidAuMobile("0412345678")).toBe(true);
  });

  it("accepts a spaced-out 04 mobile number", () => {
    expect(isValidAuMobile("0412 345 678")).toBe(true);
  });

  it("accepts the +61 international format", () => {
    expect(isValidAuMobile("+61412345678")).toBe(true);
  });

  it("accepts the +61 international format with spaces", () => {
    expect(isValidAuMobile("+61 412 345 678")).toBe(true);
  });

  it("accepts the 61 international format without a plus", () => {
    expect(isValidAuMobile("61412345678")).toBe(true);
  });

  it("accepts a bare 9-digit mobile number with no prefix", () => {
    expect(isValidAuMobile("412345678")).toBe(true);
  });

  it("rejects a landline-style number starting with 02", () => {
    expect(isValidAuMobile("0212345678")).toBe(false);
  });

  it("rejects a number that's too short", () => {
    expect(isValidAuMobile("041234567")).toBe(false);
  });

  it("rejects a number that's too long", () => {
    expect(isValidAuMobile("04123456789")).toBe(false);
  });

  it("rejects non-numeric input", () => {
    expect(isValidAuMobile("phone number")).toBe(false);
  });

  it("rejects an empty string", () => {
    expect(isValidAuMobile("")).toBe(false);
  });
});
