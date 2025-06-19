/**
 * Formats the results of a source observable into an array of text message objects.
 * Optionally adds ephemeral cache control metadata based on the provided configuration.
 *
 * @param {any} sourceObservable - The observable or data source to extract subscriptions from.
 * @param {object} [config=isPromptCachingEnabled()] - Optional configuration object. If truthy, adds ephemeral cache control to each message.
 * @returns {Array<object>} Array of formatted text message objects, each with optional cache control metadata.
 */
function formatSubscriptionsAsTextMessages(sourceObservable, config = isPromptCachingEnabled()) {
  // Map each subscription from the source to a text message object
  return splitFirstLineAndRest(sourceObservable).map(subscription => ({
    type: "text",
    text: subscription,
    // If config is truthy, add ephemeral cache control metadata
    ...(config ? {
      cache_control: {
        type: "ephemeral"
      }
    } : {})
  }));
}

module.exports = formatSubscriptionsAsTextMessages;