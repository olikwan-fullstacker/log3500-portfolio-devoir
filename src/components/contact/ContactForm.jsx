import { useState } from 'react';

import { submitContactMessage } from '../../services/contactApi.js';

const initialFormData = {
  fullName: '',
  email: '',
  subject: '',
  message: '',
};

function validateContactForm(formData) {
  const errors = {};

  const normalizedName = formData.fullName.trim();
  const normalizedEmail = formData.email.trim();
  const normalizedSubject = formData.subject.trim();
  const normalizedMessage = formData.message.trim();

  if (!normalizedName) {
    errors.fullName = 'Le nom est obligatoire.';
  } else if (normalizedName.length < 2) {
    errors.fullName =
      'Le nom doit contenir au moins 2 caractères.';
  }

  if (!normalizedEmail) {
    errors.email = 'L’adresse électronique est obligatoire.';
  } else if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)
  ) {
    errors.email =
      'Saisissez une adresse électronique valide.';
  }

  if (!normalizedSubject) {
    errors.subject = 'Le sujet est obligatoire.';
  } else if (normalizedSubject.length < 3) {
    errors.subject =
      'Le sujet doit contenir au moins 3 caractères.';
  }

  if (!normalizedMessage) {
    errors.message = 'Le message est obligatoire.';
  } else if (normalizedMessage.length < 20) {
    errors.message =
      'Le message doit contenir au moins 20 caractères.';
  }

  return errors;
}

function ContactForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [fieldErrors, setFieldErrors] = useState({});
  const [submissionStatus, setSubmissionStatus] =
    useState('idle');
  const [submissionMessage, setSubmissionMessage] =
    useState('');

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    setFieldErrors((currentErrors) => ({
      ...currentErrors,
      [name]: '',
    }));

    setSubmissionMessage('');
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validationErrors =
      validateContactForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      setSubmissionStatus('error');
      setSubmissionMessage(
        'Corrigez les champs signalés avant de continuer.',
      );

      const firstInvalidField =
        Object.keys(validationErrors)[0];

      document
        .querySelector(`[name="${firstInvalidField}"]`)
        ?.focus();

      return;
    }

    setFieldErrors({});
    setSubmissionStatus('submitting');
    setSubmissionMessage('');

    try {
      const response = await submitContactMessage({
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      });

      setSubmissionStatus('success');
      setSubmissionMessage(
        response?.message ||
          'Votre message a été envoyé avec succès.',
      );

      setFormData(initialFormData);
    } catch (error) {
      setSubmissionStatus('error');
      setSubmissionMessage(
        error.message ||
          'Impossible d’envoyer le message.',
      );
    }
  }

  const isSubmitting =
    submissionStatus === 'submitting';

  return (
    <form
      className="contact-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <div className="form-field">
        <label htmlFor="contact-full-name">
          Nom complet
          <span aria-hidden="true"> *</span>
        </label>

        <input
          id="contact-full-name"
          name="fullName"
          type="text"
          autoComplete="name"
          value={formData.fullName}
          aria-describedby={
            fieldErrors.fullName
              ? 'contact-full-name-error'
              : undefined
          }
          aria-invalid={Boolean(fieldErrors.fullName)}
          onChange={handleChange}
        />

        {fieldErrors.fullName && (
          <p
            id="contact-full-name-error"
            className="field-error"
          >
            {fieldErrors.fullName}
          </p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="contact-email">
          Adresse électronique
          <span aria-hidden="true"> *</span>
        </label>

        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          value={formData.email}
          aria-describedby={
            fieldErrors.email
              ? 'contact-email-error'
              : undefined
          }
          aria-invalid={Boolean(fieldErrors.email)}
          onChange={handleChange}
        />

        {fieldErrors.email && (
          <p
            id="contact-email-error"
            className="field-error"
          >
            {fieldErrors.email}
          </p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="contact-subject">
          Sujet
          <span aria-hidden="true"> *</span>
        </label>

        <input
          id="contact-subject"
          name="subject"
          type="text"
          value={formData.subject}
          aria-describedby={
            fieldErrors.subject
              ? 'contact-subject-error'
              : undefined
          }
          aria-invalid={Boolean(fieldErrors.subject)}
          onChange={handleChange}
        />

        {fieldErrors.subject && (
          <p
            id="contact-subject-error"
            className="field-error"
          >
            {fieldErrors.subject}
          </p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="contact-message">
          Message
          <span aria-hidden="true"> *</span>
        </label>

        <textarea
          id="contact-message"
          name="message"
          rows="7"
          value={formData.message}
          aria-describedby={
            fieldErrors.message
              ? 'contact-message-error'
              : 'contact-message-help'
          }
          aria-invalid={Boolean(fieldErrors.message)}
          onChange={handleChange}
        />

        <p
          id="contact-message-help"
          className="field-help"
        >
          Minimum : 20 caractères.
        </p>

        {fieldErrors.message && (
          <p
            id="contact-message-error"
            className="field-error"
          >
            {fieldErrors.message}
          </p>
        )}
      </div>

      <p className="required-fields-note">
        Les champs marqués d’un astérisque sont obligatoires.
      </p>

      <button
        className="button button-primary contact-submit-button"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting
          ? 'Envoi en cours…'
          : 'Envoyer le message'}
      </button>

      {submissionMessage && (
        <p
          className={
            submissionStatus === 'success'
              ? 'form-status form-status-success'
              : 'form-status form-status-error'
          }
          role={
            submissionStatus === 'error'
              ? 'alert'
              : 'status'
          }
          aria-live="polite"
        >
          {submissionMessage}
        </p>
      )}
    </form>
  );
}

export default ContactForm;