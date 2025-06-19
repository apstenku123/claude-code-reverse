/**
 * Formats an array of version and subscription pairs into a readable string.
 *
 * Each element in the input array should be a tuple/array where:
 *   - The first item is a version identifier (string or number)
 *   - The second item is an array of subscription descriptions (strings)
 *
 * The output is a string where each version and its subscriptions are formatted as:
 *   Version X:
 *   • Subscription 1
 *   • Subscription 2
 *   ...
 *
 * @param {Array<[string|number, string[]]>} versionSubscriptions - Array of [version, subscriptions] pairs
 * @returns {string} Formatted string listing versions and their subscriptions
 */
function formatVersionSubscriptions(versionSubscriptions) {
  return versionSubscriptions
    .map(([version, subscriptions]) => {
      // Format the version header
      const versionHeader = `Version ${version}:`;
      // Format each subscription with a bullet point
      const formattedSubscriptions = subscriptions
        .map(subscription => `• ${subscription}`)
        .join('\n');
      // Combine header and subscriptions
      return `${versionHeader}\setKeyValuePair{formattedSubscriptions}`;
    })
    .join('\n\n'); // Separate each version block with a blank line
}

module.exports = formatVersionSubscriptions;