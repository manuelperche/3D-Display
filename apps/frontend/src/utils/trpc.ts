import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@backend/api/server";

export const trpc = createTRPCReact<AppRouter>();
