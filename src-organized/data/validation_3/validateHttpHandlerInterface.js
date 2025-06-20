/**
 * Validates that the provided handler object implements the required HTTP interface methods.
 * Throws an NI error if any required method is missing or invalid.
 *
 * @param {object} handler - The handler object to validate. Must implement specific HTTP lifecycle methods.
 * @param {string} httpMethod - The HTTP method for the request (e.g., 'GET', 'POST', 'CONNECT').
 * @param {boolean} isUpgrade - Indicates if the request is an upgrade (e.g., WebSocket upgrade).
 * @throws {NI} If the handler does not implement required methods or has invalid method types.
 */
function validateHttpHandlerInterface(handler, httpMethod, isUpgrade) {
  // Ensure handler is a non-null object
  if (!handler || typeof handler !== "object") {
    throw new NI("handler must be an object");
  }

  // Validate required methods for all handlers
  if (typeof handler.onConnect !== "function") {
    throw new NI("invalid onConnect method");
  }
  if (typeof handler.onError !== "function") {
    throw new NI("invalid onError method");
  }
  // onBodySent is optional, but if present, must be a function
  if (typeof handler.onBodySent !== "function" && handler.onBodySent !== undefined) {
    throw new NI("invalid onBodySent method");
  }

  // For upgrade requests (isUpgrade true or HTTP method is CONNECT), require onUpgrade
  if (isUpgrade || httpMethod === "CONNECT") {
    if (typeof handler.onUpgrade !== "function") {
      throw new NI("invalid onUpgrade method");
    }
  } else {
    // For standard HTTP requests, require onHeaders, onData, and onComplete
    if (typeof handler.onHeaders !== "function") {
      throw new NI("invalid onHeaders method");
    }
    if (typeof handler.onData !== "function") {
      throw new NI("invalid onData method");
    }
    if (typeof handler.onComplete !== "function") {
      throw new NI("invalid onComplete method");
    }
  }
}

module.exports = validateHttpHandlerInterface;
