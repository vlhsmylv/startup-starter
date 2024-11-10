import bcrypt from "bcryptjs";

// Function to hash the password with a salt
export async function saltAndHashPassword(password: string): Promise<string> {
  // Generate a random salt
  return await bcrypt.hash(password, 12);
}

export async function comparePassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}
