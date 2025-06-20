/**
 * Generates layout output and static output for a given node using Yoga layout engine.
 *
 * @param {Object} node - The node object containing yogaNode and optional staticNode.
 * @returns {Object} An object containing the rendered output, output height, and static output.
 */
function generateLayoutOutput(node) {
  // Check if the node has a yogaNode property
  if (node.yogaNode) {
    // Create a layout result for the main node
    const mainLayoutResult = new Ua({
      width: node.yogaNode.getComputedWidth(),
      height: node.yogaNode.getComputedHeight()
    });

    // Compute the layout for the main node, skipping static elements
    $x1(node, mainLayoutResult, {
      skipStaticElements: true
    });

    let staticLayoutResult;
    // If the node has a staticNode with a yogaNode, compute its layout as well
    if (node.staticNode?.yogaNode) {
      staticLayoutResult = new Ua({
        width: node.staticNode.yogaNode.getComputedWidth(),
        height: node.staticNode.yogaNode.getComputedHeight()
      });
      // Compute the layout for the static node, including static elements
      $x1(node.staticNode, staticLayoutResult, {
        skipStaticElements: false
      });
    }

    // Destructure the output and height from the main layout result
    const { output: mainOutput, height: mainOutputHeight } = mainLayoutResult.get();

    // If staticLayoutResult exists, get its output; otherwise, use an empty string
    const staticOutput = staticLayoutResult ? `${staticLayoutResult.get().output}\n` : "";

    return {
      output: mainOutput,
      outputHeight: mainOutputHeight,
      staticOutput
    };
  }

  // If the node does not have a yogaNode, return empty/default values
  return {
    output: "",
    outputHeight: 0,
    staticOutput: ""
  };
}

module.exports = generateLayoutOutput;