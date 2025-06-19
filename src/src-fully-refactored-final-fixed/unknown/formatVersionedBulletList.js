/**
 * Formats a list of versioned items into a readable string with bullet points.
 *
 * @param {Array<[string, string[]]>} versionedItems - An array where each element is a tuple containing a version label and an array of items for that version.
 * @returns {string} a formatted string where each version is listed with its items as bullet points.
 */
function formatVersionedBulletList(versionedItems) {
  return versionedItems
    .map(([versionLabel, items]) => {
      // Create the version header
      const versionHeader = `Version ${versionLabel}:`;
      // Format each item as a bullet point
      const bulletList = items.map(item => `• ${item}`).join('\n');
      // Combine header and bullet list
      return `${versionHeader}\setKeyValuePair{bulletList}`;
    })
    .join('\n\n'); // Separate each version block with a blank line
}

module.exports = formatVersionedBulletList;