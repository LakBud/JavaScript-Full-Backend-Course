# Node.js EventEmitter — In-Depth Note

The **EventEmitter** class in Node.js is a core module used to create, listen to, and handle **custom events**. It is fundamental for **asynchronous programming** and underlies many Node.js APIs (e.g., `http.Server`, `fs`, `stream`).

---

## 1 Importing EventEmitter

```js
import EventEmitter from "events"; // ES Module
// const EventEmitter = require("events"); // CommonJS
```

- `EventEmitter` is available via the `events` module.
- You create an instance to register and emit events.

---

## 2 Creating an EventEmitter instance

```js
const myEmitter = new EventEmitter();
```

- `myEmitter` can now **emit events** and **listen** for them.

---

## 3 Registering event listeners

```js
myEmitter.on("greet", (name) => {
  console.log(`Hello, ${name}`);
});
```

- `.on(eventName, listener)` registers a listener that is called **every time** the event is emitted.
- `listener` is a callback function that receives arguments passed during the event emission.

---

### Alternative: `.once()` listener

```js
myEmitter.once("welcome", () => {
  console.log("This runs only once");
});
```

- `.once()` registers a listener that is invoked **only the first time** the event occurs.
- Useful for one-time initialization or setup.

---

## 4 Emitting events

```js
myEmitter.emit("greet", "Buddo");
```

- `emit(eventName, ...args)` triggers the event and passes any arguments to the listeners.
- Multiple listeners for the same event will all be executed **in order of registration**.

---

## 5 Removing event listeners

```js
function goodbye(name) {
  console.log(`Goodbye, ${name}`);
}

myEmitter.on("farewell", goodbye);

// Later remove the listener
myEmitter.off("farewell", goodbye);
// or
myEmitter.removeListener("farewell", goodbye);
```

- `.off()` / `.removeListener()` removes a specific listener.
- Helps prevent **memory leaks** in long-running apps.

---

## 6 EventEmitter common methods

| Method                                                     | Description                                                   |
| ---------------------------------------------------------- | ------------------------------------------------------------- |
| `on(event, listener)`                                      | Adds a listener for the event (can be called multiple times). |
| `once(event, listener)`                                    | Adds a one-time listener.                                     |
| `emit(event, ...args)`                                     | Triggers the event and passes arguments to listeners.         |
| `off(event, listener)` / `removeListener(event, listener)` | Removes a specific listener.                                  |
| `removeAllListeners([event])`                              | Removes all listeners for the event or all events.            |
| `listenerCount(event)`                                     | Returns the number of listeners for the event.                |
| `listeners(event)`                                         | Returns an array of listeners for the event.                  |

---

## 7 Example: Complete EventEmitter Usage

```js
import EventEmitter from "events";

const emitter = new EventEmitter();

// Listener
emitter.on("data", (msg) => {
  console.log("Received:", msg);
});

// One-time listener
emitter.once("init", () => {
  console.log("Initialized once");
});

// Emit events
emitter.emit("init");
emitter.emit("init"); // won't run
emitter.emit("data", "Hello World");
emitter.emit("data", "Another message");

// Remove listener
function bye(msg) {
  console.log("Bye:", msg);
}
emitter.on("farewell", bye);
emitter.emit("farewell", "Buddo");
emitter.off("farewell", bye);
emitter.emit("farewell", "Buddo"); // no output
```

---

## 8 Real-world use cases

- **HTTP servers** (`req`, `res` objects inherit EventEmitter)
- **Streams** (`readable`, `writable`, `error` events)
- **Timers** and custom async events
- **Logging** and application lifecycle events

---

## 9 Best Practices

1. **Avoid memory leaks**: Remove unused listeners using `off()` or `removeAllListeners()`.
2. **Use `once()` for one-time events** to simplify code.
3. **Pass meaningful arguments** to events so listeners have context.
4. **Error handling**: Always listen for `error` events, or Node will crash:

```js
emitter.on("error", (err) => {
  console.error("Event error:", err);
});
```

5. **Keep listeners lightweight**: Heavy computations inside listeners may block the event loop.

---

## 10 Mental model

> **EventEmitter = publisher/subscriber pattern**
>
> - You **emit** events (publish)
> - You **listen** for events (subscribe)
> - Multiple listeners can react to the same event independently

---

## 11 Summary

- EventEmitter is **core to Node.js async architecture**.
- Enables **custom events**, **modular design**, and **non-blocking I/O**.
- Mastering EventEmitter is essential for **building scalable Node.js apps**.

---
