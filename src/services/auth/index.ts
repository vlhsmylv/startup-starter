import { prisma } from "@/lib/prisma";
import { comparePassword } from "@/lib/utils/auth.utils";
import { Employee } from "@prisma/client";

/**
 * Function to get an employee by their email and password
 *
 * @export
 * @param {string} email
 * @param {string} password
 * @return {*}  {(Promise<Employee | null>)}
 */
export async function getEmployeeByCredentials(
  email: string,
  password: string
): Promise<Employee | null> {
  const foundUser = await prisma.employee.findUnique({
    where: {
      email,
    },
  });

  console.log(foundUser);

  if (!foundUser) return null;

  const validated = await comparePassword(password, foundUser.password);

  console.log(validated);

  if (!validated) return null;

  return foundUser;
}
