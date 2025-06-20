/**
 * Generates a PLIST XML string from the provided source object.
 *
 * @param {Object} sourceObject - The object to serialize into a PLIST XML document.
 * @param {Object} [options] - Optional configuration for XML output formatting.
 * @param {boolean} [options.pretty=true] - Whether to pretty-print the XML output.
 * @returns {string} The generated PLIST XML as a string.
 */
function generatePlistXml(sourceObject, options) {
  // XML declaration attributes
  const xmlDeclaration = {
    version: "1.0",
    encoding: "UTF-8"
    // 'standalone' is optional and may be set by the library if needed
  };

  // Document type definition (DTD) for Apple PLIST
  const plistDtd = {
    pubid: "-//Apple//DTD PLIST 1.0//EN",
    sysid: "http://www.apple.com/DTDs/PropertyList-1.0.dtd"
  };

  // Create a new XML document with root element 'plist'
  const xmlDocument = oY5.create("plist");

  // Add XML declaration
  xmlDocument.dec(xmlDeclaration.version, xmlDeclaration.encoding, xmlDeclaration.standalone);

  // Add PLIST DTD
  xmlDocument.dtd(plistDtd.pubid, plistDtd.sysid);

  // Set the 'version' attribute on the root 'plist' element
  xmlDocument.att("version", "1.0");

  // Serialize the source object into the XML document
  serializeToPlistXml(sourceObject, xmlDocument);

  // Ensure options is an object
  if (!options) options = {};

  // Default to pretty-printing unless explicitly set to false
  options.pretty = options.pretty !== false;

  // Generate and return the XML string
  return xmlDocument.end(options);
}

module.exports = generatePlistXml;