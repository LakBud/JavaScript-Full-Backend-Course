# Node.js `fs` (File System) Module Notes

The `fs` module provides functionality to interact with the file system, allowing reading, writing, updating, and deleting files and directories.

---

## Importing the Module

### ES Modules

```js
import fs from "fs";
```

### Promises API (recommended)

```js
import { readFile, writeFile, appendFile, readdir, mkdir, rm } from "fs/promises";
```

### CommonJS

```js
const fs = require("fs");
```

---

## Why Use `fs`

- Read and write files
- Create and remove directories
- Work with file metadata
- Stream large files efficiently

---

## Reading Files

### `readFile(path, options)`

Reads the entire contents of a file.

```js
import { readFile } from "fs/promises";

const data = await readFile("data.txt", "utf-8");
```

---

## Writing Files

### `writeFile(path, data, options)`

Creates or overwrites a file.

```js
import { writeFile } from "fs/promises";

await writeFile("output.txt", "Hello Node");
```

---

### `appendFile(path, data)`

Appends data to a file.

```js
import { appendFile } from "fs/promises";

await appendFile("log.txt", "New entry\n");
```

---

## Directories

### `readdir(path)`

Reads directory contents.

```js
import { readdir } from "fs/promises";

const files = await readdir("./data");
```

---

### `mkdir(path, options)`

Creates a directory.

```js
import { mkdir } from "fs/promises";

await mkdir("uploads", { recursive: true });
```

---

### `rm(path, options)`

Removes files or directories.

```js
import { rm } from "fs/promises";

await rm("temp", { recursive: true, force: true });
```

---

## File Metadata

### `stat(path)`

Gets file or directory information.

```js
import { stat } from "fs/promises";

const info = await stat("data.txt");
```

---

## Checking File Existence

```js
import { access } from "fs/promises";

try {
  await access("data.txt");
  console.log("File exists");
} catch {
  console.log("File does not exist");
}
```

---

## Streams (Large Files)

### Read Stream

```js
import fs from "fs";

const readStream = fs.createReadStream("bigfile.txt");
```

### Write Stream

```js
import fs from "fs";

const writeStream = fs.createWriteStream("copy.txt");
```

### Pipe

```js
readStream.pipe(writeStream);
```

---

## Buffers

```js
import fs from "fs";

const buffer = fs.readFileSync("image.png");
```

---

## Synchronous vs Asynchronous

- Async (`fs/promises`) → non-blocking (recommended)
- Sync (`fs.readFileSync`) → blocks event loop

---

## Common Mistakes

- Using sync methods in production code
- Not handling errors
- Reading large files without streams

---

## Summary

- Use `fs/promises` for async file operations
- Use streams for large files
- Avoid sync methods unless necessary
- Always handle errors

---
