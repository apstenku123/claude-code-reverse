/**
 * Renders a single line of a word diff, handling both additions and removals with appropriate highlighting and formatting.
 *
 * @param {Object} diffLineData - Data for the diff line, including type, index, word diff, matched line, and original code.
 * @param {number} lineIndex - The index of the line in the diff.
 * @param {number} lineWidth - The width of the line for rendering.
 * @param {boolean} isDimmed - Whether the line should be rendered in a dimmed style.
 * @param {boolean} isHidden - Whether the line should be hidden.
 * @param {boolean} useThemeTextColor - Whether to use the theme'createInteractionAccessor text color.
 * @returns {React.ReactNode|null} The rendered diff line as a React element, or null if the line should not be rendered.
 */
function renderWordDiffLine(diffLineData, lineIndex, lineWidth, isDimmed, isHidden, useThemeTextColor) {
  // Get theme colors/styles based on the theme context
  const themeStyles = getThemeStylesheet(useThemeTextColor);
  const {
    type: diffType,
    i: diffLineIndex,
    wordDiff,
    matchedLine,
    originalCode
  } = diffLineData;
  // Unique key for React rendering
  const reactKey = `${diffType}-${diffLineIndex}-${lineIndex}`;

  // Only render if this is a word diff, has a matched line, and is the first line (lineIndex === 0)
  if (!wordDiff || !matchedLine || lineIndex !== 0) {
    return null;
  }

  const displayedCode = originalCode;
  const matchedOriginalCode = matchedLine.originalCode;

  // For 'remove', createDebouncedFunction = displayedCode, operateWithLeadingTrailing = matchedOriginalCode; for 'add', reverse
  let removedText, addedText;
  if (diffType === "remove") {
    removedText = displayedCode;
    addedText = matchedOriginalCode;
  } else {
    removedText = matchedOriginalCode;
    addedText = displayedCode;
  }

  // Compute word diff array
  const wordDiffArray = compareWithCaseSensitivity(removedText, addedText);
  const totalLength = removedText.length + addedText.length;

  // Determine if the diff is too large to highlight word-by-word, or if dimmed
  const isLargeOrDimmed = wordDiffArray.filter(part => part.added || part.removed)
    .reduce((sum, part) => sum + part.value.length, 0) / totalLength > gG5 || isDimmed;

  // Render for 'add' type
  if (diffType === "add") {
    return L9.createElement(
      _,
      { key: reactKey },
      L9.createElement(renderPaddedTextElement, {
        i: diffLineIndex,
        width: lineWidth,
        hidden: isHidden
      }),
      L9.createElement(
        _,
        {
          backgroundColor: isDimmed ? themeStyles.diff.addedDimmed : themeStyles.diff.added
        },
        " ",
        isLargeOrDimmed
          ? L9.createElement(
              _,
              {
                color: useThemeTextColor ? themeStyles.text : undefined,
                dimColor: isDimmed
              },
              displayedCode
            )
          : wordDiffArray.map((part, partIndex) => {
              if (part.added) {
                return L9.createElement(
                  _,
                  {
                    key: `part-${partIndex}`,
                    backgroundColor: isDimmed ? themeStyles.diff.addedWordDimmed : themeStyles.diff.addedWord,
                    color: useThemeTextColor ? themeStyles.text : undefined,
                    dimColor: isDimmed
                  },
                  part.value
                );
              } else if (part.removed) {
                return null;
              } else {
                return L9.createElement(
                  _,
                  {
                    key: `part-${partIndex}`,
                    color: useThemeTextColor ? themeStyles.text : undefined,
                    dimColor: isDimmed
                  },
                  part.value
                );
              }
            })
      )
    );
  }
  // Render for 'remove' type
  else if (diffType === "remove") {
    return L9.createElement(
      _,
      { key: reactKey },
      L9.createElement(renderPaddedTextElement, {
        i: diffLineIndex,
        width: lineWidth,
        hidden: isHidden
      }),
      L9.createElement(
        _,
        {
          backgroundColor: isDimmed ? themeStyles.diff.removedDimmed : themeStyles.diff.removed
        },
        " ",
        isLargeOrDimmed
          ? L9.createElement(
              _,
              {
                color: useThemeTextColor ? themeStyles.text : undefined,
                dimColor: isDimmed
              },
              displayedCode
            )
          : wordDiffArray.map((part, partIndex) => {
              if (part.removed) {
                return L9.createElement(
                  _,
                  {
                    key: `part-${partIndex}`,
                    backgroundColor: isDimmed ? themeStyles.diff.removedWordDimmed : themeStyles.diff.removedWord,
                    color: useThemeTextColor ? themeStyles.text : undefined,
                    dimColor: isDimmed
                  },
                  part.value
                );
              } else if (part.added) {
                return null;
              } else {
                return L9.createElement(
                  _,
                  {
                    key: `part-${partIndex}`,
                    color: useThemeTextColor ? themeStyles.text : undefined,
                    dimColor: isDimmed
                  },
                  part.value
                );
              }
            })
      )
    );
  }

  // For other types, render nothing
  return null;
}

module.exports = renderWordDiffLine;