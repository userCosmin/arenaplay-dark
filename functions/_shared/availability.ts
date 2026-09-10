/**
 * Shared availability logic for the reservation calendar — used by the public
 * /api/availability endpoint, the public /api/lead submission (server-side
 * double-booking guard), and the admin manual-booking/blocking endpoints.
 *
 * Mirrors the live arenaplay.ro/admin calendar: a fixed set of daily slots,
 * unavailable when either (a) an active lead already occupies that date+time,
 * or (b) an admin has blocked that date (whole day or a specific slot, with
 * optional weekly recurrence).
 *
 * Petreceri and Loc de joacă share one calendar — both use the same
 * exclusive-access venue, so a booking on either type occupies the slot for
 * both (see src/data/pricing.ts: both share the "Luni–Vineri, doar cu
 * rezervare" weekday window).
 */

export interface AvailabilityEnv {
  DB: D1Database;
}

/** Keep in sync with src/data/packages.ts `partyTimeSlots` — duplicated here because
 * functions/ is a separate TS project with no path alias into src/. */
export const RESERVATION_SLOTS = [
  { id: '11-30', label: '11:30 – 14:30' },
  { id: '15-00', label: '15:00 – 18:00' },
  { id: '18-30', label: '18:30 – 21:30' },
] as const;

export interface SlotAvailability {
  id: string;
  label: string;
  available: boolean;
}

const RESERVATION_TYPES = ['petreceri', 'playground'] as const;

export async function getAvailability(
  env: AvailabilityEnv,
  date: string
): Promise<SlotAvailability[]> {
  const [bookedRows, blockRows] = await Promise.all([
    env.DB.prepare(
      `SELECT DISTINCT preferred_time FROM leads
       WHERE type IN (${RESERVATION_TYPES.map(() => '?').join(',')})
         AND preferred_date = ?
         AND status != 'anulat'`
    )
      .bind(...RESERVATION_TYPES, date)
      .all<{ preferred_time: string }>(),
    env.DB.prepare(
      `SELECT time FROM blocked_slots
       WHERE date = ?1
          OR (recurring = 1 AND strftime('%w', date) = strftime('%w', ?1))`
    )
      .bind(date)
      .all<{ time: string | null }>(),
  ]);

  const bookedLabels = new Set(bookedRows.results.map((r) => r.preferred_time));
  const wholeDayBlocked = blockRows.results.some((r) => r.time === null);
  const blockedSlotIds = new Set(
    blockRows.results.filter((r) => r.time !== null).map((r) => r.time as string)
  );

  return RESERVATION_SLOTS.map((slot) => ({
    id: slot.id,
    label: slot.label,
    available: !wholeDayBlocked && !blockedSlotIds.has(slot.id) && !bookedLabels.has(slot.label),
  }));
}
