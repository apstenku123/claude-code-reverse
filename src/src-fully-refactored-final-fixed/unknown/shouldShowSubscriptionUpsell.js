/**
 * Determines whether the subscription upsell prompt should be shown to the user,
 * based on their current subscription status and how many times the upsell has already been shown.
 * If the upsell is shown, increments the shown count in the configuration.
 *
 * @returns {boolean} True if the upsell should be shown, false otherwise.
 */
function shouldShowSubscriptionUpsell() {
  // useState to determine if the upsell should be shown
  const [shouldShowUpsell] = X$.useState(() => {
    const config = getCachedOrFreshConfig();
    const currentSubscription = config.recommendedSubscription || "";
    const upsellShownCount = config.subscriptionUpsellShownCount ?? 0;

    // Only show upsell for specific subscription types and if shown less than 5 times
    const allowedSubscriptions = ["pro", "max5x", "max20x"];
    if (!allowedSubscriptions.includes(currentSubscription) || upsellShownCount >= 5) {
      return false;
    }
    return true;
  });

  // useEffect to increment the upsell shown count if the upsell is being shown
  X$.useEffect(() => {
    if (shouldShowUpsell) {
      const config = getCachedOrFreshConfig();
      const currentCount = config.subscriptionUpsellShownCount ?? 0;
      const newCount = currentCount + 1;

      // Only update if the count has actually changed
      if (config.subscriptionUpsellShownCount !== newCount) {
        updateProjectsAccessor({
          ...config,
          subscriptionUpsellShownCount: newCount
        });
        logTelemetryEventIfEnabled("tengu_subscription_upsell_shown", {});
      }
    }
  }, [shouldShowUpsell]);

  return shouldShowUpsell;
}

module.exports = shouldShowSubscriptionUpsell;