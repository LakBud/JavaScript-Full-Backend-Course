# Node Module System

Node Module System is a method which allows you to organize, share and reuse JS code by breaking an application into separate, self-contained files called modules.
This system prevents global namespace pollution, enhances code organization and facilitates maintainability and scalability.

## How it works

- Encapsulation: Each file is treated as a seperate module with its own private scopes.

- Exporting/Impporting: Modules expose their functionality using specific syntax and load functionality from other modules when needed.

## Types of Modules

Node.js commonly supports two module systems:
CommonJS and ECMAScript (ES) Modules

| Feature            | CommonJS (CJS)              | ES Modules (ESM)                             |
| ------------------ | --------------------------- | -------------------------------------------- |
| Default in Node.js | Yes, the original default   | Used when specified                          |
| Export Keyword(s)  | `module.exports`, `exports` | `export`                                     |
| Import Keyword(s)  | `require()`                 | `import`                                     |
| File Extension     | `.js` (default)             | `.mjs` or `"type": "module"` in package.json |

We are mostly using ESM modules for this course

## Categories of Modules

1. Core Modules: Built-in modules provided by the Node.js runtime, such as http, fs (file system), and path. They can be accessed using require() or import without specifiying a file path.

2. Local (custom) Modules: User-defined modules created by the developer to organize application-specific code. They are loaded using a relative or absolute path.

3. Third-Party Modules: Modules created by the community and published on a registry like npm, pnpm or yarn. They are installed in the projects node_modules directory and loaded by their package name.
