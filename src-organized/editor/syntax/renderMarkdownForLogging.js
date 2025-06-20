/**
 * Renders a parsed markdown AST node into a formatted string for logging purposes.
 * Supports various markdown elements such as blockquotes, code blocks, lists, tables, etc.,
 * and applies appropriate formatting using provided formatting utilities.
 *
 * @param {Object} node - The markdown AST node to render.
 * @param {number} [listIndentLevel=0] - The current indentation level for nested lists.
 * @param {number|null} [listItemNumber=null] - The current list item number for ordered lists.
 * @param {Object|null} [parentNode=null] - The parent node, used for context in certain cases (e.g., list items).
 * @returns {string} The formatted string representation of the markdown node.
 */
function renderMarkdownForLogging(node, listIndentLevel = 0, listItemNumber = null, parentNode = null) {
  switch (node.type) {
    case "blockquote":
      // Render blockquote with italic and dim formatting
      return FA.dim.italic((node.tokens ?? []).map(child => renderMarkdownForLogging(child)).join(""));

    case "code":
      // Render code block with syntax highlighting if supported
      if (node.lang && ue.supportsLanguage(node.lang)) {
        return ue.highlight(node.text, { language: node.lang }) + hD;
      } else {
        // Fallback to markdown highlighting if language not supported
        reportErrorIfAllowed(new Error(`Language not supported while highlighting code, falling back to markdown: ${node.lang}`));
        return ue.highlight(node.text, { language: "markdown" }) + hD;
      }

    case "codespan":
      // Inline code span with permission color
      return FA.ansi256(H4().permission)(node.text);

    case "em":
      // Emphasis (italic)
      return FA.italic((node.tokens ?? []).map(child => renderMarkdownForLogging(child)).join(""));

    case "strong":
      // Strong emphasis (bold)
      return FA.bold((node.tokens ?? []).map(child => renderMarkdownForLogging(child)).join(""));

    case "del":
      // Strikethrough
      return FA.strikethrough((node.tokens ?? []).map(child => renderMarkdownForLogging(child)).join(""));

    case "heading":
      // Headings with different formatting based on depth
      switch (node.depth) {
        case 1:
          return FA.bold.italic.underline((node.tokens ?? []).map(child => renderMarkdownForLogging(child)).join("")) + hD + hD;
        case 2:
          return FA.bold((node.tokens ?? []).map(child => renderMarkdownForLogging(child)).join("")) + hD + hD;
        default:
          return FA.bold.dim((node.tokens ?? []).map(child => renderMarkdownForLogging(child)).join("")) + hD + hD;
      }

    case "hr":
      // Horizontal rule
      return "---";

    case "image":
      // Just return the image URL
      return node.href;

    case "link":
      // Render link with permission color
      return FA.ansi256(H4().permission)(node.href);

    case "list":
      // Render each list item, passing list context
      return node.items.map((item, index) =>
        renderMarkdownForLogging(
          item,
          listIndentLevel,
          node.ordered ? node.start + index : null,
          node
        )
      ).join("");

    case "list_item":
      // Render list item with indentation
      return (node.tokens ?? []).map(child =>
        `${"  ".repeat(listIndentLevel)}${renderMarkdownForLogging(child, listIndentLevel + 1, listItemNumber, node)}`
      ).join("");

    case "paragraph":
      // Render paragraph and add line break
      return (node.tokens ?? []).map(child => renderMarkdownForLogging(child)).join("") + hD;

    case "space":
      // Blank line
      return hD;

    case "text":
      // Render text, with special handling for list items
      if (parentNode?.type === "list_item") {
        const prefix = listItemNumber === null ? "-" : getInteractionEntryValue(listIndentLevel, listItemNumber) + ".";
        const content = node.tokens
          ? node.tokens.map(child => renderMarkdownForLogging(child, listIndentLevel, listItemNumber, node)).join("")
          : node.text;
        return `${prefix} ${content}${hD}`;
      } else {
        return node.text;
      }

    case "table": {
      // Render markdown table
      /**
       * Helper to get the string length of a cell, stripped of formatting
       * @param {Array} tokens
       * @returns {string}
       */
      const getCellLength = tokens => removeSpecialPatternFromString(tokens?.map(cellToken => renderMarkdownForLogging(cellToken)).join("") ?? "");
      const tableNode = node;
      // Calculate column widths
      const columnWidths = tableNode.header.map((headerCell, colIdx) => {
        let maxLen = getCellLength(headerCell.tokens).length;
        for (const row of tableNode.rows) {
          const cellLen = getCellLength(row[colIdx]?.tokens).length;
          maxLen = Math.max(maxLen, cellLen);
        }
        return Math.max(maxLen, 3);
      });
      let tableString = "| ";
      // Render header row
      tableNode.header.forEach((headerCell, colIdx) => {
        const cellContent = headerCell.tokens?.map(processRuleBeginHandlers => renderMarkdownForLogging(processRuleBeginHandlers)).join("") ?? "";
        const cellLength = getCellLength(headerCell.tokens);
        const colWidth = columnWidths[colIdx];
        const alignment = tableNode.align?.[colIdx];
        let formattedCell;
        if (alignment === "center") {
          const pad = colWidth - cellLength.length;
          const leftPad = Math.floor(pad / 2);
          const rightPad = pad - leftPad;
          formattedCell = " ".repeat(leftPad) + cellContent + " ".repeat(rightPad);
        } else if (alignment === "right") {
          const pad = colWidth - cellLength.length;
          formattedCell = " ".repeat(pad) + cellContent;
        } else {
          formattedCell = cellContent + " ".repeat(colWidth - cellLength.length);
        }
        tableString += formattedCell + " | ";
      });
      tableString = tableString.trimEnd() + hD;
      // Render alignment row
      tableString += "|";
      columnWidths.forEach(width => {
        tableString += "-".repeat(width + 2) + "|";
      });
      tableString += hD;
      // Render table rows
      tableNode.rows.forEach(row => {
        tableString += "| ";
        row.forEach((cell, colIdx) => {
          const cellContent = cell.tokens?.map(processRuleBeginHandlers => renderMarkdownForLogging(processRuleBeginHandlers)).join("") ?? "";
          const cellLength = getCellLength(cell.tokens);
          const colWidth = columnWidths[colIdx];
          const alignment = tableNode.align?.[colIdx];
          let formattedCell;
          if (alignment === "center") {
            const pad = colWidth - cellLength.length;
            const leftPad = Math.floor(pad / 2);
            const rightPad = pad - leftPad;
            formattedCell = " ".repeat(leftPad) + cellContent + " ".repeat(rightPad);
          } else if (alignment === "right") {
            const pad = colWidth - cellLength.length;
            formattedCell = " ".repeat(pad) + cellContent;
          } else {
            formattedCell = cellContent + " ".repeat(colWidth - cellLength.length);
          }
          tableString += formattedCell + " | ";
        });
        tableString = tableString.trimEnd() + hD;
      });
      return tableString + hD;
    }
  }
  // Fallback for unknown node types
  return "";
}

module.exports = renderMarkdownForLogging;