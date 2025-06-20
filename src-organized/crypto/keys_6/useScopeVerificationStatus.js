/**
 * Custom React hook to manage and verify the status of user scopes.
 *
 * This hook determines the current verification status of user scopes, provides a method to re-verify,
 * and exposes any errors encountered during the verification process.
 *
 * @returns {Object} An object containing the current status, a reverify function, and any error encountered.
 *   - status {string}: One of 'valid', 'invalid', 'missing', 'loading', or 'error'.
 *   - reverify {Function}: Function to trigger re-verification of scopes.
 *   - error {Error|null}: Any error encountered during verification, or null if none.
 */
function useScopeVerificationStatus() {
  // status: current verification status
  // setStatus: function to update the status
  const [status, setStatus] = KA1.useState(() => {
    const token = getAnthropicApiKey(false); // Attempt to retrieve token
    // If user is not signed in or scopes are already valid, status is 'valid'
    if (!isAnthropicApiKeyMissing() || OY(X3()?.scopes)) return "valid";
    // If token exists, handleMissingDoctypeError are loading
    if (token) return "loading";
    // Otherwise, scopes are missing
    return "missing";
  });

  // error: stores any error encountered during verification
  // setError: function to update the error
  const [error, setError] = KA1.useState(null);

  /**
   * Triggers re-verification of user scopes.
   * Updates status and error state accordingly.
   */
  const reverify = KA1.useCallback(async () => {
    // If user is not signed in or scopes are already valid, do nothing
    if (!isAnthropicApiKeyMissing() || OY(X3()?.scopes)) return;
    const token = getAnthropicApiKey(false);
    // If no token is present, set status to 'missing'
    if (!token) {
      setStatus("missing");
      return;
    }
    try {
      // Attempt to verify scopes with the token
      const isValid = await validateApiKeyWithTestMessage(token, false);
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

module.exports = useScopeVerificationStatus;