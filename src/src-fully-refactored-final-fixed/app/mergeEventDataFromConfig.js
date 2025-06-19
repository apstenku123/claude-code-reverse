/**
 * Merges event-related data from a configuration object into a target event object.
 * Drops undefined keys from each config property before merging.
 * Only merges properties if the cleaned object has at least one key.
 *
 * @param {Object} targetEvent - The event object to be updated (mutated in place).
 * @param {Object} config - The configuration object containing optional event data.
 * @param {Object} [config.extra] - Additional metadata to merge into event.extra.
 * @param {Object} [config.tags] - Tags to merge into event.tags.
 * @param {Object} [config.user] - User information to merge into event.user.
 * @param {Object} [config.contexts] - Context information to merge into event.contexts.
 * @param {string} [config.level] - Severity level to set on the event.
 * @param {string} [config.transactionName] - Transaction name to set on the event.
 * @returns {void} This function mutates the targetEvent object directly and returns nothing.
 */
function mergeEventDataFromConfig(targetEvent, config) {
  // Destructure relevant properties from config
  const {
    extra: extraData,
    tags: tagData,
    user: userData,
    contexts: contextData,
    level: eventLevel,
    transactionName: transactionName
  } = config;

  // Clean and merge extra data if present
  const cleanedExtraData = Fc.dropUndefinedKeys(extraData);
  if (cleanedExtraData && Object.keys(cleanedExtraData).length > 0) {
    targetEvent.extra = {
      ...cleanedExtraData,
      ...targetEvent.extra
    };
  }

  // Clean and merge tag data if present
  const cleanedTagData = Fc.dropUndefinedKeys(tagData);
  if (cleanedTagData && Object.keys(cleanedTagData).length > 0) {
    targetEvent.tags = {
      ...cleanedTagData,
      ...targetEvent.tags
    };
  }

  // Clean and merge user data if present
  const cleanedUserData = Fc.dropUndefinedKeys(userData);
  if (cleanedUserData && Object.keys(cleanedUserData).length > 0) {
    targetEvent.user = {
      ...cleanedUserData,
      ...targetEvent.user
    };
  }

  // Clean and merge context data if present
  const cleanedContextData = Fc.dropUndefinedKeys(contextData);
  if (cleanedContextData && Object.keys(cleanedContextData).length > 0) {
    targetEvent.contexts = {
      ...cleanedContextData,
      ...targetEvent.contexts
    };
  }

  // Set event level if provided
  if (eventLevel) {
    targetEvent.level = eventLevel;
  }

  // Set transaction name if provided
  if (transactionName) {
    targetEvent.transaction = transactionName;
  }
}

module.exports = mergeEventDataFromConfig;