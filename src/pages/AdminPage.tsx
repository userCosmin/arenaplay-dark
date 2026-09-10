import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { Lock, LogOut, RefreshCw, Search, Plus, Ban, Eye, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { TimeSlotPicker } from '@/components/ui/TimeSlotPicker';
import { useAvailableSlots } from '@/hooks/useAvailableSlots';
import { partyTimeSlots } from '@/data/packages';
import { cn } from '@/utils/cn';

type LeadType = 'petreceri' | 'playground' | 'afterschool' | 'arena-mobila' | 'contact';
type LeadStatus = 'nou' | 'confirmat' | 'anulat';

interface LeadRow {
  id: number;
  type: LeadType;
  status: LeadStatus;
  name: string | null;
  phone: string | null;
  email: string | null;
  preferred_date: string | null;
  preferred_time: string | null;
  message: string | null;
  payload: string;
  created_at: string;
  updated_at: string;
}

const typeLabels: Record<LeadType, string> = {
  petreceri: 'Petreceri',
  playground: 'Loc de joacă',
  afterschool: 'Afterschool',
  'arena-mobila': 'Arena VR mobilă',
  contact: 'Contact',
};

const statusLabels: Record<LeadStatus, string> = {
  nou: 'Nou',
  confirmat: 'Confirmat',
  anulat: 'Anulat',
};

const statusClasses: Record<LeadStatus, string> = {
  nou: 'bg-amber-100 text-amber-800',
  confirmat: 'bg-emerald-100 text-emerald-800',
  anulat: 'bg-red-100 text-red-700',
};

const PAGE_SIZE = 25;

function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.message ?? 'Autentificare eșuată.');
        return;
      }
      onSuccess();
    } catch {
      setError('A apărut o eroare. Încearcă din nou.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-950 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-card"
      >
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-brand-600">
            <Lock className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-ink-900">Panou admin</h1>
            <p className="text-sm text-ink-500">Arena Play</p>
          </div>
        </div>
        <label htmlFor="admin-password" className="mb-1.5 block text-sm font-medium text-ink-700">
          Parolă
        </label>
        <Input
          id="admin-password"
          type="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          hasError={!!error}
        />
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        <Button type="submit" fullWidth className="mt-5" disabled={loading || !password}>
          {loading ? 'Se verifică...' : 'Intră în cont'}
        </Button>
      </form>
    </div>
  );
}

interface BlockRow {
  id: number;
  date: string;
  time: string | null;
  recurring: number;
  reason: string | null;
}

function blockTimeLabel(time: string | null): string {
  if (!time) return 'Ziua întreagă';
  return partyTimeSlots.find((s) => s.id === time)?.label ?? time;
}

function ModalShell({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-card">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-ink-900">{title}</h2>
          <button type="button" onClick={onClose} className="text-ink-400 hover:text-ink-700" aria-label="Închide">
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function AddReservationModal({ onClose, onCreated }: { onClose: () => void; onCreated: () => void }) {
  const [type, setType] = useState<'petreceri' | 'playground'>('petreceri');
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const { slots, loading: loadingSlots } = useAvailableSlots(date);
  const availableSlots = slots?.filter((s) => s.available) ?? [];

  useEffect(() => {
    setTime('');
  }, [date]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !date || !time || !phone) {
      setError('Completează toate câmpurile obligatorii.');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, name, phone, preferredDate: date, preferredTime: time, message }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.message ?? 'A apărut o eroare.');
        return;
      }
      onCreated();
      onClose();
    } catch {
      setError('A apărut o eroare.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <ModalShell title="Adaugă rezervare nouă" onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink-700">Serviciu</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as 'petreceri' | 'playground')}
            className="w-full rounded-xl border border-ink-200 bg-white px-3 py-3 text-sm text-ink-700"
          >
            <option value="petreceri">Petreceri</option>
            <option value="playground">Loc de joacă</option>
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink-700">Nume</label>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Introduceți numele" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink-700">Data Rezervării</label>
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink-700">Ora Dorită</label>
          {!date ? (
            <p className="text-sm text-ink-400">Selectează o dată pentru a vedea orele.</p>
          ) : loadingSlots ? (
            <p className="text-sm text-ink-400">Se verifică disponibilitatea...</p>
          ) : availableSlots.length === 0 ? (
            <p className="text-sm text-red-600">Nu sunt locuri libere pentru această dată.</p>
          ) : (
            <TimeSlotPicker slots={availableSlots} value={time} onChange={setTime} />
          )}
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink-700">Număr de telefon</label>
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="074 123 1234" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink-700">Mesaj (Opțional)</label>
          <Textarea value={message} onChange={(e) => setMessage(e.target.value)} />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="mt-1 flex justify-end gap-3">
          <Button type="button" variant="ghost" onClick={onClose}>
            Anulează
          </Button>
          <Button type="submit" disabled={saving}>
            {saving ? 'Se salvează...' : 'Adaugă rezervare'}
          </Button>
        </div>
      </form>
    </ModalShell>
  );
}

function BlockModal({ onClose, onSaved }: { onClose: () => void; onSaved: () => void }) {
  const [dates, setDates] = useState<string[]>(['']);
  const [wholeDay, setWholeDay] = useState(true);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [recurring, setRecurring] = useState(false);
  const [reason, setReason] = useState('Indisponibil pentru rezervari');
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const toggleTime = (id: string) => {
    setSelectedTimes((prev) => (prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]));
  };

  const updateDate = (index: number, value: string) => {
    setDates((prev) => prev.map((d, i) => (i === index ? value : d)));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validDates = dates.filter(Boolean);
    if (validDates.length === 0) {
      setError('Alege cel puțin o dată.');
      return;
    }
    if (!wholeDay && selectedTimes.length === 0) {
      setError('Selectează cel puțin o oră, sau bifează „Ziua întreagă".');
      return;
    }
    if (!reason.trim()) {
      setError('Motivul este obligatoriu.');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/blocks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dates: validDates, times: wholeDay ? [] : selectedTimes, recurring, reason }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.message ?? 'A apărut o eroare.');
        return;
      }
      onSaved();
      onClose();
    } catch {
      setError('A apărut o eroare.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <ModalShell title="Blochează date și ore" onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex items-center gap-2 rounded-xl bg-brand-50 px-3 py-2.5 text-sm text-ink-700">
          <input
            type="checkbox"
            checked={recurring}
            onChange={(e) => setRecurring(e.target.checked)}
            className="h-4 w-4 rounded border-ink-300 text-brand-500"
          />
          Recurent (fiecare săptămână)
        </label>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-ink-700">Date</label>
          {dates.map((d, i) => (
            <Input key={i} type="date" value={d} onChange={(e) => updateDate(i, e.target.value)} />
          ))}
          <button
            type="button"
            onClick={() => setDates((prev) => [...prev, ''])}
            className="self-start text-sm font-medium text-brand-600 hover:underline"
          >
            + Adaugă dată
          </button>
        </div>

        <label className="flex items-center gap-2 text-sm text-ink-700">
          <input
            type="checkbox"
            checked={wholeDay}
            onChange={(e) => setWholeDay(e.target.checked)}
            className="h-4 w-4 rounded border-ink-300 text-brand-500"
          />
          Ziua întreagă
        </label>

        {!wholeDay && (
          <div>
            <p className="mb-2 text-sm font-medium text-ink-700">Orele (selectează una sau mai multe)</p>
            <div className="flex flex-wrap gap-2">
              {partyTimeSlots.map((slot) => (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => toggleTime(slot.id)}
                  className={cn(
                    'rounded-xl border px-3 py-2 text-sm font-medium',
                    selectedTimes.includes(slot.id)
                      ? 'border-brand-500 bg-brand-500 text-white'
                      : 'border-ink-200 bg-white text-ink-700'
                  )}
                >
                  {slot.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink-700">Motiv</label>
          <Input value={reason} onChange={(e) => setReason(e.target.value)} />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="mt-1 flex justify-end gap-3">
          <Button type="button" variant="ghost" onClick={onClose}>
            Anulează
          </Button>
          <Button type="submit" disabled={saving}>
            {saving ? 'Se salvează...' : 'Salvează'}
          </Button>
        </div>
      </form>
    </ModalShell>
  );
}

function BlockedListModal({ onClose }: { onClose: () => void }) {
  const [blocks, setBlocks] = useState<BlockRow[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBlocks = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/admin/blocks');
    const data = await res.json();
    setBlocks(data.blocks ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchBlocks();
  }, [fetchBlocks]);

  const removeBlock = async (id: number) => {
    setBlocks((prev) => prev.filter((b) => b.id !== id));
    await fetch(`/api/admin/blocks/${id}`, { method: 'DELETE' });
  };

  return (
    <ModalShell title="Blocaje existente" onClose={onClose}>
      <div className="flex max-h-96 flex-col gap-3 overflow-y-auto">
        {loading && <p className="text-sm text-ink-400">Se încarcă...</p>}
        {!loading && blocks.length === 0 && <p className="text-sm text-ink-400">Niciun blocaj activ.</p>}
        {blocks.map((b) => (
          <div key={b.id} className="flex items-start justify-between gap-3 rounded-xl border border-ink-200 p-3">
            <div>
              <p className="font-medium text-ink-900">
                {b.date}
                {b.recurring ? ' · recurent' : ''}
              </p>
              <p className="text-sm text-ink-600">{blockTimeLabel(b.time)}</p>
              {b.reason && <p className="text-xs italic text-ink-400">{b.reason}</p>}
            </div>
            <button
              type="button"
              onClick={() => removeBlock(b.id)}
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
              aria-label="Șterge blocajul"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ModalShell>
  );
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [leads, setLeads] = useState<LeadRow[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [showBlockedList, setShowBlockedList] = useState(false);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page) });
    if (type) params.set('type', type);
    if (status) params.set('status', status);
    if (search) params.set('search', search);

    try {
      const res = await fetch(`/api/admin/leads?${params}`);
      if (res.status === 401) {
        onLogout();
        return;
      }
      const data = await res.json();
      setLeads(data.leads ?? []);
      setTotal(data.total ?? 0);
    } finally {
      setLoading(false);
    }
  }, [page, type, status, search, onLogout]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const updateStatus = async (id: number, newStatus: LeadStatus) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, status: newStatus } : lead))
    );
    await fetch(`/api/admin/leads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    onLogout();
  };

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="min-h-screen bg-ink-50 pb-16">
      <header className="border-b border-ink-200 bg-white px-4 py-4 sm:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-ink-900">Rezervări — Arena Play</h1>
            <p className="text-sm text-ink-500">{total} cereri în total</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            icon={<LogOut className="h-4 w-4" />}
          >
            Deconectare
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-8">
        <div className="mb-4 flex flex-wrap justify-end gap-3">
          <Button variant="outline" size="sm" onClick={() => setShowBlockModal(true)} icon={<Ban className="h-4 w-4" />}>
            Blochează
          </Button>
          <Button variant="outline" size="sm" onClick={() => setShowBlockedList(true)} icon={<Eye className="h-4 w-4" />}>
            Vezi date blocate
          </Button>
          <Button size="sm" onClick={() => setShowAddModal(true)} icon={<Plus className="h-4 w-4" />}>
            Adaugă
          </Button>
        </div>

        <div className="mb-4 flex flex-wrap items-center gap-3">
          <div className="relative min-w-[220px] flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <Input
              placeholder="Caută nume, telefon, email..."
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
              className="pl-9"
            />
          </div>
          <select
            value={type}
            onChange={(e) => {
              setPage(1);
              setType(e.target.value);
            }}
            className="rounded-xl border border-ink-200 bg-white px-3 py-3 text-sm text-ink-700"
          >
            <option value="">Toate serviciile</option>
            {Object.entries(typeLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <select
            value={status}
            onChange={(e) => {
              setPage(1);
              setStatus(e.target.value);
            }}
            className="rounded-xl border border-ink-200 bg-white px-3 py-3 text-sm text-ink-700"
          >
            <option value="">Toate statusurile</option>
            {Object.entries(statusLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchLeads}
            icon={<RefreshCw className="h-4 w-4" />}
          >
            Reîmprospătează
          </Button>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-ink-200 bg-white">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-ink-200 bg-ink-50 text-xs uppercase tracking-wide text-ink-500">
              <tr>
                <th className="px-4 py-3">Data</th>
                <th className="px-4 py-3">Serviciu</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Dată dorită</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-ink-400">
                    Se încarcă...
                  </td>
                </tr>
              )}
              {!loading && leads.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-ink-400">
                    Nicio cerere găsită.
                  </td>
                </tr>
              )}
              {!loading &&
                leads.map((lead) => {
                  const expanded = expandedId === lead.id;
                  let extra: Record<string, unknown> = {};
                  try {
                    extra = JSON.parse(lead.payload);
                  } catch {
                    extra = {};
                  }
                  return (
                    <>
                      <tr
                        key={lead.id}
                        className="cursor-pointer border-b border-ink-100 last:border-0 hover:bg-ink-50"
                        onClick={() => setExpandedId(expanded ? null : lead.id)}
                      >
                        <td className="whitespace-nowrap px-4 py-3 text-ink-500">
                          {new Date(lead.created_at.replace(' ', 'T') + 'Z').toLocaleString(
                            'ro-RO',
                            {
                              day: '2-digit',
                              month: '2-digit',
                              hour: '2-digit',
                              minute: '2-digit',
                            }
                          )}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 font-medium text-ink-900">
                          {typeLabels[lead.type]}
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-medium text-ink-900">{lead.name ?? '—'}</div>
                          <div className="text-xs text-ink-500">
                            {lead.phone ?? lead.email ?? ''}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-ink-700">
                          {lead.preferred_date ?? '—'}
                          {lead.preferred_time ? ` · ${lead.preferred_time}` : ''}
                        </td>
                        <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                          <select
                            value={lead.status}
                            onChange={(e) => updateStatus(lead.id, e.target.value as LeadStatus)}
                            className={cn(
                              'rounded-full border-0 px-3 py-1.5 text-xs font-semibold',
                              statusClasses[lead.status]
                            )}
                          >
                            {Object.entries(statusLabels).map(([value, label]) => (
                              <option key={value} value={value}>
                                {label}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="px-4 py-3 text-ink-400">{expanded ? '▲' : '▼'}</td>
                      </tr>
                      {expanded && (
                        <tr className="border-b border-ink-100 bg-ink-50/60">
                          <td colSpan={6} className="px-4 py-4">
                            <dl className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
                              {Object.entries(extra)
                                .filter(
                                  ([key, value]) =>
                                    key !== 'consent' &&
                                    key !== 'website' &&
                                    key !== 'turnstileToken' &&
                                    value
                                )
                                .map(([key, value]) => (
                                  <div key={key}>
                                    <dt className="text-xs font-semibold uppercase tracking-wide text-ink-400">
                                      {key}
                                    </dt>
                                    <dd className="text-sm text-ink-800">{String(value)}</dd>
                                  </div>
                                ))}
                            </dl>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="mt-4 flex items-center justify-center gap-3">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Înapoi
            </Button>
            <span className="text-sm text-ink-500">
              Pagina {page} din {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Înainte
            </Button>
          </div>
        )}
      </main>

      {showAddModal && (
        <AddReservationModal onClose={() => setShowAddModal(false)} onCreated={fetchLeads} />
      )}
      {showBlockModal && <BlockModal onClose={() => setShowBlockModal(false)} onSaved={fetchLeads} />}
      {showBlockedList && <BlockedListModal onClose={() => setShowBlockedList(false)} />}
    </div>
  );
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    fetch('/api/admin/session')
      .then((res) => res.json())
      .then((data) => setAuthenticated(!!data.authenticated))
      .catch(() => setAuthenticated(false));
  }, []);

  if (authenticated === null) {
    return <div className="flex min-h-screen items-center justify-center bg-ink-950" />;
  }

  if (!authenticated) {
    return <LoginForm onSuccess={() => setAuthenticated(true)} />;
  }

  return <Dashboard onLogout={() => setAuthenticated(false)} />;
}
