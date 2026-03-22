export default function Cross({ size = 20, color = "var(--accent)" }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
    >
      <rect x="10" y="2" width="4" height="20" rx="1"/>
      <rect x="2" y="8" width="20" height="4" rx="1"/>
    </svg>
  );
}