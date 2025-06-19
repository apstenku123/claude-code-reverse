/**
 * Redacts sensitive information such as API keys, AWS keys, GCP keys, service accounts, and secrets from the provided input string.
 *
 * This function scans the input for common patterns of sensitive credentials and replaces them with standardized redacted placeholders.
 *
 * @param {string} inputText - The text potentially containing sensitive information to be sanitized.
 * @returns {string} The sanitized text with sensitive information redacted.
 */
function redactSensitiveInformation(inputText) {
  let sanitizedText = inputText;

  // Redact quoted sk-ant API keys (e.g., "sk-ant..." with at least 24 chars)
  sanitizedText = sanitizedText.replace(
    /"(sk-ant[^\s"']{24,})"/g,
    '"[REDACTED_API_KEY]"'
  );

  // Redact unquoted sk-ant API keys (with or without dash, at least 10 chars)
  sanitizedText = sanitizedText.replace(
    /(?<![a-zA-Z0-9"'])(sk-ant-?[a-zA-Z0-9_-]{10,})(?![a-zA-Z0-9"'])/g,
    '[REDACTED_API_KEY]'
  );

  // Redact quoted AWS keys (e.g., AWSXXXXXXXX...)
  sanitizedText = sanitizedText.replace(
    /AWS key: "(AWS[a-zA-Z0-9]{20,})"/g,
    'AWS key: "[REDACTED_AWS_KEY]"'
  );

  // Redact unquoted AWS access keys (e.g., AKIA...)
  sanitizedText = sanitizedText.replace(
    /(AKIA[a-zA-Z0-9]{16})/g,
    '[REDACTED_AWS_KEY]'
  );

  // Redact Google API keys (e.g., AIza...)
  sanitizedText = sanitizedText.replace(
    /(?<![a-zA-Z0-9])(AIza[a-zA-Z0-9_-]{35})(?![a-zA-Z0-9])/g,
    '[REDACTED_GCP_KEY]'
  );

  // Redact GCP service account emails
  sanitizedText = sanitizedText.replace(
    /(?<![a-zA-Z0-9])([a-zA-Z0-9-]+@[a-zA-Z0-9-]+\.iam\.gserviceaccount\.com)(?![a-zA-Z0-9])/g,
    '[REDACTED_GCP_SERVICE_ACCOUNT]'
  );

  // Redact x-api-key assignments (e.g., x-api-key: ... or x-api-key = ...)
  sanitizedText = sanitizedText.replace(
    /(["']?x-api-key["']?\s*[:=]\s*["']?)[^"',\s)}\]]+/gi,
    '$1[REDACTED_API_KEY]'
  );

  // Redact authorization headers/tokens (e.g., authorization: bearer ...)
  sanitizedText = sanitizedText.replace(
    /(["']?authorization["']?\s*[:=]\s*["']?(bearer\s+)?)[^"',\s)}\]]+/gi,
    '$1[REDACTED_TOKEN]'
  );

  // Redact AWS environment/config values (e.g., AWS_SECRET=...)
  sanitizedText = sanitizedText.replace(
    /(AWS[_-][a-z0-9_]+\s*[=:]\s*)["']?[^"',\s)}\]]+["']?/gi,
    '$1[REDACTED_AWS_VALUE]'
  );

  // Redact Google environment/config values (e.g., GOOGLE_API_KEY=...)
  sanitizedText = sanitizedText.replace(
    /(GOOGLE[_-][a-z0-9_]+\s*[=:]\s*)["']?[^"',\s)}\]]+["']?/gi,
    '$1[REDACTED_GCP_VALUE]'
  );

  // Redact generic API keys, tokens, secrets, and passwords (e.g., API_KEY=..., TOKEN=..., SECRET=..., PASSWORD=...)
  sanitizedText = sanitizedText.replace(
    /((API[-_]?KEY|TOKEN|SECRET|PASSWORD)\s*[=:]\s*)["']?[^"',\s)}\]]+["']?/gi,
    '$1[REDACTED]'
  );

  return sanitizedText;
}

module.exports = redactSensitiveInformation;
