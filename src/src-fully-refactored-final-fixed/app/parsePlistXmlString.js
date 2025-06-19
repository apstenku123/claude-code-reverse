/**
 * Parses a plist XML string and returns the parsed JavaScript object representation.
 *
 * @param {string} plistXmlString - The XML string representing a plist document.
 * @returns {any} The parsed JavaScript object representation of the plist.
 * @throws {Error} If the XML is malformed or does not start with a <plist> element.
 */
function parsePlistXmlString(plistXmlString) {
  // Parse the XML string into a DOM Document
  const xmlDocument = new iY5().parseFromString(plistXmlString);

  // Ensure the root element is <plist>
  throwIfFalsy(
    xmlDocument.documentElement.nodeName === "plist",
    "malformed document. First element should be <plist>"
  );

  // Convert the <plist> XML element into a JavaScript object
  let parsedPlist = parsePlistNode(xmlDocument.documentElement);

  // If the result is an array with a single element, return just that element
  if (parsedPlist.length === 1) {
    parsedPlist = parsedPlist[0];
  }

  return parsedPlist;
}

module.exports = parsePlistXmlString;