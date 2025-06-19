/**
 * Factory function that creates a highlight.js language definition object for ArcGIS Arcade syntax highlighting.
 *
 * @param {object} highlightJsApi - The highlight.js API object, providing regexes and language modes.
 * @returns {object} Highlight.js language definition for Arcade.
 */
function createArcadeHighlightJsDefinition(highlightJsApi) {
  // Define Arcade keywords, literals, and built-in functions
  const arcadeKeywords = {
    keyword:
      "if for while var new function do return void else break",
    literal:
      "BackSlash DoubleQuote false ForwardSlash Infinity NaN NewLine null handleHeadElementStartTag SingleQuote Tab TextFormatting true undefined",
    built_in:
      "Abs Acos Angle Attachments Area AreaGeodetic Asin Atan Atan2 Average Bearing Boolean Buffer BufferGeodetic Ceil Centroid Clip Console Constrain Contains Cos Count Crosses Cut Date DateAdd DateDiff Day Decode DefaultValue Dictionary Difference Disjoint Distance DistanceGeodetic Distinct DomainCode DomainName Equals Exp Extent Feature FeatureSet FeatureSetByAssociation FeatureSetById FeatureSetByPortalItem FeatureSetByRelationshipName FeatureSetByTitle FeatureSetByUrl Filter First Floor Geometry GroupBy Guid HasKey Hour IIf IndexOf Intersection Intersects IsEmpty IsNan IsSelfIntersecting Length LengthGeodetic Log Max Mean Millisecond Min Minute Month MultiPartToSinglePart Multipoint NextSequenceValue Now Number OrderBy Overlaps Point Polygon Polyline Portal Pow Random Relate Reverse RingIsClockWise Round Second SetGeometry Sin Sort Sqrt Stdev Sum SymmetricDifference Tan Text Timestamp Today ToLocal Top Touches ToUTC TrackCurrentTime TrackGeometryWindow TrackIndex TrackStartTime TrackWindow TypeOf Union UrlEncode Variance Weekday When Within Year "
  };

  // Match Arcade variable symbols like $datastore, $feature, etc.
  const arcadeSymbol = {
    className: "symbol",
    begin: /\$[datastore|feature|layer|map|measure|sourcefeature|sourcelayer|targetfeature|targetlayer|value|view]+/
  };

  // Match Arcade number literals (binary, octal, decimal)
  const arcadeNumber = {
    className: "number",
    variants: [
      { begin: /\b0[bB][01]+/ },
      { begin: /\b0[oO][0-7]+/ },
      { begin: highlightJsApi.C_NUMBER_RE }
    ],
    relevance: 0
  };

  // Template string interpolation: ${...}
  const arcadeSubstitution = {
    className: "subst",
    begin: /\$\{/,
    end: /\}/,
    keywords: arcadeKeywords,
    contains: [] // Will be filled later to avoid circular reference
  };

  // Template string mode (backtick strings with interpolation)
  const arcadeTemplateString = {
    className: "string",
    begin: /`/,
    end: /`/,
    contains: [highlightJsApi.BACKSLASH_ESCAPE, arcadeSubstitution]
  };

  // Fill substitution contains after definition to avoid circular reference
  arcadeSubstitution.contains = [
    highlightJsApi.APOS_STRING_MODE,
    highlightJsApi.QUOTE_STRING_MODE,
    arcadeTemplateString,
    arcadeNumber,
    highlightJsApi.REGEXP_MODE
  ];

  // Common parameter for function params and substitutions
  const arcadeExpressionContains = arcadeSubstitution.contains.concat([
    highlightJsApi.C_BLOCK_COMMENT_MODE,
    highlightJsApi.C_LINE_COMMENT_MODE
  ]);

  return {
    name: "ArcGIS Arcade",
    keywords: arcadeKeywords,
    contains: [
      // String modes
      highlightJsApi.APOS_STRING_MODE,
      highlightJsApi.QUOTE_STRING_MODE,
      arcadeTemplateString,
      // Comments
      highlightJsApi.C_LINE_COMMENT_MODE,
      highlightJsApi.C_BLOCK_COMMENT_MODE,
      // Symbol variables
      arcadeSymbol,
      // Numbers
      arcadeNumber,
      // Object attribute highlighting (e.g., { foo: ... })
      {
        begin: /[{,]\s*/,
        relevance: 0,
        contains: [
          {
            begin: /[a-z_][0-9A-zA-z_]*\s*:/,
            returnBegin: true,
            relevance: 0,
            contains: [
              {
                className: "attr",
                begin: /[a-z_][0-9A-zA-z_]*/,
                relevance: 0
              }
            ]
          }
        ]
      },
      // Arrow function highlighting after certain starters (e.g., return ... =>)
      {
        begin: new RegExp("(" + highlightJsApi.RE_STARTERS_RE + "|\\b(return)\\b)\\s*"),
        keywords: "return",
        contains: [
          highlightJsApi.C_LINE_COMMENT_MODE,
          highlightJsApi.C_BLOCK_COMMENT_MODE,
          highlightJsApi.REGEXP_MODE,
          {
            className: "function",
            begin: /(\(.*?\)|[a-z_][0-9A-zA-z_]*)\s*=>/,
            returnBegin: true,
            end: /\\s*=>/,
            contains: [
              {
                className: "params",
                variants: [
                  { begin: /[a-z_][0-9A-zA-z_]*/ },
                  { begin: /\(\s*\)/ },
                  {
                    begin: /\(/,
                    end: /\)/,
                    excludeBegin: true,
                    excludeEnd: true,
                    keywords: arcadeKeywords,
                    contains: arcadeExpressionContains
                  }
                ]
              }
            ]
          }
        ],
        relevance: 0
      },
      // Function declaration (function foo(...))
      {
        className: "function",
        beginKeywords: "function",
        end: /\{/,
        excludeEnd: true,
        contains: [
          // Function name
          highlightJsApi.inherit(highlightJsApi.TITLE_MODE, {
            begin: /[a-z_][0-9A-zA-z_]*/
          }),
          // Function parameters
          {
            className: "params",
            begin: /\(/,
            end: /\)/,
            excludeBegin: true,
            excludeEnd: true,
            contains: arcadeExpressionContains
          }
        ],
        illegal: /\[|%/
      },
      // $() and $.
      {
        begin: /\$[(.]/
      }
    ],
    // Disallow # except for #!
    illegal: /#(?!!)/
  };
}

module.exports = createArcadeHighlightJsDefinition;