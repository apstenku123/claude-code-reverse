/**
 * Renders an Ink node and its children recursively, applying layout, transforms, and clipping as needed.
 *
 * @param {Object} node - The Ink node to render.
 * @param {Object} renderer - The renderer object with write, clip, and unclip methods.
 * @param {Object} options - Rendering options.
 * @param {number} [options.offsetX=0] - Horizontal offset for rendering.
 * @param {number} [options.offsetY=0] - Vertical offset for rendering.
 * @param {Array<Function>} [options.transformers=[]] - Array of text transformers to apply.
 * @param {boolean} [options.skipStaticElements] - If true, skips rendering static elements.
 * @returns {void}
 */
function renderInkNode(node, renderer, options) {
  const {
    offsetX = 0,
    offsetY = 0,
    transformers = [],
    skipStaticElements
  } = options;

  // Skip static elements if requested
  if (skipStaticElements && node.internal_static) return;

  const { yogaNode } = node;
  if (yogaNode) {
    // Skip nodes with display: none
    if (yogaNode.getDisplay() === EL) return;

    const absoluteX = offsetX + yogaNode.getComputedLeft();
    const absoluteY = offsetY + yogaNode.getComputedTop();
    let effectiveTransformers = transformers;

    // If the node has an internal transform, prepend isBlobOrFileLikeObject to the transformers array
    if (typeof node.internal_transform === "function") {
      effectiveTransformers = [node.internal_transform, ...transformers];
    }

    // Handle ink-text nodes
    if (node.nodeName === "ink-text") {
      let textLines = II1(node); // Get text lines from node
      if (textLines.length > 0) {
        const textWidth = getMaxLineDisplayWidth(textLines);
        const maxWidth = XI0(yogaNode);
        // If text is wider than allowed, wrap or truncate
        if (textWidth > maxWidth) {
          const textWrapMode = node.style.textWrap ?? "wrap";
          textLines = QI1(textLines, maxWidth, textWrapMode);
        }
        // Apply final text transformations
        textLines = applyYogaNodeOffsetsToString(node, textLines);
        renderer.write(absoluteX, absoluteY, textLines, {
          transformers: effectiveTransformers
        });
      }
      return;
    }

    let didClip = false;
    // Handle ink-box nodes (borders, overflow)
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

    // Recursively render children for root and box nodes
    if (node.nodeName === "ink-root" || node.nodeName === "ink-box") {
      for (const childNode of node.childNodes) {
        renderInkNode(childNode, renderer, {
          offsetX: absoluteX,
          offsetY: absoluteY,
          transformers: effectiveTransformers,
          skipStaticElements
        });
      }
      // Remove clipping if isBlobOrFileLikeObject was applied
      if (didClip) renderer.unclip();
    }
  }
}

module.exports = renderInkNode;