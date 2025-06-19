/**
 * Factory function that returns a syntax highlighting definition for Apache Access Log entries.
 * This is typically used by syntax highlighters (e.g., highlight.js) to parse and highlight log files.
 *
 * @param {object} externalDependencies - An object containing external dependencies required by this definition.
 * @returns {object} Syntax highlighting definition for Apache Access Log.
 */
function createApacheAccessLogSyntaxDefinition(externalDependencies) {
  // List of HTTP methods commonly found in Apache access logs
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

  // Destructure external dependencies for clarity
  const { kd9, yd9 } = externalDependencies;

  return {
    name: "Apache Access Log",
    contains: [
      // Match IPv4 addresses with optional port (e.g., 192.168.1.1:8080)
      {
        className: "number",
        begin: /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d{1,5})?\b/,
        relevance: 5
      },
      // Match standalone numbers (e.g., status codes, byte counts)
      {
        className: "number",
        begin: /\b\d+\b/,
        relevance: 0
      },
      // Match HTTP request lines (e.g., "GET /index.html HTTP/1.1")
      {
        className: "string",
        begin: kd9(/"/, yd9(...httpMethods)), // Begin after a quote and HTTP method
        end: /"/,
        keywords: httpMethods,
        illegal: /\n/,
        relevance: 5,
        contains: [
          // Match HTTP version inside the request line
          {
            begin: /HTTP\/[12]\.\d'/,
            relevance: 5
          }
        ]
      },
      // Match timestamps in square brackets (e.g., [10/Oct/2000:13:55:36 -0700])
      {
        className: "string",
        begin: /\[\d[^\]\n]{8,}\]/,
        illegal: /\n/,
        relevance: 1
      },
      // Match any string in square brackets (fallback for timestamps)
      {
        className: "string",
        begin: /\[/,
        end: /\]/,
        illegal: /\n/,
        relevance: 0
      },
      // Match user agent strings starting with Mozilla (e.g., "Mozilla/5.0 (Windows mergeArraysWithKeys...)")
      {
        className: "string",
        begin: /"Mozilla\/\d\.\d \(/,
        end: /"/,
        illegal: /\n/,
        relevance: 3
      },
      // Match any quoted string (fallback for other quoted fields)
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

module.exports = createApacheAccessLogSyntaxDefinition;