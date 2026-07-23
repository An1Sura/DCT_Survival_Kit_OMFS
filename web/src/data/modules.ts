import type { Module } from "./types";
import raw from "./modules.json";

/**
 * All 36 handbook modules, imported verbatim from the uploaded CSV/handbook.
 * Clinical wording and section structure are preserved as supplied.
 */
export const MODULES: Module[] = raw as Module[];

export function getModuleBySlug(slug: string): Module | undefined {
  return MODULES.find((m) => m.slug === slug);
}

export function getModuleById(id: string): Module | undefined {
  return MODULES.find((m) => m.id === id);
}
