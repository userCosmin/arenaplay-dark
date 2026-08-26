import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send } from 'lucide-react';
import { FormField } from '@/components/ui/FormField';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Checkbox } from '@/components/ui/Checkbox';
import { Button } from '@/components/ui/Button';
import { FormStatus } from '@/components/ui/FormStatus';
import { Honeypot } from '@/components/ui/Honeypot';
import { partyBookingSchema, type PartyBookingFormData } from '@/utils/validation';
import { submitPartyBooking } from '@/services/bookingService';
import { trackEvent } from '@/utils/analytics';
import { partyPackages } from '@/data/packages';

interface PartyBookingFormProps {
  defaultPackageId?: string;
}

export function PartyBookingForm({ defaultPackageId }: PartyBookingFormProps) {
  const [result, setResult] = useState<{ status: 'success' | 'error'; message: string } | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PartyBookingFormData>({
    resolver: zodResolver(partyBookingSchema),
    defaultValues: { packageId: defaultPackageId ?? '' },
  });

  const onSubmit = async (data: PartyBookingFormData) => {
    try {
      const response = await submitPartyBooking(data);
      setResult({ status: 'success', message: response.message });
      trackEvent('reservation_form_submit', { service: 'petreceri', package: data.packageId });
      reset();
    } catch {
      setResult({ status: 'error', message: 'A apărut o eroare. Te rugăm să încerci din nou sau să ne suni direct.' });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <Honeypot registration={register('website')} />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField label="Nume complet" htmlFor="party-name" required error={errors.name?.message}>
          <Input id="party-name" placeholder="Numele tău" hasError={!!errors.name} {...register('name')} />
        </FormField>
        <FormField label="Telefon" htmlFor="party-phone" required error={errors.phone?.message}>
          <Input id="party-phone" type="tel" placeholder="07XX XXX XXX" hasError={!!errors.phone} {...register('phone')} />
        </FormField>
      </div>

      <FormField label="E-mail (opțional)" htmlFor="party-email" error={errors.email?.message}>
        <Input id="party-email" type="email" placeholder="nume@exemplu.ro" hasError={!!errors.email} {...register('email')} />
      </FormField>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField label="Dată dorită" htmlFor="party-date" required error={errors.preferredDate?.message}>
          <Input id="party-date" type="date" hasError={!!errors.preferredDate} {...register('preferredDate')} />
        </FormField>
        <FormField label="Număr de copii" htmlFor="party-kids" required error={errors.kidsCount?.message}>
          <Input id="party-kids" placeholder="ex: 12" hasError={!!errors.kidsCount} {...register('kidsCount')} />
        </FormField>
      </div>

      <FormField label="Pachet dorit" htmlFor="party-package" required error={errors.packageId?.message}>
        <Select id="party-package" hasError={!!errors.packageId} {...register('packageId')}>
          <option value="">Alege un pachet</option>
          {partyPackages.map((pkg) => (
            <option key={pkg.id} value={pkg.id}>
              {pkg.name} — {pkg.price} {pkg.priceUnit}
            </option>
          ))}
        </Select>
      </FormField>

      <FormField label="Mesaj (opțional)" htmlFor="party-message" error={errors.message?.message}>
        <Textarea id="party-message" placeholder="Detalii suplimentare despre petrecere..." {...register('message')} />
      </FormField>

      <Checkbox
        id="party-consent"
        label="Sunt de acord cu prelucrarea datelor personale în scopul procesării acestei cereri."
        hasError={!!errors.consent}
        {...register('consent')}
      />
      {errors.consent && <p className="-mt-3 text-sm text-red-600">{errors.consent.message}</p>}

      {result && <FormStatus status={result.status} message={result.message} />}

      <Button type="submit" accent="petreceri" size="lg" disabled={isSubmitting} icon={<Send className="h-4 w-4" />}>
        {isSubmitting ? 'Se trimite...' : 'Rezervă petrecerea'}
      </Button>
      <p className="text-xs text-ink-400">
        Trimiterea formularului nu reprezintă o rezervare confirmată automat — echipa noastră te contactează pentru confirmare.
      </p>
    </form>
  );
}
