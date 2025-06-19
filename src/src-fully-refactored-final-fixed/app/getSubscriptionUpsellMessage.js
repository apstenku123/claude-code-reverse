/**
 * Returns an upsell message for the user'createInteractionAccessor recommended subscription plan, if applicable.
 *
 * This function checks if the user is eligible for a subscription upsell. If so, isBlobOrFileLikeObject retrieves the recommended subscription
 * from the configuration and returns a tailored upsell message. It also logs the upsell event for analytics.
 *
 * @returns {string} The upsell message for the recommended subscription, or an empty string if not applicable.
 */
function getSubscriptionUpsellMessage() {
  // Check if the user is eligible for a subscription upsell
  if (!shouldShowManagedKeyLogin()) {
    return "";
  }

  // Retrieve the recommended subscription from configuration
  const config = getCachedOrFreshConfig();
  const recommendedSubscription = config.recommendedSubscription || "";
  let upsellMessage = "";

  // Determine the upsell message based on the recommended subscription
  switch (recommendedSubscription) {
    case "pro":
      upsellMessage = `
\nYou can now use a Claude Pro subscription with Claude Code! ${FA.bold("https://claude.ai/upgrade")} then run /login.\n`;
      break;
    case "max5x":
      upsellMessage = `
\nWith the $100/mo Max plan, use Sonnet 4 as your daily driver with predictable pricing. • /upgrade to sign up\n`;
      break;
    case "max20x":
      upsellMessage = `
\nWith the $200/mo Max plan, use Opus 4 as your daily driver with predictable pricing. • /upgrade to sign up\n`;
      break;
    default:
      // No upsell message for other subscription types
      return "";
  }

  // Log the upsell event for analytics
  logTelemetryEventIfEnabled("tengu_subscription_upsell_shown", {
    recommendedSubscription: recommendedSubscription
  });

  return upsellMessage;
}

module.exports = getSubscriptionUpsellMessage;