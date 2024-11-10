import { prisma } from "@/lib/prisma";
import { comparePassword } from "@/lib/utils/auth.utils";
import { User } from "@prisma/client";

/**
 * Function to get an employee by their email and password
 *
 * @export
 * @param {string} email
 * @param {string} password
 * @return {*}  {(Promise<Employee | null>)}
 */
export async function getUserByCredentials(
  email: string,
  password: string
): Promise<User | null> {
  const foundUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!foundUser) return null;

  const validated = await comparePassword(password, foundUser.password);

  if (!validated) return null;

  return foundUser;
}
