import bcrypt from "bcryptjs"


const SALT_ROUNDS = 10;


// Método para cifrar el password
export const hashPassword = async (password) => {
return await bcrypt.hash(password, SALT_ROUNDS);
};

// Método para verificar si el password es el mismo de la BDD
export const comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};


