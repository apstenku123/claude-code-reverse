/**
 * Custom React hook to determine and manage the validity status of a resource (e.g., authentication scopes).
 * Provides current status, a method to re-verify, and any error encountered during verification.
 *
 * @returns {Object} An object containing:
 *   - status {string}: One of 'valid', 'invalid', 'missing', 'loading', or 'error'.
 *   - reverify {Function}: Async function to re-check the validity status.
 *   - error {Error|null}: Any error encountered during verification, or null if none.
 */
function useInvalidStatusAccessor() {
  // State for the current status: 'valid', 'invalid', 'missing', 'loading', or 'error'
  const [status, setStatus] = KA1.useState(() => {
    // getAnthropicApiKey returns a resource or token, or falsy if missing
    const resource = getAnthropicApiKey(false);
    // isAnthropicApiKeyMissing checks if the environment is ready; OY checks if scopes are valid
    if (!isAnthropicApiKeyMissing() || OY(X3()?.scopes)) {
      return "valid";
    }
    if (resource) {
      return "loading";
    }
    return "missing";
  });

  // State for any error encountered during verification
  const [error, setError] = KA1.useState(null);

  /**
   * Re-verify the validity status asynchronously.
   * Updates status and error state accordingly.
   */
  const reverify = KA1.useCallback(async () => {
    // If environment is not ready or scopes are already valid, do nothing
    if (!isAnthropicApiKeyMissing() || OY(X3()?.scopes)) return;
    const resource = getAnthropicApiKey(false);
    if (!resource) {
      setStatus("missing");
      return;
    }
    try {
      // validateApiKeyWithTestMessage checks the validity of the resource; returns truthy if valid
      const isValid = await validateApiKeyWithTestMessage(resource, false);
      setStatus(isValid ? "valid" : "invalid");
      return;
    } catch (verificationError) {
      setError(verificationError);
      setStatus("error");
      return;
    }
  }, []);

  return {
    status,
    reverify,
    error
  };
}

module.exports = useInvalidStatusAccessor;