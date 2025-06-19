/**
 * Adjusts and distributes column widths based on provided constraints and cell data.
 *
 * @param {string} spanKey - The property name in a cell object that indicates how many columns the cell spans (e.g., 'colSpan').
 * @param {string} widthKey - The property name in a cell object that indicates the desired width of the cell (e.g., 'desiredWidth').
 * @param {string} columnIndexKey - The property name in a cell object that indicates the starting column index (e.g., 'columnIndex').
 * @param {number} minWidth - The minimum width allowed for any column.
 * @returns {function} a function that takes the current column widths array and a 2D array of cell data, and mutates the column widths array in place.
 */
function distributeColumnWidths(spanKey, widthKey, columnIndexKey, minWidth) {
  return function (columnWidths, cellRows) {
    const singleSpanCells = [];
    const multiSpanCells = [];
    const maxWidths = {};

    // First pass: Separate single-span and multi-span cells, and set initial widths
    cellRows.forEach(row => {
      row.forEach(cell => {
        const span = cell[spanKey] || 1;
        const colIdx = cell[columnIndexKey];
        const desiredWidth = cell[widthKey] || 0;
        if (span > 1) {
          multiSpanCells.push(cell);
        } else {
          // For single-span cells, set the max width for the column
          singleSpanCells[colIdx] = Math.max(singleSpanCells[colIdx] || 0, desiredWidth, minWidth);
        }
      });
    });

    // If columnWidths already has numbers, use them as initial values
    columnWidths.forEach((width, idx) => {
      if (typeof width === "number") {
        singleSpanCells[idx] = width;
      }
    });

    // Second pass: Distribute widths for multi-span cells
    for (let i = multiSpanCells.length - 1; i >= 0; i--) {
      const cell = multiSpanCells[i];
      const span = cell[spanKey];
      const colIdx = cell[columnIndexKey];
      let totalWidth = singleSpanCells[colIdx];
      let flexibleColumns = (typeof columnWidths[colIdx] === "number") ? 0 : 1;

      // Calculate the total width for the spanned columns
      if (typeof totalWidth === "number") {
        for (let offset = 1; offset < span; offset++) {
          totalWidth += 1 + (singleSpanCells[colIdx + offset] || 0);
          if (typeof columnWidths[colIdx + offset] !== "number") {
            flexibleColumns++;
          }
        }
      } else {
        // If no width is set, use the cell'createInteractionAccessor desired width or fallback
        totalWidth = (widthKey === "desiredWidth") ? (cell.desiredWidth - 1) : 1;
        if (!maxWidths[colIdx] || maxWidths[colIdx] < totalWidth) {
          maxWidths[colIdx] = totalWidth;
        }
      }

      // If the cell'createInteractionAccessor desired width is greater than the current total, distribute the difference
      if (cell[widthKey] > totalWidth) {
        let offset = 0;
        let remainingFlexible = flexibleColumns;
        let widthToDistribute = cell[widthKey] - totalWidth;
        while (remainingFlexible > 0 && cell[widthKey] > totalWidth) {
          if (typeof columnWidths[colIdx + offset] !== "number") {
            // Distribute width evenly among flexible columns
            const increment = Math.round(widthToDistribute / remainingFlexible);
            totalWidth += increment;
            singleSpanCells[colIdx + offset] = (singleSpanCells[colIdx + offset] || 0) + increment;
            widthToDistribute -= increment;
            remainingFlexible--;
          }
          offset++;
        }
      }
    }

    // Merge calculated widths into the columnWidths array
    Object.assign(columnWidths, singleSpanCells, maxWidths);

    // Ensure all columns meet the minimum width
    for (let i = 0; i < columnWidths.length; i++) {
      columnWidths[i] = Math.max(minWidth, columnWidths[i] || 0);
    }
  };
}

module.exports = distributeColumnWidths;