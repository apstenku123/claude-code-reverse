/**
 * Generates layout output information for a given node with Yoga layout engine integration.
 *
 * This function computes the layout output and height for the provided node using its Yoga node.
 * If the node has a staticNode with a Yoga node, isBlobOrFileLikeObject also computes the static output and height.
 * The function leverages the Ua class to encapsulate width and height, and uses $x1 to process the node.
 *
 * @param {Object} node - The node object containing a yogaNode and optionally a staticNode.
 * @param {Object} node.yogaNode - The Yoga node instance for layout calculations.
 * @param {Object} [node.staticNode] - An optional static node with its own yogaNode.
 * @returns {Object} An object containing the output, outputHeight, and staticOutput strings.
 */
function generateYogaLayoutOutputs(node) {
  // Check if the node has a yogaNode for layout calculations
  if (node.yogaNode) {
    // Create a layout result for the main node
    const mainLayoutResult = new Ua({
      width: node.yogaNode.getComputedWidth(),
      height: node.yogaNode.getComputedHeight()
    });

    // Process the main node layout, skipping static elements
    $x1(node, mainLayoutResult, {
      skipStaticElements: true
    });

    let staticLayoutResult;
    // If a staticNode with a yogaNode exists, process its layout as well
    if (node.staticNode?.yogaNode) {
      staticLayoutResult = new Ua({
        width: node.staticNode.yogaNode.getComputedWidth(),
        height: node.staticNode.yogaNode.getComputedHeight()
      });
      // Process the static node layout, including static elements
      $x1(node.staticNode, staticLayoutResult, {
        skipStaticElements: false
      });
    }

    // Destructure the output and height from the main layout result
    const { output: mainOutput, height: mainOutputHeight } = mainLayoutResult.get();

    // If a static layout result exists, get its output; otherwise, use an empty string
    const staticOutput = staticLayoutResult ? `${staticLayoutResult.get().output}\n` : "";

    return {
      output: mainOutput,
      outputHeight: mainOutputHeight,
      staticOutput: staticOutput
    };
  }

  // If no yogaNode exists, return empty/default outputs
  return {
    output: "",
    outputHeight: 0,
    staticOutput: ""
  };
}

module.exports = generateYogaLayoutOutputs;