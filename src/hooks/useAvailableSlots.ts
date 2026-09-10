import { useEffect, useState } from 'react';

export interface SlotAvailability {
  id: string;
  label: string;
  available: boolean;
}

/**
 * Fetches which reservation slots are still free for a given date, from
 * GET /api/availability (see functions/api/availability.ts). Re-fetches
 * whenever `date` changes; returns null slots while no date is chosen.
 */
export function useAvailableSlots(date: string | undefined) {
  const [slots, setSlots] = useState<SlotAvailability[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!date) {
      setSlots(null);
      return;
    }

    let cancelled = false;
    setLoading(true);

    fetch(`/api/availability?date=${encodeURIComponent(date)}`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setSlots(data.slots ?? null);
      })
      .catch(() => {
        if (!cancelled) setSlots(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [date]);

  return { slots, loading };
}
