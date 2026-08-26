import type {
  PartyBookingFormData,
  PlaygroundBookingFormData,
  AfterschoolEnrollFormData,
  ArenaMobilaRequestFormData,
  ContactFormData,
} from '@/utils/validation';
import { postLead, type ApiResponse } from './api';

/**
 * Submission services — each posts to the Cloudflare Pages Function at
 * /api/lead (see functions/api/lead.ts), which emails a formatted summary
 * via Resend to the configured notification inbox.
 */

export async function submitPartyBooking(payload: PartyBookingFormData): Promise<ApiResponse> {
  return postLead('petreceri', payload);
}

export async function submitPlaygroundBooking(payload: PlaygroundBookingFormData): Promise<ApiResponse> {
  return postLead('playground', payload);
}

export async function submitAfterschoolEnroll(payload: AfterschoolEnrollFormData): Promise<ApiResponse> {
  return postLead('afterschool', payload);
}

export async function submitArenaMobilaRequest(payload: ArenaMobilaRequestFormData): Promise<ApiResponse> {
  return postLead('arena-mobila', payload);
}

export async function submitContactForm(payload: ContactFormData): Promise<ApiResponse> {
  return postLead('contact', payload);
}
