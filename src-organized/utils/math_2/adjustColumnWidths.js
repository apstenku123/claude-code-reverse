/**
 * Adjusts column widths based on provided data and configuration.
 *
 * @param {string} spanKey - The property name in a cell object that indicates the span (e.g., colspan).
 * @param {string} widthKey - The property name in a cell object that indicates the desired width.
 * @param {string} columnIndexKey - The property name in a cell object that indicates the column index.
 * @param {number} minWidth - The minimum allowed width for any column.
 * @returns {Function} - a function that takes the current widths array and a 2D array of cell objects, and mutates the widths array in place.
 */
function adjustColumnWidths(spanKey, widthKey, columnIndexKey, minWidth) {
  /**
   * @param {number[]} currentWidths - The current array of column widths (may contain undefined values).
   * @param {Array<Array<Object>>} cellRows - 2D array representing rows of cell objects.
   */
  return function (currentWidths, cellRows) {
    const singleSpanWidths = [];
    const multiSpanCells = [];
    const maxWidths = {};

    // First pass: Separate single-span and multi-span cells
    cellRows.forEach(row => {
      row.forEach(cell => {
        const span = cell[spanKey] || 1;
        const colIdx = cell[columnIndexKey];
        const width = cell[widthKey] || 0;
        if (span > 1) {
          // Multi-span cell: process later
          multiSpanCells.push(cell);
        } else {
          // Single-span cell: track max width for this column
          singleSpanWidths[colIdx] = Math.max(singleSpanWidths[colIdx] || 0, width, minWidth);
        }
      });
    });

    // Override singleSpanWidths with any explicit values in currentWidths
    currentWidths.forEach((width, colIdx) => {
      if (typeof width === "number") {
        singleSpanWidths[colIdx] = width;
      }
    });

    // Process multi-span cells from last to first
    for (let i = multiSpanCells.length - 1; i >= 0; i--) {
      const cell = multiSpanCells[i];
      const span = cell[spanKey];
      const startCol = cell[columnIndexKey];
      let totalWidth = singleSpanWidths[startCol];
      let adjustableColumns = typeof currentWidths[startCol] === "number" ? 0 : 1;

      if (typeof totalWidth === "number") {
        // Sum widths of spanned columns
        for (let offset = 1; offset < span; offset++) {
          totalWidth += 1 + singleSpanWidths[startCol + offset];
          if (typeof currentWidths[startCol + offset] !== "number") {
            adjustableColumns++;
          }
        }
      } else {
        // Fallback: use cell'createInteractionAccessor desired width or 1
        totalWidth = widthKey === "desiredWidth" ? cell.desiredWidth - 1 : 1;
        if (!maxWidths[startCol] || maxWidths[startCol] < totalWidth) {
          maxWidths[startCol] = totalWidth;
        }
      }

      // If the cell'createInteractionAccessor desired width is greater than the current total, distribute extra width
      if (cell[widthKey] > totalWidth) {
        let offset = 0;
        let remainingAdjustable = adjustableColumns;
        let widthToDistribute = cell[widthKey] - totalWidth;
        while (remainingAdjustable > 0 && cell[widthKey] > totalWidth) {
          if (typeof currentWidths[startCol + offset] !== "number") {
            // Distribute width evenly among adjustable columns
            const increment = Math.round(widthToDistribute / remainingAdjustable);
            totalWidth += increment;
            singleSpanWidths[startCol + offset] = (singleSpanWidths[startCol + offset] || 0) + increment;
            widthToDistribute -= increment;
            remainingAdjustable--;
          }
          offset++;
        }
      }
    }

    // Merge calculated widths into currentWidths
    Object.assign(currentWidths, singleSpanWidths, maxWidths);

    // Ensure all columns meet the minimum width
    for (let colIdx = 0; colIdx < currentWidths.length; colIdx++) {
      currentWidths[colIdx] = Math.max(minWidth, currentWidths[colIdx] || 0);
    }
  };
}

module.exports = adjustColumnWidths;
