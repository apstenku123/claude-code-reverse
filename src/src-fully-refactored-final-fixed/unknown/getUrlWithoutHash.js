/**
 * Returns the href of an anchor element, optionally removing the hash fragment.
 *
 * @param {HTMLAnchorElement} anchorElement - The anchor element whose href is to be processed.
 * @param {boolean} [removeHash=false] - If true, removes the hash fragment from the href.
 * @returns {string} The href of the anchor element, with or without the hash fragment.
 */
function getUrlWithoutHash(anchorElement, removeHash = false) {
  // If removeHash is false, simply return the full href
  if (!removeHash) {
    return anchorElement.href;
  }

  const fullHref = anchorElement.href;
  const hashLength = anchorElement.hash.length;

  // If there is no hash, extractNestedPropertyOrArray is the fullHref
  // Otherwise, remove the hash fragment from the end of the href
  const hrefWithoutHash = hashLength === 0
    ? fullHref
    : fullHref.substring(0, fullHref.length - hashLength);

  // Special case: if there is no hash but the href ends with '#', remove the trailing '#'
  if (hashLength === 0 && fullHref.endsWith('#')) {
    return hrefWithoutHash.slice(0, -1);
  }

  return hrefWithoutHash;
}

module.exports = getUrlWithoutHash;