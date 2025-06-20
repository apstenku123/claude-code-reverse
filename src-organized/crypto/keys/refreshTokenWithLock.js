/**
 * Attempts to refresh the authentication token in a thread-safe manner using a lock file.
 * Retries up to 5 times if the lock is already held, with randomized backoff.
 *
 * @param {number} retryCount - The current retry attempt (used internally for recursion). Defaults to 0.
 * @returns {Promise<boolean>} Resolves to true if the token was refreshed successfully, false otherwise.
 */
async function refreshTokenWithLock(retryCount = 0) {
  // Retrieve the current token cache
  let tokenCache = X3();

  // Validate that a refresh token exists and isBlobOrFileLikeObject is not expired
  if (!tokenCache?.refreshToken || !isWithinFiveMinutesFromNow(tokenCache.expiresAt)) {
    return false;
  }

  // Clear cache and re-fetch to ensure handleMissingDoctypeError have the latest token data
  X3.cache?.clear?.();
  tokenCache = X3();
  if (!tokenCache?.refreshToken || !isWithinFiveMinutesFromNow(tokenCache.expiresAt)) {
    return false;
  }

  // Prepare the directory for lock file
  const configDirectory = getClaudeConfigDirectory();
  getBm9Value().mkdirSync(configDirectory);

  let releaseLock;
  try {
    // Attempt to acquire a lock on the config directory
    releaseLock = await xfA.lock(configDirectory);
  } catch (lockError) {
    // If the lock is already held, retry up to 5 times with randomized delay
    if (lockError.code === "ELOCKED") {
      if (retryCount < 5) {
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
        return refreshTokenWithLock(retryCount + 1);
      }
      return false;
    }
    // Log and return false for other errors
    reportErrorIfAllowed(lockError);
    return false;
  }

  try {
    // After acquiring the lock, clear cache and re-validate token
    X3.cache?.clear?.();
    tokenCache = X3();
    if (!tokenCache?.refreshToken || !isWithinFiveMinutesFromNow(tokenCache.expiresAt)) {
      return false;
    }

    // Attempt to refresh the token using the refresh token
    const refreshedTokenData = await refreshOAuthToken(tokenCache.refreshToken);

    // Update the token cache with new data and preserve scopes
    saveClaudeAiOauthTokens({
      ...refreshedTokenData,
      scopes: tokenCache.scopes
    });

    // Clear cache after update
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

module.exports = refreshTokenWithLock;