export type User = {
    id: string;
    name: string;
    email: string;
}

const users: User[] = [];

export const getAlluserService = (): User[] => users;

export const createUserService = ({ id, name, email }: User): User => {
    const newUser = { id, name, email };
    users.push(newUser);
    return newUser;
};

export const getUserByIdService = (id: string): User | null => {
    return users.find((user) => user.id === id) ?? null;
};

export const updateUserService = (
    id: string,
    updates: Partial<Omit<User, "id">>,
): User | null => {
    const user = users.find((currentUser) => currentUser.id === id);
    if (!user) return null;

    Object.assign(user, updates);
    return user;
};

export const deleteUserService = (id: string): User | null => {
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) return null;

    return users.splice(userIndex, 1)[0] ?? null;
}