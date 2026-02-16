import Logo from "../logo/Logo";

export const FooterMinimal = ({ className = '' }) => {
    return (
        <footer className={`bg-gray-900 text-gray-400 py-6 ${className}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
                <Logo size="sm" variant="light" />
                <p className="text-sm">© {new Date().getFullYear()} Qdi Hajtek. Tous droits réservés.</p>
            </div>
        </footer>
    );
};
