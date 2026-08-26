import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';
import { Container } from './Container';

interface SectionProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
  as?: 'section' | 'div';
  fullBleed?: boolean;
}

export function Section({ children, className, containerClassName, id, as: Tag = 'section', fullBleed = false }: SectionProps) {
  return (
    <Tag id={id} className={cn('py-16 sm:py-20 lg:py-28', className)}>
      {fullBleed ? children : <Container className={containerClassName}>{children}</Container>}
    </Tag>
  );
}
