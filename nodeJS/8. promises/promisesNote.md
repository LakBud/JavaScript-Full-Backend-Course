# Node.js Promises

A **Promise** in Node.js represents a value that may be available **now, later, or never**.  
Promises are used to handle **asynchronous operations** without deeply nested callbacks.

---

## Syntax

```js
const promise = new Promise((resolve, reject) => {
  // Perform async operation
  if (success) {
    resolve(result); // operation succeeded
  } else {
    reject(error); // operation failed
  }
});
```

---

## Using `.then()` and `.catch()`

```js
promise
  .then((result) => {
    console.log("Success:", result);
  })
  .catch((err) => {
    console.error("Error:", err);
  });
```

- `.then()` handles **successful resolution**
- `.catch()` handles **errors/rejections**

---

## Example: Reading a file with promises

```js
import { readFile } from "fs/promises";

readFile("input.txt", "utf-8")
  .then((data) => console.log(data))
  .catch((err) => console.error(err));
```

---

## Key Points

- Promises replace **callback hell** with a **flatter, more readable structure**.
- Promises can be **chained**:

```js
doSomething()
  .then((result) => doSomethingElse(result))
  .then((final) => console.log(final))
  .catch((err) => console.error(err));
```

- Modern alternative: **async/await** syntax for even cleaner code.

---

## Mental Model

> Promise = “I’ll give you a result later; handle success or failure when it arrives.”

---
