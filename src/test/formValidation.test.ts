import { describe, expect, it } from "vitest";
import { isValidLocation } from "../core/formValidation";

describe("location validation", () => {
  it("rejects an incomplete location without throwing", () => {
    expect(isValidLocation("Colombia")).toBe(false);
    expect(isValidLocation("Colombia - ")).toBe(false);
    expect(isValidLocation("")).toBe(false);
  });
  it("accepts a listed city and rejects an unknown one", () => {
    expect(isValidLocation("Colombia - Cali (CLO)")).toBe(true);
    expect(isValidLocation("Colombia - Unknown")).toBe(false);
    expect(isValidLocation("Colombia - Cali - Extra")).toBe(false);
  });
});