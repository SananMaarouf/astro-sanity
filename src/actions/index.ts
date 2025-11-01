import { defineAction } from 'astro:actions';
import { Resend } from 'resend';
import { ActionError } from 'astro:actions';
import { z } from 'zod';

const resend = new Resend(import.meta.env.RESEND_API_KEY);
const recipientEmail = import.meta.env.RESEND_RECIPIENT_EMAIL;

export const server = {
  contact: defineAction({
    accept: 'form',
    input: z.object({
      name: z.string().min(2, 'Name must be at least 2 characters'),
      email: z.string().email('Please enter a valid email address'),
      message: z.string().min(10, 'Message must be at least 10 characters'),
    }),
    handler: async (input) => {
      try {
        const { name, email, message } = input;

        // Validate environment variables
        if (!import.meta.env.RESEND_API_KEY) {
          throw new ActionError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Email service is not configured. Please contact support.',
          });
        }

        if (!recipientEmail) {
          throw new ActionError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Recipient email is not configured. Please contact support.',
          });
        }

        const { data, error } = await resend.emails.send({
          from: 'New booking inquiry <onboarding@resend.dev>',
          to: [recipientEmail],
          replyTo: email,
          subject: `New Contact Form Message from ${name}`,
          html: `
            <h2>Inquiry</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
          `,
        });

        if (error) {
          console.error('Resend error:', error);
          throw new ActionError({
            code: 'BAD_REQUEST',
            message: 'Failed to send email. Please try again later.',
          });
        }

        return { 
          success: true, 
          message: 'Thank you for your message! We will get back to you soon.' 
        };
      } catch (error) {
        // If it's already an ActionError, rethrow it
        if (error instanceof ActionError) {
          throw error;
        }

        // Log unexpected errors
        console.error('Unexpected error in contact action:', error);

        // Throw a generic error for unexpected issues
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An unexpected error occurred. Please try again later.',
        });
      }
    },
  }),
};