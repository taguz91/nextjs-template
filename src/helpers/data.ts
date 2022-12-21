import { MapValue } from 'src/interfaces/data.type';

export const valueFromPath = (object: Record<string, any>, path: string): any => {
  if (!object) {
    return null;
  }

  if (!valueExist(path)) {
    return null;
  }

  path = path.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
  path = path.replace(/^\./, ''); // strip a leading dot

  const attributes = path.split('.');

  for (let i = 0, n = attributes.length; i < n; ++i) {
    const key = attributes[i];

    if (key in object) {
      object = object[key];
    } else {
      return;
    }
  }

  return object;
};

export const isAbsent = (value: any): boolean => value == null;

export const valueExist = (value: any) => {
  if (value) {
    if (typeof value === 'string' && value.trim() === '') {
      return false;
    }

    return true;
  }

  return false;
};

export const objectFromMap = (
  maps: MapValue[],
  object: Record<string, any>,
): Record<string, any> => {
  const finalValues = maps.map((map) => [map.name, valueFromPath(object, map.path)]);

  return Object.fromEntries(finalValues);
};

export const capitalize = (value?: string): string | null | undefined => {
  if (!value) return value;

  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const flatObject = (data: Record<string, any>) => {
  const result: Record<string, any> = {};

  function recurse(cur: Record<string, any>, prop: string) {
    if (Object(cur) !== cur) {
      result[prop] = cur;
    } else if (Array.isArray(cur)) {
      const l = cur.length;

      for (let i = 0; i < l; i++) recurse(cur[i], prop + '[' + i + ']');
      if (l == 0) result[prop] = [];
    } else {
      let isEmpty = true;

      for (const p in cur) {
        isEmpty = false;
        recurse(cur[p], prop ? prop + '.' + p : p);
      }
      if (isEmpty && prop) result[prop] = {};
    }
  }
  recurse(data, '');

  return result;
};
