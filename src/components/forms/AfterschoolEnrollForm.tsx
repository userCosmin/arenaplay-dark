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
import { afterschoolEnrollSchema, type AfterschoolEnrollFormData } from '@/utils/validation';
import { submitAfterschoolEnroll } from '@/services/bookingService';
import { trackEvent } from '@/utils/analytics';

const grades = ['Pregătitoare', 'Clasa I', 'Clasa a II-a', 'Clasa a III-a', 'Clasa a IV-a'];

export function AfterschoolEnrollForm() {
  const [result, setResult] = useState<{ status: 'success' | 'error'; message: string } | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AfterschoolEnrollFormData>({ resolver: zodResolver(afterschoolEnrollSchema) });

  const onSubmit = async (data: AfterschoolEnrollFormData) => {
    try {
      const response = await submitAfterschoolEnroll(data);
      setResult({ status: 'success', message: response.message });
      trackEvent('afterschool_form_submit', { service: 'afterschool' });
      reset();
    } catch {
      setResult({ status: 'error', message: 'A apărut o eroare. Te rugăm să încerci din nou sau să ne suni direct.' });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <Honeypot registration={register('website')} />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField label="Nume părinte" htmlFor="as-parent" required error={errors.parentName?.message}>
          <Input id="as-parent" placeholder="Numele tău" hasError={!!errors.parentName} {...register('parentName')} />
        </FormField>
        <FormField label="Telefon" htmlFor="as-phone" required error={errors.phone?.message}>
          <Input id="as-phone" type="tel" placeholder="07XX XXX XXX" hasError={!!errors.phone} {...register('phone')} />
        </FormField>
      </div>

      <FormField label="E-mail" htmlFor="as-email" required error={errors.email?.message}>
        <Input id="as-email" type="email" placeholder="nume@exemplu.ro" hasError={!!errors.email} {...register('email')} />
      </FormField>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField label="Numele copilului" htmlFor="as-child" required error={errors.childName?.message}>
          <Input id="as-child" placeholder="Numele copilului" hasError={!!errors.childName} {...register('childName')} />
        </FormField>
        <FormField label="Clasa" htmlFor="as-grade" required error={errors.childGrade?.message}>
          <Select id="as-grade" hasError={!!errors.childGrade} {...register('childGrade')}>
            <option value="">Alege clasa</option>
            {grades.map((grade) => (
              <option key={grade} value={grade}>
                {grade}
              </option>
            ))}
          </Select>
        </FormField>
      </div>

      <FormField label="Școala (opțional)" htmlFor="as-school" error={errors.school?.message}>
        <Input id="as-school" placeholder="Numele școlii" {...register('school')} />
      </FormField>

      <FormField label="Mesaj (opțional)" htmlFor="as-message" error={errors.message?.message}>
        <Textarea id="as-message" placeholder="Întrebări sau detalii suplimentare..." {...register('message')} />
      </FormField>

      <Checkbox
        id="as-consent"
        label="Sunt de acord cu prelucrarea datelor personale în scopul procesării acestei cereri."
        hasError={!!errors.consent}
        {...register('consent')}
      />
      {errors.consent && <p className="-mt-3 text-sm text-red-600">{errors.consent.message}</p>}

      {result && <FormStatus status={result.status} message={result.message} />}

      <Button type="submit" accent="afterschool" size="lg" disabled={isSubmitting} icon={<Send className="h-4 w-4" />}>
        {isSubmitting ? 'Se trimite...' : 'Trimite solicitarea'}
      </Button>
      <p className="text-xs text-ink-400">Aceasta este o solicitare de înscriere/interes, nu o confirmare automată a locului.</p>
    </form>
  );
}
