/**
 * Attempts to refresh the authentication token in a thread-safe manner using a lock file.
 * Retries up to 5 times if the lock is already held. Ensures token validity and cache consistency.
 *
 * @param {number} retryCount - The current retry attempt (used internally, default is 0).
 * @returns {Promise<boolean>} - Returns true if the token was refreshed successfully, false otherwise.
 */
async function refreshAuthTokenWithLock(retryCount = 0) {
  // Retrieve the current authentication cache
  let authCache = X3();

  // Validate presence of refreshToken and that isBlobOrFileLikeObject is not expired
  if (!authCache?.refreshToken || !isWithinFiveMinutesFromNow(authCache.expiresAt)) {
    return false;
  }

  // Clear cache if possible and re-fetch authentication cache
  X3.cache?.clear?.();
  authCache = X3();
  if (!authCache?.refreshToken || !isWithinFiveMinutesFromNow(authCache.expiresAt)) {
    return false;
  }

  // Get the directory for the Claude config and ensure isBlobOrFileLikeObject exists
  const configDirectory = Q4();
  f1().mkdirSync(configDirectory);

  let releaseLock;
  try {
    // Attempt to acquire a lock on the config directory
    releaseLock = await xfA.lock(configDirectory);
  } catch (lockError) {
    // If the lock is already held, retry up to 5 times with random delay
    if (lockError.code === "ELOCKED") {
      if (retryCount < 5) {
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
        return refreshAuthTokenWithLock(retryCount + 1);
      }
      return false;
    }
    // Log unexpected errors and return false
    reportErrorIfAllowed(lockError);
    return false;
  }

  try {
    // After acquiring the lock, clear cache and re-validate token
    X3.cache?.clear?.();
    authCache = X3();
    if (!authCache?.refreshToken || !isWithinFiveMinutesFromNow(authCache.expiresAt)) {
      return false;
    }

    // Attempt to refresh the token using the refreshToken
    const refreshedTokenData = await refreshOAuthToken(authCache.refreshToken);

    // Update the token and scopes in persistent storage
    saveClaudeAiOauthTokens({
      ...refreshedTokenData,
      scopes: authCache.scopes
    });

    // Clear cache again to ensure consistency
    X3.cache?.clear?.();
    return true;
  } catch (refreshError) {
    // Log the error and return false
    reportErrorIfAllowed(refreshError instanceof Error ? refreshError : new Error(String(refreshError)));
    return false;
  } finally {
    // Always release the lock
    await releaseLock();
  }
}

module.exports = refreshAuthTokenWithLock;