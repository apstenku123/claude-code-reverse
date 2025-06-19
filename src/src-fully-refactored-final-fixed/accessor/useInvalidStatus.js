/**
 * Custom React hook to determine and manage the validity status of a resource.
 * Handles loading, missing, valid, invalid, and error states, and provides a method to re-verify the status.
 *
 * @returns {Object} An object containing the current status, a reverify function, and any error encountered.
 *   - status {string}: One of 'valid', 'loading', 'missing', 'invalid', or 'error'.
 *   - reverify {Function}: Async function to re-check the validity status.
 *   - error {Error|null}: Any error encountered during verification, or null if none.
 */
function useInvalidStatus() {
  // State for the current status: 'valid', 'loading', 'missing', 'invalid', or 'error'
  const [status, setStatus] = KA1.useState(() => {
    const resource = getAnthropicApiKey(false); // Attempt to get the resource
    // If not in a valid session or scopes are present, consider valid
    if (!isAnthropicApiKeyMissing() || OY(X3()?.scopes)) return "valid";
    // If resource exists, handleMissingDoctypeError're loading
    if (resource) return "loading";
    // Otherwise, resource is missing
    return "missing";
  });

  // State for any error encountered during verification
  const [error, setError] = KA1.useState(null);

  /**
   * Attempts to re-verify the validity status asynchronously.
   * Updates status and error state accordingly.
   */
  const reverify = KA1.useCallback(async () => {
    // If not in a valid session or scopes are present, do nothing
    if (!isAnthropicApiKeyMissing() || OY(X3()?.scopes)) return;
    const resource = getAnthropicApiKey(false);
    // If resource is missing, set status to 'missing' and exit
    if (!resource) {
      setStatus("missing");
      return;
    }
    try {
      // Attempt to verify the resource; set status based on result
      const isValid = await validateApiKeyWithTestMessage(resource, false);
      setStatus(isValid ? "valid" : "invalid");
      return;
    } catch (verificationError) {
      // On error, set error state and status to 'error'
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

module.exports = useInvalidStatus;