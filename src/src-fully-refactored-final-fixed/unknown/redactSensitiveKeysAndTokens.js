/**
 * Redacts sensitive API keys, tokens, and credentials from the provided input string.
 * This function scans the input for common patterns of API keys, AWS keys, GCP keys, service account emails,
 * and other sensitive values, replacing them with redacted placeholders.
 *
 * @param {string} input - The string potentially containing sensitive information.
 * @returns {string} The input string with sensitive information redacted.
 */
function redactSensitiveKeysAndTokens(input) {
  let redacted = input;

  // Redact "sk-ant..." API keys inside double quotes
  redacted = redacted.replace(
    /"(sk-ant[^\s"']{24,})"/g,
    '"[REDACTED_API_KEY]"'
  );

  // Redact sk-ant keys not inside quotes
  redacted = redacted.replace(
    /(?<![a-zA-Z0-9"'])(sk-ant-?[a-zA-Z0-9_-]{10,})(?![a-zA-Z0-9"'])/g,
    '[REDACTED_API_KEY]'
  );

  // Redact AWS key in the format: AWS key: "AWS..."
  redacted = redacted.replace(
    /AWS key: "(AWS[a-zA-Z0-9]{20,})"/g,
    'AWS key: "[REDACTED_AWS_KEY]"'
  );

  // Redact AWS Access Key IDs (AKIA...)
  redacted = redacted.replace(
    /(AKIA[a-zA-Z0-9]{16})/g,
    '[REDACTED_AWS_KEY]'
  );

  // Redact Google API keys (AIza...)
  redacted = redacted.replace(
    /(?<![a-zA-Z0-9])(AIza[a-zA-Z0-9_-]{35})(?![a-zA-Z0-9])/g,
    '[REDACTED_GCP_KEY]'
  );

  // Redact GCP service account emails
  redacted = redacted.replace(
    /(?<![a-zA-Z0-9])([a-zA-Z0-9-]+@[a-zA-Z0-9-]+\.iam\.gserviceaccount\.com)(?![a-zA-Z0-9])/g,
    '[REDACTED_GCP_SERVICE_ACCOUNT]'
  );

  // Redact x-api-key assignments (e.g., x-api-key: 'value')
  redacted = redacted.replace(
    /(["']?x-api-key["']?\s*[:=]\s*["']?)[^"',\s)}\]]+/gi,
    '$1[REDACTED_API_KEY]'
  );

  // Redact authorization headers/tokens (e.g., authorization: Bearer ...)
  redacted = redacted.replace(
    /(["']?authorization["']?\s*[:=]\s*["']?(bearer\s+)?)[^"',\s)}\]]+/gi,
    '$1[REDACTED_TOKEN]'
  );

  // Redact AWS environment/config values (e.g., AWS_SECRET=...)
  redacted = redacted.replace(
    /(AWS[_-][a-z0-9_]+\s*[=:]\s*)["']?[^"',\s)}\]]+["']?/gi,
    '$1[REDACTED_AWS_VALUE]'
  );

  // Redact Google environment/config values (e.g., GOOGLE_API_KEY=...)
  redacted = redacted.replace(
    /(GOOGLE[_-][a-z0-9_]+\s*[=:]\s*)["']?[^"',\s)}\]]+["']?/gi,
    '$1[REDACTED_GCP_VALUE]'
  );

  // Redact generic API keys, tokens, secrets, and passwords
  redacted = redacted.replace(
    /((API[-_]?KEY|TOKEN|SECRET|PASSWORD)\s*[=:]\s*)["']?[^"',\s)}\]]+["']?/gi,
    '$1[REDACTED]'
  );

  return redacted;
}

module.exports = redactSensitiveKeysAndTokens;