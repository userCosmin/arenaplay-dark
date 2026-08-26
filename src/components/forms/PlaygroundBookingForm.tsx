import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send } from 'lucide-react';
import { FormField } from '@/components/ui/FormField';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Checkbox } from '@/components/ui/Checkbox';
import { Button } from '@/components/ui/Button';
import { FormStatus } from '@/components/ui/FormStatus';
import { Honeypot } from '@/components/ui/Honeypot';
import { playgroundBookingSchema, type PlaygroundBookingFormData } from '@/utils/validation';
import { submitPlaygroundBooking } from '@/services/bookingService';
import { trackEvent } from '@/utils/analytics';

export function PlaygroundBookingForm() {
  const [result, setResult] = useState<{ status: 'success' | 'error'; message: string } | null>(null);
  const {
    register,
    handleSubmit,
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
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField label="Nume complet" htmlFor="pg-name" required error={errors.name?.message}>
          <Input id="pg-name" placeholder="Numele tău" hasError={!!errors.name} {...register('name')} />
        </FormField>
        <FormField label="Telefon" htmlFor="pg-phone" required error={errors.phone?.message}>
          <Input id="pg-phone" type="tel" placeholder="07XX XXX XXX" hasError={!!errors.phone} {...register('phone')} />
        </FormField>
      </div>

      <FormField label="E-mail (opțional)" htmlFor="pg-email" error={errors.email?.message}>
        <Input id="pg-email" type="email" placeholder="nume@exemplu.ro" hasError={!!errors.email} {...register('email')} />
      </FormField>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField label="Dată dorită" htmlFor="pg-date" required error={errors.preferredDate?.message}>
          <Input id="pg-date" type="date" hasError={!!errors.preferredDate} {...register('preferredDate')} />
        </FormField>
        <FormField label="Interval orar" htmlFor="pg-time" required error={errors.preferredTime?.message}>
          <Input id="pg-time" type="time" hasError={!!errors.preferredTime} {...register('preferredTime')} />
        </FormField>
      </div>

      <FormField label="Număr de persoane" htmlFor="pg-people" required error={errors.peopleCount?.message}>
        <Input id="pg-people" placeholder="ex: 4" hasError={!!errors.peopleCount} {...register('peopleCount')} />
      </FormField>

      <FormField label="Mesaj (opțional)" htmlFor="pg-message" error={errors.message?.message}>
        <Textarea id="pg-message" placeholder="Activități preferate, ocazie specială..." {...register('message')} />
      </FormField>

      <Checkbox
        id="pg-consent"
        label="Sunt de acord cu prelucrarea datelor personale în scopul procesării acestei cereri."
        hasError={!!errors.consent}
        {...register('consent')}
      />
      {errors.consent && <p className="-mt-3 text-sm text-red-600">{errors.consent.message}</p>}

      {result && <FormStatus status={result.status} message={result.message} />}

      <Button type="submit" accent="playground" size="lg" disabled={isSubmitting} icon={<Send className="h-4 w-4" />}>
        {isSubmitting ? 'Se trimite...' : 'Rezervă Loc de joacă'}
      </Button>
    </form>
  );
}
