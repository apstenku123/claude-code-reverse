/**
 * Renders a list of diff lines as React elements, applying theming and formatting based on the provided options.
 *
 * @param {any} sourceContent - The source content to diff.
 * @param {any} diffConfig - Configuration for diff rendering (e.g., options for word diff, etc).
 * @param {number} lineNumberPadding - The amount of padding for line numbers.
 * @param {boolean} isDimmed - Whether to use dimmed colors for unchanged lines.
 * @param {boolean} hideNoChange - Whether to hide lines with no changes.
 * @param {boolean} hideLineNumbers - Whether to hide line numbers in the output.
 * @param {string} themeName - The name of the theme to use for styling.
 * @returns {Array} Array of React elements representing the diff lines.
 */
function renderDiffLines(
  sourceContent,
  diffConfig,
  lineNumberPadding,
  isDimmed,
  hideNoChange,
  hideLineNumbers,
  themeName
) {
  // Get theme stylesheet based on the theme name
  const themeStyles = getThemeStylesheet(themeName);

  // Process the source content to get diff lines
  const diffLines = mapDiffEntriesWithLineNumbers(
    groupAndMarkWordDiffs(
      mG5(sourceContent)
    ),
    diffConfig
  );

  // Determine the width needed for line numbers
  const maxLineNumberLength = Math.max(
    ...diffLines.map(({ i: lineNumber }) => lineNumber),
    0
  ).toString().length;

  /**
   * Helper to render a diff line cell with theming
   * @param {string} content - The content to render
   * @param {string|undefined} backgroundColor - The background color to use
   * @returns {React.Element}
   */
  const renderCell = (content, backgroundColor) =>
    L9.createElement(
      _,
      {
        color: themeName ? themeStyles.text : undefined,
        backgroundColor,
        dimColor: isDimmed
      },
      content
    );

  // Map each diff line to React elements
  return diffLines.flatMap(diffLine => {
    const {
      type: lineType,
      code: lineContent,
      i: lineNumber,
      wordDiff,
      matchedLine
    } = diffLine;

    // Optionally skip unchanged lines if hideNoChange is true
    if (hideNoChange && lineType === "nochange") return [];

    // Pad the code line as needed
    return splitStringByLength(lineContent, lineNumberPadding - maxLineNumberLength).map((paddedLine, lineIndex) => {
      const elementKey = `${lineType}-${lineNumber}-${lineIndex}`;

      // Special handling for word diff and matched lines
      if (wordDiff && matchedLine && lineIndex === 0) {
        const customElement = renderWordDiffLine(diffLine, lineIndex, maxLineNumberLength, isDimmed, hideLineNumbers, themeName);
        if (customElement) return customElement;
        // Fallback rendering if custom element is not provided
        return L9.createElement(
          _,
          { key: elementKey },
          L9.createElement(renderPaddedTextElement, {
            i: lineIndex === 0 ? lineNumber : undefined,
            width: maxLineNumberLength,
            hidden: hideLineNumbers
          }),
          renderCell(paddedLine, undefined)
        );
      }

      // Render based on line type
      switch (lineType) {
        case "add":
          return L9.createElement(
            _,
            { key: elementKey },
            L9.createElement(renderPaddedTextElement, {
              i: lineIndex === 0 ? lineNumber : undefined,
              width: maxLineNumberLength,
              hidden: hideLineNumbers
            }),
            L9.createElement(
              _,
              {
                color: themeName ? themeStyles.text : undefined,
                backgroundColor: isDimmed ? themeStyles.diff.addedDimmed : themeStyles.diff.added,
                dimColor: isDimmed
              },
              paddedLine
            )
          );
        case "remove":
          return L9.createElement(
            _,
            { key: elementKey },
            L9.createElement(renderPaddedTextElement, {
              i: lineIndex === 0 ? lineNumber : undefined,
              width: maxLineNumberLength,
              hidden: hideLineNumbers
            }),
            L9.createElement(
              _,
              {
                color: themeName ? themeStyles.text : undefined,
                backgroundColor: isDimmed ? themeStyles.diff.removedDimmed : themeStyles.diff.removed,
                dimColor: isDimmed
              },
              paddedLine
            )
          );
        case "nochange":
          return L9.createElement(
            _,
            { key: elementKey },
            L9.createElement(renderPaddedTextElement, {
              i: lineIndex === 0 ? lineNumber : undefined,
              width: maxLineNumberLength,
              hidden: hideLineNumbers
            }),
            L9.createElement(
              _,
              {
                color: themeName ? themeStyles.text : undefined,
                dimColor: isDimmed
              },
              paddedLine
            )
          );
        default:
          return null;
      }
    });
  });
}

module.exports = renderDiffLines;