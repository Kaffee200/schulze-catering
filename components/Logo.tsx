export default function Logo({ size = 40 }: { size?: number }) {
  return (
    <span className="logo" aria-label="Schulze Catering">
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path
          d="M14 30V36a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6M14 30c-4.5-.8-7-4-7-7.5C7 18.5 10 15.500 13.800 16c1-3.900 4.500-6 8.200-6 3.700 0 7 2.100 8 6 3.800-.5 7 2.500 7 6.500 0 3.500-2.500 6.700-7 7.500H14Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path d="M14 34h20" stroke="currentColor" strokeWidth="2" />
      </svg>
      <span className="logo-word">
        <span className="logo-name">Schulze</span>
        <span className="logo-sub">Catering</span>
      </span>
    </span>
  );
}
