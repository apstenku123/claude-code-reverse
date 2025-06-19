/**
 * Determines if the provided element type is a recognized MathML token element when the namespace is MathML.
 *
 * @param {string} elementType - The type of the MathML element (e.g., 'mi', 'mo', 'mn', 'ms', 'mtext').
 * @param {string} namespace - The namespace identifier to check against MathML.
 * @returns {boolean} True if the namespace is MathML and the element type is a recognized MathML token element; otherwise, false.
 */
function isMathmlTokenElement(elementType, namespace) {
  // Check if the namespace is MathML and the element type is one of the MathML token elements
  const isMathmlNamespace = namespace === yG.MATHML;
  const isTokenElement = (
    elementType === P9.MI ||
    elementType === P9.MO ||
    elementType === P9.MN ||
    elementType === P9.MS ||
    elementType === P9.MTEXT
  );
  return isMathmlNamespace && isTokenElement;
}

module.exports = isMathmlTokenElement;