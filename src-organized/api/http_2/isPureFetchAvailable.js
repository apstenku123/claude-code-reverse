/**
 * Checks if a pure (unmodified) fetch implementation is available in the current environment.
 * This function attempts several strategies:
 *   1. Detects if running in Edge Runtime.
 *   2. Checks if the environment is a browser-like environment.
 *   3. Checks if window.fetch is pure.
 *   4. Attempts to create a sandboxed iframe and check if its fetch is pure.
 *
 * @returns {boolean} True if a pure fetch implementation is available, false otherwise.
 */
function isPureFetchAvailable() {
  // 1. Check for Edge Runtime environment
  if (typeof EdgeRuntime === "string") {
    return true;
  }

  // 2. Check if running in a browser-like environment
  if (!vE1()) {
    return false;
  }

  // 3. Check if window.fetch is pure
  if (isNativeFetchFunction(w21.fetch)) {
    return true;
  }

  // 4. Try to create a sandboxed iframe and check if its fetch is pure
  let isIframeFetchPure = false;
  const documentRef = w21.document;

  if (documentRef && typeof documentRef.createElement === "function") {
    try {
      // Create a hidden iframe
      const iframe = documentRef.createElement("iframe");
      iframe.hidden = true;
      documentRef.head.appendChild(iframe);

      // Check if the iframe'createInteractionAccessor contentWindow has a pure fetch
      if (
        iframe.contentWindow &&
        iframe.contentWindow.fetch
      ) {
        isIframeFetchPure = isNativeFetchFunction(iframe.contentWindow.fetch);
      }

      // Clean up the iframe
      documentRef.head.removeChild(iframe);
    } catch (error) {
      // Log a warning in debug builds if iframe creation fails
      if (Ud2.DEBUG_BUILD) {
        Nd2.logger.warn(
          "Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ",
          error
        );
      }
    }
  }

  return isIframeFetchPure;
}

module.exports = isPureFetchAvailable;