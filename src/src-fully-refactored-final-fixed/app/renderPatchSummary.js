/**
 * Renders a summary and detailed view of a file patch, including additions/removals and tips for CLAUDE.md.
 *
 * @param {Object} params - The parameters for rendering the patch summary.
 * @param {string} params.filePath - The path of the file being patched.
 * @param {Array<Object>} params.structuredPatch - Array of patch objects, each with a 'lines' property (array of strings).
 * @param {string} params.style - The rendering style (e.g., 'condensed').
 * @param {boolean} params.verbose - Whether to show the full file path (true) or a shortened version (false).
 * @returns {React.ReactElement} The rendered patch summary React element.
 */
function renderPatchSummary({
  filePath,
  structuredPatch,
  style,
  verbose
}) {
  // Get the current terminal window size (columns)
  const { columns: terminalColumns } = Z4();

  // Count the number of added lines (lines starting with '+')
  const additionCount = structuredPatch.reduce(
    (total, patch) => total + patch.lines.filter(line => line.startsWith("+")).length,
    0
  );

  // Count the number of removed lines (lines starting with '-')
  const removalCount = structuredPatch.reduce(
    (total, patch) => total + patch.lines.filter(line => line.startsWith("-")).length,
    0
  );

  // Get the normalized file path and the CLAUDE.md path
  const normalizedFilePath = getValidInteractionEntry(filePath);
  const claudeFilePath = nG5(C4(), "CLAUDE.md");
  const isClaudeFile = normalizedFilePath === claudeFilePath;

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
    (additionCount > 0 || removalCount > 0) ? " with " : "",
    additionCount > 0
      ? s4.createElement(
          s4.Fragment,
          null,
          s4.createElement(_, { bold: true }, additionCount),
          " ",
          additionCount > 1 ? "additions" : "addition"
        )
      : null,
    (additionCount > 0 && removalCount > 0) ? " and " : null,
    removalCount > 0
      ? s4.createElement(
          s4.Fragment,
          null,
          s4.createElement(_, { bold: true }, removalCount),
          " ",
          removalCount > 1 ? "removals" : "removal"
        )
      : null
  );

  // If style is 'condensed' and not verbose, just return the summary line
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
      // Render each patch chunk
      FW(
        structuredPatch.map(patchChunk =>
          s4.createElement(
            g,
            {
              flexDirection: "column",
              key: patchChunk.newStart
            },
            s4.createElement(dD, {
              patch: patchChunk,
              dim: false,
              width: terminalColumns - 12
            })
          )
        ),
        // Render ellipsis between patch chunks if needed
        index =>
          s4.createElement(
            g,
            { key: `ellipsis-${index}` },
            s4.createElement(_, { color: getThemeStylesheet().secondaryText }, "...")
          )
      ),
      // If this is the CLAUDE.md file, show a tip
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

module.exports = renderPatchSummary;