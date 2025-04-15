import crypto from "node:crypto";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { v4, v5 } from "uuid";

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

export function hash(...args: string[]) {
  return crypto.createHash("sha512").update(args.join("")).digest("hex");
}

export function uuid(...args: string[]) {
  if (!args.length) return v4();

  return v5(hash(...args), v5.DNS);
}
