/**
 * A component to render a footer with links.
 * @param {Array} array - An array of objects with name and link properties.
 * {
 *   name: string,
 *   link: string
 * }
 * <LinkFooter array={links} />
 */
const LinkFooter = ({ array }) => {
    return (
        <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-center gap-8 text-xs text-gray-400">
            {array.map((item, index) => (
                <a key={index} href={item.link} className="hover:text-gray-600 transition-colors">
                    {item.name}
                </a>
            ))}
        </div>
    );
};

export default LinkFooter;