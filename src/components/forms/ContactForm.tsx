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
import { contactFormSchema, type ContactFormData } from '@/utils/validation';
import { submitContactForm } from '@/services/bookingService';
import { trackEvent } from '@/utils/analytics';

export function ContactForm() {
  const [result, setResult] = useState<{ status: 'success' | 'error'; message: string } | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({ resolver: zodResolver(contactFormSchema) });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await submitContactForm(data);
      setResult({ status: 'success', message: response.message });
      trackEvent('contact_form_submit');
      reset();
    } catch {
      setResult({ status: 'error', message: 'A apărut o eroare. Te rugăm să încerci din nou sau să ne suni direct.' });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <Honeypot registration={register('website')} />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField label="Nume complet" htmlFor="c-name" required error={errors.name?.message}>
          <Input id="c-name" placeholder="Numele tău" hasError={!!errors.name} {...register('name')} />
        </FormField>
        <FormField label="Telefon" htmlFor="c-phone" required error={errors.phone?.message}>
          <Input id="c-phone" type="tel" placeholder="07XX XXX XXX" hasError={!!errors.phone} {...register('phone')} />
        </FormField>
      </div>

      <FormField label="E-mail" htmlFor="c-email" required error={errors.email?.message}>
        <Input id="c-email" type="email" placeholder="nume@exemplu.ro" hasError={!!errors.email} {...register('email')} />
      </FormField>

      <FormField label="Subiect" htmlFor="c-subject" required error={errors.subject?.message}>
        <Input id="c-subject" placeholder="Despre ce este vorba?" hasError={!!errors.subject} {...register('subject')} />
      </FormField>

      <FormField label="Mesaj" htmlFor="c-message" required error={errors.message?.message}>
        <Textarea id="c-message" placeholder="Scrie-ne mesajul tău..." hasError={!!errors.message} {...register('message')} />
      </FormField>

      <Checkbox
        id="c-consent"
        label="Sunt de acord cu prelucrarea datelor personale în scopul procesării acestei cereri."
        hasError={!!errors.consent}
        {...register('consent')}
      />
      {errors.consent && <p className="-mt-3 text-sm text-red-600">{errors.consent.message}</p>}

      {result && <FormStatus status={result.status} message={result.message} />}

      <Button type="submit" accent="brand" size="lg" disabled={isSubmitting} icon={<Send className="h-4 w-4" />}>
        {isSubmitting ? 'Se trimite...' : 'Trimite mesajul'}
      </Button>
    </form>
  );
}
