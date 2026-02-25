import NavbarDesktop from './NavbarDesktop';
import NavbarMobile from './NavbarMobile';

const Navbar = () => {
    return (
        <>
        {/* Visible solo en pantallas grandes (md y superiores) */}
        <div className="hidden md:block">
            <NavbarDesktop />
        </div>

        {/* Visible solo en pantallas pequeñas (menos de md) */}
        <div className="md:hidden">
            <NavbarMobile />
        </div>
        </>
    );
};

export default Navbar;