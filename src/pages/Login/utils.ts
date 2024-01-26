import { z } from "zod";

export const LoginFormValidationSchema = z.object({
  email: z.string().email("Informe um e-mail válido."),
  password: z
    .string()
    .min(6, "Mínimo de 6 dígitos.")
    .max(20, "Máximo de 16 dígitos"),
});
