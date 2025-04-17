import crypto from "node:crypto";
import { v4, v5 } from "uuid";

export function hash(...args: string[]) {
  return crypto.createHash("sha512").update(args.join("")).digest("hex");
}

export function uuid(...args: string[]) {
  if (!args.length) return v4();

  return v5(hash(...args), v5.DNS);
}
