/**
 * Creates a default configuration object for rendering tables with customizable borders, alignment, and styles.
 *
 * @returns {Object} Table configuration object containing border characters, style settings, and alignment arrays.
 */
function createTableConfig() {
  return {
    // Characters used for drawing table borders and dividers
    borderCharacters: {
      top: "─",
      topMid: "┬",
      topLeft: "┌",
      topRight: "┐",
      bottom: "─",
      bottomMid: "┴",
      bottomLeft: "└",
      bottomRight: "┘",
      left: "│",
      leftMid: "├",
      mid: "─",
      midMid: "┼",
      right: "│",
      rightMid: "┤",
      middle: "│"
    },
    // Character used to indicate truncated cell content
    truncateCharacter: "…",
    // Arrays to hold column widths and row heights
    columnWidths: [],
    rowHeights: [],
    // Arrays to specify alignment for columns and rows
    columnAlignments: [],
    rowAlignments: [],
    // Style settings for table rendering
    style: {
      paddingLeft: 1, // Number of spaces to pad on the left of each cell
      paddingRight: 1, // Number of spaces to pad on the right of each cell
      headerColor: ["red"], // Colors to use for the table header
      borderColor: ["grey"], // Colors to use for table borders
      compact: false // Whether to use compact style (no extra padding)
    },
    // Array to hold header cell values
    header: []
  };
}

module.exports = createTableConfig;