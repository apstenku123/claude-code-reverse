/**
 * Normalizes leading and trailing whitespace between observable-like objects (e.g., input elements or wrappers with a .value property).
 * Adjusts the whitespace so that the prefix/suffix whitespace is consistent or removed as needed between the provided objects.
 *
 * @param {Object} sourceObservable - The primary observable whose value may be updated (must have a .value property).
 * @param {Object} configObservable - The configuration observable whose value may be updated (must have a .value property).
 * @param {Object} subscriptionObservable - The subscription observable whose value may be updated (must have a .value property).
 * @param {Object} interactionObservable - The interaction observable whose value may be updated (must have a .value property).
 * @returns {void}
 */
function normalizeWhitespaceBetweenObservables(sourceObservable, configObservable, subscriptionObservable, interactionObservable) {
  // Case 1: Both config and subscription observables are present
  if (configObservable && subscriptionObservable) {
    // Extract leading and trailing whitespace from config and subscription values
    const configLeadingWhitespace = configObservable.value.match(/^\s*/)[0];
    const configTrailingWhitespace = configObservable.value.match(/\s*$/)[0];
    const subscriptionLeadingWhitespace = subscriptionObservable.value.match(/^\s*/)[0];
    const subscriptionTrailingWhitespace = subscriptionObservable.value.match(/\s*$/)[0];

    // If source observable is present, normalize leading whitespace
    if (sourceObservable) {
      // Find common prefix (leading whitespace) between config and subscription
      const commonLeadingWhitespace = getCommonPrefix(configLeadingWhitespace, subscriptionLeadingWhitespace);
      // Update source, config, and subscription values by removing the common leading whitespace
      sourceObservable.value = replaceStringSuffix(sourceObservable.value, subscriptionLeadingWhitespace, commonLeadingWhitespace);
      configObservable.value = replaceStringPrefixWithEmpty(configObservable.value, commonLeadingWhitespace);
      subscriptionObservable.value = replaceStringPrefixWithEmpty(subscriptionObservable.value, commonLeadingWhitespace);
    }

    // If interaction observable is present, normalize trailing whitespace
    if (interactionObservable) {
      // Find common suffix (trailing whitespace) between config and subscription
      const commonTrailingWhitespace = getCommonSuffixFromStrings(configTrailingWhitespace, subscriptionTrailingWhitespace);
      // Update interaction, config, and subscription values by removing the common trailing whitespace
      interactionObservable.value = replaceStringPrefix(interactionObservable.value, subscriptionTrailingWhitespace, commonTrailingWhitespace);
      configObservable.value = DK1(configObservable.value, commonTrailingWhitespace);
      subscriptionObservable.value = DK1(subscriptionObservable.value, commonTrailingWhitespace);
    }
  }
  // Case 2: Only subscription observable is present
  else if (subscriptionObservable) {
    // Remove leading whitespace from subscription and interaction observables if present
    if (sourceObservable) {
      subscriptionObservable.value = subscriptionObservable.value.replace(/^\s*/, "");
    }
    if (interactionObservable) {
      interactionObservable.value = interactionObservable.value.replace(/^\s*/, "");
    }
  }
  // Case 3: Source and interaction observables are present, but not subscription
  else if (sourceObservable && interactionObservable) {
    // Extract leading whitespace from interaction, config; trailing whitespace from config
    const interactionLeadingWhitespace = interactionObservable.value.match(/^\s*/)[0];
    const configLeadingWhitespace = configObservable.value.match(/^\s*/)[0];
    const configTrailingWhitespace = configObservable.value.match(/\s*$/)[0];

    // Find common prefix (leading whitespace) between interaction and config
    const commonLeadingWhitespace = getCommonPrefix(interactionLeadingWhitespace, configLeadingWhitespace);
    // Remove common leading whitespace from config
    configObservable.value = replaceStringPrefixWithEmpty(configObservable.value, commonLeadingWhitespace);

    // Find common suffix (trailing whitespace) between adjusted interaction and config
    const adjustedInteractionLeading = replaceStringPrefixWithEmpty(interactionLeadingWhitespace, commonLeadingWhitespace);
    const commonTrailingWhitespace = getCommonSuffixFromStrings(adjustedInteractionLeading, configTrailingWhitespace);
    // Remove common trailing whitespace from config
    configObservable.value = DK1(configObservable.value, commonTrailingWhitespace);
    // Update interaction and source values accordingly
    interactionObservable.value = replaceStringPrefix(interactionObservable.value, interactionLeadingWhitespace, commonTrailingWhitespace);
    sourceObservable.value = replaceStringSuffix(
      sourceObservable.value,
      interactionLeadingWhitespace,
      interactionLeadingWhitespace.slice(0, interactionLeadingWhitespace.length - commonTrailingWhitespace.length)
    );
  }
  // Case 4: Only interaction observable is present
  else if (interactionObservable) {
    // Extract leading whitespace from interaction; trailing whitespace from config
    const interactionLeadingWhitespace = interactionObservable.value.match(/^\s*/)[0];
    const configTrailingWhitespace = configObservable.value.match(/\s*$/)[0];
    // Find difference between config'createInteractionAccessor trailing and interaction'createInteractionAccessor leading whitespace
    const whitespaceDifference = uz2(configTrailingWhitespace, interactionLeadingWhitespace);
    // Remove that difference from config
    configObservable.value = DK1(configObservable.value, whitespaceDifference);
  }
  // Case 5: Only source observable is present
  else if (sourceObservable) {
    // Extract trailing whitespace from source; leading whitespace from config
    const sourceTrailingWhitespace = sourceObservable.value.match(/\s*$/)[0];
    const configLeadingWhitespace = configObservable.value.match(/^\s*/)[0];
    // Find difference between source'createInteractionAccessor trailing and config'createInteractionAccessor leading whitespace
    const whitespaceDifference = uz2(sourceTrailingWhitespace, configLeadingWhitespace);
    // Remove that difference from config
    configObservable.value = replaceStringPrefixWithEmpty(configObservable.value, whitespaceDifference);
  }
}

module.exports = normalizeWhitespaceBetweenObservables;