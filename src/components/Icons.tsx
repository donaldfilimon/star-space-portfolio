import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function AsteriskMark({ className = "", ...props }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true" {...props}>
      <g fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round">
        <path d="M32 8v48" />
        <path d="M8 32h48" />
        <path d="M15 15l34 34" />
        <path d="M49 15L15 49" />
      </g>
    </svg>
  );
}

export function ArrowUpRight({ className = "", ...props }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M7 17 17 7M8 7h9v9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowRight({ className = "", ...props }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M5 12h14M14 7l5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function GithubIcon({ className = "", ...props }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .9a11.1 11.1 0 0 0-3.5 21.63c.56.1.76-.24.76-.54v-2.12c-3.12.68-3.78-1.32-3.78-1.32-.5-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.63 1.22 3.27.93.1-.73.39-1.22.71-1.5-2.49-.28-5.1-1.24-5.1-5.54 0-1.22.43-2.22 1.16-3-.12-.28-.5-1.43.1-2.97 0 0 .94-.3 3.07 1.15A10.7 10.7 0 0 1 12 6.07c.95 0 1.9.13 2.79.38 2.12-1.45 3.06-1.15 3.06-1.15.6 1.54.22 2.69.11 2.97.72.78 1.15 1.78 1.15 3 0 4.31-2.62 5.25-5.12 5.53.4.35.76 1.03.76 2.08v3.1c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
    </svg>
  );
}

export function MailIcon({ className = "", ...props }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="m5 7 7 6 7-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MenuIcon({ open, className = "", ...props }: IconProps & { open: boolean }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d={open ? "M6 6l12 12M18 6 6 18" : "M5 8h14M5 16h14"}
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}
