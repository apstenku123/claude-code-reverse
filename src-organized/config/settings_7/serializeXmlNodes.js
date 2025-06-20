/**
 * Serializes an array of XML node objects into an XML string, handling text nodes, CDATA, comments, processing instructions, attributes, and indentation.
 *
 * @param {Array<Object>} xmlNodeArray - Array of XML node objects to serialize.
 * @param {Object} config - Configuration object for serialization (node names, processors, options).
 * @param {string} parentPath - Dot-separated path to the current node (used for context).
 * @param {string} indent - Current indentation string for pretty-printing.
 * @returns {string} Serialized XML string.
 */
function serializeXmlNodes(xmlNodeArray, config, parentPath, indent) {
  let xmlString = "";
  let needsIndent = false;

  for (let nodeIndex = 0; nodeIndex < xmlNodeArray.length; nodeIndex++) {
    const nodeObject = xmlNodeArray[nodeIndex];
    const nodeName = getFirstNonSpecialKey(nodeObject); // getFirstNonSpecialKey: Extracts the node name from the object
    if (nodeName === undefined) continue;

    let currentPath = "";
    if (parentPath.length === 0) {
      currentPath = nodeName;
    } else {
      currentPath = `${parentPath}.${nodeName}`;
    }

    // Handle text node
    if (nodeName === config.textNodeName) {
      let textValue = nodeObject[nodeName];
      if (!isNodeNameStopped(currentPath, config)) {
        textValue = config.tagValueProcessor(nodeName, textValue);
        textValue = replaceEntitiesInString(textValue, config);
      }
      if (needsIndent) xmlString += indent;
      xmlString += textValue;
      needsIndent = false;
      continue;
    }
    // Handle CDATA node
    else if (nodeName === config.cdataPropName) {
      if (needsIndent) xmlString += indent;
      xmlString += `<![CDATA[${nodeObject[nodeName][0][config.textNodeName]}]]>`;
      needsIndent = false;
      continue;
    }
    // Handle comment node
    else if (nodeName === config.commentPropName) {
      xmlString += indent + `<!--${nodeObject[nodeName][0][config.textNodeName]}-->`;
      needsIndent = true;
      continue;
    }
    // Handle processing instruction
    else if (nodeName[0] === "?") {
      const attributesString = buildAttributeString(nodeObject[":@"], config);
      const indentForPI = nodeName === "?xml" ? "" : indent;
      let piValue = nodeObject[nodeName][0][config.textNodeName];
      piValue = piValue.length !== 0 ? " " + piValue : "";
      xmlString += `${indentForPI}<${nodeName}${piValue}${attributesString}?>`;
      needsIndent = true;
      continue;
    }

    // Prepare for element node
    let childIndent = indent;
    if (childIndent !== "") childIndent += config.indentBy;
    const attributesString = buildAttributeString(nodeObject[":@"], config);
    const openingTag = indent + `<${nodeName}${attributesString}`;
    const childrenXml = serializeXmlNodes(nodeObject[nodeName], config, currentPath, childIndent);

    // Handle unpaired/self-closing tags
    if (config.unpairedTags.indexOf(nodeName) !== -1) {
      if (config.suppressUnpairedNode) {
        xmlString += openingTag + ">";
      } else {
        xmlString += openingTag + "/>";
      }
    }
    // Handle empty nodes with suppression
    else if ((!childrenXml || childrenXml.length === 0) && config.suppressEmptyNode) {
      xmlString += openingTag + "/>";
    }
    // Handle children that end with '>' (likely nested elements)
    else if (childrenXml && childrenXml.endsWith(">")) {
      xmlString += openingTag + `>${childrenXml}${indent}</${nodeName}>`;
    }
    // Handle generic element with children or text
    else {
      xmlString += openingTag + ">";
      // If children contain self-closing or closing tags and indentation is present, add extra indentation
      if (
        childrenXml &&
        indent !== "" &&
        (childrenXml.includes("/>") || childrenXml.includes("</"))
      ) {
        xmlString += indent + config.indentBy + childrenXml + indent;
      } else {
        xmlString += childrenXml;
      }
      xmlString += `</${nodeName}>`;
    }
    needsIndent = true;
  }
  return xmlString;
}

module.exports = serializeXmlNodes;