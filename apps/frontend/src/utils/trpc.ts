import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@backend/src/server";

export const trpc = createTRPCReact<AppRouter>();
