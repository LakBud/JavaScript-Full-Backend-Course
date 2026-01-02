# Node.js Callbacks and Callback Hell

A **callback** is a function passed as an argument to another function, which is **called later** when an operation completes.

---

## Purpose

- Handle **asynchronous operations** (e.g., file I/O, network requests)
- Avoid blocking the **event loop**

---

## Syntax Example

```js
import fs from "fs";

fs.readFile("data.txt", "utf-8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});
```

- The last argument `(err, data) => { ... }` is the **callback**
- `err` receives an error if one occurs
- `data` receives the result

---

## Callback Hell

**Callback hell** happens when multiple asynchronous operations are nested deeply, making code **hard to read and maintain**.

Example:

```js
fs.readFile("file1.txt", "utf-8", (err, data1) => {
  if (err) throw err;
  fs.readFile("file2.txt", "utf-8", (err, data2) => {
    if (err) throw err;
    fs.readFile("file3.txt", "utf-8", (err, data3) => {
      if (err) throw err;
      console.log(data1, data2, data3);
    });
  });
});
```

- Notice the **deep indentation** → hard to read
- Error handling becomes repetitive

---

## Solutions / Modern Alternatives

- **Promises**
- **async/await**
- Modularize callbacks into separate functions

Example with Promises:

```js
import { readFile } from "fs/promises";

async function readFiles() {
  const data1 = await readFile("file1.txt", "utf-8");
  const data2 = await readFile("file2.txt", "utf-8");
  const data3 = await readFile("file3.txt", "utf-8");
  console.log(data1, data2, data3);
}

readFiles();
```

- Flatter, easier to read, and easier to handle errors.

---

## Key Points

- Callbacks = core pattern in Node.js for async tasks
- Deeply nested callbacks → **callback hell**
- Promises / async-await = cleaner alternative

---

## Mental Model

> Callback = “I’ll do this function for you later when the task is done.”  
> Callback hell = “Too many callbacks inside callbacks.”

---
