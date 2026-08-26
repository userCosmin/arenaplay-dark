import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Section } from '@/components/ui/Section';

const paths = [
  { need: 'Vreau să vin la joacă', href: '/loc-de-joaca/', accent: 'text-playground' },
  { need: 'Vreau o petrecere', href: '/petreceri-vr/pachete/', accent: 'text-petreceri' },
  { need: 'Vreau Arena Play la mine', href: '/arena-vr-mobila/', accent: 'text-arenamobila-dark' },
  { need: 'Caut un afterschool', href: '/afterschool/', accent: 'text-afterschool-dark' },
];

/** "Ce cauți?" — repeats the four routes in need-oriented language, per the site architecture doc. */
export function WhatAreYouLookingFor() {
  return (
    <Section className="bg-ink-50">
      <h2 className="mb-10 text-center font-heading text-display-md font-extrabold text-ink-900">Ce cauți?</h2>
      <div className="mx-auto flex max-w-3xl flex-col divide-y divide-ink-200 rounded-3xl bg-white shadow-card">
        {paths.map((path) => (
          <Link
            key={path.href}
            to={path.href}
            className="group flex items-center justify-between gap-4 px-6 py-5 sm:px-8 sm:py-6 transition-colors hover:bg-ink-50"
          >
            <span className="font-heading text-lg sm:text-xl font-bold text-ink-900">{path.need}</span>
            <ArrowRight className={`h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1.5 ${path.accent}`} aria-hidden="true" />
          </Link>
        ))}
      </div>
    </Section>
  );
}
