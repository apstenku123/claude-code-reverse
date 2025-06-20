/**
 * Merges defined context properties from a configuration object into a target object.
 * Drops undefined values from each property group before merging.
 *
 * @param {Object} targetObject - The object to which context properties will be merged (mutated in place).
 * @param {Object} contextConfig - The configuration object containing optional context properties.
 * @param {Object} [contextConfig.extra] - Additional arbitrary data to attach.
 * @param {Object} [contextConfig.tags] - Key-value tags for categorization.
 * @param {Object} [contextConfig.user] - User information.
 * @param {Object} [contextConfig.contexts] - Additional context objects.
 * @param {string} [contextConfig.level] - Severity level.
 * @param {string} [contextConfig.transactionName] - Transaction name.
 * @returns {void}
 * @description
 * For each property group (extra, tags, user, contexts), drops undefined keys and merges the result into the target object.
 * If level or transactionName are defined, assigns them directly.
 */
function mergeContextProperties(targetObject, contextConfig) {
  // Destructure context properties from the configuration object
  const {
    extra: extraData,
    tags: tagData,
    user: userData,
    contexts: contextData,
    level: severityLevel,
    transactionName
  } = contextConfig;

  // Remove undefined keys from extra data and merge if any remain
  const cleanedExtraData = Fc.dropUndefinedKeys(extraData);
  if (cleanedExtraData && Object.keys(cleanedExtraData).length > 0) {
    targetObject.extra = {
      ...cleanedExtraData,
      ...targetObject.extra
    };
  }

  // Remove undefined keys from tags and merge if any remain
  const cleanedTagData = Fc.dropUndefinedKeys(tagData);
  if (cleanedTagData && Object.keys(cleanedTagData).length > 0) {
    targetObject.tags = {
      ...cleanedTagData,
      ...targetObject.tags
    };
  }

  // Remove undefined keys from user data and merge if any remain
  const cleanedUserData = Fc.dropUndefinedKeys(userData);
  if (cleanedUserData && Object.keys(cleanedUserData).length > 0) {
    targetObject.user = {
      ...cleanedUserData,
      ...targetObject.user
    };
  }

  // Remove undefined keys from contexts and merge if any remain
  const cleanedContextData = Fc.dropUndefinedKeys(contextData);
  if (cleanedContextData && Object.keys(cleanedContextData).length > 0) {
    targetObject.contexts = {
      ...cleanedContextData,
      ...targetObject.contexts
    };
  }

  // Assign severity level if provided
  if (severityLevel) {
    targetObject.level = severityLevel;
  }

  // Assign transaction name if provided
  if (transactionName) {
    targetObject.transaction = transactionName;
  }
}

module.exports = mergeContextProperties;
