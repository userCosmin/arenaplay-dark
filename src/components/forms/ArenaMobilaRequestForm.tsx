import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send, School, PartyPopper, CalendarHeart } from 'lucide-react';
import { FormField } from '@/components/ui/FormField';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Checkbox } from '@/components/ui/Checkbox';
import { Button } from '@/components/ui/Button';
import { FormStatus } from '@/components/ui/FormStatus';
import { Honeypot } from '@/components/ui/Honeypot';
import { arenaMobilaRequestSchema, type ArenaMobilaRequestFormData } from '@/utils/validation';
import { submitArenaMobilaRequest } from '@/services/bookingService';
import { trackEvent } from '@/utils/analytics';
import { cn } from '@/utils/cn';

const requestTypes = [
  { value: 'scoala', label: 'Școală', icon: School },
  { value: 'eveniment', label: 'Eveniment', icon: CalendarHeart },
  { value: 'privat', label: 'Petrecere privată', icon: PartyPopper },
] as const;

interface ArenaMobilaRequestFormProps {
  defaultType?: 'scoala' | 'eveniment' | 'privat';
}

export function ArenaMobilaRequestForm({ defaultType }: ArenaMobilaRequestFormProps) {
  const [result, setResult] = useState<{ status: 'success' | 'error'; message: string } | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ArenaMobilaRequestFormData>({
    resolver: zodResolver(arenaMobilaRequestSchema),
    defaultValues: { requestType: defaultType },
  });

  const selectedType = watch('requestType');

  const onSubmit = async (data: ArenaMobilaRequestFormData) => {
    try {
      const response = await submitArenaMobilaRequest(data);
      setResult({ status: 'success', message: response.message });
      trackEvent('arena_mobila_form_submit', { requestType: data.requestType });
      reset();
    } catch {
      setResult({ status: 'error', message: 'A apărut o eroare. Te rugăm să încerci din nou sau să ne suni direct.' });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <Honeypot registration={register('website')} />
      <FormField label="Tip solicitare" htmlFor="am-type" required error={errors.requestType?.message}>
        <div className="grid grid-cols-3 gap-3">
          {requestTypes.map((type) => {
            const isActive = selectedType === type.value;
            return (
              <button
                key={type.value}
                type="button"
                onClick={() => setValue('requestType', type.value, { shouldValidate: true })}
                className={cn(
                  'flex flex-col items-center gap-2 rounded-2xl border-2 px-3 py-4 text-sm font-semibold transition-colors',
                  isActive ? 'border-arenamobila bg-arenamobila/10 text-arenamobila-dark' : 'border-ink-200 text-ink-500 hover:border-arenamobila/50'
                )}
              >
                <type.icon className="h-5 w-5" aria-hidden="true" />
                {type.label}
              </button>
            );
          })}
        </div>
        <input type="hidden" {...register('requestType')} />
      </FormField>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField label="Nume / Organizație" htmlFor="am-name" required error={errors.nameOrOrganization?.message}>
          <Input id="am-name" placeholder="Nume sau organizație" hasError={!!errors.nameOrOrganization} {...register('nameOrOrganization')} />
        </FormField>
        <FormField label="Telefon" htmlFor="am-phone" required error={errors.phone?.message}>
          <Input id="am-phone" type="tel" placeholder="07XX XXX XXX" hasError={!!errors.phone} {...register('phone')} />
        </FormField>
      </div>

      <FormField label="E-mail (opțional)" htmlFor="am-email" error={errors.email?.message}>
        <Input id="am-email" type="email" placeholder="nume@exemplu.ro" hasError={!!errors.email} {...register('email')} />
      </FormField>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField label="Localitate" htmlFor="am-locality" required error={errors.locality?.message}>
          <Input id="am-locality" placeholder="ex: Alba Iulia" hasError={!!errors.locality} {...register('locality')} />
        </FormField>
        <FormField label="Locație (opțional)" htmlFor="am-location" error={errors.location?.message}>
          <Input id="am-location" placeholder="Adresă / nume locație" {...register('location')} />
        </FormField>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField label="Dată estimată" htmlFor="am-date" required error={errors.eventDate?.message}>
          <Input id="am-date" type="date" hasError={!!errors.eventDate} {...register('eventDate')} />
        </FormField>
        <FormField label="Participanți estimați" htmlFor="am-participants" required error={errors.participants?.message}>
          <Input id="am-participants" placeholder="ex: 100" hasError={!!errors.participants} {...register('participants')} />
        </FormField>
      </div>

      <FormField label="Mesaj (opțional)" htmlFor="am-message" error={errors.message?.message}>
        <Textarea id="am-message" placeholder="Detalii despre eveniment, spațiu, durată..." {...register('message')} />
      </FormField>

      <Checkbox
        id="am-consent"
        label="Sunt de acord cu prelucrarea datelor personale în scopul procesării acestei cereri."
        hasError={!!errors.consent}
        {...register('consent')}
      />
      {errors.consent && <p className="-mt-3 text-sm text-red-600">{errors.consent.message}</p>}

      {result && <FormStatus status={result.status} message={result.message} />}

      <Button type="submit" accent="arenamobila" size="lg" disabled={isSubmitting} icon={<Send className="h-4 w-4" />}>
        {isSubmitting ? 'Se trimite...' : 'Solicită ofertă'}
      </Button>
      <p className="text-xs text-ink-400">Această solicitare nu reprezintă o rezervare confirmată.</p>
    </form>
  );
}
