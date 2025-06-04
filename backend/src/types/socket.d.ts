import { Socket as IOSocket } from "socket.io";

interface userPayload {
    userId: string;
    email: string;
    name?: string;
  }

declare module "socket.io" {
  interface Socket {
    user?: userPayload;
  }
}