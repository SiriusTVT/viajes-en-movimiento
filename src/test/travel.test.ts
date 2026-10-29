import { describe, expect, it } from "vitest";
import { plans, quotationUrl, quoteSchema, type Quote } from "../lib/travel";

const quote: Quote = { names: "Ana", surnames: "Prueba", documentType: "Pasaporte", documentNumber: "AB123456", phone: "+57 300 123 4567", originCountry: "Colombia", origin: "Cali", destinationCountry: "España", destination: "Madrid", trip: "Ida y vuelta", departure: "2026-12-10", returnDate: "2026-12-20", adults: 2, children: 1, service: "Paquete" };
describe("W.D Travel offers", () => {
  it("keeps Madrid at COP 3,500,000, previously 4,500,000, for 10 days", () => { expect(plans[0]).toMatchObject({ price: 3500000, previousPrice: 4500000, label: "10 días en Madrid" }); });
  it("keeps Poland at COP 8,000,000, previously 10,000,000", () => { expect(plans[1]).toMatchObject({ price: 8000000, previousPrice: 10000000 }); });
  it("keeps Spain at COP 3,500,000, previously 4,500,000", () => { expect(plans[2]).toMatchObject({ price: 3500000, previousPrice: 4500000 }); });
});
describe("WhatsApp quotation", () => {
  it("sends the complete holder, journey, dates, passengers and service to the specified WhatsApp", () => {
    const url = new URL(quotationUrl(quote));
    expect(url.pathname).toBe("/573332688678");
    const message = url.searchParams.get("text");
    for (const value of ["Ana Prueba", "Pasaporte AB123456", "+57 300 123 4567", "Cali, Colombia", "Madrid, España", "2026-12-10", "2026-12-20", "2 adultos, 1 niños", "Paquete"]) expect(message).toContain(value);
  });
  it("omits return date on a one-way trip", () => { expect(decodeURIComponent(quotationUrl({ ...quote, trip: "Solo ida", returnDate: "" }))).not.toContain("Regreso:"); });
  it("rejects a return before departure", () => { expect(quoteSchema.safeParse({ ...quote, returnDate: "2026-12-09" }).success).toBe(false); });
  it("requires at least one adult", () => { expect(quoteSchema.safeParse({ ...quote, adults: 0 }).success).toBe(false); });
  it("rejects incomplete holder data", () => { expect(quoteSchema.safeParse({ ...quote, names: "" }).success).toBe(false); });
});