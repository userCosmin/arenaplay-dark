import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send } from 'lucide-react';
import { FormField } from '@/components/ui/FormField';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Checkbox } from '@/components/ui/Checkbox';
import { Button } from '@/components/ui/Button';
import { FormStatus } from '@/components/ui/FormStatus';
import { Honeypot } from '@/components/ui/Honeypot';
import { TimeSlotPicker } from '@/components/ui/TimeSlotPicker';
import { TurnstileWidget } from '@/components/ui/Turnstile';
import { playgroundBookingSchema, type PlaygroundBookingFormData } from '@/utils/validation';
import { submitPlaygroundBooking } from '@/services/bookingService';
import { trackEvent } from '@/utils/analytics';
import { partyTimeSlots } from '@/data/packages';

const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;

export function PlaygroundBookingForm() {
  const [result, setResult] = useState<{ status: 'success' | 'error'; message: string } | null>(null);
  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PlaygroundBookingFormData>({ resolver: zodResolver(playgroundBookingSchema) });

  const onSubmit = async (data: PlaygroundBookingFormData) => {
    try {
      const response = await submitPlaygroundBooking(data);
      setResult({ status: 'success', message: response.message });
      trackEvent('playground_reservation_submit', { service: 'playground' });
      reset();
    } catch {
      setResult({ status: 'error', message: 'A apărut o eroare. Te rugăm să încerci din nou sau să ne suni direct.' });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <Honeypot registration={register('website')} />

      <FormField label="Nume" htmlFor="pg-name" required error={errors.name?.message}>
        <Input id="pg-name" placeholder="Introduceți numele" hasError={!!errors.name} {...register('name')} />
      </FormField>

      <FormField label="Data Rezervării" htmlFor="pg-date" required error={errors.preferredDate?.message}>
        <Input id="pg-date" type="date" hasError={!!errors.preferredDate} {...register('preferredDate')} />
      </FormField>

      <Controller
        control={control}
        name="preferredTime"
        render={({ field }) => (
          <FormField label="Ora Dorită" htmlFor="pg-time" required error={errors.preferredTime?.message}>
            <TimeSlotPicker
              slots={partyTimeSlots}
              value={field.value ?? ''}
              onChange={(label) => setValue('preferredTime', label, { shouldValidate: true })}
              hasError={!!errors.preferredTime}
            />
          </FormField>
        )}
      />

      <FormField label="Număr de telefon" htmlFor="pg-phone" required error={errors.phone?.message}>
        <Input id="pg-phone" type="tel" placeholder="Introduceți numărul de telefon" hasError={!!errors.phone} {...register('phone')} />
      </FormField>

      <FormField label="E-mail (opțional)" htmlFor="pg-email" error={errors.email?.message}>
        <Input id="pg-email" type="email" placeholder="nume@exemplu.ro" hasError={!!errors.email} {...register('email')} />
      </FormField>

      <FormField label="Mesaj" htmlFor="pg-message" required error={errors.message?.message}>
        <Textarea
          id="pg-message"
          placeholder="Câte persoane/copii vor participa și eventuale cerințe speciale."
          {...register('message')}
        />
      </FormField>

      <Checkbox
        id="pg-consent"
        label="Sunt de acord cu prelucrarea datelor personale în scopul procesării acestei cereri."
        hasError={!!errors.consent}
        {...register('consent')}
      />
      {errors.consent && <p className="-mt-3 text-sm text-red-600">{errors.consent.message}</p>}

      {turnstileSiteKey && (
        <TurnstileWidget
          siteKey={turnstileSiteKey}
          onVerify={(token) => setValue('turnstileToken', token)}
          onExpire={() => setValue('turnstileToken', undefined)}
        />
      )}

      {result && <FormStatus status={result.status} message={result.message} />}

      <Button type="submit" accent="playground" size="lg" disabled={isSubmitting} icon={<Send className="h-4 w-4" />}>
        {isSubmitting ? 'Se trimite...' : 'Rezervă acum'}
      </Button>
      <p className="text-xs text-ink-400">
        După completare veți fi contactat pe numărul de telefon introdus, pentru confirmare.
      </p>
    </form>
  );
}
