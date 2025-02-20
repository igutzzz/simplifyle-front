import ThemeToggle from "../atoms/ThemeToggle";

const Header: React.FC = () => {
    return (
        <nav className="w-full h-10 flex justify-end items-center pt-8 pr-4">
            <ThemeToggle />
        </nav>
    )
}

export default Header;