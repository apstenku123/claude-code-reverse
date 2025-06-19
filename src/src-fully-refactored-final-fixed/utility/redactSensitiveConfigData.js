/**
 * Redacts sensitive authentication, authorization, and secret data from gaxios request/response config objects.
 * This includes headers, body, data, and URL query parameters. Recursively processes nested response configs.
 *
 * @param {Object} errorObject - The error object containing config and/or response properties to redact.
 * @returns {Object} The same error object, with sensitive data redacted.
 */
function redactSensitiveConfigData(errorObject) {
  /**
   * Redacts sensitive fields in the headers object.
   * @param {Object} headers - The headers object to redact.
   */
  function redactHeaders(headers) {
    if (!headers) return;
    for (const headerKey of Object.keys(headers)) {
      // Redact authentication, authorization, or any header containing 'secret'
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
   * Redacts sensitive data in a string property of an object.
   * @param {Object} obj - The object containing the property.
   * @param {string} propertyName - The property name to check and redact if needed.
   */
  function redactStringProperty(obj, propertyName) {
    if (typeof obj === "object" && obj !== null && typeof obj[propertyName] === "string") {
      const propertyValue = obj[propertyName];
      // Redact if the string contains grant_type, assertion, or secret
      if (/grant_type=/i.test(propertyValue) || /assertion=/i.test(propertyValue) || /secret/i.test(propertyValue)) {
        obj[propertyName] = "<<REDACTED> - See `errorRedactor` option in `gaxios` for configuration>.";
      }
    }
  }

  /**
   * Redacts sensitive fields in an object (e.g., data or body).
   * @param {Object} dataObject - The object to redact.
   */
  function redactDataObject(dataObject) {
    if (typeof dataObject === "object" && dataObject !== null) {
      if ("grant_type" in dataObject) {
        dataObject.grant_type = "<<REDACTED> - See `errorRedactor` option in `gaxios` for configuration>.";
      }
      if ("assertion" in dataObject) {
        dataObject.assertion = "<<REDACTED> - See `errorRedactor` option in `gaxios` for configuration>.";
      }
      if ("client_secret" in dataObject) {
        dataObject.client_secret = "<<REDACTED> - See `errorRedactor` option in `gaxios` for configuration>.";
      }
    }
  }

  // Redact sensitive data in the config object if present
  if (errorObject.config) {
    redactHeaders(errorObject.config.headers);
    redactStringProperty(errorObject.config, "data");
    redactDataObject(errorObject.config.data);
    redactStringProperty(errorObject.config, "body");
    redactDataObject(errorObject.config.body);

    // Redact sensitive query parameters in the URL
    try {
      // Rt6.URL is assumed to be a WHATWG URL polyfill or similar
      const urlObject = new Rt6.URL("", errorObject.config.url);
      if (urlObject.searchParams.has("token")) {
        urlObject.searchParams.set("token", "<<REDACTED> - See `errorRedactor` option in `gaxios` for configuration>.");
      }
      if (urlObject.searchParams.has("client_secret")) {
        urlObject.searchParams.set("client_secret", "<<REDACTED> - See `errorRedactor` option in `gaxios` for configuration>.");
      }
      errorObject.config.url = urlObject.toString();
    } catch (err) {
      // Ignore URL parsing errors
    }
  }

  // If there is a response, recursively redact its config and its headers/data
  if (errorObject.response) {
    redactSensitiveConfigData({ config: errorObject.response.config });
    redactHeaders(errorObject.response.headers);
    redactStringProperty(errorObject.response, "data");
    redactDataObject(errorObject.response.data);
  }

  return errorObject;
}

module.exports = redactSensitiveConfigData;