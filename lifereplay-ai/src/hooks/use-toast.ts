import { toast } from "sonner";

/**
 * Thin wrapper so feature code imports toast from `@/hooks/use-toast` instead
 * of reaching into the `sonner` package directly — keeps the notification
 * library swappable later without touching call sites.
 */
export { toast };
