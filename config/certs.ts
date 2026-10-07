import type { StaticImageData } from "next/image";
import ota1 from "@/assets/certs/ota-attendance-2021.jpg";
import ota2 from "@/assets/certs/ota-participation.jpg";
import troikaa from "@/assets/certs/distinction-troikaa.jpg";
import guinness from "@/assets/certs/guinness-attempt-drreddys.jpg";
export type Cert = { img: StaticImageData; title: string; by: string; show: boolean };
// show:false = pharma-company certificates, hidden by default for medical-advertising safety. Flip only with Dr. Shah's approval.
export const certs: Cert[] = [
  { img: ota1, title: "Certificate of Attendance, delegate at Best of Orthopaedic Techniques International Live, 7 to 9 May 2021", by: "Orthopaedic Trauma Association (OTA)", show: true },
  { img: ota2, title: "Certificate of Participation, Best of OTA programme", by: "Orthopaedic Trauma Association (OTA)", show: true },
  { img: troikaa, title: "Certificate of Distinction from Troikaa Pharmaceuticals Ltd.", by: "Pharmaceutical company certificate", show: false },
  { img: guinness, title: "Thank-you certificate for taking part in a Guinness World Records attempt (Longest Awareness Ribbon), 9 and 10 January 2020", by: "Organised by Dr. Reddy's Laboratories", show: false },
];
