/**
 * Factory function that creates syntax highlighting options for Apache Access Log entries.
 *
 * @param {any} context - Context or options passed to the factory (not used directly in this function).
 * @returns {object} Highlight.js language definition object for Apache Access Log.
 */
function createApacheAccessLogHighlightOptions(context) {
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

  return {
    name: "Apache Access Log",
    contains: [
      // Match IPv4 addresses with optional port (e.g., 192.168.1.1:8080)
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
      // Match HTTP request lines inside quotes, e.g. "GET /index.html HTTP/1.1"
      {
        className: "string",
        // Begin with a quote followed by an HTTP method (uses external helpers)
        begin: kd9(/"/, yd9(...httpMethods)),
        end: /"/,
        keywords: httpMethods,
        illegal: /\n/,
        relevance: 5,
        contains: [
          {
            // Match HTTP version at the end of the request line
            begin: /HTTP\/[12]\.\d'/,
            relevance: 5
          }
        ]
      },
      // Match timestamps in square brackets, e.g. [10/Oct/2000:13:55:36 -0700]
      {
        className: "string",
        begin: /\[\d[^\]\n]{8,}\]/,
        illegal: /\n/,
        relevance: 1
      },
      // Match any content inside square brackets
      {
        className: "string",
        begin: /\[/,
        end: /\]/,
        illegal: /\n/,
        relevance: 0
      },
      // Match user agent strings starting with "Mozilla/"
      {
        className: "string",
        begin: /"Mozilla\/\d\.\d \(/,
        end: /"/,
        illegal: /\n/,
        relevance: 3
      },
      // Match any other quoted string
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

module.exports = createApacheAccessLogHighlightOptions;
