import bcrypt from "bcryptjs"


const SALT_ROUNDS = 10;

// Encriptar contraseña
export const hashPassword = async (password) => {
    return await bcrypt.hash(password, SALT_ROUNDS);
};

// Comparar contraseña
export const comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};
