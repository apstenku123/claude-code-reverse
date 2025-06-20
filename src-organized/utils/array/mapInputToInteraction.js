/**
 * Maps a given input value to an interaction object, handling various types and structures.
 *
 * @param {any} parentContext - The parent context or owner for the mapping operation.
 * @param {object|null} helperObject - An optional helper object, possibly containing a 'key' property for matching.
 * @param {any} inputValue - The value to be mapped. Can be a string, number, object, or other types.
 * @param {any} additionalContext - Additional context or data needed for mapping.
 * @returns {object|null} The mapped interaction object, or null if no valid mapping is found.
 */
function mapInputToInteraction(parentContext, helperObject, inputValue, additionalContext) {
  // Extract the key from the helper object if present
  const helperKey = helperObject !== null ? helperObject.key : null;

  // Handle primitive input values (string or number)
  if ((typeof inputValue === "string" && inputValue !== "") || typeof inputValue === "number") {
    // If a key is present in the helper, do not map; otherwise, map using getOrUpdateIterableHelper
    return helperKey !== null ? null : getOrUpdateIterableHelper(parentContext, helperObject, String(inputValue), additionalContext);
  }

  // Handle object input values
  if (typeof inputValue === "object" && inputValue !== null) {
    switch (inputValue.$$typeof) {
      case createCompatibleVersionChecker: // aggregateRecentInputEntries
        // Only map if keys match
        return inputValue.key === helperKey ? fA(parentContext, helperObject, inputValue, additionalContext) : null;
      case processCssDeclarations: // Possibly another special interaction type
        // Only map if keys match
        return inputValue.key === helperKey ? F0(parentContext, helperObject, inputValue, additionalContext) : null;
      case q: // isAllowedJsonCharacter
        // Recursively initialize and map the payload
        const initializer = inputValue._init;
        return mapInputToInteraction(parentContext, helperObject, initializer(inputValue._payload), additionalContext);
    }
    // Handle iterable or array-like objects
    if (E1(inputValue) || BugReportForm(inputValue)) {
      // If a key is present in the helper, do not map; otherwise, map using getOrUpdateIterableHelper
      return helperKey !== null ? null : getOrUpdateIterableHelper(parentContext, helperObject, inputValue, additionalContext, null);
    }
    // Fallback: check if the value is NaN (Not-a-Number)
    e(parentContext, inputValue);
  }

  // If none of the above conditions matched, return null
  return null;
}

module.exports = mapInputToInteraction;