#!/usr/bin/env node
/**
 * Copyright (c) 2025 davidgornshtein@gmail.com
 * Licensed for non-commercial use only. For commercial use, please contact davidgornshtein@gmail.com
 * 
 * File: tools/validate-syntax.js
 * File name: validate-syntax.js
 * Author: davidgornshtein@gmail.com
 * Description: Validates JavaScript syntax using Babel parser
 * Purpose: Checks if JavaScript files have valid syntax
 * Patterns: File system traversal, Babel AST parsing, error reporting
 */

const fs = require('fs').promises;
const path = require('path');
const { parse } = require('@babel/parser');
const glob = require('glob');
const chalk = require('chalk');

async function validateFile(filePath) {
    try {
        const content = await fs.readFile(filePath, 'utf-8');
        
        parse(content, {
            sourceType: 'module',
            plugins: [
                'jsx',
                'typescript', 
                'decorators-legacy',
                'classProperties',
                'dynamicImport',
                'nullishCoalescingOperator',
                'optionalChaining'
            ],
            errorRecovery: false
        });
        
        return { valid: true };
    } catch (error) {
        return {
            valid: false,
            error: {
                message: error.message,
                line: error.loc?.line,
                column: error.loc?.column
            }
        };
    }
}

async function validateDirectory(dirPath) {
    const files = glob.sync(path.join(dirPath, '**/*.js'), {
        ignore: ['**/node_modules/**']
    });
    
    console.log(chalk.blue(`Found ${files.length} JavaScript files to validate`));
    
    let validCount = 0;
    let errorCount = 0;
    const errors = [];
    
    for (const file of files) {
        const result = await validateFile(file);
        if (result.valid) {
            validCount++;
        } else {
            errorCount++;
            errors.push({
                file: path.relative(dirPath, file),
                error: result.error
            });
        }
    }
    
    console.log(chalk.green(`✓ Valid files: ${validCount}`));
    if (errorCount > 0) {
        console.log(chalk.red(`✗ Files with errors: ${errorCount}`));
        console.log('\nErrors:');
        errors.forEach(({ file, error }) => {
            console.log(chalk.red(`  ${file}:`));
            console.log(chalk.gray(`    ${error.message}`));
            if (error.line) {
                console.log(chalk.gray(`    at line ${error.line}, column ${error.column}`));
            }
        });
    }
    
    return {
        total: files.length,
        valid: validCount,
        errors: errorCount
    };
}

// Main execution
if (require.main === module) {
    const args = process.argv.slice(2);
    const targetDir = args[0] || path.join(__dirname, '../src-fully-refactored-final-fixed');
    
    validateDirectory(targetDir)
        .then(result => {
            if (result.errors === 0) {
                console.log(chalk.green('\n✓ All files have valid syntax!'));
                process.exit(0);
            } else {
                console.log(chalk.red(`\n✗ Found ${result.errors} files with syntax errors`));
                process.exit(1);
            }
        })
        .catch(error => {
            console.error(chalk.red('Validation failed:'), error);
            process.exit(1);
        });
}

module.exports = { validateFile, validateDirectory };