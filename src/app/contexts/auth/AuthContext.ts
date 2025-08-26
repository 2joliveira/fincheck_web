import { createContext } from "react";
import type { User } from "@/app/entities/User";

interface AuthContextValue {
  user: User | undefined;
  signedIn: boolean;
  signin(accessToken: string): void;
  signout(): void;
}

export const AuthContext = createContext({} as AuthContextValue);
