/**
 * Wraps the provided interaction entries processor with a span type descriptor.
 *
 * @param {Function} processInteractionEntries - Function that processes an array of interaction entries, mapping each to a route name and storing associated metadata such as duration, user, transaction, and replay updateSnapshotAndNotify.
 * @returns {Array} An array where the first element is an object with type 'span', and the second element is the provided processor function.
 */
function wrapWithSpanType(processInteractionEntries) {
  // Return an array with a span type descriptor and the processor function
  return [
    { type: "span" },
    processInteractionEntries
  ];
}

module.exports = wrapWithSpanType;