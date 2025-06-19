/**
 * Recursively renders a Markdown Abstract Syntax Tree (AST) node into a formatted string.
 * Supports various Markdown elements such as blockquotes, code blocks, lists, tables, and more.
 *
 * @param {Object} node - The Markdown AST node to render.
 * @param {number} [listIndentLevel=0] - The current indentation level for nested lists.
 * @param {number|null} [listItemNumber=null] - The current item number for ordered lists.
 * @param {Object|null} [parentNode=null] - The parent node, used for context (e.g., list item context).
 * @returns {string} The rendered string representation of the Markdown AST node.
 */
function renderMarkdownAstNode(node, listIndentLevel = 0, listItemNumber = null, parentNode = null) {
  switch (node.type) {
    case "blockquote":
      // Render blockquote with italic dim style
      return FA.dim.italic((node.tokens ?? []).map(child => renderMarkdownAstNode(child)).join(""));
    case "code":
      // Render code block with syntax highlighting if supported
      if (node.lang && ue.supportsLanguage(node.lang)) {
        return ue.highlight(node.text, { language: node.lang }) + hD;
      } else {
        reportErrorIfAllowed(new Error(`Language not supported while highlighting code, falling back to markdown: ${node.lang}`));
        return ue.highlight(node.text, { language: "markdown" }) + hD;
      }
    case "codespan":
      // Inline code span with permission color
      return FA.ansi256(H4().permission)(node.text);
    case "em":
      // Emphasized (italic) text
      return FA.italic((node.tokens ?? []).map(child => renderMarkdownAstNode(child)).join(""));
    case "strong":
      // Strong (bold) text
      return FA.bold((node.tokens ?? []).map(child => renderMarkdownAstNode(child)).join(""));
    case "del":
      // Strikethrough text
      return FA.strikethrough((node.tokens ?? []).map(child => renderMarkdownAstNode(child)).join(""));
    case "heading":
      // Headings with different styles based on depth
      switch (node.depth) {
        case 1:
          return FA.bold.italic.underline((node.tokens ?? []).map(child => renderMarkdownAstNode(child)).join("")) + hD + hD;
        case 2:
          return FA.bold((node.tokens ?? []).map(child => renderMarkdownAstNode(child)).join("")) + hD + hD;
        default:
          return FA.bold.dim((node.tokens ?? []).map(child => renderMarkdownAstNode(child)).join("")) + hD + hD;
      }
    case "hr":
      // Horizontal rule
      return "---";
    case "image":
      // Render image as its href (URL)
      return node.href;
    case "link":
      // Render link as colored href
      return FA.ansi256(H4().permission)(node.href);
    case "list":
      // Render each list item, passing ordered info and start number
      return node.items.map((item, index) =>
        renderMarkdownAstNode(
          item,
          listIndentLevel,
          node.ordered ? node.start + index : null,
          node
        )
      ).join("");
    case "list_item":
      // Render each token in the list item, indenting appropriately
      return (node.tokens ?? []).map(child =>
        `${"  ".repeat(listIndentLevel)}${renderMarkdownAstNode(child, listIndentLevel + 1, listItemNumber, node)}`
      ).join("");
    case "paragraph":
      // Render paragraph tokens and add a line break
      return (node.tokens ?? []).map(child => renderMarkdownAstNode(child)).join("") + hD;
    case "space":
      // Render as a line break
      return hD;
    case "text":
      // If inside a list item, render with bullet or number, else plain text
      if (parentNode?.type === "list_item") {
        const bulletOrNumber = listItemNumber === null ? "-" : getInteractionEntryValue(listIndentLevel, listItemNumber) + ".";
        const content = node.tokens
          ? node.tokens.map(child => renderMarkdownAstNode(child, listIndentLevel, listItemNumber, node)).join("")
          : node.text;
        return `${bulletOrNumber} ${content}${hD}`;
      } else {
        return node.text;
      }
    case "table": {
      // Helper to get plain text length for cell padding
      const getCellText = tokens => removeSpecialPatternFromString(tokens?.map(cellChild => renderMarkdownAstNode(cellChild)).join("") ?? "");
      const tableNode = node;
      // Calculate max width for each column
      const columnWidths = tableNode.header.map((headerCell, colIdx) => {
        let maxLen = getCellText(headerCell.tokens).length;
        for (const row of tableNode.rows) {
          const cellLen = getCellText(row[colIdx]?.tokens).length;
          maxLen = Math.max(maxLen, cellLen);
        }
        return Math.max(maxLen, 3);
      });
      let tableString = "| ";
      // Render header row with alignment
      tableNode.header.forEach((headerCell, colIdx) => {
        const cellContent = headerCell.tokens?.map(cellChild => renderMarkdownAstNode(cellChild)).join("") ?? "";
        const cellText = getCellText(headerCell.tokens);
        const colWidth = columnWidths[colIdx];
        const alignment = tableNode.align?.[colIdx];
        let paddedCell;
        if (alignment === "center") {
          const pad = colWidth - cellText.length;
          const leftPad = Math.floor(pad / 2);
          const rightPad = pad - leftPad;
          paddedCell = " ".repeat(leftPad) + cellContent + " ".repeat(rightPad);
        } else if (alignment === "right") {
          const pad = colWidth - cellText.length;
          paddedCell = " ".repeat(pad) + cellContent;
        } else {
          paddedCell = cellContent + " ".repeat(colWidth - cellText.length);
        }
        tableString += paddedCell + " | ";
      });
      tableString = tableString.trimEnd() + hD;
      // Render separator row
      tableString += "|";
      columnWidths.forEach(width => {
        tableString += "-".repeat(width + 2) + "|";
      });
      tableString += hD;
      // Render table rows
      tableNode.rows.forEach(row => {
        tableString += "| ";
        row.forEach((cell, colIdx) => {
          const cellContent = cell.tokens?.map(cellChild => renderMarkdownAstNode(cellChild)).join("") ?? "";
          const cellText = getCellText(cell.tokens);
          const colWidth = columnWidths[colIdx];
          const alignment = tableNode.align?.[colIdx];
          let paddedCell;
          if (alignment === "center") {
            const pad = colWidth - cellText.length;
            const leftPad = Math.floor(pad / 2);
            const rightPad = pad - leftPad;
            paddedCell = " ".repeat(leftPad) + cellContent + " ".repeat(rightPad);
          } else if (alignment === "right") {
            const pad = colWidth - cellText.length;
            paddedCell = " ".repeat(pad) + cellContent;
          } else {
            paddedCell = cellContent + " ".repeat(colWidth - cellText.length);
          }
          tableString += paddedCell + " | ";
        });
        tableString = tableString.trimEnd() + hD;
      });
      return tableString + hD;
    }
    default:
      // Unknown node type, return empty string
      return "";
  }
}

module.exports = renderMarkdownAstNode;
