import * as z from "zod"

export const userAuthSchema = z.object({
  email: z.string().email(),
})

export const namesSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
})