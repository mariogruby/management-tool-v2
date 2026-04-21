export function KikiLogo({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="32" height="32" rx="8" fill={color} />
      {/* columna izquierda */}
      <rect x="5" y="8" width="6" height="9" rx="2" fill="white" />
      <rect x="5" y="20" width="6" height="5" rx="2" fill="white" fillOpacity="0.5" />
      {/* columna central */}
      <rect x="13" y="8" width="6" height="5" rx="2" fill="white" fillOpacity="0.5" />
      <rect x="13" y="16" width="6" height="9" rx="2" fill="white" />
      {/* columna derecha */}
      <rect x="21" y="8" width="6" height="7" rx="2" fill="white" />
      <rect x="21" y="18" width="6" height="7" rx="2" fill="white" fillOpacity="0.5" />
    </svg>
  );
}
