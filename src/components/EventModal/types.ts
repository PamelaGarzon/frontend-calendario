import { z } from "zod";
import { EventFormSchema } from "./utils";

export type EventFormData = z.infer<typeof EventFormSchema>;
