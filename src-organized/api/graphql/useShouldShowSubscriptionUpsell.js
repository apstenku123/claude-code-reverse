/**
 * Determines whether the subscription upsell prompt should be shown to the user,
 * and updates the count of times isBlobOrFileLikeObject has been shown. Uses React hooks for state and effect management.
 *
 * @returns {boolean} Whether the subscription upsell should be shown.
 */
function useShouldShowSubscriptionUpsell() {
  // Determine if the upsell should be shown based on config and shown count
  const [shouldShowUpsell] = X$.useState(() => {
    const config = getCachedOrFreshConfig();
    const recommendedSubscription = config.recommendedSubscription || "";
    const upsellShownCount = config.subscriptionUpsellShownCount ?? 0;

    // Only show upsell for specific subscription types and if not shown 5+ times
    const eligibleSubscriptions = ["pro", "max5x", "max20x"];
    if (!eligibleSubscriptions.includes(recommendedSubscription) || upsellShownCount >= 5) {
      return false;
    }
    return true;
  });

  // Effect: If upsell is shown, increment the shown count and log the event
  X$.useEffect(() => {
    if (shouldShowUpsell) {
      const config = getCachedOrFreshConfig();
      const currentShownCount = config.subscriptionUpsellShownCount ?? 0;
      const newShownCount = currentShownCount + 1;

      // Only update if the count has changed
      if (config.subscriptionUpsellShownCount !== newShownCount) {
        updateProjectsAccessor({
          ...config,
          subscriptionUpsellShownCount: newShownCount
        });
        logTelemetryEventIfEnabled("tengu_subscription_upsell_shown", {});
      }
    }
  }, [shouldShowUpsell]);

  return shouldShowUpsell;
}

module.exports = useShouldShowSubscriptionUpsell;