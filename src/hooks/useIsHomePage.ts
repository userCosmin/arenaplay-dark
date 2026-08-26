import { useLocation } from 'react-router-dom';

/** Header goes transparent-over-hero only on the homepage. */
export function useIsHomePage(): boolean {
  const { pathname } = useLocation();
  return pathname === '/';
}
