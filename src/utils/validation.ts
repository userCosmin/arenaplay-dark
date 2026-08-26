import { z } from 'zod';

const phoneRegex = /^(\+?4?0)[0-9\s.-]{8,13}$/;

export const nameSchema = z
  .string()
  .trim()
  .min(2, 'Numele trebuie să aibă minimum 2 caractere.')
  .max(80, 'Numele este prea lung.');

export const phoneSchema = z
  .string()
  .trim()
  .regex(phoneRegex, 'Introdu un număr de telefon valid (ex: 07XX XXX XXX).');

export const emailSchema = z.string().trim().email('Introdu o adresă de e-mail validă.');

export const optionalEmailSchema = z.union([emailSchema, z.literal('')]).optional();

export const messageSchema = z.string().trim().max(1000, 'Mesajul este prea lung (maximum 1000 caractere).').optional();

export const consentSchema = z
  .boolean()
  .refine((val) => val === true, { message: 'Trebuie să fii de acord cu prelucrarea datelor.' });

/** Honeypot anti-spam field — must stay empty; bots tend to fill every input they find. */
export const honeypotSchema = z.string().max(0, 'Solicitare respinsă.').optional();

/** Petreceri booking form */
export const partyBookingSchema = z.object({
  name: nameSchema,
  phone: phoneSchema,
  email: optionalEmailSchema,
  preferredDate: z.string().min(1, 'Alege o dată dorită.'),
  kidsCount: z.string().min(1, 'Introdu numărul aproximativ de copii.'),
  packageId: z.string().min(1, 'Alege un pachet.'),
  message: messageSchema,
  website: honeypotSchema,
  consent: consentSchema,
});
export type PartyBookingFormData = z.infer<typeof partyBookingSchema>;

/** Playground reservation form */
export const playgroundBookingSchema = z.object({
  name: nameSchema,
  phone: phoneSchema,
  email: optionalEmailSchema,
  preferredDate: z.string().min(1, 'Alege o dată dorită.'),
  preferredTime: z.string().min(1, 'Alege un interval orar.'),
  peopleCount: z.string().min(1, 'Introdu numărul de persoane.'),
  message: messageSchema,
  website: honeypotSchema,
  consent: consentSchema,
});
export type PlaygroundBookingFormData = z.infer<typeof playgroundBookingSchema>;

/** Afterschool enrollment form */
export const afterschoolEnrollSchema = z.object({
  parentName: nameSchema,
  phone: phoneSchema,
  email: emailSchema,
  childName: nameSchema,
  childGrade: z.string().min(1, 'Alege clasa copilului.'),
  school: z.string().trim().max(120).optional(),
  message: messageSchema,
  website: honeypotSchema,
  consent: consentSchema,
});
export type AfterschoolEnrollFormData = z.infer<typeof afterschoolEnrollSchema>;

/** Arena Mobilă quote request form */
export const arenaMobilaRequestSchema = z.object({
  requestType: z.enum(['scoala', 'eveniment', 'privat'], {
    errorMap: () => ({ message: 'Alege tipul solicitării.' }),
  }),
  nameOrOrganization: nameSchema,
  phone: phoneSchema,
  email: optionalEmailSchema,
  locality: z.string().trim().min(2, 'Introdu localitatea.'),
  location: z.string().trim().max(160).optional(),
  eventDate: z.string().min(1, 'Alege data estimată.'),
  participants: z.string().min(1, 'Introdu numărul estimativ de participanți.'),
  message: messageSchema,
  website: honeypotSchema,
  consent: consentSchema,
});
export type ArenaMobilaRequestFormData = z.infer<typeof arenaMobilaRequestSchema>;

/** Generic contact form */
export const contactFormSchema = z.object({
  name: nameSchema,
  phone: phoneSchema,
  email: emailSchema,
  subject: z.string().trim().min(2, 'Introdu un subiect.').max(120),
  message: z.string().trim().min(5, 'Mesajul trebuie să aibă minimum 5 caractere.').max(1000),
  website: honeypotSchema,
  consent: consentSchema,
});
export type ContactFormData = z.infer<typeof contactFormSchema>;
