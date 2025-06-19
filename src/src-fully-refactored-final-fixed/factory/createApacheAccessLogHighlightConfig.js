/**
 * Factory function that returns a syntax highlighting configuration object for Apache Access Log entries.
 * This configuration is intended for use with syntax highlighting libraries (e.g., highlight.js).
 *
 * @param {any} options - Optional configuration or context for the factory (currently unused).
 * @returns {Object} Syntax highlighting configuration for Apache Access Log format.
 */
function createApacheAccessLogHighlightConfig(options) {
  // List of HTTP methods to be recognized as keywords in log entries
  const httpMethods = [
    "GET",
    "POST",
    "HEAD",
    "PUT",
    "DELETE",
    "CONNECT",
    "OPTIONS",
    "PATCH",
    "TRACE"
  ];

  return {
    name: "Apache Access Log",
    contains: [
      // Match IPv4 addresses with optional port
      {
        className: "number",
        begin: /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d{1,5})?\b/,
        relevance: 5
      },
      // Match standalone numbers (e.g., status codes, response sizes)
      {
        className: "number",
        begin: /\b\d+\b/,
        relevance: 0
      },
      // Match HTTP request lines within quotes, e.g., "GET /index.html HTTP/1.1"
      {
        className: "string",
        // Uses external helpers kd9 and yd9 to build the begin regex
        begin: kd9(/"/, yd9(...httpMethods)),
        end: /"/,
        keywords: httpMethods,
        illegal: /\n/,
        relevance: 5,
        contains: [
          // Highlight HTTP version inside the request line
          {
            begin: /HTTP\/[12]\.\d'/,
            relevance: 5
          }
        ]
      },
      // Match timestamps inside square brackets, e.g., [10/Oct/2000:13:55:36 -0700]
      {
        className: "string",
        begin: /\[\d[^\]\n]{8,}\]/,
        illegal: /\n/,
        relevance: 1
      },
      // Match any content inside square brackets (fallback)
      {
        className: "string",
        begin: /\[/,
        end: /\]/,
        illegal: /\n/,
        relevance: 0
      },
      // Match user agent strings starting with Mozilla, e.g., "Mozilla/5.0 ("
      {
        className: "string",
        begin: /"Mozilla\/\d\.\d \(/,
        end: /"/,
        illegal: /\n/,
        relevance: 3
      },
      // Match any other quoted string (fallback)
      {
        className: "string",
        begin: /"/,
        end: /"/,
        illegal: /\n/,
        relevance: 0
      }
    ]
  };
}

module.exports = createApacheAccessLogHighlightConfig;