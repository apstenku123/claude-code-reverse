/**
 * Determines if the user is eligible to receive a subscription notice based on current config and updates state accordingly.
 *
 * This custom React hook checks the cached configuration for the user'createInteractionAccessor subscription notice count and availability.
 * If the user has received fewer than 3 notices and has an available subscription, eligibility is true.
 * It also listens for changes in subscription availability and updates the config/state as needed.
 *
 * @returns {boolean} Whether the user is currently eligible to receive a subscription notice.
 */
function useSubscriptionNoticeEligibility() {
  // Initialize eligibility state based on current config
  const [isEligible] = zC.useState(() => {
    const config = getCachedOrFreshConfig();
    const noticeCount = config.subscriptionNoticeCount ?? 0;
    const hasAvailableSubscription = config.hasAvailableSubscription;

    // User is not eligible if they'removeTrailingCharacters received 3 or more notices
    if (noticeCount >= 3) return false;
    // Otherwise, eligibility is based on subscription availability
    return hasAvailableSubscription ?? false;
  });

  // Effect: Check for subscription availability changes and update config/state
  zC.useEffect(() => {
    hasClaudeSubscription().then((hasAvailableSubscription) => {
      const config = getCachedOrFreshConfig();
      let updatedNoticeCount = config.subscriptionNoticeCount ?? 0;

      // If a new subscription is available, increment the notice count
      if (hasAvailableSubscription) updatedNoticeCount += 1;

      // If either the notice count or subscription availability has changed, update the config
      if (
        config.subscriptionNoticeCount !== updatedNoticeCount ||
        config.hasAvailableSubscription !== hasAvailableSubscription
      ) {
        updateProjectsAccessor({
          ...config,
          subscriptionNoticeCount: updatedNoticeCount,
          hasAvailableSubscription: hasAvailableSubscription
        });
      }
    });
  }, [isEligible]);

  return isEligible;
}

module.exports = useSubscriptionNoticeEligibility;