/**
 * Parses a single node from a PLIST XML document and returns the corresponding JavaScript value.
 * Handles <plist>, <dict>, <array>, <key>, <string>, <integer>, <real>, <data>, <date>, <null>, <true>, and <false> tags.
 * Throws an error for invalid or unsupported tags.
 *
 * @param {Node} node - The XML node to parse.
 * @returns {any} The JavaScript representation of the PLIST node.
 */
function parsePlistNode(node) {
  if (!node) return null;

  // Handle <plist> root node
  if (node.nodeName === "plist") {
    const resultArray = [];
    if (hasNoChildNodes(node)) return resultArray; // Empty node
    for (let i = 0; i < node.childNodes.length; i++) {
      const child = node.childNodes[i];
      if (!isSupportedNodeType(child)) {
        resultArray.push(parsePlistNode(child));
      }
    }
    return resultArray;
  }

  // Handle <dict> node (object)
  if (node.nodeName === "dict") {
    const resultObject = {};
    let currentKey = null;
    let childIndex = 0;
    if (hasNoChildNodes(node)) return resultObject; // Empty dict
    for (let i = 0; i < node.childNodes.length; i++) {
      const child = node.childNodes[i];
      if (isSupportedNodeType(child)) continue; // Skip irrelevant nodes (e.g., whitespace)
      if (childIndex % 2 === 0) {
        // Expecting a <key> node
        throwIfFalsy(child.nodeName === "key", "Missing key while parsing <dict/>.");
        currentKey = parsePlistNode(child);
      } else {
        // Expecting a value node
        throwIfFalsy(child.nodeName !== "key", 'Unexpected key "' + parsePlistNode(child) + '" while parsing <dict/>.');
        resultObject[currentKey] = parsePlistNode(child);
      }
      childIndex += 1;
    }
    // If odd number of children, assign empty string to last key
    if (childIndex % 2 === 1) {
      resultObject[currentKey] = "";
    }
    return resultObject;
  }

  // Handle <array> node
  if (node.nodeName === "array") {
    const resultArray = [];
    if (hasNoChildNodes(node)) return resultArray; // Empty array
    for (let i = 0; i < node.childNodes.length; i++) {
      const child = node.childNodes[i];
      if (!isSupportedNodeType(child)) {
        const value = parsePlistNode(child);
        if (value != null) {
          resultArray.push(value);
        }
      }
    }
    return resultArray;
  }

  // Ignore text nodes
  if (node.nodeName === "#text") {
    return undefined;
  }

  // Handle <key> node
  if (node.nodeName === "key") {
    if (hasNoChildNodes(node)) return "";
    // Prevent prototype pollution
    throwIfFalsy(node.childNodes[0].nodeValue !== "__proto__", "__proto__ keys can lead to prototype pollution. More details on CVE-2022-22912");
    return node.childNodes[0].nodeValue;
  }

  // Handle <string> node
  if (node.nodeName === "string") {
    let resultString = "";
    if (hasNoChildNodes(node)) return resultString;
    for (let i = 0; i < node.childNodes.length; i++) {
      const child = node.childNodes[i];
      const nodeType = child.nodeType;
      if (nodeType === bK1 || nodeType === JU2) {
        resultString += child.nodeValue;
      }
    }
    return resultString;
  }

  // Handle <integer> node
  if (node.nodeName === "integer") {
    throwIfFalsy(!hasNoChildNodes(node), 'Cannot parse "" as integer.');
    return parseInt(node.childNodes[0].nodeValue, 10);
  }

  // Handle <real> node
  if (node.nodeName === "real") {
    throwIfFalsy(!hasNoChildNodes(node), 'Cannot parse "" as real.');
    let resultString = "";
    for (let i = 0; i < node.childNodes.length; i++) {
      const child = node.childNodes[i];
      if (child.nodeType === bK1) {
        resultString += child.nodeValue;
      }
    }
    return parseFloat(resultString);
  }

  // Handle <data> node (base64)
  if (node.nodeName === "data") {
    let base64String = "";
    if (hasNoChildNodes(node)) return Buffer.from(base64String, "base64");
    for (let i = 0; i < node.childNodes.length; i++) {
      const child = node.childNodes[i];
      if (child.nodeType === bK1) {
        // Remove whitespace from base64
        base64String += child.nodeValue.replace(/\s+/g, "");
      }
    }
    return Buffer.from(base64String, "base64");
  }

  // Handle <date> node
  if (node.nodeName === "date") {
    throwIfFalsy(!hasNoChildNodes(node), 'Cannot parse "" as Date.');
    return new Date(node.childNodes[0].nodeValue);
  }

  // Handle <null> node
  if (node.nodeName === "null") {
    return null;
  }

  // Handle <true> node
  if (node.nodeName === "true") {
    return true;
  }

  // Handle <false> node
  if (node.nodeName === "false") {
    return false;
  }

  // Unknown or unsupported node
  throw new Error("Invalid PLIST tag " + node.nodeName);
}

module.exports = parsePlistNode;
