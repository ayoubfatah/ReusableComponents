const debounce = <T extends (...args: any[]) => void>(fn: T, delay: number) => {
  let timer: ReturnType<typeof setTimeout>;
  const debounced = (...args: Parameters<T>): void => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
  debounced.cancel = () => clearTimeout(timer);
  return debounced;
};

const checkSlugAvailability = async (value: string): Promise<boolean> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return !["admin", "user", "test", "taken slug"].includes(value);
};

export { debounce, checkSlugAvailability };
