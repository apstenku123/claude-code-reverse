/**
 * Checks if the given object has a tag property with a value of 3, 4, or 5.
 *
 * @param {Object} node - The object to check for a special tag.
 * @param {number} node.tag - The tag property to evaluate.
 * @returns {boolean} True if the tag is 3, 4, or 5; otherwise, false.
 */
function isSpecialTag(node) {
  // Return true if the tag property is 3, 4, or 5
  return node.tag === 5 || node.tag === 3 || node.tag === 4;
}

module.exports = isSpecialTag;