/**
 * Retrieves the content attribute value of a meta tag by its name attribute.
 *
 * @param {string} metaName - The value of the meta tag'createInteractionAccessor name attribute to search for.
 * @returns {string|undefined} The content of the meta tag if found, otherwise undefined.
 */
function getMetaTagContentByName(metaName) {
  // Use JU.getDomElement to find the meta tag with the specified name attribute
  const metaElement = JU.getDomElement(`meta[name=${metaName}]`);
  // If the meta tag exists, return its 'content' attribute value; otherwise, return undefined
  return metaElement ? metaElement.getAttribute("content") : undefined;
}

module.exports = getMetaTagContentByName;