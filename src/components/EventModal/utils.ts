import { z } from "zod";

export const EventFormSchema = z
  .object({
    startDateTime: z.string(),
    endDateTime: z.string(),
    description: z.string().min(4, "Descrição é um campo obrigatório"),
  })
  .refine(
    (data) => {
      const startDate = new Date(data.startDateTime);
      const endDate = new Date(data.endDateTime);

      return startDate < endDate;
    },
    {
      message: "A data inicial deve ser menor que a data final",
      path: ["startDateTime"],
    }
  )
  .refine(
    (data) => {
      const startDate = new Date(data.startDateTime);
      const endDate = new Date(data.endDateTime);

      return endDate > startDate;
    },
    {
      message: "A data final deve ser maior que a data inicial",
      path: ["endDateTime"],
    }
  );
