import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import logo from "@images/icon-32.png"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handleImageError = (
  event: React.SyntheticEvent<HTMLImageElement, Event>
) => {
  event.currentTarget.src = logo;
};

export function sleep(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}