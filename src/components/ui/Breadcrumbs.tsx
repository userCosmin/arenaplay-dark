import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema } from '@/utils/structuredData';
import type { BreadcrumbEntry } from '@/types';

interface BreadcrumbsProps {
  items: BreadcrumbEntry[];
  className?: string;
}

/** Visual breadcrumb trail + matching BreadcrumbList JSON-LD. */
export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  const allItems: BreadcrumbEntry[] = [{ label: 'Acasă', href: '/' }, ...items];

  return (
    <nav aria-label="breadcrumb" className={className}>
      <JsonLd data={breadcrumbSchema(allItems)} />
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-500">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1.5">
              {index === 0 ? (
                <Link to={item.href} className="flex items-center hover:text-brand-600" aria-label="Acasă">
                  <Home className="h-4 w-4" aria-hidden="true" />
                </Link>
              ) : isLast ? (
                <span aria-current="page" className="font-medium text-ink-800">
                  {item.label}
                </span>
              ) : (
                <Link to={item.href} className="hover:text-brand-600">
                  {item.label}
                </Link>
              )}
              {!isLast && <ChevronRight className="h-3.5 w-3.5 text-ink-300" aria-hidden="true" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
