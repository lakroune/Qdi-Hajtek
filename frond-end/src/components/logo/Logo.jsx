// Logo.jsx
const Logo = ({ variant = 'default', className = '' }) => {
    const logos = {
        default: `  <svg width="320" height="120" viewBox="0 0 320 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M45 20L65 30V55L45 65L25 55V30L45 20Z" stroke="#F97316" stroke-width="4" fill="none" stroke-linejoin="round" />
              <circle cx="45" cy="42" r="12" stroke="#F97316" stroke-width="4" fill="none" />
              <line x1="54" y1="54" x2="70" y2="75" stroke="#F97316" stroke-width="5" stroke-linecap="round" />
              <text x="95" y="55" font-family="Inter, system-ui, sans-serif" font-size="36" font-weight="800" fill="#EEE" letter-spacing="-1">QDI</text>
              <text x="95" y="85" font-family="Inter, system-ui, sans-serif" font-size="28" font-weight="700" fill="#F97316" letter-spacing="2">HAJTEK</text>
              <text x="95" y="105" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="500" fill="#FFF" letter-spacing="1">TROUVEZ VOTRE ARTISAN</text>
            </svg>`,
        minimal: `<!--  SVG Version 2 -->`,
        premium: '<!--  SVG Version 1 -->'
    };

    return (
        <div className={className} dangerouslySetInnerHTML={{ __html: logos[variant] }} />
    );
};

export default Logo;