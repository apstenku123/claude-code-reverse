#!/usr/bin/env node
/**
 * Copyright (c) 2025 davidgornshtein@gmail.com
 * Licensed for non-commercial use only. For commercial use, please contact davidgornshtein@gmail.com
 * 
 * File: tools/multi-model-fix-parallel.js
 * File name: multi-model-fix-parallel.js
 * Author: davidgornshtein@gmail.com
 * Description: Parallel batch processing version of multi-model syntax fix tool
 * Purpose: Fixes JavaScript syntax errors using multiple AI models with parallel processing
 * Patterns: Fallback chain pattern, parallel batch processing, checkpoint recovery
 */

const fs = require('fs').promises;
const path = require('path');
const parser = require('@babel/parser');
const pLimit = require('p-limit');
const chalk = require('chalk').default || require('chalk');
const { OpenAI } = require('openai');
const { ChatGoogleGenerativeAI } = require('@langchain/google-genai');
const minimist = require('minimist');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// Configuration
const CONFIG = {
    sourceDir: path.join(__dirname, '../src-fully-refactored-final'),
    outputDir: path.join(__dirname, '../src-fully-refactored-final-fixed'),
    checkpointFile: path.join(__dirname, '../checkpoints/multi-model-fix-checkpoint.json'),
    maxConcurrency: 10,
    batchSize: 20,  // Process up to 20 files in parallel per batch
    dryRun: false,
    verbose: false
};

// Model configurations
const MODELS = {
    gpt4: {
        name: 'GPT-4.1',
        client: null,
        config: {
            model: 'gpt-4',
            temperature: 0,
            max_tokens: 32000
        }
    },
    o4mini: {
        name: 'O4-Mini',
        client: null,
        config: {
            model: 'o1-mini',
            temperature: 1,
            max_completion_tokens: 32000
        }
    },
    gemini: {
        name: 'Gemini',
        client: null,
        config: {
            model: 'gemini-1.5-flash',
            temperature: 0,
            maxOutputTokens: 32000
        }
    }
};

// Validation functions
function validateEnvVars() {
    const errors = [];
    
    if (!process.env.AZURE_OPENAI_KEY) {
        errors.push('AZURE_OPENAI_KEY is not set');
    }
    if (!process.env.AZURE_OPENAI_ENDPOINT) {
        errors.push('AZURE_OPENAI_ENDPOINT is not set');
    }

    if (!process.env.GEMINI_API_KEY) {
        errors.push('GEMINI_API_KEY is not set');
    }
    
    if (errors.length > 0) {
        console.error(chalk.red('❌ Environment validation failed:'));
        errors.forEach(err => console.error(chalk.red(`  - ${err}`)));
        console.error(chalk.yellow('\nPlease set these variables in your .env file'));
        console.error(chalk.yellow('Copy .env.example to .env and add your API keys:'));
        console.error(chalk.gray('  cp .env.example .env'));
        console.error(chalk.gray('  # Then edit .env with your API keys'));
        process.exit(1);
    }
}

// Initialize models
async function initializeModels() {
    // Debug: Check if env vars are loaded
    if (CONFIG.verbose) {
        console.log(chalk.gray('Environment variables loaded:'));
        console.log(chalk.gray(`  AZURE_OPENAI_KEY: ${process.env.AZURE_OPENAI_KEY ? '✓' : '✗'}`));
        console.log(chalk.gray(`  AZURE_OPENAI_ENDPOINT: ${process.env.AZURE_OPENAI_ENDPOINT ? '✓' : '✗'}`));
        console.log(chalk.gray(`  GEMINI_API_KEY: ${process.env.GEMINI_API_KEY ? '✓' : '✗'}`));
    }
    
    // Azure GPT-4
    MODELS.gpt4.client = new OpenAI({
        apiKey: process.env.AZURE_OPENAI_KEY,
        baseURL: `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/gpt-4`,
        defaultQuery: { 'api-version': '2024-12-01-preview' },
        defaultHeaders: { 'api-key': process.env.AZURE_OPENAI_KEY }
    });
    
    MODELS.o4mini.client = new OpenAI({
        apiKey: process.env.AZURE_OPENAI_KEY,
        baseURL: `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/o4-mini`,
        defaultQuery: { 'api-version': '2024-12-01-preview' },
        defaultHeaders: { 'api-key': process.env.AZURE_OPENAI_KEY }
    });

    
    // Google Gemini
    try {
        // Ensure API key is a string
        const geminiApiKey = process.env.GEMINI_API_KEY;
        if (!geminiApiKey) {
            throw new Error('GEMINI_API_KEY is not set');
        }
        
        MODELS.gemini.client = new ChatGoogleGenerativeAI({
            apiKey: geminiApiKey,
            model: MODELS.gemini.config.model,
            temperature: MODELS.gemini.config.temperature,
            maxOutputTokens: MODELS.gemini.config.maxOutputTokens
        });
    } catch (error) {
        console.error(chalk.red('Failed to initialize Gemini client:', error.message));
        console.error(chalk.yellow('Please ensure GEMINI_API_KEY is set in your .env file'));
        process.exit(1);
    }
}

// Check if file has syntax errors
async function checkSyntaxError(filePath) {
    try {
        const content = await fs.readFile(filePath, 'utf-8');
        parser.parse(content, {
            sourceType: 'module',
            plugins: ['jsx', 'typescript', 'decorators-legacy', 'classProperties', 'classPrivateProperties', 'classPrivateMethods', 'exportDefaultFrom', 'exportNamespaceFrom', 'dynamicImport', 'nullishCoalescingOperator', 'optionalChaining', 'bigInt'],
            errorRecovery: false
        });
        return null;
    } catch (error) {
        return {
            message: error.message,
            line: error.loc?.line,
            column: error.loc?.column
        };
    }
}

// Fix syntax with a specific model
async function fixWithModel(modelKey, content, errorInfo) {
    const model = MODELS[modelKey];
    const prompt = `Fix the JavaScript syntax error in this code. The error is: "${errorInfo.message}" at line ${errorInfo.line}, column ${errorInfo.column}.
Return ONLY the fixed code, no explanations.

Code:
${content}`;

    try {
        if (modelKey === 'gemini') {
            const response = await model.client.invoke([{
                role: 'user',
                content: prompt
            }]);
            return response.content;
        } else {
            const params = modelKey === 'o4mini' 
                ? { ...model.config, messages: [{ role: 'user', content: prompt }] }
                : { ...model.config, messages: [{ role: 'user', content: prompt }] };
                
            const response = await model.client.chat.completions.create(params);
            return response.choices[0].message.content;
        }
    } catch (error) {
        if (CONFIG.verbose) {
            console.error(chalk.yellow(`  ${model.name} failed:`, error.message));
        }
        throw error;
    }
}

// Process a single file
async function processFile(filePath) {
    const relativePath = path.relative(CONFIG.sourceDir, filePath);
    
    if (CONFIG.verbose) {
        console.log(chalk.blue(`Processing: ${relativePath}`));
    }
    
    const syntaxError = await checkSyntaxError(filePath);
    if (!syntaxError) {
        return { path: filePath, fixed: false, error: null };
    }
    
    if (CONFIG.verbose) {
        console.log(chalk.yellow(`  Error found: ${syntaxError.message} at ${syntaxError.line}:${syntaxError.column}`));
    }
    
    const content = await fs.readFile(filePath, 'utf-8');
    let fixedContent = null;
    let usedModel = null;
    
    // Try models in order
    for (const [modelKey, model] of Object.entries(MODELS)) {
        try {
            if (CONFIG.verbose) {
                console.log(chalk.gray(`  Trying ${model.name}...`));
            }
            
            fixedContent = await fixWithModel(modelKey, content, syntaxError);
            
            // Validate the fix
            try {
                parser.parse(fixedContent, {
                    sourceType: 'module',
                    plugins: ['jsx', 'typescript', 'decorators-legacy', 'classProperties', 'classPrivateProperties', 'classPrivateMethods', 'exportDefaultFrom', 'exportNamespaceFrom', 'dynamicImport', 'nullishCoalescingOperator', 'optionalChaining', 'bigInt'],
                    errorRecovery: false
                });
                usedModel = model.name;
                break;
            } catch (validationError) {
                if (CONFIG.verbose) {
                    console.log(chalk.yellow(`  ${model.name} fix still has errors: ${validationError.message}`));
                    if (validationError.loc) {
                        console.log(chalk.gray(`    at line ${validationError.loc.line}:${validationError.loc.column}`));
                    }
                }
                fixedContent = null;
            }
        } catch (error) {
            if (CONFIG.verbose) {
                console.log(chalk.red(`  ${model.name} failed: ${error.message}`));
            }
            // Model failed, try next
        }
    }
    
    if (fixedContent && usedModel) {
        if (CONFIG.verbose) {
            console.log(chalk.green(`  ✓ Fixed with ${usedModel}`));
        }
        return { 
            path: filePath, 
            fixed: true, 
            content: fixedContent,
            model: usedModel,
            error: syntaxError 
        };
    } else {
        if (CONFIG.verbose) {
            console.log(chalk.red(`  ✗ Could not fix`));
        }
        return { 
            path: filePath, 
            fixed: false, 
            error: syntaxError 
        };
    }
}

// Process multiple files in parallel batch
async function processFileBatch(files) {
    const limit = pLimit(CONFIG.batchSize);
    const results = await Promise.all(
        files.map(file => limit(() => processFile(file)))
    );
    return results;
}

// Get all JS files recursively
async function getAllFiles(dir, files = []) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            await getAllFiles(fullPath, files);
        } else if (entry.name.endsWith('.js')) {
            files.push(fullPath);
        }
    }
    
    return files;
}

// Load or create checkpoint
async function loadCheckpoint() {
    try {
        const data = await fs.readFile(CONFIG.checkpointFile, 'utf-8');
        return JSON.parse(data);
    } catch {
        return {
            processed: [],
            fixed: [],
            failed: [],
            lastUpdate: new Date().toISOString()
        };
    }
}

// Save checkpoint
async function saveCheckpoint(checkpoint) {
    await fs.mkdir(path.dirname(CONFIG.checkpointFile), { recursive: true });
    checkpoint.lastUpdate = new Date().toISOString();
    await fs.writeFile(CONFIG.checkpointFile, JSON.stringify(checkpoint, null, 2));
}

// Main function with parallel batch processing
async function main() {
    const args = minimist(process.argv.slice(2));
    CONFIG.dryRun = args['dry-run'] || args.dryRun || false;
    CONFIG.verbose = args.verbose || false;
    CONFIG.reset = args.reset || false;
    
    console.log(chalk.cyan.bold('🔧 Multi-Model Fix Tool (Parallel Batch Processing)'));
    console.log(chalk.gray(`Mode: ${CONFIG.dryRun ? 'DRY RUN' : 'PRODUCTION'}`));
    console.log(chalk.gray(`Models: GPT-4.1 → O4-Mini → Gemini`));
    console.log(chalk.gray(`Batch size: ${CONFIG.batchSize} files\n`));
    
    // Handle reset flag
    if (CONFIG.reset) {
        console.log(chalk.yellow('Resetting checkpoint...'));
        try {
            await fs.unlink(CONFIG.checkpointFile);
            console.log(chalk.green('✓ Checkpoint reset'));
        } catch (error) {
            // File might not exist
        }
    }
    
    // Validate environment
    validateEnvVars();
    
    // Initialize models
    await initializeModels();
    
    // Load checkpoint
    const checkpoint = await loadCheckpoint();
    
    // Get all files
    const allFiles = await getAllFiles(CONFIG.sourceDir);
    let remaining = allFiles.filter(f => !checkpoint.processed.includes(f));
    
    // In dry run mode, limit to specific files or first batch
    if (CONFIG.dryRun) {
        const errorProneFiles = [
            'app/initializeClaudeCli.js',
            'app/defineRubyHighlighting.js',
            'app/defineBatchFileHighlighting.js',
            'app/defineCssHighlightingLanguage.js',
            'app/defineHttpHighlightLanguage.js',
            'app/defineFSharpHighlighting.js'
        ];
        
        const testFiles = [];
        const otherFiles = [];
        
        for (const file of remaining) {
            if (errorProneFiles.some(ef => file.endsWith(ef))) {
                testFiles.push(file);
            } else {
                otherFiles.push(file);
            }
        }
        
        remaining = [...testFiles, ...otherFiles].slice(0, CONFIG.batchSize);
        console.log(chalk.yellow(`Dry run mode: Testing ${testFiles.length} files with known errors + ${Math.max(0, CONFIG.batchSize - testFiles.length)} others`));
    }
    
    console.log(chalk.blue(`Found ${allFiles.length} files, ${remaining.length} to process`));
    
    if (remaining.length === 0) {
        console.log(chalk.green('✓ All files processed!'));
        return;
    }
    
    // First pass: Check all files for syntax errors
    console.log(chalk.cyan('\n📋 Phase 1: Scanning for syntax errors...'));
    console.log(chalk.gray(`Scanning ${remaining.length} files...`));
    const errorFiles = [];
    const scanLimit = pLimit(CONFIG.maxConcurrency);
    
    await Promise.all(
        remaining.map(file => scanLimit(async () => {
            const error = await checkSyntaxError(file);
            if (error) {
                errorFiles.push({ file, error });
                if (CONFIG.verbose) {
                    const relativePath = path.relative(CONFIG.sourceDir, file);
                    console.log(chalk.yellow(`  ❌ ${relativePath}: ${error.message}`));
                }
            }
        }))
    );
    
    console.log(chalk.blue(`\nFound ${errorFiles.length} files with syntax errors`));
    
    if (errorFiles.length === 0) {
        console.log(chalk.green('✓ No syntax errors found!'));
        // Update checkpoint for all scanned files
        checkpoint.processed.push(...remaining);
        await saveCheckpoint(checkpoint);
        return;
    }
    
    // Create output directory
    const outputDir = CONFIG.dryRun ? '/tmp' : CONFIG.outputDir;
    if (!CONFIG.dryRun) {
        await fs.mkdir(outputDir, { recursive: true });
    }
    
    // Second pass: Fix errors in parallel batches
    console.log(chalk.cyan(`\n🔧 Phase 2: Fixing ${errorFiles.length} files in parallel...`));
    
    let totalFixed = 0;
    let totalFailed = 0;
    
    // Process error files in batches
    for (let i = 0; i < errorFiles.length; i += CONFIG.batchSize) {
        const batch = errorFiles.slice(i, i + CONFIG.batchSize);
        const batchNumber = Math.floor(i / CONFIG.batchSize) + 1;
        const totalBatches = Math.ceil(errorFiles.length / CONFIG.batchSize);
        
        console.log(chalk.cyan(`\n📦 Batch ${batchNumber}/${totalBatches} (${batch.length} files)`));
        
        const results = await processFileBatch(batch.map(ef => ef.file));
        
        // Process results
        for (const result of results) {
            checkpoint.processed.push(result.path);
            
            const relativePath = path.relative(CONFIG.sourceDir, result.path);
            const outputPath = CONFIG.dryRun 
                ? path.join(outputDir, path.basename(result.path) + '.tmp')
                : path.join(outputDir, relativePath);
            
            if (result.fixed) {
                checkpoint.fixed.push(result.path);
                
                if (!CONFIG.dryRun) {
                    await fs.mkdir(path.dirname(outputPath), { recursive: true });
                }
                await fs.writeFile(outputPath, result.content);
                
                console.log(chalk.green(`  ✓ ${relativePath} (fixed with ${result.model})`));
                totalFixed++;
            } else {
                checkpoint.failed.push(result.path);
                console.log(chalk.red(`  ✗ ${relativePath}`));
                totalFailed++;
            }
        }
        
        // Save checkpoint after each batch
        await saveCheckpoint(checkpoint);
    }
    
    // Process files without errors (just copy)
    const noErrorFiles = remaining.filter(f => !errorFiles.some(ef => ef.file === f));
    if (noErrorFiles.length > 0 && !CONFIG.dryRun) {
        console.log(chalk.cyan(`\n📋 Phase 3: Copying ${noErrorFiles.length} files without errors...`));
        
        const copyLimit = pLimit(CONFIG.maxConcurrency);
        await Promise.all(
            noErrorFiles.map(file => copyLimit(async () => {
                const content = await fs.readFile(file, 'utf-8');
                const relativePath = path.relative(CONFIG.sourceDir, file);
                const outputPath = path.join(outputDir, relativePath);
                
                await fs.mkdir(path.dirname(outputPath), { recursive: true });
                await fs.writeFile(outputPath, content);
                
                checkpoint.processed.push(file);
            }))
        );
        
        await saveCheckpoint(checkpoint);
    }
    
    // Final report
    console.log(chalk.cyan('\n📊 Summary:'));
    console.log(chalk.blue(`  Total files: ${allFiles.length}`));
    console.log(chalk.blue(`  Processed: ${checkpoint.processed.length}`));
    console.log(chalk.green(`  Fixed: ${totalFixed}`));
    console.log(chalk.red(`  Failed: ${totalFailed}`));
    console.log(chalk.gray(`  Without errors: ${noErrorFiles.length}`));
    
    if (CONFIG.dryRun) {
        console.log(chalk.yellow('\n⚠️  Dry run complete. Fixed files saved to /tmp/*.js.tmp'));
    } else {
        console.log(chalk.green(`\n✓ All files processed! Output in ${CONFIG.outputDir}`));
    }
}

// Handle help flag
if (process.argv.includes('--help') || process.argv.includes('-h')) {
    console.log(chalk.cyan.bold('Multi-Model Fix Tool - Parallel Batch Processing'));
    console.log('\nUsage: node multi-model-fix-parallel.js [options]');
    console.log('\nOptions:');
    console.log('  --dry-run       Run in dry-run mode (test first batch only)');
    console.log('  --verbose       Show detailed progress');
    console.log('  --reset         Reset checkpoint and start fresh');
    console.log('  --help, -h      Show this help message');
    console.log('\nThis tool scans all JavaScript files for syntax errors and fixes them');
    console.log('using multiple AI models (GPT-4.1, O4-Mini, Gemini) in parallel.');
    process.exit(0);
}

// Run
main().catch(console.error);