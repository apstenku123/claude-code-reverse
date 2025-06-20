/**
 * Checks if the provided route interaction entry is empty, anonymous, or a placeholder.
 *
 * This function determines whether the given route interaction entry is either:
 *   - An empty array (no interactions)
 *   - The string "?" (unknown route)
 *   - The string "<anonymous>" (anonymous route)
 *
 * @param {any} routeInteractionEntry - The route interaction entry to check. Can be an array or string.
 * @returns {boolean} True if the entry is empty, unknown, or anonymous; otherwise, false.
 */
function isRouteInteractionEntryEmptyOrAnonymous(routeInteractionEntry) {
  // Check that the entry is not undefined
  return (
    routeInteractionEntry !== undefined &&
    (
      // Entry is an empty array
      routeInteractionEntry.length === 0 ||
      // Entry is the unknown route string
      routeInteractionEntry === "?" ||
      // Entry is the anonymous route string
      routeInteractionEntry === "<anonymous>"
    )
  );
}

module.exports = isRouteInteractionEntryEmptyOrAnonymous;