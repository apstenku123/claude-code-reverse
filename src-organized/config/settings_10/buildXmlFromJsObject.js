/**
 * Converts a JavaScript object representation of XML into an XML string.
 * Handles text nodes, CDATA, comments, processing instructions, attributes, indentation, and unpaired/empty tags.
 *
 * @param {Array<Object>} jsObjectArray - Array of JS objects representing XML nodes.
 * @param {Object} config - Configuration object for XML conversion (node names, processors, formatting, etc).
 * @param {string} parentPath - Dot-separated path to the current node (used for context).
 * @param {string} currentIndent - Current indentation string for pretty-printing.
 * @returns {string} XML string built from the JS object.
 */
function buildXmlFromJsObject(jsObjectArray, config, parentPath, currentIndent) {
  let xmlString = "";
  let needsIndent = false;

  for (let nodeIndex = 0; nodeIndex < jsObjectArray.length; nodeIndex++) {
    const node = jsObjectArray[nodeIndex];
    const nodeName = getFirstNonSpecialKey(node); // Extract node name from the object
    if (nodeName === undefined) continue;

    // Build the full path for this node
    let nodePath = "";
    if (parentPath.length === 0) {
      nodePath = nodeName;
    } else {
      nodePath = `${parentPath}.${nodeName}`;
    }

    // Handle text node
    if (nodeName === config.textNodeName) {
      let textValue = node[nodeName];
      // Only process value if not suppressed by config
      if (!isNodeNameStopped(nodePath, config)) {
        textValue = config.tagValueProcessor(nodeName, textValue);
        textValue = replaceEntitiesInString(textValue, config);
      }
      if (needsIndent) xmlString += currentIndent;
      xmlString += textValue;
      needsIndent = false;
      continue;
    }

    // Handle CDATA section
    if (nodeName === config.cdataPropName) {
      if (needsIndent) xmlString += currentIndent;
      xmlString += `<![CDATA[${node[nodeName][0][config.textNodeName]}]]>`;
      needsIndent = false;
      continue;
    }

    // Handle comment node
    if (nodeName === config.commentPropName) {
      xmlString += currentIndent + `<!--${node[nodeName][0][config.textNodeName]}-->`;
      needsIndent = true;
      continue;
    }

    // Handle processing instruction (e.g., <?xml ...?>)
    if (nodeName[0] === "?") {
      const attributesString = buildAttributeString(node[":@"], config);
      const indentForPI = nodeName === "?xml" ? "" : currentIndent;
      let piValue = node[nodeName][0][config.textNodeName];
      piValue = piValue.length !== 0 ? " " + piValue : "";
      xmlString += `${indentForPI}<${nodeName}${piValue}${attributesString}?>`;
      needsIndent = true;
      continue;
    }

    // Prepare indentation for child nodes
    let childIndent = currentIndent;
    if (childIndent !== "") childIndent += config.indentBy;

    // Build attributes string
    const attributesString = buildAttributeString(node[":@"], config);
    const openingTag = currentIndent + `<${nodeName}${attributesString}`;

    // Recursively build children
    const childrenXml = buildXmlFromJsObject(node[nodeName], config, nodePath, childIndent);

    // Handle unpaired/self-closing tags
    if (config.unpairedTags.indexOf(nodeName) !== -1) {
      if (config.suppressUnpairedNode) {
        xmlString += openingTag + ">";
      } else {
        xmlString += openingTag + "/>";
      }
    }
    // Handle empty nodes (no children)
    else if ((!childrenXml || childrenXml.length === 0) && config.suppressEmptyNode) {
      xmlString += openingTag + "/>";
    }
    // Children end with a closing tag (pretty print)
    else if (childrenXml && childrenXml.endsWith(">")) {
      xmlString += openingTag + `>${childrenXml}${currentIndent}</${nodeName}>`;
    }
    // General case
    else {
      xmlString += openingTag + ">";
      // If children contain nested tags, indent them
      if (
        childrenXml &&
        currentIndent !== "" &&
        (childrenXml.includes("/>") || childrenXml.includes("</"))
      ) {
        xmlString += currentIndent + config.indentBy + childrenXml + currentIndent;
      } else {
        xmlString += childrenXml;
      }
      xmlString += `</${nodeName}>`;
    }
    needsIndent = true;
  }
  return xmlString;
}

module.exports = buildXmlFromJsObject;