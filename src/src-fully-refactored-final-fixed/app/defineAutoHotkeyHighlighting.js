/**
 * Defines the syntax highlighting configuration for AutoHotkey language.
 *
 * @param {object} highlighterUtils - Utility object providing syntax highlighting helpers (e.g., QUOTE_STRING_MODE, COMMENT, inherit, etc.)
 * @returns {object} Highlight.js language definition for AutoHotkey
 */
function defineAutoHotkeyHighlighting(highlighterUtils) {
  // Match a single character inside backticks (escaped character)
  const escapedCharacter = {
    begin: '`[\s\s]'
  };

  return {
    name: 'AutoHotkey',
    case_insensitive: true,
    aliases: ['ahk'],
    keywords: {
      keyword: 'Break Continue Critical Exit ExitApp Gosub Goto New OnExit Pause return SetBatchLines SetTimer Suspend Thread Throw Until ahk_id ahk_class ahk_pid ahk_exe ahk_group',
      literal: 'true false NOT AND OR',
      built_in: 'ComSpec Clipboard ClipboardAll ErrorLevel'
    },
    contains: [
      // Escaped character (e.g., `n, `processRuleBeginHandlers, etc.)
      escapedCharacter,
      // String mode with support for escaped characters
      highlighterUtils.inherit(highlighterUtils.QUOTE_STRING_MODE, {
        contains: [escapedCharacter]
      }),
      // Line comment starting with ';'
      highlighterUtils.COMMENT(';', '$', {
        relevance: 0
      }),
      // Block comment mode (e.g., /* ... */)
      highlighterUtils.C_BLOCK_COMMENT_MODE,
      // Number literals
      {
        className: 'number',
        begin: highlighterUtils.NUMBER_RE,
        relevance: 0
      },
      // Variable references (e.g., %varName%)
      {
        className: 'variable',
        begin: '%[a-zA-Z0-9#_$@]+%'
      },
      // Built-in commands (e.g., at start of line, followed by comma or %)
      {
        className: 'built_in',
        begin: '^\s*\w+\s*(,|%)'
      },
      // Labels (e.g., MyLabel:: or MyLabel:)
      {
        className: 'title',
        variants: [
          {
            begin: '^[^\n";]+::(?!=)'
          },
          {
            begin: '^[^\n";]+:(?!=)',
            relevance: 0
          }
        ]
      },
      // Meta directives (e.g., #Include, #IfWinActive, etc.)
      {
        className: 'meta',
        begin: '^\s*#\w+',
        end: '$',
        relevance: 0
      },
      // Built-in variables (e.g., A_ScriptDir)
      {
        className: 'built_in',
        begin: 'A_[a-zA-Z0-9]+'
      },
      // Comma separator (e.g., ,,)
      {
        begin: ',\s*,'
      }
    ]
  };
}

module.exports = defineAutoHotkeyHighlighting;