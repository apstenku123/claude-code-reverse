/**
 * Attempts to refresh the access token if isBlobOrFileLikeObject'createInteractionAccessor about to expire, using a file lock to prevent concurrent refreshes.
 * Retries up to 5 times if the lock is already held by another process.
 *
 * @param {number} retryCount - The current retry attempt (should be left as default for callers).
 * @returns {Promise<boolean>} - Returns true if the token was refreshed successfully, false otherwise.
 */
async function refreshAccessTokenWithLock(retryCount = 0) {
  // Retrieve the current token cache
  let tokenCache = X3();

  // Check if the refresh token exists and is not expiring soon
  if (!tokenCache?.refreshToken || !isWithinFiveMinutesFromNow(tokenCache.expiresAt)) {
    return false;
  }

  // Clear cache and re-fetch token cache to ensure latest state
  X3.cache?.clear?.();
  tokenCache = X3();
  if (!tokenCache?.refreshToken || !isWithinFiveMinutesFromNow(tokenCache.expiresAt)) {
    return false;
  }

  // Prepare the lock directory path
  const lockDirectory = Q4();
  f1().mkdirSync(lockDirectory);

  let releaseLock;
  try {
    // Attempt to acquire a file lock to prevent concurrent refreshes
    releaseLock = await xfA.lock(lockDirectory);
  } catch (lockError) {
    // If the lock is already held, retry up to 5 times with a delay
    if (lockError.code === "ELOCKED") {
      if (retryCount < 5) {
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
        return refreshAccessTokenWithLock(retryCount + 1);
      }
      return false;
    }
    // Log unexpected errors and return false
    reportErrorIfAllowed(lockError);
    return false;
  }

  try {
    // Clear cache and re-fetch token cache again after acquiring lock
    X3.cache?.clear?.();
    tokenCache = X3();
    if (!tokenCache?.refreshToken || !isWithinFiveMinutesFromNow(tokenCache.expiresAt)) {
      return false;
    }

    // Attempt to refresh the access token using the refresh token
    const refreshedTokenData = await refreshOAuthToken(tokenCache.refreshToken);
    saveClaudeAiOauthTokens({
      ...refreshedTokenData,
      scopes: tokenCache.scopes
    });
    // Clear cache after updating token
    X3.cache?.clear?.();
    return true;
  } catch (refreshError) {
    // Log errors and return false
    reportErrorIfAllowed(refreshError instanceof Error ? refreshError : new Error(String(refreshError)));
    return false;
  } finally {
    // Always release the file lock
    await releaseLock();
  }
}

module.exports = refreshAccessTokenWithLock;