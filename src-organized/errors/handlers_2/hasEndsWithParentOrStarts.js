/**
 * Checks if the given interaction entry has the 'endsWithParent' property set to true,
 * or recursively checks if any of its 'starts' entries meet the same condition.
 *
 * @param {Object} interactionEntry - The interaction entry object to check.
 * @param {boolean} [interactionEntry.endsWithParent] - Indicates if this entry ends with a parent.
 * @param {Array<Object>} [interactionEntry.starts] - An array of nested interaction entries to check recursively.
 * @returns {boolean} Returns true if 'endsWithParent' is true for this entry or any nested entry; otherwise, false.
 */
function hasEndsWithParentOrStarts(interactionEntry) {
  // If the interaction entry is null or undefined, return false
  if (!interactionEntry) return false;

  // Return true if 'endsWithParent' is true, otherwise recursively check 'starts'
  return (
    interactionEntry.endsWithParent === true ||
    hasEndsWithParentOrStarts(interactionEntry.starts)
  );
}

module.exports = hasEndsWithParentOrStarts;