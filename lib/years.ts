import { site } from "@/config/site";
// Computed at build; pages set `export const revalidate = YEARLY` so the number refreshes without a redeploy.
export const YEARLY = 31536000;
export const yearsOfExperience = () => new Date().getFullYear() - site.START_YEAR;
