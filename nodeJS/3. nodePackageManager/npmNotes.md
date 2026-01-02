# NPM (Node Package Manager)

## What is NPM?

- **NPM** is the default package manager for **Node.js**
- Used to install, manage, and share JavaScript packages
- Automatically installed with Node.js

---

## Key Components

- **npm CLI** – Command-line interface
- **npm Registry** – Public package repository
- **package.json** – Project metadata and dependencies
- **node_modules/** – Folder containing installed packages
- **package-lock.json** – Locks exact dependency versions

---

## Installing & Checking NPM

```bash
node -v
npm -v
```

Update npm:

```bash
npm install -g npm
```

---

## Initializing a Project

```bash
npm init
```

Quick setup:

```bash
npm init -y
```

---

## package.json (Important Fields)

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "description": "Sample project",
  "main": "index.js",
  "scripts": {},
  "dependencies": {},
  "devDependencies": {}
}
```

---

## Installing Packages

### Local Install

```bash
npm install lodash
```

### Global Install

```bash
npm install -g nodemon
```

### Development Dependency

```bash
npm install jest --save-dev
```

### Specific Version

```bash
npm install express@4.18.2
```

---

## Dependency Types

- **dependencies** – Required in production
- **devDependencies** – Development only
- **peerDependencies** – Required by parent project
- **optionalDependencies** – Non-critical dependencies

---

## Semantic Versioning (SemVer)

Format:

```
MAJOR.MINOR.PATCH
```

Examples:

- `^1.2.3` → Minor & patch updates
- `~1.2.3` → Patch updates only
- `1.2.3` → Exact version

---

## package-lock.json

- Auto-generated
- Stores exact dependency tree
- Ensures consistent installs
- Should be committed to version control

---

## NPM Scripts

Defined in `package.json`:

```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js",
  "test": "jest"
}
```

Run scripts:

```bash
npm start
npm run dev
npm test
```

---

## npx

- Runs packages without global installation
- Useful for one-time commands

Example:

```bash
npx create-react-app my-app
```

---

## Updating Packages

```bash
npm update
```

Check outdated packages:

```bash
npm outdated
```

---

## Removing Packages

```bash
npm uninstall lodash
```

Global uninstall:

```bash
npm uninstall -g nodemon
```

---

## Cache & Cleanup

Clear cache:

```bash
npm cache clean --force
```

Reinstall dependencies:

```bash
rm -rf node_modules package-lock.json
npm install
```

---

## Security

Audit dependencies:

```bash
npm audit
```

Fix vulnerabilities:

```bash
npm audit fix
```

---

## Configuration

View configuration:

```bash
npm config list
```

Set configuration:

```bash
npm config set init-author-name "Your Name"
```

---

## Common NPM Commands

```bash
npm install
npm uninstall
npm update
npm run <script>
npm init
npm audit
npm list
```

---

## Best Practices

- Commit `package-lock.json`
- Avoid unnecessary global installs
- Prefer `npx` over global packages
- Keep dependencies updated
- Npm has a registry which lists over all existing dependencies
- Use `.npmrc` for project configuration
