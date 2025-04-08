import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function normalizeDomain(domain: string) {
  // Remove protocol (http://, https://)
  let normalized = domain.replace(/^(https?:\/\/)/, "");

  // Handle www prefix - store domains without www
  normalized = normalized.replace(/^www\./, "");

  // Remove trailing slashes and paths
  normalized = normalized.split("/")[0];

  return normalized.toLowerCase();
}
