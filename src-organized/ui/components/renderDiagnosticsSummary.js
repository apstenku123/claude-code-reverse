/**
 * Renders a summary or detailed view of diagnostics for a set of files, depending on verbosity.
 *
 * @param {Object} params - The parameters object.
 * @param {Object} params.attachment - The attachment object containing files and their diagnostics.
 * @param {boolean} params.verbose - Whether to show detailed diagnostics (true) or a summary (false).
 * @returns {React.ReactElement|null} The rendered diagnostics summary or details, or null if no diagnostics.
 */
function renderDiagnosticsSummary({
  attachment,
  verbose
}) {
  // If there are no files, return null
  if (attachment.files.length === 0) return null;

  // Calculate total number of diagnostics across all files
  const totalDiagnostics = attachment.files.reduce(
    (sum, file) => sum + file.diagnostics.length,
    0
  );
  const totalFiles = attachment.files.length;

  // If verbose, render detailed diagnostics for each file
  if (verbose) {
    return AE.default.createElement(
      g,
      { flexDirection: "column" },
      attachment.files.map((file, fileIndex) =>
        AE.default.createElement(
          AE.default.Fragment,
          { key: fileIndex },
          // File header
          AE.default.createElement(
            ConditionalRowContainer,
            null,
            AE.default.createElement(
              _,
              {
                color: getThemeStylesheet().secondaryText,
                wrap: "wrap"
              },
              // File name (bolded, cleaned up)
              FA.bold(jW5(iA(), file.uri.replace("file://", "").replace("_claude_fs_right:", ""))),
              " ",
              // File URI type (dimmed)
              FA.dim(
                file.uri.startsWith("file://")
                  ? "(file://)"
                  : file.uri.startsWith("_claude_fs_right:")
                  ? "(claude_fs_right)"
                  : `(${file.uri.split(":")[0]})`
              ),
              ":"
            )
          ),
          // Diagnostics for this file
          file.diagnostics.map((diagnostic, diagnosticIndex) =>
            AE.default.createElement(
              ConditionalRowContainer,
              { key: diagnosticIndex },
              AE.default.createElement(
                _,
                {
                  color: getThemeStylesheet().secondaryText,
                  wrap: "wrap"
                },
                "  ",
                $sendHttpRequestOverSocket.getSeveritySymbol(diagnostic.severity),
                " [Line ",
                diagnostic.range.start.line + 1,
                ":",
                diagnostic.range.start.character + 1,
                "] ",
                diagnostic.message,
                diagnostic.code ? ` [${diagnostic.code}]` : "",
                diagnostic.source ? ` (${diagnostic.source})` : ""
              )
            )
          )
        )
      )
    );
  } else {
    // Otherwise, render a summary line
    return AE.default.createElement(
      ConditionalRowContainer,
      null,
      AE.default.createElement(
        _,
        {
          color: getThemeStylesheet().secondaryText,
          wrap: "wrap"
        },
        `Found ${FA.bold(totalDiagnostics)} new diagnostic ${totalDiagnostics === 1 ? "issue" : "issues"} in ${totalFiles} ${totalFiles === 1 ? "file" : "files"} (ctrl-r to expand)`
      )
    );
  }
}

module.exports = renderDiagnosticsSummary;