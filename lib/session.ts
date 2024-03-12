import { getServerSession } from "next-auth/next"

import { getAuthOptions } from "@/lib/auth"

export async function getCurrentUser() {
  const session = await getServerSession(getAuthOptions())

  return session?.user
}
