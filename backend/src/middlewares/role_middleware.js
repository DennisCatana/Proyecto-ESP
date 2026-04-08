export const autorizarRoles = (...rolesPermitidos) => (req, res, next) => {
    console.log('ROL USUARIO:', req.usuario.rol);
    console.log('ROLES PERMITIDOS:', rolesPermitidos);
    
    if (!rolesPermitidos.includes(req.usuario.rol)) {
        return res.status(403).json({ msg: "No tienes permisos" });
    }
    next();
};