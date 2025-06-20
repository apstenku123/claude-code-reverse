/**
 * Recursively formats a directory tree structure as a Markdown-style list.
 *
 * Each directory and file is represented as a list item. Directories are followed by a line break (UO),
 * and their children are indented. The root level includes a header line with a timestamp or identifier.
 *
 * @param {Array<Object>} directoryEntries - Array of directory entry objects. Each object should have:
 *   - name {string}: The name of the file or directory
 *   - type {string}: Either 'directory' or another type
 *   - children {Array<Object>=}: Optional array of child entries (for directories)
 * @param {number} depth - Current depth in the directory tree (used for indentation). Defaults to 0.
 * @param {string} indent - Current indentation string. Defaults to empty string.
 * @returns {string} Markdown-formatted string representing the directory tree.
 */
function formatDirectoryTreeAsMarkdown(directoryEntries, depth = 0, indent = "") {
  let markdownOutput = "";

  // At the root level, prepend a header line with a timestamp or identifier
  if (depth === 0) {
    markdownOutput += `- ${iA()}${UO}\n`;
    indent = "  "; // Set initial indentation for children
  }

  for (const entry of directoryEntries) {
    // Add the current entry as a Markdown list item
    markdownOutput += `${indent}- ${entry.name}${entry.type === "directory" ? UO : ""}\n`;

    // If the entry is a directory and has children, recursively process them with increased indentation
    if (entry.children && entry.children.length > 0) {
      markdownOutput += formatDirectoryTreeAsMarkdown(entry.children, depth + 1, `${indent}  `);
    }
  }

  return markdownOutput;
}

module.exports = formatDirectoryTreeAsMarkdown;