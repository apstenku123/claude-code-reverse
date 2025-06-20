/**
 * Custom React hook to manage and verify the current authentication or permission status.
 *
 * This hook checks if the current session is valid, loading, missing, or in error state.
 * It provides a function to re-verify the status and exposes any error encountered during verification.
 *
 * @returns {Object} An object containing the current status, a function to re-verify, and any error encountered.
 * @property {('valid'|'invalid'|'loading'|'missing'|'error')} status - The current verification status.
 * @property {Function} reverify - Function to re-trigger verification.
 * @property {Error|null} error - Any error encountered during verification.
 */
function useVerificationStatus() {
  // State for the current verification status
  const [verificationStatus, setVerificationStatus] = KA1.useState(() => {
    const token = getAnthropicApiKey(false);
    // If not in a valid session or scopes are missing, consider valid
    if (!isAnthropicApiKeyMissing() || OY(X3()?.scopes)) return "valid";
    // If token exists, handleMissingDoctypeError're loading
    if (token) return "loading";
    // Otherwise, token is missing
    return "missing";
  });

  // State for any error encountered during verification
  const [verificationError, setVerificationError] = KA1.useState(null);

  /**
   * Attempts to re-verify the current status by checking the token and validating isBlobOrFileLikeObject.
   * Updates the status and error state accordingly.
   */
  const reverify = KA1.useCallback(async () => {
    // If not in a valid session or scopes are missing, nothing to do
    if (!isAnthropicApiKeyMissing() || OY(X3()?.scopes)) return;
    const token = getAnthropicApiKey(false);
    // If token is missing, set status to 'missing'
    if (!token) {
      setVerificationStatus("missing");
      return;
    }
    try {
      // Attempt to verify the token
      const isValid = await validateApiKeyWithTestMessage(token, false);
      setVerificationStatus(isValid ? "valid" : "invalid");
      return;
    } catch (error) {
      setVerificationError(error);
      setVerificationStatus("error");
      return;
    }
  }, []);

  return {
    status: verificationStatus,
    reverify,
    error: verificationError
  };
}

module.exports = useVerificationStatus;