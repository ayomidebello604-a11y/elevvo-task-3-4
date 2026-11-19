 export   type User = {
    name: string,
    email: string,
    password_hash: string,
    role: "USER" | "ADMIN"
}
 export type RegisterUserInput = Omit<User, "role" | "password_hash"> & { password: string };
 export type newUser = {
    
 }

