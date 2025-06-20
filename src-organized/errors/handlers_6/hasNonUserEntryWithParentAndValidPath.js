/**
 * Checks if there is at least one entry from uD(true) that:
 *   - Is NOT of type 'User'
 *   - Has a parent property
 *   - Has a path that is NOT filtered out by iw2
 *
 * @returns {boolean} True if such an entry exists, otherwise false.
 */
function hasNonUserEntryWithParentAndValidPath() {
  // Retrieve all entries with the flag set to true
  const entries = uD(true);
  for (const entry of entries) {
    // Check if entry is not a 'User', has a parent, and its path is not filtered by iw2
    if (
      entry.type !== "User" &&
      entry.parent &&
      !iw2(entry.path)
    ) {
      // Found a matching entry
      return true;
    }
  }
  // No matching entry found
  return false;
}

module.exports = hasNonUserEntryWithParentAndValidPath;