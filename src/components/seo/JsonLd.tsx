import { Helmet } from 'react-helmet-async';

interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

/** Renders one or more JSON-LD <script> blocks inside <head>. */
export function JsonLd({ data }: JsonLdProps) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <Helmet>
      {items.map((item, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </Helmet>
  );
}
