import { useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  items: TabItem[];
  className?: string;
  defaultId?: string;
}

export function Tabs({ items, className, defaultId }: TabsProps) {
  const [activeId, setActiveId] = useState(defaultId ?? items[0]?.id);
  const activeItem = items.find((item) => item.id === activeId) ?? items[0];

  return (
    <div className={className}>
      <div role="tablist" className="no-scrollbar mb-8 flex gap-2 overflow-x-auto rounded-full bg-ink-100 p-1.5">
        {items.map((item) => {
          const isActive = item.id === activeItem?.id;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveId(item.id)}
              className={cn(
                'shrink-0 rounded-full px-5 py-2.5 text-sm sm:text-base font-semibold transition-colors',
                isActive ? 'bg-white text-ink-900 shadow-soft' : 'text-ink-500 hover:text-ink-800'
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      <div role="tabpanel">{activeItem?.content}</div>
    </div>
  );
}
