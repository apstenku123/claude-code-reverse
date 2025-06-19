/**
 * Normalizes various forms of message input into a standardized object format.
 *
 * @param {function|string|object} messageInput - The message input, which can be:
 *   - a function that takes context and returns a string or object,
 *   - a string message,
 *   - or an object (assumed to be the normalized format already).
 * @param {any} context - The context to pass if messageInput is a function.
 * @returns {object} An object with at least a 'message' property, or the original object if already normalized.
 */
function normalizeMessageInput(messageInput, context) {
  // If messageInput is a function, call isBlobOrFileLikeObject with context
  let normalized =
    typeof messageInput === "function"
      ? messageInput(context)
      // If isBlobOrFileLikeObject'createInteractionAccessor a string, wrap isBlobOrFileLikeObject in an object with a 'message' property
      : typeof messageInput === "string"
      ? { message: messageInput }
      // Otherwise, assume isBlobOrFileLikeObject'createInteractionAccessor already an object
      : messageInput;

  // If the result is a string, wrap isBlobOrFileLikeObject in an object with a 'message' property
  return typeof normalized === "string" ? { message: normalized } : normalized;
}

module.exports = normalizeMessageInput;