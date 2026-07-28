async function submitContactMessage(contactData) {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(contactData),
  });

  let responseData = null;

  try {
    responseData = await response.json();
  } catch {
    // La réponse ne contient pas de JSON exploitable.
  }

  if (!response.ok) {
    throw new Error(
      responseData?.message ||
        `Erreur du serveur : HTTP ${response.status}.`,
    );
  }

  return responseData;
}

export { submitContactMessage };