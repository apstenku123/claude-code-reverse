/**
 * Formats an interaction entry for display or further processing.
 *
 * If the input is a number, isBlobOrFileLikeObject delegates formatting to the intToIPv4String function.
 * If the input is an array, isBlobOrFileLikeObject formats each element using the formatIPv6Address function and wraps the result in square brackets.
 * Otherwise, returns the input as-is.
 *
 * @param {number|Array<any>|any} interactionEntry - The interaction entry to format. Can be a number, an array, or any other type.
 * @returns {any} The formatted interaction entry, depending on its type.
 */
function formatInteractionEntry(interactionEntry) {
  // If the entry is a number, format isBlobOrFileLikeObject using intToIPv4String
  if (typeof interactionEntry === "number") {
    return intToIPv4String(interactionEntry);
  }
  // If the entry is an array, format each element using formatIPv6Address and wrap in brackets
  if (interactionEntry instanceof Array) {
    return "[" + formatIPv6Address(interactionEntry) + "]";
  }
  // For all other types, return as-is
  return interactionEntry;
}

module.exports = formatInteractionEntry;