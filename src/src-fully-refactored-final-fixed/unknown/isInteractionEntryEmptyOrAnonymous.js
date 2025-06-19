/**
 * Checks if the provided interaction entry is empty, a placeholder, or anonymous.
 *
 * This function determines whether the given interaction entry is either:
 *   - undefined
 *   - an empty array (length === 0)
 *   - the string '?' (a placeholder)
 *   - the string '<anonymous>' (an anonymous entry)
 *
 * @param {any} interactionEntry - The interaction entry to check. Can be any type, but typically a string or array.
 * @returns {boolean} True if the entry is undefined, empty, a placeholder, or anonymous; otherwise, false.
 */
function isInteractionEntryEmptyOrAnonymous(interactionEntry) {
  // Check if the entry is defined and matches any of the empty/placeholder/anonymous conditions
  return (
    interactionEntry !== undefined &&
    (
      interactionEntry.length === 0 ||
      interactionEntry === '?' ||
      interactionEntry === '<anonymous>'
    )
  );
}

module.exports = isInteractionEntryEmptyOrAnonymous;