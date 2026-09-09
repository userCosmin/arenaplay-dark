import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { Lock, LogOut, RefreshCw, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
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

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [leads, setLeads] = useState<LeadRow[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);

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
                                    key !== 'consent' && key !== 'website' && key !== 'turnstileToken' && value
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
