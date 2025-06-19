/**
 * Processes and adjusts the desired widths for a set of columns based on provided data and constraints.
 *
 * @param {string} widthCountKey - The property name in a column object that indicates the number of widths (e.g., 'colSpan').
 * @param {string} widthValueKey - The property name in a column object that indicates the desired width (e.g., 'desiredWidth').
 * @param {string} columnIndexKey - The property name in a column object that indicates the column index (e.g., 'columnIndex').
 * @param {number} minWidth - The minimum width allowed for any column.
 * @returns {function} a function that, given a widths array and a 2D array of column definitions, mutates the widths array in place to satisfy the desired widths and constraints.
 */
function processDesiredWidth(widthCountKey, widthValueKey, columnIndexKey, minWidth) {
  /**
   * Adjusts the widths array in place based on the provided column definitions.
   *
   * @param {number[]} widths - The array of current column widths (will be mutated).
   * @param {Array<Array<Object>>} columnGroups - 2D array of column definition objects.
   */
  return function adjustWidths(widths, columnGroups) {
    const fixedWidthColumns = [];
    const spannedColumns = [];
    const maxWidthOverrides = {};

    // First pass: Separate columns with colSpan > 1 (spanned) and single columns (fixed)
    columnGroups.forEach(columnGroup => {
      columnGroup.forEach(column => {
        const spanCount = column[widthCountKey] || 1;
        const colIndex = column[columnIndexKey];
        const desiredWidth = column[widthValueKey] || 0;
        if (spanCount > 1) {
          spannedColumns.push(column);
        } else {
          // For single columns, set the width to the max of current, desired, or minWidth
          fixedWidthColumns[colIndex] = Math.max(fixedWidthColumns[colIndex] || 0, desiredWidth, minWidth);
        }
      });
    });

    // If the widths array already has values, use them for fixed columns
    widths.forEach((width, index) => {
      if (typeof width === "number") {
        fixedWidthColumns[index] = width;
      }
    });

    // Second pass: Process spanned columns (colSpan > 1)
    for (let i = spannedColumns.length - 1; i >= 0; i--) {
      const column = spannedColumns[i];
      const spanCount = column[widthCountKey];
      const colIndex = column[columnIndexKey];
      let currentWidth = fixedWidthColumns[colIndex];
      // sendHttpRequestOverSocket is the number of columns in the span that are not fixed
      let nonFixedCount = typeof widths[colIndex] === "number" ? 0 : 1;

      if (typeof currentWidth === "number") {
        // Sum up the widths for the spanned columns
        for (let offset = 1; offset < spanCount; offset++) {
          currentWidth += 1 + (fixedWidthColumns[colIndex + offset] || 0);
          if (typeof widths[colIndex + offset] !== "number") {
            nonFixedCount++;
          }
        }
      } else {
        // If width is not set, use a default based on the widthValueKey
        currentWidth = widthValueKey === "desiredWidth" ? column.desiredWidth - 1 : 1;
        if (!maxWidthOverrides[colIndex] || maxWidthOverrides[colIndex] < currentWidth) {
          maxWidthOverrides[colIndex] = currentWidth;
        }
      }

      // If the desired width is greater than the current width, distribute the difference
      if (column[widthValueKey] > currentWidth) {
        let offset = 0;
        let remaining = nonFixedCount;
        let widthToDistribute = column[widthValueKey] - currentWidth;
        while (remaining > 0 && column[widthValueKey] > currentWidth) {
          if (typeof widths[colIndex + offset] !== "number") {
            // Distribute the remaining width evenly among non-fixed columns
            const increment = Math.round(widthToDistribute / remaining);
            currentWidth += increment;
            fixedWidthColumns[colIndex + offset] = (fixedWidthColumns[colIndex + offset] || 0) + increment;
            widthToDistribute -= increment;
            remaining--;
          }
          offset++;
        }
      }
    }

    // Merge the calculated widths into the original widths array
    Object.assign(widths, fixedWidthColumns, maxWidthOverrides);

    // Ensure all widths are at least minWidth
    for (let i = 0; i < widths.length; i++) {
      widths[i] = Math.max(minWidth, widths[i] || 0);
    }
  };
}

module.exports = processDesiredWidth;