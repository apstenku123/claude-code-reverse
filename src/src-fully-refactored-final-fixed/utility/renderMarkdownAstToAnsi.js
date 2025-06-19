/**
 * Renders a Markdown Abstract Syntax Tree (AST) node to an ANSI-formatted string.
 * Supports blockquotes, code blocks, inline code, emphasis, strong, strikethrough, headings,
 * horizontal rules, images, links, lists, list items, paragraphs, tables, and plain text.
 *
 * @param {Object} node - The Markdown AST node to render.
 * @param {number} [listIndentLevel=0] - The current indentation level for lists.
 * @param {number|null} [listItemNumber=null] - The current list item number (for ordered lists).
 * @param {Object|null} [parentNode=null] - The parent AST node (used for context in some cases).
 * @returns {string} The rendered ANSI-formatted string.
 */
function renderMarkdownAstToAnsi(node, listIndentLevel = 0, listItemNumber = null, parentNode = null) {
  switch (node.type) {
    case "blockquote":
      // Render blockquote with dim italic style
      return FA.dim.italic((node.tokens ?? []).map(child => renderMarkdownAstToAnsi(child)).join(""));
    case "code":
      // Render code block with syntax highlighting if supported, else fallback to markdown
      if (node.lang && ue.supportsLanguage(node.lang)) {
        return ue.highlight(node.text, { language: node.lang }) + hD;
      } else {
        reportErrorIfAllowed(new Error(`Language not supported while highlighting code, falling back to markdown: ${node.lang}`));
        return ue.highlight(node.text, { language: "markdown" }) + hD;
      }
    case "codespan":
      // Render inline code with ANSI color
      return FA.ansi256(H4().permission)(node.text);
    case "em":
      // Render emphasis (italic)
      return FA.italic((node.tokens ?? []).map(child => renderMarkdownAstToAnsi(child)).join(""));
    case "strong":
      // Render strong (bold)
      return FA.bold((node.tokens ?? []).map(child => renderMarkdownAstToAnsi(child)).join(""));
    case "del":
      // Render strikethrough
      return FA.strikethrough((node.tokens ?? []).map(child => renderMarkdownAstToAnsi(child)).join(""));
    case "heading":
      // Render headings with different styles based on depth
      switch (node.depth) {
        case 1:
          return FA.bold.italic.underline((node.tokens ?? []).map(child => renderMarkdownAstToAnsi(child)).join("")) + hD + hD;
        case 2:
          return FA.bold((node.tokens ?? []).map(child => renderMarkdownAstToAnsi(child)).join("")) + hD + hD;
        default:
          return FA.bold.dim((node.tokens ?? []).map(child => renderMarkdownAstToAnsi(child)).join("")) + hD + hD;
      }
    case "hr":
      // Render horizontal rule
      return "---";
    case "image":
      // Render image as its href (URL)
      return node.href;
    case "link":
      // Render link as colored URL
      return FA.ansi256(H4().permission)(node.href);
    case "list":
      // Render list by mapping each item, passing ordered info and start index
      return node.items.map((item, index) =>
        renderMarkdownAstToAnsi(
          item,
          listIndentLevel,
          node.ordered ? node.start + index : null,
          node
        )
      ).join("");
    case "list_item":
      // Render list item with indentation
      return (node.tokens ?? []).map(child =>
        `${"  ".repeat(listIndentLevel)}${renderMarkdownAstToAnsi(child, listIndentLevel + 1, listItemNumber, node)}`
      ).join("");
    case "paragraph":
      // Render paragraph and add line break
      return (node.tokens ?? []).map(child => renderMarkdownAstToAnsi(child)).join("") + hD;
    case "space":
      // Render space as line break
      return hD;
    case "text":
      // Render text, handling list item context for bullets/numbers
      if (parentNode?.type === "list_item") {
        const bullet = listItemNumber === null ? "-" : getInteractionEntryValue(listIndentLevel, listItemNumber) + ".";
        const content = node.tokens
          ? node.tokens.map(child => renderMarkdownAstToAnsi(child, listIndentLevel, listItemNumber, node)).join("")
          : node.text;
        return `${bullet} ${content}${hD}`;
      } else {
        return node.text;
      }
    case "table": {
      // Helper to get plain text length for table cell
      const getCellText = (tokens) => removeSpecialPatternFromString(tokens?.map(child => renderMarkdownAstToAnsi(child)).join("") ?? "");
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
      // Render header row
      tableNode.header.forEach((headerCell, colIdx) => {
        const cellContent = headerCell.tokens?.map(child => renderMarkdownAstToAnsi(child)).join("") ?? "";
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
          const cellContent = cell.tokens?.map(child => renderMarkdownAstToAnsi(child)).join("") ?? "";
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
      return "";
  }
}

module.exports = renderMarkdownAstToAnsi;