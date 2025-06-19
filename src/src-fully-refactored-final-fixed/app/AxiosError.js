/**
 * @class AxiosError
 * @extends Error
 * @description
 * Custom error class for Axios-related errors. Captures stack trace and attaches additional Axios-specific properties such as code, config, request, response, and status.
 *
 * @param {string} message - The error message describing what went wrong.
 * @param {string} [code] - Optional error code (e.g., 'ECONNABORTED').
 * @param {object} [config] - Optional Axios request configuration object associated with the error.
 * @param {object} [request] - Optional request object that generated the error.
 * @param {object} [response] - Optional response object received (if any) when the error occurred.
 *
 * @returns {AxiosError} An instance of AxiosError with all relevant properties set.
 */
function AxiosError(message, code, config, request, response) {
  // Call the Error constructor to initialize the base Error properties
  Error.call(this);

  // Capture stack trace if available (useAppState engines)
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    // Fallback for environments without captureStackTrace
    this.stack = new Error().stack;
  }

  // Set the error message
  this.message = message;
  // Set the error name to distinguish this error type
  this.name = 'AxiosError';

  // Attach optional error code if provided
  if (code) {
    this.code = code;
  }

  // Attach Axios config if provided
  if (config) {
    this.config = config;
  }

  // Attach request object if provided
  if (request) {
    this.request = request;
  }

  // Attach response object and status if provided
  if (response) {
    this.response = response;
    // Set status to response.status if available, otherwise null
    this.status = response.status ? response.status : null;
  }
}

module.exports = AxiosError;