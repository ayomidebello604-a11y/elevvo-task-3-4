import bcrypt from "bcrypt";
import type { RegisterUserInput } from "../types/auth.type.ts";
import { generateToken,type  Role } from "../utils/jwt.ts";


interface User {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  role: string;
}

const users: User[] = [];

export const registerUserService = async (userData: RegisterUserInput) => {
  const { name, email, password } = userData;

 
  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    throw new Error("Email is already registered.");
  }


  const saltRounds = 10;
  const password_hash = await bcrypt.hash(password, saltRounds);

  const newUser: User = {
    id: Date.now().toString(),
    name,
    email,
    password_hash,
    role: "USER",
  };
  users.push(newUser);


  const { password_hash: _, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};



export const loginUserService = async (email: string, password: string) => {
  // 1. Find the user by email
  const user = users.find((u) => u.email === email);
  if (!user) {
    throw new Error("Invalid email or password.");
  }

  // 2. Verify password using bcrypt.compare()
  const isPasswordValid = await bcrypt.compare(password, user.password_hash);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password.");
  }

  // 3. Generate JWT with id, email, and role
  const token = generateToken({
    id: user.id,
    email: user.email,
    role: user.role as Role,
  });

  // 4. Return user details (without password_hash) and token
  const { password_hash: _, ...userWithoutPassword } = user;

  return {
    user: userWithoutPassword,
    token,
  };
};