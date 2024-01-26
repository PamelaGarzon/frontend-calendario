import { createContext, ReactNode, useEffect, useState } from "react";

type AuthUserContextProps = {
  userId: string;
  setUserId: (userId: string) => void;
};

const defaultValue: AuthUserContextProps = {
  userId: "",
  setUserId: () => {},
};

export const AuthUserContext =
  createContext<AuthUserContextProps>(defaultValue);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthUserProvider({ children }: AuthProviderProps) {
  const [userId, setUserId] = useState<string>("");

  const contextValue: AuthUserContextProps = {
    userId,
    setUserId,
  };

  return (
    <AuthUserContext.Provider value={contextValue}>
      {children}
    </AuthUserContext.Provider>
  );
}
