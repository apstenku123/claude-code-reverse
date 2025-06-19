/**
 * Returns a descriptive status string based on the provided HTTP status code.
 *
 * @param {number} httpStatusCode - The HTTP status code to categorize.
 * @returns {string} a string describing the status category or specific error.
 */
function getHttpStatusCategory(httpStatusCode) {
  // 1xx, 2xx, 3xx: Treated as 'ok'
  if (httpStatusCode >= 100 && httpStatusCode < 400) {
    return "ok";
  }

  // 4xx: Client errors
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
        return "invalid_argument";
    }
  }

  // 5xx: Server errors
  if (httpStatusCode >= 500 && httpStatusCode < 600) {
    switch (httpStatusCode) {
      case 501:
        return "unimplemented";
      case 503:
        return "unavailable";
      case 504:
        return "deadline_exceeded";
      default:
        return "internal_error";
    }
  }

  // Any other status code is considered unknown
  return "unknown_error";
}

module.exports = getHttpStatusCategory;
