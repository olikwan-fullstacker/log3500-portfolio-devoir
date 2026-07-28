import { randomUUID } from 'node:crypto';
import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import express from 'express';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(currentFilePath);

const app = express();

const port = Number(process.env.PORT) || 3000;
const distPath = path.join(currentDirectory, 'dist');

const messagesFilePath =
  process.env.MESSAGES_FILE_PATH ||
  path.join(currentDirectory, 'messages.json');

app.disable('x-powered-by');

app.use(
  express.json({
    limit: '20kb',
  }),
);

function normalizeString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function validateContactData(payload) {
  const cleanData = {
    fullName: normalizeString(payload.fullName),
    email: normalizeString(payload.email).toLowerCase(),
    subject: normalizeString(payload.subject),
    message: normalizeString(payload.message),
  };

  const errors = {};

  if (cleanData.fullName.length < 2) {
    errors.fullName =
      'Le nom doit contenir au moins 2 caractères.';
  } else if (cleanData.fullName.length > 100) {
    errors.fullName =
      'Le nom ne peut pas dépasser 100 caractères.';
  }

  if (!cleanData.email) {
    errors.email =
      'L’adresse électronique est obligatoire.';
  } else if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanData.email)
  ) {
    errors.email =
      'L’adresse électronique est invalide.';
  } else if (cleanData.email.length > 254) {
    errors.email =
      'L’adresse électronique est trop longue.';
  }

  if (cleanData.subject.length < 3) {
    errors.subject =
      'Le sujet doit contenir au moins 3 caractères.';
  } else if (cleanData.subject.length > 150) {
    errors.subject =
      'Le sujet ne peut pas dépasser 150 caractères.';
  }

  if (cleanData.message.length < 20) {
    errors.message =
      'Le message doit contenir au moins 20 caractères.';
  } else if (cleanData.message.length > 5000) {
    errors.message =
      'Le message ne peut pas dépasser 5 000 caractères.';
  }

  return {
    cleanData,
    errors,
  };
}

async function readMessages() {
  try {
    const fileContent = await readFile(
      messagesFilePath,
      'utf8',
    );

    const parsedMessages = JSON.parse(fileContent);

    return Array.isArray(parsedMessages)
      ? parsedMessages
      : [];
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }

    throw error;
  }
}

/*
 * La file d’attente empêche deux écritures simultanées
 * de modifier messages.json au même instant.
 */
let persistenceQueue = Promise.resolve();

function persistMessage(message) {
  const currentOperation = persistenceQueue.then(
    async () => {
      const messages = await readMessages();

      messages.push(message);

      await writeFile(
        messagesFilePath,
        `${JSON.stringify(messages, null, 2)}\n`,
        'utf8',
      );
    },
  );

  persistenceQueue = currentOperation.catch(() => {});

  return currentOperation;
}

app.get('/api/health', (_request, response) => {
  response.status(200).json({
    status: 'ok',
    service: 'LOG3500 Portfolio API',
  });
});

app.post('/api/contact', async (request, response, next) => {
  try {
    const { cleanData, errors } =
      validateContactData(request.body ?? {});

    if (Object.keys(errors).length > 0) {
      return response.status(400).json({
        message:
          'Les données du formulaire sont invalides.',
        errors,
      });
    }

    const savedMessage = {
      id: randomUUID(),
      ...cleanData,
      receivedAt: new Date().toISOString(),
    };

    await persistMessage(savedMessage);

    return response.status(201).json({
      message:
        'Votre message a été enregistré avec succès.',
      messageId: savedMessage.id,
    });
  } catch (error) {
    return next(error);
  }
});

app.use('/api', (request, response) => {
  response.status(404).json({
    message: `Route API introuvable : ${request.method} ${request.originalUrl}`,
  });
});

/*
 * Lorsque npm run build a produit dist,
 * Express sert l’application React.
 */
if (existsSync(distPath)) {
  app.use(express.static(distPath));

  app.get('/{*splat}', (_request, response) => {
    response.sendFile(
      path.join(distPath, 'index.html'),
    );
  });
}

app.use((error, request, response, next) => {
  if (response.headersSent) {
    return next(error);
  }

  console.error(
    `${request.method} ${request.originalUrl}`,
    error,
  );

  if (
    error instanceof SyntaxError &&
    error.status === 400 &&
    'body' in error
  ) {
    return response.status(400).json({
      message: 'Le contenu JSON envoyé est invalide.',
    });
  }

  return response.status(500).json({
    message:
      'Une erreur interne empêche le traitement de la requête.',
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(
    `Serveur LOG3500 actif sur le port ${port}.`,
  );
});