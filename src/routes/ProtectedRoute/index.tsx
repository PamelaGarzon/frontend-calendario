import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}
export function ProtectedRoute({ children }: Props) {
  const token = localStorage.getItem("token-user") || "";

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
