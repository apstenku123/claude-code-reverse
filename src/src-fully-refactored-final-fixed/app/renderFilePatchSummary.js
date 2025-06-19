/**
 * Renders a summary and detailed view of file changes (patches) in a CLI UI.
 *
 * @param {Object} params - The parameters for rendering the patch summary.
 * @param {string} params.filePath - The path of the file being patched.
 * @param {Array<Object>} params.structuredPatch - Array of patch objects, each with a 'lines' array and 'newStart' property.
 * @param {string} params.style - The display style (e.g., 'condensed').
 * @param {boolean} params.verbose - Whether to show the full file path or a shortened version.
 * @returns {React.Element} The rendered patch summary and details as React elements for CLI UI.
 */
function renderFilePatchSummary({
  filePath,
  structuredPatch,
  style,
  verbose
}) {
  // Get terminal column width
  const { columns: terminalWidth } = Z4();

  // Count number of added lines (lines starting with '+')
  const additionsCount = structuredPatch.reduce(
    (total, patch) => total + patch.lines.filter(line => line.startsWith("+")).length,
    0
  );

  // Count number of removed lines (lines starting with '-')
  const removalsCount = structuredPatch.reduce(
    (total, patch) => total + patch.lines.filter(line => line.startsWith("-")).length,
    0
  );

  // Get canonical file path and CLAUDE.md path for comparison
  const canonicalFilePath = getValidInteractionEntry(filePath);
  const claudeFilePath = nG5(C4(), "CLAUDE.md");
  const isClaudeFile = canonicalFilePath === claudeFilePath;

  // Build the summary line (e.g., 'Updated foo.js with 2 additions and 1 removal')
  const summaryLine = s4.createElement(
    _,
    null,
    "Updated",
    " ",
    s4.createElement(
      _,
      { bold: true },
      verbose ? filePath : iG5(iA(), filePath)
    ),
    (additionsCount > 0 || removalsCount > 0) ? " with " : "",
    additionsCount > 0
      ? s4.createElement(
          s4.Fragment,
          null,
          s4.createElement(_, { bold: true }, additionsCount),
          " ",
          additionsCount > 1 ? "additions" : "addition"
        )
      : null,
    additionsCount > 0 && removalsCount > 0 ? " and " : null,
    removalsCount > 0
      ? s4.createElement(
          s4.Fragment,
          null,
          s4.createElement(_, { bold: true }, removalsCount),
          " ",
          removalsCount > 1 ? "removals" : "removal"
        )
      : null
  );

  // If style is 'condensed' and not verbose, just show the summary line
  if (style === "condensed" && !verbose) {
    return summaryLine;
  }

  // Render the full patch details
  return s4.createElement(
    ConditionalRowContainer,
    null,
    s4.createElement(
      g,
      { flexDirection: "column" },
      s4.createElement(_, null, summaryLine),
      // Render each patch chunk with possible ellipsis
      FW(
        structuredPatch.map(patchChunk =>
          s4.createElement(
            g,
            { flexDirection: "column", key: patchChunk.newStart },
            s4.createElement(dD, {
              patch: patchChunk,
              dim: false,
              width: terminalWidth - 12
            })
          )
        ),
        // Render ellipsis for omitted chunks
        omittedIndex =>
          s4.createElement(
            g,
            { key: `ellipsis-${omittedIndex}` },
            s4.createElement(_, { color: getThemeStylesheet().secondaryText }, "...")
          )
      ),
      // If the file is CLAUDE.md, show a tip about the shortcut
      isClaudeFile &&
        s4.createElement(
          g,
          { marginTop: 1 },
          s4.createElement(
            _,
            null,
            s4.createElement(_, { bold: true }, "Tip:"),
            " Use",
            " ",
            s4.createElement(_, { color: getThemeStylesheet().remember }, "# to memorize"),
            " shortcut to quickly add to CLAUDE.md"
          )
        )
    )
  );
}

module.exports = renderFilePatchSummary;
