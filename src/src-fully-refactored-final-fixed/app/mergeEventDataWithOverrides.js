/**
 * Merges override properties from the overrides object into the event object, 
 * after dropping undefined keys from each override property. Only non-empty override properties are merged.
 *
 * @param {Object} event - The event object to be mutated with override properties.
 * @param {Object} overrides - An object containing optional override properties: extra, tags, user, contexts, level, transactionName.
 * @returns {void}
 */
function mergeEventDataWithOverrides(event, overrides) {
  const {
    extra: extraOverrides,
    tags: tagOverrides,
    user: userOverrides,
    contexts: contextOverrides,
    level: levelOverride,
    transactionName: transactionNameOverride
  } = overrides;

  // Merge extra data if present and not empty
  const cleanedExtra = Fc.dropUndefinedKeys(extraOverrides);
  if (cleanedExtra && Object.keys(cleanedExtra).length > 0) {
    event.extra = {
      ...cleanedExtra,
      ...event.extra
    };
  }

  // Merge tags if present and not empty
  const cleanedTags = Fc.dropUndefinedKeys(tagOverrides);
  if (cleanedTags && Object.keys(cleanedTags).length > 0) {
    event.tags = {
      ...cleanedTags,
      ...event.tags
    };
  }

  // Merge user info if present and not empty
  const cleanedUser = Fc.dropUndefinedKeys(userOverrides);
  if (cleanedUser && Object.keys(cleanedUser).length > 0) {
    event.user = {
      ...cleanedUser,
      ...event.user
    };
  }

  // Merge contexts if present and not empty
  const cleanedContexts = Fc.dropUndefinedKeys(contextOverrides);
  if (cleanedContexts && Object.keys(cleanedContexts).length > 0) {
    event.contexts = {
      ...cleanedContexts,
      ...event.contexts
    };
  }

  // Set level if provided
  if (levelOverride) {
    event.level = levelOverride;
  }

  // Set transaction name if provided
  if (transactionNameOverride) {
    event.transaction = transactionNameOverride;
  }
}

module.exports = mergeEventDataWithOverrides;