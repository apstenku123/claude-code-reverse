/**
 * Factory function that returns a syntax highlighting definition for Apache Access Log entries.
 * This is typically used in syntax highlighters (e.g., highlight.js) to recognize and style
 * various components of Apache access log lines, such as IP addresses, HTTP methods, timestamps, etc.
 *
 * @param {any} options - Optional configuration or context (not used directly in this function).
 * @returns {object} Syntax highlighting definition for Apache Access Log entries.
 */
function createApacheAccessLogDefinition(options) {
  // List of HTTP methods commonly found in access logs
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
      // Match IPv4 addresses, optionally with port
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
      // Match quoted HTTP request lines (e.g., "GET /index.html HTTP/1.1")
      {
        className: "string",
        // Use kd9 and yd9 to build a regex that matches a quote followed by an HTTP method
        begin: kd9(/"/, yd9(...httpMethods)),
        end: /"/,
        keywords: httpMethods,
        illegal: /\n/,
        relevance: 5,
        contains: [
          // Match HTTP version at the end of the request line
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
      // Match any content in square brackets (fallback)
      {
        className: "string",
        begin: /\[/,
        end: /\]/,
        illegal: /\n/,
        relevance: 0
      },
      // Match user agent strings starting with "Mozilla/x.x ("
      {
        className: "string",
        begin: /"Mozilla\/\d\.\d \(/,
        end: /"/,
        illegal: /\n/,
        relevance: 3
      },
      // Match any quoted string (fallback)
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

module.exports = createApacheAccessLogDefinition;