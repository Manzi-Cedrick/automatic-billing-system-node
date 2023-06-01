import * as argon2 from 'argon2';

export async function passwordCheck(
  hashedPassword: string,
  password: string
): Promise<boolean> {
  return await argon2.verify(hashedPassword, password);
}

export async function hashPassword(
    password: string
): Promise<string> {
    return await argon2.hash(password);
}
