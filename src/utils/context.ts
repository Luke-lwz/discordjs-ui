// context.ts
import { AsyncResource, createHook, executionAsyncId } from "async_hooks";
import { ContextProps } from "../types";

export type ContextType = ContextProps;

const contexts = new Map<number, ContextType>();

const asyncHook = createHook({
  init(asyncId: number, type: string, triggerAsyncId: number) {
    if (contexts.has(triggerAsyncId)) {
      contexts.set(asyncId, contexts.get(triggerAsyncId)!);
    }
  },
  destroy(asyncId: number) {
    contexts.delete(asyncId);
  },
});

asyncHook.enable();

const setContext = (context: ContextType) => {
  contexts.set(executionAsyncId(), context);
};

export const getContext = (useableOutsideDiscordjsUi: boolean = false): ContextType | undefined => {
  const context = contexts.get(executionAsyncId());
  if (!context && !useableOutsideDiscordjsUi) {
    throw new Error("Cant use this function outside of a discordjs-ui route");
  }
  return context;
};

export const runWithContext = (context: any, fn: () => void) => {
  return new AsyncResource("RunWithContext").runInAsyncScope(async () => {
    setContext(context);
    await fn();
  });
};
