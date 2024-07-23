export interface ButtonInCacheFnProps {
    interaction: any;
    pathname: string;
}


export interface ButtonInCache {
  fn: (props: ButtonInCacheFnProps) => void;
  currentPathname: string;
  ttl: number;
}

export default function createButtonCache(ttl: number) {
  const cache: Map<string, ButtonInCache> = new Map();

  function set(key: string, fn: () => void, currentPathname: string) {
    const obj = { fn, ttl: Date.now() + ttl * 1000, currentPathname };
    cache.set(key, obj);
  }

  function get(key: string): ButtonInCache | undefined{
    return cache.get(key);
  }

  setInterval(() => {
    const now = Date.now();
    for (const [key, value] of cache) {
      if (value.ttl < now) {
        cache.delete(key);
      }
    }
  }, 1000);

  return {
    set,
    get,
  };
} // Path: src/utils/buttonCache.ts


