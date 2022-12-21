interface DataLS {
  value: any;
  expiresAt: number;
}

export const setStorage = (name: string, value: any, ttl_ms: number) => {
  const data: DataLS = {
    value: value,
    expiresAt: new Date().getTime() + ttl_ms / 1,
  };

  localStorage.setItem(name, JSON.stringify(data));
};

export const getStorage = <T>(name: string): T | undefined => {
  const value = localStorage.getItem(name);

  if (!value) {
    return undefined;
  }

  const data: DataLS | undefined = JSON.parse(value);

  if (data) {
    console.log('EXPIRES IN', data.expiresAt - new Date().getTime());
    if (data.expiresAt < new Date().getTime()) {
      localStorage.removeItem(name);
    } else {
      return data.value;
    }
  }

  return undefined;
};
