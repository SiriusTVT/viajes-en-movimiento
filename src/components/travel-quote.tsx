import { useState } from "react";
import { ArrowRight, Check, MessageCircle, Plane, Users, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { quotationUrl, quoteSchema } from "@/lib/travel";

export function TravelQuote({ selectedPlan }: { selectedPlan: string }) {
  const [trip, setTrip] = useState("Ida y vuelta");
  const [service, setService] = useState("Paquete");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [readyUrl, setReadyUrl] = useState("");
  const [departure, setDeparture] = useState("");
  const field = (name: string, label: string, type = "text", placeholder = "") => <label className="field"><span>{label}</span><input name={name} type={type} placeholder={placeholder} maxLength={100} required aria-invalid={Boolean(errors[name])} onChange={name === "departure" ? (e) => setDeparture(e.target.value) : undefined} min={name === "returnDate" ? departure : undefined} /><small className="text-destructive">{errors[name]}</small></label>;
  return <form className="quote-form" onSubmit={(event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const result = quoteSchema.safeParse({ ...data, trip, service, plan: selectedPlan, returnDate: data["returnDate"] ?? "" });
    if (!result.success) { setErrors(Object.fromEntries(result.error.issues.map((issue) => [String(issue.path[0]), issue.message]))); return; }
    setErrors({});
    const url = quotationUrl(result.data);
    setReadyUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
  }}>
    {selectedPlan && <div className="selected-plan"><Check size={16} /> {selectedPlan}</div>}
    <fieldset><legend><UserRound size={18} /> 01 <span>Datos del titular</span></legend><div className="form-grid">
      {field("names", "Nombres", "text", "Tus nombres")}{field("surnames", "Apellidos", "text", "Tus apellidos")}
      <label className="field"><span>Tipo de documento</span><select name="documentType">{["Cédula de ciudadanía", "Tarjeta de identidad", "Registro civil", "Cédula de extranjería", "Pasaporte"].map((item) => <option key={item}>{item}</option>)}</select></label>
      {field("documentNumber", "Número de documento", "text", "Número de identidad")}
      {field("phone", "WhatsApp con indicativo", "tel", "+57 300 123 4567")}
    </div></fieldset>
    <fieldset><legend><Plane size={18} /> 02 <span>Tu próximo destino</span></legend><div className="form-grid">
      {field("originCountry", "País de origen", "text", "Colombia")}{field("origin", "Ciudad / aeropuerto de origen", "text", "Cali (CLO)")}
      {field("destinationCountry", "País de destino", "text", "España")}{field("destination", "Ciudad / aeropuerto de destino", "text", "Madrid (MAD)")}
      <div className="field"><span>Tipo de viaje</span><div className="segmented">{["Ida y vuelta", "Solo ida"].map((item) => <Button key={item} type="button" variant="ghost" aria-pressed={trip === item} onClick={() => setTrip(item)}>{item}</Button>)}</div></div>
      <div />{field("departure", "Fecha de ida", "date")}{trip === "Ida y vuelta" && field("returnDate", "Fecha de regreso", "date")}
    </div></fieldset>
    <fieldset><legend><Users size={18} /> 03 <span>Pasajeros y servicio</span></legend><div className="form-grid">
      <label className="field"><span>Adultos</span><input name="adults" type="number" min={1} max={99} defaultValue={1} required /></label>
      <label className="field"><span>Niños</span><input name="children" type="number" min={0} max={99} defaultValue={0} required /></label>
      <div className="field"><span>Tipo de servicio</span><div className="segmented">{["Tiquete", "Paquete"].map((item) => <Button key={item} type="button" variant="ghost" aria-pressed={service === item} onClick={() => setService(item)}>{item}</Button>)}</div></div>
    </div></fieldset>
    <div className="quote-submit"><p>Tu solicitud se compartirá con nuestro equipo por WhatsApp.</p><Button type="submit" className="cta"><MessageCircle /> Cotizar por WhatsApp <ArrowRight /></Button></div>
    {readyUrl && <div role="status" className="quote-confirmation"><Check size={20} /><div><strong>Tu cotización está lista.</strong><p>Completa el envío en WhatsApp para que un asesor reciba tu solicitud.</p><a href={readyUrl} target="_blank" rel="noopener noreferrer">Abrir WhatsApp de nuevo →</a></div></div>}
  </form>;
}