/**
 * Redacts sensitive information (such as authentication, authorization, and secrets) from error objects,
 * including their config and response properties, to prevent leaking secrets in logs or error reports.
 *
 * @param {Object} errorObject - The error object that may contain sensitive data in its config or response properties.
 * @returns {Object} The same error object, with sensitive fields redacted.
 */
function redactSensitiveErrorData(errorObject) {
  /**
   * Redacts sensitive headers from the provided headers object.
   * @param {Object} headers - The headers object to redact.
   */
  function redactHeaders(headers) {
    if (!headers) return;
    for (const headerKey of Object.keys(headers)) {
      // Redact authentication, authorization, and any header containing 'secret'
      if (/^authentication$/i.test(headerKey)) {
        headers[headerKey] = "<<REDACTED> - See `errorRedactor` option in `gaxios` for configuration>.";
      }
      if (/^authorization$/i.test(headerKey)) {
        headers[headerKey] = "<<REDACTED> - See `errorRedactor` option in `gaxios` for configuration>.";
      }
      if (/secret/i.test(headerKey)) {
        headers[headerKey] = "<<REDACTED> - See `errorRedactor` option in `gaxios` for configuration>.";
      }
    }
  }

  /**
   * Redacts sensitive string fields from the provided object.
   * @param {Object} obj - The object to redact fields from.
   * @param {string} fieldName - The field name to check and redact if necessary.
   */
  function redactSensitiveStringField(obj, fieldName) {
    if (typeof obj === "object" && obj !== null && typeof obj[fieldName] === "string") {
      const fieldValue = obj[fieldName];
      // Redact if the field value contains grant_type, assertion, or secret
      if (/grant_type=/i.test(fieldValue) || /assertion=/i.test(fieldValue) || /secret/i.test(fieldValue)) {
        obj[fieldName] = "<<REDACTED> - See `errorRedactor` option in `gaxios` for configuration>.";
      }
    }
  }

  /**
   * Redacts specific sensitive fields from the provided object.
   * @param {Object} obj - The object to redact fields from.
   */
  function redactSensitiveObjectFields(obj) {
    if (typeof obj === "object" && obj !== null) {
      if ("grant_type" in obj) {
        obj.grant_type = "<<REDACTED> - See `errorRedactor` option in `gaxios` for configuration>.";
      }
      if ("assertion" in obj) {
        obj.assertion = "<<REDACTED> - See `errorRedactor` option in `gaxios` for configuration>.";
      }
      if ("client_secret" in obj) {
        obj.client_secret = "<<REDACTED> - See `errorRedactor` option in `gaxios` for configuration>.";
      }
    }
  }

  // Redact sensitive data in config if present
  if (errorObject.config) {
    redactHeaders(errorObject.config.headers);
    redactSensitiveStringField(errorObject.config, "data");
    redactSensitiveObjectFields(errorObject.config.data);
    redactSensitiveStringField(errorObject.config, "body");
    redactSensitiveObjectFields(errorObject.config.body);
    try {
      // Attempt to redact sensitive query parameters in the URL
      const urlInstance = new Rt6.URL("", errorObject.config.url);
      if (urlInstance.searchParams.has("token")) {
        urlInstance.searchParams.set("token", "<<REDACTED> - See `errorRedactor` option in `gaxios` for configuration>.");
      }
      if (urlInstance.searchParams.has("client_secret")) {
        urlInstance.searchParams.set("client_secret", "<<REDACTED> - See `errorRedactor` option in `gaxios` for configuration>.");
      }
      errorObject.config.url = urlInstance.toString();
    } catch (err) {
      // Ignore errors in URL parsing/redaction
    }
  }

  // If the error has a response, recursively redact its config and headers/data
  if (errorObject.response) {
    redactSensitiveErrorData({ config: errorObject.response.config });
    redactHeaders(errorObject.response.headers);
    redactSensitiveStringField(errorObject.response, "data");
    redactSensitiveObjectFields(errorObject.response.data);
  }

  return errorObject;
}

module.exports = redactSensitiveErrorData;