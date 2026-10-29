import { z } from "zod";

export const whatsappNumber = "573332688678";
export const plans = [
  { id: "madrid", destination: "Madrid", country: "España", title: "Plan migratorio a Madrid", label: "10 días en Madrid", tag: "Más solicitado", price: 3500000, previousPrice: 4500000, includes: ["Tiquete aéreo", "Voucher de alojamiento", "Asistencia médica", "Formularios migratorios"] },
  { id: "poland", destination: "Polonia", country: "Europa", title: "Plan migratorio a Polonia", label: "Una nueva oportunidad laboral", tag: "Oportunidad laboral", price: 8000000, previousPrice: 10000000, includes: ["Orientación migratoria", "Tiquete aéreo", "Gestión documental", "Acompañamiento"] },
  { id: "spain", destination: "España", country: "Europa", title: "Plan migratorio España", label: "Estudia, trabaja o vacaciona", tag: "A tu medida", price: 3500000, previousPrice: 4500000, includes: ["Tiquete aéreo", "Alojamiento", "Asistencia médica", "Soporte"] },
] as const;
export const money = (amount: number) => "$" + new Intl.NumberFormat("es-CO").format(amount);
const text = z.string().trim().min(1, "Completa este campo").max(100, "Máximo 100 caracteres");
export const quoteSchema = z.object({
  names: text, surnames: text,
  documentType: z.enum(["Cédula de ciudadanía", "Tarjeta de identidad", "Registro civil", "Cédula de extranjería", "Pasaporte"]),
  documentNumber: z.string().trim().regex(/^[a-zA-Z0-9-]{4,30}$/, "Ingresa un documento válido"),
  phone: z.string().trim().regex(/^\+?[\d\s()-]{7,20}$/, "Ingresa un WhatsApp válido con indicativo"),
  originCountry: text, origin: text, destinationCountry: text, destination: text,
  trip: z.enum(["Ida y vuelta", "Solo ida"]),
  departure: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Selecciona la fecha de ida"),
  returnDate: z.string(),
  adults: z.coerce.number().int().min(1, "Debe viajar al menos un adulto").max(99),
  children: z.coerce.number().int().min(0).max(99),
  service: z.enum(["Tiquete", "Paquete"]),
  plan: z.string().max(100).optional(),
}).superRefine((data, ctx) => {
  if (data.trip === "Ida y vuelta" && (!/^\d{4}-\d{2}-\d{2}$/.test(data.returnDate) || data.returnDate < data.departure)) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["returnDate"], message: "El regreso debe ser igual o posterior a la ida" });
  }
  if (data.origin.toLocaleLowerCase() === data.destination.toLocaleLowerCase()) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["destination"], message: "El destino debe ser diferente al origen" });
  }
});
export type Quote = z.infer<typeof quoteSchema>;
export function quotationUrl(input: Quote) {
  const q = quoteSchema.parse(input);
  const message = ["Hola W.D Travel, quiero cotizar mi viaje.", `Titular: ${q.names} ${q.surnames}`, `Documento: ${q.documentType} ${q.documentNumber}`, `WhatsApp: ${q.phone}`, `Origen: ${q.origin}, ${q.originCountry}`, `Destino: ${q.destination}, ${q.destinationCountry}`, `Trayecto: ${q.trip}`, `Ida: ${q.departure}`, ...(q.trip === "Ida y vuelta" ? [`Regreso: ${q.returnDate}`] : []), `Pasajeros: ${q.adults} adultos, ${q.children} niños`, `Servicio: ${q.service}`, ...(q.plan ? [`Plan: ${q.plan}`] : [])].join("\n");
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}