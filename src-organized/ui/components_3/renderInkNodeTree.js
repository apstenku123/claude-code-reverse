/**
 * Recursively renders an Ink node tree using Yoga layout information, handling text wrapping, transforms, and clipping for overflow.
 *
 * @param {Object} node - The current Ink node to render.
 * @param {Object} renderer - The renderer object with write, clip, and unclip methods.
 * @param {Object} options - Rendering options.
 * @param {number} [options.offsetX=0] - Horizontal offset for rendering.
 * @param {number} [options.offsetY=0] - Vertical offset for rendering.
 * @param {Array<Function>} [options.transformers=[]] - Array of transformer functions to apply to text output.
 * @param {boolean} [options.skipStaticElements] - If true, skips rendering static elements.
 * @returns {void}
 */
function renderInkNodeTree(node, renderer, options) {
  const {
    offsetX = 0,
    offsetY = 0,
    transformers = [],
    skipStaticElements
  } = options;

  // Skip static elements if requested
  if (skipStaticElements && node.internal_static) return;

  const { yogaNode } = node;
  if (!yogaNode) return;

  // Skip nodes with display: none
  if (yogaNode.getDisplay() === EL) return;

  // Calculate absolute position
  const absoluteX = offsetX + yogaNode.getComputedLeft();
  const absoluteY = offsetY + yogaNode.getComputedTop();

  // Prepare transformers, including node'createInteractionAccessor own transform if present
  let effectiveTransformers = transformers;
  if (typeof node.internal_transform === "function") {
    effectiveTransformers = [node.internal_transform, ...transformers];
  }

  // Handle ink-text nodes
  if (node.nodeName === "ink-text") {
    let textLines = II1(node); // Extract lines of text from node
    if (textLines.length > 0) {
      const textWidth = getMaxLineDisplayWidth(textLines); // Get the width of the text
      const maxWidth = XI0(yogaNode); // Get the maximum allowed width from Yoga
      if (textWidth > maxWidth) {
        // Wrap text if isBlobOrFileLikeObject exceeds max width
        const textWrapMode = node.style.textWrap ?? "wrap";
        textLines = QI1(textLines, maxWidth, textWrapMode);
      }
      // Apply Yoga node offsets to the string
      const renderedText = applyYogaNodeOffsetsToString(node, textLines);
      renderer.write(absoluteX, absoluteY, renderedText, {
        transformers: effectiveTransformers
      });
    }
    return;
  }

  let didClip = false;

  // Handle ink-box nodes (draw borders and handle overflow)
  if (node.nodeName === "ink-box") {
    zI0(absoluteX, absoluteY, node, renderer); // Draw box borders
    const overflowXHidden = node.style.overflowX === "hidden" || node.style.overflow === "hidden";
    const overflowYHidden = node.style.overflowY === "hidden" || node.style.overflow === "hidden";
    if (overflowXHidden || overflowYHidden) {
      // Calculate clipping boundaries
      const clipX1 = overflowXHidden ? absoluteX + yogaNode.getComputedBorder(xz) : undefined;
      const clipX2 = overflowXHidden ? absoluteX + yogaNode.getComputedWidth() - yogaNode.getComputedBorder(fz) : undefined;
      const clipY1 = overflowYHidden ? absoluteY + yogaNode.getComputedBorder(UL) : undefined;
      const clipY2 = overflowYHidden ? absoluteY + yogaNode.getComputedHeight() - yogaNode.getComputedBorder(NL) : undefined;
      renderer.clip({
        x1: clipX1,
        x2: clipX2,
        processAndValidateInput: clipY1,
        y2: clipY2
      });
      didClip = true;
    }
  }

  // Recursively render child nodes for ink-root and ink-box
  if (node.nodeName === "ink-root" || node.nodeName === "ink-box") {
    for (const childNode of node.childNodes) {
      renderInkNodeTree(childNode, renderer, {
        offsetX: absoluteX,
        offsetY: absoluteY,
        transformers: effectiveTransformers,
        skipStaticElements
      });
    }
    if (didClip) {
      renderer.unclip();
    }
  }
}

module.exports = renderInkNodeTree;