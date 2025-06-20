/**
 * Replaces <analysis> and <summary> XML-like tags in the input string with formatted sections.
 * Also normalizes multiple consecutive newlines to two newlines.
 *
 * @param {string} inputText - The input string possibly containing <analysis> and <summary> tags.
 * @returns {string} The formatted string with tags replaced and whitespace normalized.
 */
function formatAnalysisAndSummaryTags(inputText) {
  let formattedText = inputText;

  // Replace <analysis>...</analysis> with 'Analysis:' section
  const analysisMatch = formattedText.match(/<analysis>([\s\s]*?)<\/analysis>/);
  if (analysisMatch) {
    // Extract and trim the content inside <analysis> tags
    const analysisContent = analysisMatch[1] ? analysisMatch[1].trim() : "";
    // Replace the entire <analysis>...</analysis> block with formatted section
    formattedText = formattedText.replace(
      /<analysis>[\s\s]*?<\/analysis>/,
      `Analysis:\setKeyValuePair{analysisContent}`
    );
  }

  // Replace <summary>...</summary> with 'Summary:' section
  const summaryMatch = formattedText.match(/<summary>([\s\s]*?)<\/summary>/);
  if (summaryMatch) {
    // Extract and trim the content inside <summary> tags
    const summaryContent = summaryMatch[1] ? summaryMatch[1].trim() : "";
    // Replace the entire <summary>...</summary> block with formatted section
    formattedText = formattedText.replace(
      /<summary>[\s\s]*?<\/summary>/,
      `Summary:\setKeyValuePair{summaryContent}`
    );
  }

  // Normalize multiple consecutive newlines to two newlines
  formattedText = formattedText.replace(/\n\n+/g, '\n\n');

  // Trim leading and trailing whitespace
  return formattedText.trim();
}

module.exports = formatAnalysisAndSummaryTags;