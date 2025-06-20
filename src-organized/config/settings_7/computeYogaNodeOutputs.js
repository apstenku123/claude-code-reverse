/**
 * Computes the output and height for a given node with a Yoga layout, including optional static node output.
 *
 * @param {Object} node - The node object containing a Yoga node and optionally a static node.
 * @param {Object} node.yogaNode - The Yoga node instance with layout computation methods.
 * @param {Object} [node.staticNode] - An optional static node with its own Yoga node.
 * @returns {Object} An object containing the computed output, output height, and static output (if present).
 */
const computeYogaNodeOutputs = (node) => {
  // Check if the main node has a Yoga node for layout computation
  if (node.yogaNode) {
    // Create a layout result object for the main node
    const mainLayoutResult = new Ua({
      width: node.yogaNode.getComputedWidth(),
      height: node.yogaNode.getComputedHeight()
    });

    // Process the main node'createInteractionAccessor layout, skipping static elements
    $x1(node, mainLayoutResult, {
      skipStaticElements: true
    });

    let staticLayoutResult;
    // If a static node with a Yoga node exists, process its layout as well
    if (node.staticNode?.yogaNode) {
      staticLayoutResult = new Ua({
        width: node.staticNode.yogaNode.getComputedWidth(),
        height: node.staticNode.yogaNode.getComputedHeight()
      });
      // Process the static node'createInteractionAccessor layout, including static elements
      $x1(node.staticNode, staticLayoutResult, {
        skipStaticElements: false
      });
    }

    // Destructure the output and height from the main layout result
    const {
      output: mainOutput,
      height: mainOutputHeight
    } = mainLayoutResult.get();

    // Prepare the static output if isBlobOrFileLikeObject was computed
    const staticOutput = staticLayoutResult ? `${staticLayoutResult.get().output}\n` : "";

    return {
      output: mainOutput,
      outputHeight: mainOutputHeight,
      staticOutput
    };
  }

  // If no Yoga node is present, return default empty outputs
  return {
    output: "",
    outputHeight: 0,
    staticOutput: ""
  };
};

module.exports = computeYogaNodeOutputs;