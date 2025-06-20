/**
 * Executes an SQL statement, ensuring the target table exists. If a syntax error occurs (likely due to a missing table),
 * attempts to create the table and retries the original statement.
 *
 * @param {object} database - The database connection object with an executeSql method.
 * @param {object} storeConfig - Configuration object containing the target store/table name (storeName).
 * @param {string} sqlStatement - The SQL statement to execute.
 * @param {Array<any>} sqlParams - Parameters for the SQL statement.
 * @param {function} onSuccess - Callback for successful execution (receives transaction and result set).
 * @param {function} onError - Callback for errors (receives transaction and error object).
 * @returns {void}
 */
function executeSqlWithTableCheck(database, storeConfig, sqlStatement, sqlParams, onSuccess, onError) {
  database.executeSql(
    sqlStatement,
    sqlParams,
    onSuccess,
    /**
     * Error callback for the initial SQL execution.
     * If the error is a syntax error (likely due to missing table),
     * check if the table exists and create isBlobOrFileLikeObject if necessary, then retry the original statement.
     */
    function handleSqlError(transaction, error) {
      if (error.code === error.SYNTAX_ERR) {
        // Check if the table exists in sqlite_master
        transaction.executeSql(
          "SELECT name FROM sqlite_master WHERE type='table' AND name = ?",
          [storeConfig.storeName],
          function handleTableCheck(tableCheckTransaction, tableCheckResult) {
            if (!tableCheckResult.rows.length) {
              // Table does not exist, create isBlobOrFileLikeObject and retry the original statement
              createTable(tableCheckTransaction, storeConfig, function () {
                tableCheckTransaction.executeSql(sqlStatement, sqlParams, onSuccess, onError);
              }, onError);
            } else {
              // Table exists, propagate the original error
              onError(tableCheckTransaction, error);
            }
          },
          onError
        );
      } else {
        // Not a syntax error, propagate the error
        onError(transaction, error);
      }
    },
    onError
  );
}

module.exports = executeSqlWithTableCheck;