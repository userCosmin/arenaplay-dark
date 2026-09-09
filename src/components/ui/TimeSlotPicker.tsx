import { cn } from '@/utils/cn';

interface TimeSlot {
  id: string;
  label: string;
}

interface TimeSlotPickerProps {
  slots: readonly TimeSlot[];
  value: string;
  onChange: (label: string) => void;
  hasError?: boolean;
}

/** Fixed-slot time picker, matching the button-group pattern on arenaplay.ro/rezervare. */
export function TimeSlotPicker({ slots, value, onChange, hasError }: TimeSlotPickerProps) {
  return (
    <div className="flex flex-wrap gap-2" role="radiogroup">
      {slots.map((slot) => {
        const selected = value === slot.label;
        return (
          <button
            key={slot.id}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(slot.label)}
            className={cn(
              'rounded-xl border px-4 py-3 text-sm font-medium transition-colors',
              selected
                ? 'border-brand-500 bg-brand-500 text-white'
                : 'border-ink-200 bg-white text-ink-700 hover:border-brand-300',
              hasError && !selected && 'border-red-300'
            )}
          >
            {slot.label}
          </button>
        );
      })}
    </div>
  );
}
