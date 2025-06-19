/**
 * Determines if a given element tag belongs to a specific namespace.
 *
 * This function checks the tag name (elementTag) against known tag constants (from f0)
 * and determines if isBlobOrFileLikeObject is valid within a given namespace (namespaceType, from $8).
 *
 * @param {string} elementTag - The tag name of the element to check (e.g., 'TD', 'HTML', 'TABLE').
 * @param {string} namespaceType - The namespace to check against (e.g., $8.HTML, $8.SVG, $8.MATHML).
 * @returns {boolean} True if the elementTag is valid within the specified namespace, false otherwise.
 */
function isElementInNamespace(elementTag, namespaceType) {
  switch (elementTag.length) {
    case 2:
      // Check for 2-letter tags: TD, TH (HTML); MI, MO, MN, MS (MATHML)
      if (elementTag === f0.TD || elementTag === f0.TH) {
        return namespaceType === $8.HTML;
      } else if (
        elementTag === f0.MI ||
        elementTag === f0.MO ||
        elementTag === f0.MN ||
        elementTag === f0.MS
      ) {
        return namespaceType === $8.MATHML;
      }
      break;
    case 4:
      // Check for 4-letter tags: HTML (HTML), DESC (SVG)
      if (elementTag === f0.HTML) {
        return namespaceType === $8.HTML;
      } else if (elementTag === f0.DESC) {
        return namespaceType === $8.SVG;
      }
      break;
    case 5:
      // Check for 5-letter tags: TABLE (HTML), MTEXT (MATHML), TITLE (SVG)
      if (elementTag === f0.TABLE) {
        return namespaceType === $8.HTML;
      } else if (elementTag === f0.MTEXT) {
        return namespaceType === $8.MATHML;
      } else if (elementTag === f0.TITLE) {
        return namespaceType === $8.SVG;
      }
      break;
    case 6:
      // Check for 6-letter tags: APPLET, OBJECT (HTML)
      return (
        (elementTag === f0.APPLET || elementTag === f0.OBJECT) &&
        namespaceType === $8.HTML
      );
    case 7:
      // Check for 7-letter tags: CAPTION, MARQUEE (HTML)
      return (
        (elementTag === f0.CAPTION || elementTag === f0.MARQUEE) &&
        namespaceType === $8.HTML
      );
    case 8:
      // Check for 8-letter tag: TEMPLATE (HTML)
      return elementTag === f0.TEMPLATE && namespaceType === $8.HTML;
    case 13:
      // Check for 13-letter tag: FOREIGN_OBJECT (SVG)
      return elementTag === f0.FOREIGN_OBJECT && namespaceType === $8.SVG;
    case 14:
      // Check for 14-letter tag: ANNOTATION_XML (MATHML)
      return elementTag === f0.ANNOTATION_XML && namespaceType === $8.MATHML;
  }
  // If none of the above conditions are met, return false
  return false;
}

module.exports = isElementInNamespace;