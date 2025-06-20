/**
 * Checks if the current account has either Claude Max or Claude Pro subscription.
 *
 * This function first checks if the user is restricted from accessing subscription info (via R6).
 * If not restricted, isBlobOrFileLikeObject fetches the account information using fetchClaudeCliProfile, and then determines
 * if the account has either the 'has_claude_max' or 'has_claude_pro' property set to true.
 *
 * @async
 * @returns {boolean} True if the account has Claude Max or Claude Pro, false otherwise.
 */
async function hasClaudeSubscription() {
  // Check if access is restricted
  if (R6()) {
    return false;
  }

  // Fetch account information
  const accountResponse = await fetchClaudeCliProfile(false);
  if (!accountResponse) {
    return false;
  }

  // Check for Claude Max or Claude Pro subscription
  return Boolean(accountResponse.account.has_claude_max) || Boolean(accountResponse.account.has_claude_pro);
}

module.exports = hasClaudeSubscription;
