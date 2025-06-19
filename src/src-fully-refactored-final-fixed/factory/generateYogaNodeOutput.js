/**
 * Generates output and height information from a given node with a Yoga layout engine.
 * Optionally processes a static node if present, and returns its output as well.
 *
 * @param {Object} node - The node object containing a Yoga node and optional static node.
 * @param {Object} node.yogaNode - The Yoga node instance with layout methods.
 * @param {Object} [node.staticNode] - Optional static node with its own Yoga node.
 * @returns {Object} An object containing the output, outputHeight, and staticOutput strings.
 */
function generateYogaNodeOutput(node) {
  // Check if the main node has a Yoga node
  if (node.yogaNode) {
    // Create a layout result for the main node using computed width and height
    const mainLayoutResult = new Ua({
      width: node.yogaNode.getComputedWidth(),
      height: node.yogaNode.getComputedHeight()
    });

    // Process the main node layout, skipping static elements
    $x1(node, mainLayoutResult, {
      skipStaticElements: true
    });

    let staticLayoutResult;
    // If a static node with a Yoga node exists, process its layout
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

    // Destructure output and height from the main layout result
    const {
      output: mainOutput,
      height: mainOutputHeight
    } = mainLayoutResult.get();

    // Get static output if isBlobOrFileLikeObject was processed
    const staticOutput = staticLayoutResult ? `${staticLayoutResult.get().output}\n` : "";

    return {
      output: mainOutput,
      outputHeight: mainOutputHeight,
      staticOutput
    };
  }

  // If no Yoga node is present, return empty/default values
  return {
    output: "",
    outputHeight: 0,
    staticOutput: ""
  };
}

module.exports = generateYogaNodeOutput;
