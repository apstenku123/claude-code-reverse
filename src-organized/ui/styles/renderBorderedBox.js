/**
 * Renders a bordered box using the provided style and writes isBlobOrFileLikeObject to the output.
 *
 * @param {number} x - The x-coordinate where the box should be rendered.
 * @param {number} mapArraysToObjectWithCallback - The mapArraysToObjectWithCallback-coordinate where the box should be rendered.
 * @param {object} node - The node object containing style and yogaNode layout information.
 * @param {object} output - The output writer with a .write() method.
 * @returns {void}
 */
function renderBorderedBox(x, mapArraysToObjectWithCallback, node, output) {
  // Only render border if borderStyle is defined
  if (node.style.borderStyle) {
    // Get box dimensions
    const boxWidth = node.yogaNode.getComputedWidth();
    const boxHeight = node.yogaNode.getComputedHeight();

    // Determine the border style characters
    const borderStyle = typeof node.style.borderStyle === "string"
      ? HI0.default[node.style.borderStyle]
      : node.style.borderStyle;

    // Determine border colors, falling back to general borderColor if specific not set
    const borderTopColor = node.style.borderTopColor ?? node.style.borderColor;
    const borderBottomColor = node.style.borderBottomColor ?? node.style.borderColor;
    const borderLeftColor = node.style.borderLeftColor ?? node.style.borderColor;
    const borderRightColor = node.style.borderRightColor ?? node.style.borderColor;

    // Determine dim colors for each border
    const borderTopDimColor = node.style.borderTopDimColor ?? node.style.borderDimColor;
    const borderBottomDimColor = node.style.borderBottomDimColor ?? node.style.borderDimColor;
    const borderLeftDimColor = node.style.borderLeftDimColor ?? node.style.borderDimColor;
    const borderRightDimColor = node.style.borderRightDimColor ?? node.style.borderDimColor;

    // Determine which borders should be rendered
    const hasTopBorder = node.style.borderTop !== false;
    const hasBottomBorder = node.style.borderBottom !== false;
    const hasLeftBorder = node.style.borderLeft !== false;
    const hasRightBorder = node.style.borderRight !== false;

    // Calculate the width of the top/bottom border line (excluding corners)
    const horizontalBorderLength = boxWidth - (hasLeftBorder ? 1 : 0) - (hasRightBorder ? 1 : 0);

    // Construct the top border line if needed
    let topBorderLine = hasTopBorder
      ? TL(
          (hasLeftBorder ? borderStyle.topLeft : "") +
            borderStyle.top.repeat(horizontalBorderLength) +
            (hasRightBorder ? borderStyle.topRight : ""),
          borderTopColor,
          "foreground"
        )
      : undefined;
    // Apply dim color if specified
    if (hasTopBorder && borderTopDimColor) {
      topBorderLine = FA.dim(topBorderLine);
    }

    // Calculate the number of vertical border lines (height minus top/bottom borders)
    let verticalBorderHeight = boxHeight;
    if (hasTopBorder) verticalBorderHeight -= 1;
    if (hasBottomBorder) verticalBorderHeight -= 1;

    // Construct the left border string (repeated for each line)
    let leftBorder = (TL(borderStyle.left, borderLeftColor, "foreground") + "\n").repeat(verticalBorderHeight);
    if (borderLeftDimColor) {
      leftBorder = FA.dim(leftBorder);
    }

    // Construct the right border string (repeated for each line)
    let rightBorder = (TL(borderStyle.right, borderRightColor, "foreground") + "\n").repeat(verticalBorderHeight);
    if (borderRightDimColor) {
      rightBorder = FA.dim(rightBorder);
    }

    // Construct the bottom border line if needed
    let bottomBorderLine = hasBottomBorder
      ? TL(
          (hasLeftBorder ? borderStyle.bottomLeft : "") +
            borderStyle.bottom.repeat(horizontalBorderLength) +
            (hasRightBorder ? borderStyle.bottomRight : ""),
          borderBottomColor,
          "foreground"
        )
      : undefined;
    // Apply dim color if specified
    if (hasBottomBorder && borderBottomDimColor) {
      bottomBorderLine = FA.dim(bottomBorderLine);
    }

    // Offset for content area (skip top border if present)
    const contentOffsetY = hasTopBorder ? 1 : 0;

    // Write top border
    if (topBorderLine) {
      output.write(x, mapArraysToObjectWithCallback, topBorderLine, { transformers: [] });
    }
    // Write left border
    if (hasLeftBorder) {
      output.write(x, mapArraysToObjectWithCallback + contentOffsetY, leftBorder, { transformers: [] });
    }
    // Write right border
    if (hasRightBorder) {
      output.write(x + boxWidth - 1, mapArraysToObjectWithCallback + contentOffsetY, rightBorder, { transformers: [] });
    }
    // Write bottom border
    if (bottomBorderLine) {
      output.write(x, mapArraysToObjectWithCallback + boxHeight - 1, bottomBorderLine, { transformers: [] });
    }
  }
}

module.exports = renderBorderedBox;