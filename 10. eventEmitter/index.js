import EventEmitter from "events";

const myFirstEmitter = new EventEmitter();

// register a listener
myFirstEmitter.on("greet", (name) => {
  console.log(`Hello ${name}`);
});

// Triggering the event
myFirstEmitter.emit("greet", "Buddo");
