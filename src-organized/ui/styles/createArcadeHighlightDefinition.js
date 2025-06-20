/**
 * Factory function to create a highlight.js language definition for ArcGIS Arcade.
 *
 * @param {object} hljs - The highlight.js core library object, providing language modes and regexes.
 * @returns {object} The language definition object for Arcade, suitable for highlight.js registration.
 */
function createArcadeHighlightDefinition(hljs) {
  // Define Arcade keywords, literals, and built-in functions
  const arcadeKeywords = {
    keyword:
      "if for while var new function do return void else break",
    literal:
      "BackSlash DoubleQuote false ForwardSlash Infinity NaN NewLine null handleHeadElementStartTag SingleQuote Tab TextFormatting true undefined",
    built_in:
      "Abs Acos Angle Attachments Area AreaGeodetic Asin Atan Atan2 Average Bearing Boolean Buffer BufferGeodetic Ceil Centroid Clip Console Constrain Contains Cos Count Crosses Cut Date DateAdd DateDiff Day Decode DefaultValue Dictionary Difference Disjoint Distance DistanceGeodetic Distinct DomainCode DomainName Equals Exp Extent Feature FeatureSet FeatureSetByAssociation FeatureSetById FeatureSetByPortalItem FeatureSetByRelationshipName FeatureSetByTitle FeatureSetByUrl Filter First Floor Geometry GroupBy Guid HasKey Hour IIf IndexOf Intersection Intersects IsEmpty IsNan IsSelfIntersecting Length LengthGeodetic Log Max Mean Millisecond Min Minute Month MultiPartToSinglePart Multipoint NextSequenceValue Now Number OrderBy Overlaps Point Polygon Polyline Portal Pow Random Relate Reverse RingIsClockWise Round Second SetGeometry Sin Sort Sqrt Stdev Sum SymmetricDifference Tan Text Timestamp Today ToLocal Top Touches ToUTC TrackCurrentTime TrackGeometryWindow TrackIndex TrackStartTime TrackWindow TypeOf Union UrlEncode Variance Weekday When Within Year "
  };

  // Match Arcade variable references like $feature, $layer, etc.
  const arcadeSymbol = {
    className: "symbol",
    begin: /\$(datastore|feature|layer|map|measure|sourcefeature|sourcelayer|targetfeature|targetlayer|value|view)/
  };

  // Match Arcade number literals (binary, octal, decimal, floating-point)
  const arcadeNumber = {
    className: "number",
    variants: [
      { begin: /\b0[bB][01]+/ }, // Binary
      { begin: /\b0[oO][0-7]+/ }, // Octal
      { begin: hljs.C_NUMBER_RE } // Decimal, float, scientific
    ],
    relevance: 0
  };

  // Match Arcade template string substitutions: ${...}
  const arcadeSubstitution = {
    className: "subst",
    begin: /\$\{/,
    end: /\}/,
    keywords: arcadeKeywords,
    contains: [] // Will be filled later
  };

  // Match Arcade template strings (backtick-quoted)
  const arcadeTemplateString = {
    className: "string",
    begin: /`/,
    end: /`/,
    contains: [hljs.BACKSLASH_ESCAPE, arcadeSubstitution]
  };

  // Fill in what can appear inside a template substitution
  arcadeSubstitution.contains = [
    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE,
    arcadeTemplateString,
    arcadeNumber,
    hljs.REGEXP_MODE
  ];

  // Common set of things that can appear inside function parameters, objects, etc.
  const arcadeExpressionContains = arcadeSubstitution.contains.concat([
    hljs.C_BLOCK_COMMENT_MODE,
    hljs.C_LINE_COMMENT_MODE
  ]);

  return {
    name: "ArcGIS Arcade",
    keywords: arcadeKeywords,
    contains: [
      hljs.APOS_STRING_MODE, // Single-quoted strings
      hljs.QUOTE_STRING_MODE, // Double-quoted strings
      arcadeTemplateString, // Template strings
      hljs.C_LINE_COMMENT_MODE, // Line comments
      hljs.C_BLOCK_COMMENT_MODE, // Block comments
      arcadeSymbol, // $feature, $layer, etc.
      arcadeNumber, // Numbers
      // Object attribute highlighting: { attr: ... }
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
      // Arrow function highlighting, especially after return or expression starters
      {
        begin: new RegExp("(" + hljs.RE_STARTERS_RE + "|\\b(return)\\b)\\s*"),
        keywords: "return",
        contains: [
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE,
          hljs.REGEXP_MODE,
          {
            className: "function",
            begin: /(\(.*?\)|[a-z_][0-9A-zA-z_]*)\s*=>/,
            returnBegin: true,
            end: /\\s*=>/,
            contains: [
              {
                className: "params",
                variants: [
                  { begin: /[a-z_][0-9A-zA-z_]*/ }, // Single param
                  { begin: /\(\s*\)/ }, // Empty parens
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
      // Function declaration highlighting
      {
        className: "function",
        beginKeywords: "function",
        end: /\{/,
        excludeEnd: true,
        contains: [
          hljs.inherit(hljs.TITLE_MODE, {
            begin: /[a-z_][0-9A-zA-z_]*/
          }),
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
    // Disallow # unless isBlobOrFileLikeObject'createInteractionAccessor part of a shebang (#!)
    illegal: /#(?!!)/
  };
}

module.exports = createArcadeHighlightDefinition;
