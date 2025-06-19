/**
 * Maps an HTTP status code to a standardized error code string.
 *
 * This function interprets HTTP status codes and returns a corresponding
 * application-level error code string for use in error handling and messaging.
 *
 * @param {number} httpStatusCode - The HTTP status code to map.
 * @returns {string} The mapped error code string.
 */
function mapHttpStatusToErrorCode(httpStatusCode) {
  // 100-399: Success or informational responses
  if (httpStatusCode >= 100 && httpStatusCode < 400) {
    return "ok";
  }

  // 400-499: Client errors
  if (httpStatusCode >= 400 && httpStatusCode < 500) {
    switch (httpStatusCode) {
      case 401:
        return "unauthenticated";
      case 403:
        return "permission_denied";
      case 404:
        return "not_found";
      case 409:
        return "already_exists";
      case 413:
        return "failed_precondition";
      case 429:
        return "resource_exhausted";
      default:
        // Any other 4xx error is considered an invalid argument
        return "invalid_argument";
    }
  }

  // 500-599: Server errors
  if (httpStatusCode >= 500 && httpStatusCode < 600) {
    switch (httpStatusCode) {
      case 501:
        return "unimplemented";
      case 503:
        return "unavailable";
      case 504:
        return "deadline_exceeded";
      default:
        // Any other 5xx error is considered an internal error
        return "internal_error";
    }
  }

  // Any other status code is considered unknown
  return "unknown_error";
}

module.exports = mapHttpStatusToErrorCode;
