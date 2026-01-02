# Node.js `async` / `await` — Short Note

`async` / `await` is a modern way to handle asynchronous operations in Node.js, built on top of Promises.  
It makes asynchronous code look **synchronous** and easier to read.

---

## `async` Function

```js
async function fetchData() {
  // This function always returns a Promise
  return "Hello";
}

fetchData().then((data) => console.log(data));
```

- Declaring a function with `async` means it **automatically returns a Promise**.
- You can use `await` **inside an async function only**.

---

## `await` Keyword

```js
async function readFileExample() {
  const data = await readFile("input.txt", "utf-8");
  console.log(data);
}
```

- `await` pauses execution of the async function until the Promise resolves.
- Avoids `.then()` chains and deeply nested callbacks.
- Must be used **inside an async function**.

---

## Error Handling

```js
async function readFileSafe() {
  try {
    const data = await readFile("input.txt", "utf-8");
    console.log(data);
  } catch (err) {
    console.error("Error reading file:", err);
  }
}
```

- Wrap `await` calls in `try/catch` for proper error handling.

---

## Key Points

- `async` = marks a function as asynchronous, always returns a Promise.
- `await` = waits for a Promise to resolve/reject inside an async function.
- Replaces **callback hell** and `.then()` chains with **cleaner, linear code**.

---

## Mental Model

> `async` = “This function will return a promise.”  
> `await` = “Pause here until the promise resolves.”

---
