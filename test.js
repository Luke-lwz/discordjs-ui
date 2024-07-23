// context.js
const { AsyncResource, createHook, executionAsyncId } = require("async_hooks");

const contexts = new Map();

const asyncHook = createHook({
  init(asyncId, type, triggerAsyncId) {
    if (contexts.has(triggerAsyncId)) {
      contexts.set(asyncId, contexts.get(triggerAsyncId));
    }
  },
  destroy(asyncId) {
    contexts.delete(asyncId);
  },
});

asyncHook.enable();

const setContext = (context) => {
  contexts.set(executionAsyncId(), context);
};

const getContext = () => {
  return contexts.get(executionAsyncId());
};

const runWithContext = (context, fn) => {
  return new AsyncResource("RunWithContext").runInAsyncScope(async () => {
    setContext(context);
    await fn();
  });
};

const childFunction = () => {
  const context = getContext();
  if (context) {
    console.log(`Child function called with context value: ${context.value}`);
  } else {
    console.log("No context found");
  }
};

const parent1 = async () => {
  console.log("Calling child function from parent1");
  runWithContext({ value: "Parent1 value" }, () => childFunction());
};

const parent2 = async () => {
  console.log("Calling child function from parent2");
  runWithContext({ value: "Parent2 value" }, () => {
    childFunction();
    setTimeout(() => {
      childFunction();
    }, 5000);
  });
};

const parent3 = async () => {
  console.log("Calling child function from parent3");
  childFunction();
};

// const parent4 = async () => {
//   console.log("Calling child function from parent4");
//   childFunction();
// };

parent1();
parent2();
parent3();
// parent4();
