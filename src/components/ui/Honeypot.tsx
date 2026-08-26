import type { UseFormRegisterReturn } from 'react-hook-form';

interface HoneypotProps {
  /** Pass `register('website')` from the parent form. */
  registration: UseFormRegisterReturn;
}

/**
 * Invisible spam-trap field. Real users never see or focus it (off-screen,
 * removed from the tab order, unlabeled); bots that auto-fill every input
 * they find will populate it, and the submit handler / API rejects the
 * request when it's non-empty.
 */
export function Honeypot({ registration }: HoneypotProps) {
  return (
    <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }} aria-hidden="true">
      <label htmlFor={registration.name}>Nu completa acest câmp</label>
      <input id={registration.name} type="text" tabIndex={-1} autoComplete="off" {...registration} />
    </div>
  );
}
