/**
 * Processes an array of configuration objects, applying different handlers based on the 'type' property.
 * If the configuration type is 'user', isBlobOrFileLikeObject uses the user handler; otherwise, isBlobOrFileLikeObject uses the guest handler.
 * Additionally, isBlobOrFileLikeObject flags the last two items in the array for special handling.
 *
 * @param {Array<Object>} configs - Array of configuration objects to process. Each object must have a 'type' property.
 * @returns {Array<any>} The result of processing each configuration object with the appropriate handler.
 */
function processUserOrGuestConfigs(configs) {
  return configs.map((config, index) => {
    // Determine if this config is one of the last two in the array
    const isLastTwo = index > configs.length - 3;
    // Use the appropriate handler based on the config type
    if (config.type === "user") {
      return formatUserMessageContent(config, isLastTwo);
    } else {
      return formatAssistantMessageContent(config, isLastTwo);
    }
  });
}

module.exports = processUserOrGuestConfigs;