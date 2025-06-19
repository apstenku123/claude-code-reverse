/**
 * Checks if there is at least one entry from uD(true) that:
 *   - is NOT of type 'User'
 *   - has a parent
 *   - has a path that is NOT filtered out by iw2
 *
 * @returns {boolean} True if such an entry exists, otherwise false.
 */
function hasNonUserChildWithValidPath() {
  // Retrieve all entries with the flag set to true
  const entries = uD(true);

  // Iterate through each entry to check the required conditions
  for (const entry of entries) {
    // Skip entries of type 'User', entries without a parent, or entries with a filtered path
    if (entry.type !== "User" && entry.parent && !iw2(entry.path)) {
      // Found a matching entry
      return true;
    }
  }
  // No matching entry found
  return false;
}

module.exports = hasNonUserChildWithValidPath;