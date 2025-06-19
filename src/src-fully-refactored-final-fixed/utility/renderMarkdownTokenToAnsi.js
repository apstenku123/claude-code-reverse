/**
 * Renders a parsed Markdown token (from a Markdown parser) into an ANSI-formatted string for terminal output.
 * Handles all standard Markdown elements, including tables, lists, headings, code blocks, and inline formatting.
 *
 * @param {Object} token - The Markdown token object to render.
 * @param {number} [listIndentLevel=0] - The current indentation level for nested lists.
 * @param {number|null} [listItemNumber=null] - The current list item number (for ordered lists).
 * @param {Object|null} [parentToken=null] - The parent token, used for context (e.g., for list items).
 * @returns {string} The ANSI-formatted string representation of the token.
 */
function renderMarkdownTokenToAnsi(token, listIndentLevel = 0, listItemNumber = null, parentToken = null) {
  switch (token.type) {
    case "blockquote":
      // Render blockquote with dim italic style
      return FA.dim.italic((token.tokens ?? []).map(childToken => renderMarkdownTokenToAnsi(childToken)).join(""));

    case "code":
      // Render code block with syntax highlighting if supported
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
      // Emphasis (italic)
      return FA.italic((token.tokens ?? []).map(childToken => renderMarkdownTokenToAnsi(childToken)).join(""));

    case "strong":
      // Strong (bold)
      return FA.bold((token.tokens ?? []).map(childToken => renderMarkdownTokenToAnsi(childToken)).join(""));

    case "del":
      // Strikethrough
      return FA.strikethrough((token.tokens ?? []).map(childToken => renderMarkdownTokenToAnsi(childToken)).join(""));

    case "heading":
      // Headings with different styles based on depth
      switch (token.depth) {
        case 1:
          return FA.bold.italic.underline((token.tokens ?? []).map(childToken => renderMarkdownTokenToAnsi(childToken)).join("")) + hD + hD;
        case 2:
          return FA.bold((token.tokens ?? []).map(childToken => renderMarkdownTokenToAnsi(childToken)).join("")) + hD + hD;
        default:
          return FA.bold.dim((token.tokens ?? []).map(childToken => renderMarkdownTokenToAnsi(childToken)).join("")) + hD + hD;
      }

    case "hr":
      // Horizontal rule
      return "---";

    case "image":
      // Just return the image href (URL)
      return token.href;

    case "link":
      // Render link as colored text (using permission color)
      return FA.ansi256(H4().permission)(token.href);

    case "list":
      // Render each list item, passing in the correct numbering for ordered lists
      return token.items.map((listItem, itemIndex) =>
        renderMarkdownTokenToAnsi(
          listItem,
          listIndentLevel,
          token.ordered ? token.start + itemIndex : null,
          token
        )
      ).join("");

    case "list_item":
      // Render each token in the list item, with indentation
      return (token.tokens ?? []).map(childToken =>
        `${"  ".repeat(listIndentLevel)}${renderMarkdownTokenToAnsi(childToken, listIndentLevel + 1, listItemNumber, token)}`
      ).join("");

    case "paragraph":
      // Render paragraph and add line break
      return (token.tokens ?? []).map(childToken => renderMarkdownTokenToAnsi(childToken)).join("") + hD;

    case "space":
      // Blank line
      return hD;

    case "text":
      // Render text, with special handling for list items
      if (parentToken?.type === "list_item") {
        const bullet = listItemNumber === null ? "-" : getInteractionEntryValue(listIndentLevel, listItemNumber) + ".";
        const content = token.tokens
          ? token.tokens.map(childToken => renderMarkdownTokenToAnsi(childToken, listIndentLevel, listItemNumber, token)).join("")
          : token.text;
        return `${bullet} ${content}${hD}`;
      } else {
        return token.text;
      }

    case "table": {
      // Helper to get visible string length (strip ANSI codes)
      const getVisibleLength = str => removeSpecialPatternFromString(str ?? "");
      const tableToken = token;

      // Compute column widths
      const columnWidths = tableToken.header.map((headerCell, colIndex) => {
        let maxLen = getVisibleLength(headerCell.tokens.map(renderMarkdownTokenToAnsi).join("")).length;
        for (const row of tableToken.rows) {
          const cell = row[colIndex];
          if (cell) {
            const cellLen = getVisibleLength(cell.tokens.map(renderMarkdownTokenToAnsi).join("")).length;
            maxLen = Math.max(maxLen, cellLen);
          }
        }
        return Math.max(maxLen, 3);
      });

      let tableString = "| ";
      // Render header row
      tableToken.header.forEach((headerCell, colIndex) => {
        const headerContent = headerCell.tokens?.map(renderMarkdownTokenToAnsi).join("") ?? "";
        const visibleHeader = getVisibleLength(headerCell.tokens.map(renderMarkdownTokenToAnsi).join(""));
        const colWidth = columnWidths[colIndex];
        const alignment = tableToken.align?.[colIndex];
        let paddedHeader;
        if (alignment === "center") {
          const pad = colWidth - visibleHeader.length;
          const leftPad = Math.floor(pad / 2);
          const rightPad = pad - leftPad;
          paddedHeader = " ".repeat(leftPad) + headerContent + " ".repeat(rightPad);
        } else if (alignment === "right") {
          const pad = colWidth - visibleHeader.length;
          paddedHeader = " ".repeat(pad) + headerContent;
        } else {
          paddedHeader = headerContent + " ".repeat(colWidth - visibleHeader.length);
        }
        tableString += paddedHeader + " | ";
      });
      tableString = tableString.trimEnd() + hD;

      // Render separator row
      tableString += "|";
      columnWidths.forEach(colWidth => {
        tableString += "-".repeat(colWidth + 2) + "|";
      });
      tableString += hD;

      // Render data rows
      tableToken.rows.forEach(row => {
        tableString += "| ";
        row.forEach((cell, colIndex) => {
          const cellContent = cell.tokens?.map(renderMarkdownTokenToAnsi).join("") ?? "";
          const visibleCell = getVisibleLength(cell.tokens.map(renderMarkdownTokenToAnsi).join(""));
          const colWidth = columnWidths[colIndex];
          const alignment = tableToken.align?.[colIndex];
          let paddedCell;
          if (alignment === "center") {
            const pad = colWidth - visibleCell.length;
            const leftPad = Math.floor(pad / 2);
            const rightPad = pad - leftPad;
            paddedCell = " ".repeat(leftPad) + cellContent + " ".repeat(rightPad);
          } else if (alignment === "right") {
            const pad = colWidth - visibleCell.length;
            paddedCell = " ".repeat(pad) + cellContent;
          } else {
            paddedCell = cellContent + " ".repeat(colWidth - visibleCell.length);
          }
          tableString += paddedCell + " | ";
        });
        tableString = tableString.trimEnd() + hD;
      });
      return tableString + hD;
    }
  }
  // Default: return empty string for unknown types
  return "";
}

module.exports = renderMarkdownTokenToAnsi;