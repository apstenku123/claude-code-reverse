/**
 * Synchronizes leading and trailing whitespace between observable values and their configurations.
 *
 * This function ensures that the whitespace (both leading and trailing) is consistent across the provided
 * observable values and their configurations, using a set of utility functions to compute common prefixes/suffixes
 * and update the values accordingly. It handles various combinations of provided parameters to maintain whitespace
 * integrity during observable updates.
 *
 * @param {Object} sourceObservable - The primary observable whose value may be updated.
 * @param {Object} config - The configuration object associated with the observable, containing a value property.
 * @param {Object} subscription - The subscription object, also containing a value property.
 * @param {Object} trailingObservable - An optional observable for trailing whitespace synchronization.
 * @returns {void}
 */
function synchronizeWhitespaceBetweenObservables(
  sourceObservable,
  config,
  subscription,
  trailingObservable
) {
  // Case 1: Both config and subscription are provided
  if (config && subscription) {
    // Extract leading and trailing whitespace from config and subscription values
    const configLeadingWhitespace = config.value.match(/^\s*/)[0];
    const configTrailingWhitespace = config.value.match(/\s*$/)[0];
    const subscriptionLeadingWhitespace = subscription.value.match(/^\s*/)[0];
    const subscriptionTrailingWhitespace = subscription.value.match(/\s*$/)[0];

    // If sourceObservable is provided, synchronize leading whitespace
    if (sourceObservable) {
      // Find the common prefix (leading whitespace) between config and subscription
      const commonLeadingWhitespace = getCommonPrefix(configLeadingWhitespace, subscriptionLeadingWhitespace);
      // Update sourceObservable, config, and subscription with the common leading whitespace
      sourceObservable.value = replaceStringSuffix(sourceObservable.value, subscriptionLeadingWhitespace, commonLeadingWhitespace);
      config.value = combineObservablesWithConfig(config.value, commonLeadingWhitespace);
      subscription.value = combineObservablesWithConfig(subscription.value, commonLeadingWhitespace);
    }

    // If trailingObservable is provided, synchronize trailing whitespace
    if (trailingObservable) {
      // Find the common suffix (trailing whitespace) between config and subscription
      const commonTrailingWhitespace = getCommonSuffixFromStrings(configTrailingWhitespace, subscriptionTrailingWhitespace);
      // Update trailingObservable, config, and subscription with the common trailing whitespace
      trailingObservable.value = fo1(trailingObservable.value, subscriptionTrailingWhitespace, commonTrailingWhitespace);
      config.value = DK1(config.value, commonTrailingWhitespace);
      subscription.value = DK1(subscription.value, commonTrailingWhitespace);
    }
  }
  // Case 2: Only subscription is provided
  else if (subscription) {
    if (sourceObservable) {
      // Remove leading whitespace from subscription value if sourceObservable exists
      subscription.value = subscription.value.replace(/^\s*/, "");
    }
    if (trailingObservable) {
      // Remove leading whitespace from trailingObservable value
      trailingObservable.value = trailingObservable.value.replace(/^\s*/, "");
    }
  }
  // Case 3: sourceObservable and trailingObservable are provided, but not subscription
  else if (sourceObservable && trailingObservable) {
    // Extract leading whitespace from trailingObservable and config
    const trailingObservableLeadingWhitespace = trailingObservable.value.match(/^\s*/)[0];
    const configLeadingWhitespace = config.value.match(/^\s*/)[0];
    // Extract trailing whitespace from config
    const configTrailingWhitespace = config.value.match(/\s*$/)[0];
    // Find the common prefix (leading whitespace)
    const commonLeadingWhitespace = getCommonPrefix(trailingObservableLeadingWhitespace, configLeadingWhitespace);
    // Update config with the common leading whitespace
    config.value = combineObservablesWithConfig(config.value, commonLeadingWhitespace);
    // Find the common suffix (trailing whitespace)
    const commonTrailingWhitespace = getCommonSuffixFromStrings(
      combineObservablesWithConfig(trailingObservableLeadingWhitespace, commonLeadingWhitespace),
      configTrailingWhitespace
    );
    // Update config, trailingObservable, and sourceObservable with the common trailing whitespace
    config.value = DK1(config.value, commonTrailingWhitespace);
    trailingObservable.value = fo1(trailingObservable.value, trailingObservableLeadingWhitespace, commonTrailingWhitespace);
    sourceObservable.value = replaceStringSuffix(
      sourceObservable.value,
      trailingObservableLeadingWhitespace,
      trailingObservableLeadingWhitespace.slice(0, trailingObservableLeadingWhitespace.length - commonTrailingWhitespace.length)
    );
  }
  // Case 4: Only trailingObservable is provided
  else if (trailingObservable) {
    // Extract leading whitespace from trailingObservable and trailing whitespace from config
    const trailingObservableLeadingWhitespace = trailingObservable.value.match(/^\s*/)[0];
    const configTrailingWhitespace = config.value.match(/\s*$/)[0];
    // Find the difference in whitespace
    const whitespaceDifference = uz2(configTrailingWhitespace, trailingObservableLeadingWhitespace);
    // Update config with the whitespace difference
    config.value = DK1(config.value, whitespaceDifference);
  }
  // Case 5: Only sourceObservable is provided
  else if (sourceObservable) {
    // Extract trailing whitespace from sourceObservable and leading whitespace from config
    const sourceObservableTrailingWhitespace = sourceObservable.value.match(/\s*$/)[0];
    const configLeadingWhitespace = config.value.match(/^\s*/)[0];
    // Find the difference in whitespace
    const whitespaceDifference = uz2(sourceObservableTrailingWhitespace, configLeadingWhitespace);
    // Update config with the whitespace difference
    config.value = combineObservablesWithConfig(config.value, whitespaceDifference);
  }
}

module.exports = synchronizeWhitespaceBetweenObservables;