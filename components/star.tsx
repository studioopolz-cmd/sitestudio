export function Star({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M50 0C50 27 27 50 0 50C27 50 50 73 50 100C50 73 73 50 100 50C73 50 50 27 50 0Z" />
    </svg>
  )
}
