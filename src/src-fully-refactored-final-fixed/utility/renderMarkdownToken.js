/**
 * Recursively renders a parsed markdown token into a formatted string using custom formatting utilities.
 * Handles all standard markdown token types, including blockquotes, code, headings, lists, tables, etc.
 *
 * @param {Object} token - The markdown token object to render.
 * @param {number} [listIndentLevel=0] - Current indentation level for nested lists.
 * @param {number|null} [listItemNumber=null] - The current list item number (for ordered lists).
 * @param {Object|null} [parentToken=null] - The parent token, used for context (e.g., for list items).
 * @returns {string} The rendered string for the given token and its children.
 */
function renderMarkdownToken(token, listIndentLevel = 0, listItemNumber = null, parentToken = null) {
  switch (token.type) {
    case "blockquote":
      // Render blockquote with italic dim formatting
      return FA.dim.italic((token.tokens ?? []).map(child => renderMarkdownToken(child)).join(""));

    case "code":
      // Render code block with syntax highlighting if supported, else fallback to markdown highlighting
      if (token.lang && ue.supportsLanguage(token.lang)) {
        return ue.highlight(token.text, { language: token.lang }) + hD;
      } else {
        reportErrorIfAllowed(new Error(`Language not supported while highlighting code, falling back to markdown: ${token.lang}`));
        return ue.highlight(token.text, { language: "markdown" }) + hD;
      }

    case "codespan":
      // Inline code span
      return FA.ansi256(H4().permission)(token.text);

    case "em":
      // Emphasized text (italic)
      return FA.italic((token.tokens ?? []).map(child => renderMarkdownToken(child)).join(""));

    case "strong":
      // Strong text (bold)
      return FA.bold((token.tokens ?? []).map(child => renderMarkdownToken(child)).join(""));

    case "del":
      // Strikethrough text
      return FA.strikethrough((token.tokens ?? []).map(child => renderMarkdownToken(child)).join(""));

    case "heading":
      // Headings with different formatting based on depth
      switch (token.depth) {
        case 1:
          return FA.bold.italic.underline((token.tokens ?? []).map(child => renderMarkdownToken(child)).join("")) + hD + hD;
        case 2:
          return FA.bold((token.tokens ?? []).map(child => renderMarkdownToken(child)).join("")) + hD + hD;
        default:
          return FA.bold.dim((token.tokens ?? []).map(child => renderMarkdownToken(child)).join("")) + hD + hD;
      }

    case "hr":
      // Horizontal rule
      return "---";

    case "image":
      // Image: return the href (URL)
      return token.href;

    case "link":
      // Link: format the href with ansi256 coloring
      return FA.ansi256(H4().permission)(token.href);

    case "list":
      // Render each list item, passing appropriate numbering for ordered lists
      return token.items.map((item, itemIndex) =>
        renderMarkdownToken(
          item,
          listIndentLevel,
          token.ordered ? token.start + itemIndex : null,
          token
        )
      ).join("");

    case "list_item":
      // Render each token in the list item, indenting appropriately
      return (token.tokens ?? []).map(child =>
        `${"  ".repeat(listIndentLevel)}${renderMarkdownToken(child, listIndentLevel + 1, listItemNumber, token)}`
      ).join("");

    case "paragraph":
      // Paragraph: join all child tokens and add a line break
      return (token.tokens ?? []).map(child => renderMarkdownToken(child)).join("") + hD;

    case "space":
      // Blank line
      return hD;

    case "text":
      // Text node, with special handling if inside a list item
      if (parentToken?.type === "list_item") {
        const bullet = listItemNumber === null ? "-" : getInteractionEntryValue(listIndentLevel, listItemNumber) + ".";
        const content = token.tokens
          ? token.tokens.map(child => renderMarkdownToken(child, listIndentLevel, listItemNumber, token)).join("")
          : token.text;
        return `${bullet} ${content}${hD}`;
      } else {
        return token.text;
      }

    case "table": {
      // Helper to get the string length of a cell'createInteractionAccessor rendered content
      const getCellLength = cellTokens => removeSpecialPatternFromString(cellTokens?.map(child => renderMarkdownToken(child)).join("") ?? "");
      const tableToken = token;
      // Calculate max width for each column
      const columnWidths = tableToken.header.map((headerCell, colIndex) => {
        let maxLen = getCellLength(headerCell.tokens).length;
        for (const row of tableToken.rows) {
          const cellLen = getCellLength(row[colIndex]?.tokens).length;
          maxLen = Math.max(maxLen, cellLen);
        }
        return Math.max(maxLen, 3);
      });
      let tableString = "| ";
      // Render header row
      tableToken.header.forEach((headerCell, colIndex) => {
        const cellContent = headerCell.tokens?.map(child => renderMarkdownToken(child)).join("") ?? "";
        const cellLength = getCellLength(headerCell.tokens);
        const colWidth = columnWidths[colIndex];
        const alignment = tableToken.align?.[colIndex];
        let paddedContent;
        if (alignment === "center") {
          const pad = colWidth - cellLength.length;
          const leftPad = Math.floor(pad / 2);
          const rightPad = pad - leftPad;
          paddedContent = " ".repeat(leftPad) + cellContent + " ".repeat(rightPad);
        } else if (alignment === "right") {
          const pad = colWidth - cellLength.length;
          paddedContent = " ".repeat(pad) + cellContent;
        } else {
          paddedContent = cellContent + " ".repeat(colWidth - cellLength.length);
        }
        tableString += paddedContent + " | ";
      });
      tableString = tableString.trimEnd() + hD;
      // Render separator row
      tableString += "|";
      columnWidths.forEach(width => {
        tableString += "-".repeat(width + 2) + "|";
      });
      tableString += hD;
      // Render data rows
      tableToken.rows.forEach(row => {
        tableString += "| ";
        row.forEach((cell, colIndex) => {
          const cellContent = cell.tokens?.map(child => renderMarkdownToken(child)).join("") ?? "";
          const cellLength = getCellLength(cell.tokens);
          const colWidth = columnWidths[colIndex];
          const alignment = tableToken.align?.[colIndex];
          let paddedContent;
          if (alignment === "center") {
            const pad = colWidth - cellLength.length;
            const leftPad = Math.floor(pad / 2);
            const rightPad = pad - leftPad;
            paddedContent = " ".repeat(leftPad) + cellContent + " ".repeat(rightPad);
          } else if (alignment === "right") {
            const pad = colWidth - cellLength.length;
            paddedContent = " ".repeat(pad) + cellContent;
          } else {
            paddedContent = cellContent + " ".repeat(colWidth - cellLength.length);
          }
          tableString += paddedContent + " | ";
        });
        tableString = tableString.trimEnd() + hD;
      });
      return tableString + hD;
    }
  }
  // Default: return empty string for unknown token types
  return "";
}

module.exports = renderMarkdownToken;