/**
 * Handles insertion of different types of DOM nodes or comments into a document fragment,
 * and manages quirks mode flags based on the node type and attributes.
 *
 * @param {number} nodeType - The type of node to insert (1: element, 4: comment, 5: custom node).
 * @param {string} nodeValue - The value or tag name of the node.
 * @param {string} nodeAttribute - The attribute value associated with the node (e.g., doctype or tag attribute).
 * @param {string|undefined} nodePublicId - The public identifier or additional attribute for the node.
 * @returns {any} The result of the fallback handler if invoked, or undefined for some cases.
 */
function handleDomNodeInsertion(nodeType, nodeValue, nodeAttribute, nodePublicId) {
  switch (nodeType) {
    case 1: // Element node
      // Remove unwanted characters from nodeValue using Gk regex
      nodeValue = nodeValue.replace(Gk, "");
      // If the nodeValue is empty after replacement, do not proceed
      if (nodeValue.length === 0) return;
      break;
    case 4: // Comment node
      // Append a comment node to the document fragment
      MA._appendChild(MA.createComment(nodeValue));
      return;
    case 5: // Custom node (e.g., doctype)
      const tagName = nodeValue;
      const attributeValue = nodeAttribute;
      const publicId = nodePublicId;
      // Append a custom node (e.g., doctype) to the document fragment
      MA.appendChild(new XC5(MA, tagName, attributeValue, publicId));
      // Set quirks mode flags based on tag and attribute values
      if (
        YA ||
        tagName.toLowerCase() !== "html" ||
        KC5.test(attributeValue) ||
        (publicId && publicId.toLowerCase() === HC5) ||
        (publicId === undefined && IL2.test(attributeValue))
      ) {
        MA._quirks = true;
      } else if (
        zC5.test(attributeValue) ||
        (publicId !== undefined && IL2.test(attributeValue))
      ) {
        MA._limitedQuirks = true;
      }
      // Set the fallback handler and return
      invokeHandlerWithArguments = processHtmlElement;
      return;
  }
  // For other cases, set quirks mode and call the fallback handler
  MA._quirks = true;
  invokeHandlerWithArguments = processHtmlElement;
  invokeHandlerWithArguments(nodeType, nodeValue, nodeAttribute, nodePublicId);
}

module.exports = handleDomNodeInsertion;