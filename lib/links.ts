import { site } from "@/config/site";
export const telHref = `tel:${site.phone}`;
export const waHref = (text = "Hello, I would like to book an appointment.") => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
export const mailHref = `mailto:${site.email}`;
export const addressLine = `${site.address.street}, ${site.city} ${site.address.postalCode}`;
