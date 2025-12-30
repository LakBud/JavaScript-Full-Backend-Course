# Node.js `path` Module

The `path` module provides utilities for working with file and directory paths in a platform-independent way.

---

## Importing the Module

### ES Modules (recommended)

```js
import path from "path";
```

### CommonJS

```js
const path = require("path");
```

---

## Why Use `path`

- Works across Windows, macOS, and Linux
- Prevents path separator issues
- Makes file system code safer and predictable

---

## Common Properties

### `path.sep`

Returns the platform-specific path segment separator.

```js
path.sep;
```

---

## Core Methods

### `path.join(...paths)`

Joins path segments using the correct separator and normalizes the result.

```js
path.join("src", "data", "file.txt");
```

---

### `path.resolve(...paths)`

Resolves a sequence of paths into an absolute path.

```js
path.resolve("data", "users.json");
```

---

### `path.normalize(path)`

Normalizes a path by resolving `.` and `..` segments.

```js
path.normalize("src//utils/../data");
```

---

### `path.basename(path)`

Returns the last portion of a path.

```js
path.basename("/data/users.json");
// users.json
```

---

### `path.dirname(path)`

Returns the directory name of a path.

```js
path.dirname("/data/users.json");
// /data
```

---

### `path.extname(path)`

Returns the file extension of a path.

```js
path.extname("index.html");
// .html
```

---

### `path.parse(path)`

Parses a path into an object.

```js
path.parse("/data/users.json");
```

Result:

```js
{
  root: "/",
  dir: "/data",
  base: "users.json",
  ext: ".json",
  name: "users"
}
```

---

### `path.format(object)`

Builds a path string from an object.

```js
path.format({
  dir: "/data",
  name: "users",
  ext: ".json",
});
```

---

### `path.isAbsolute(path)`

Checks if a path is absolute.

```js
path.isAbsolute("/data/users.json");
// true
```

---

## `__dirname` Replacement (ES Modules)

`__dirname` is not available in ES modules by default.

```js
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
```

---

## Recommended Usage Pattern

```js
import path from "path";

const filePath = path.join(process.cwd(), "data", "users.json");
```

---

## Common Mistakes

- Hard-coding path separators (`/` or `\`)
- Concatenating paths using `+`
- Assuming absolute paths work the same in all environments

---

## Summary

- Use `path` for all file system paths
- Prefer `path.join()` for building paths
- Prefer `path.resolve()` for absolute paths
- Never manually concatenate paths

---
