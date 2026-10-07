import type { StaticImageData } from "next/image";
import operation_theatre from "@/assets/operation-theatre.jpg";
import xray_room from "@/assets/xray-room.jpg";
import inpatient_room from "@/assets/inpatient-room.jpg";
import waiting_area from "@/assets/waiting-area.jpg";
import corridor from "@/assets/corridor.jpg";
export type Facility = { name: string; alt: string; img: StaticImageData };
export const facilities: Facility[] = [
  { name: "Operation theatre", alt: "Operation theatre with an operating table and a C-arm X-ray unit", img: operation_theatre },
  { name: "X-ray and examination room", alt: "Room with an X-ray unit on a stand and an examination couch", img: xray_room },
  { name: "In-patient room", alt: "In-patient room with two beds and a window", img: inpatient_room },
  { name: "Waiting area", alt: "Waiting area with leather seating and a tiled floor", img: waiting_area },
  { name: "Corridor", alt: "Corridor with chairs along the windows", img: corridor },
];
