import { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const useQueryParams = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (!value) {
        params.delete(name);
      } else {
        params.set(name, value);
      }

      return params.toString();
    },
    [searchParams]
  );

  return {
    get: (key: string) => searchParams.get(key),
    set: (key: string, value: string, customPath?: string) =>
      router.push((customPath ?? pathname) + '?' + createQueryString(key, value)),
    remove: (key: string, customPath?: string) =>
      router.push((customPath ?? pathname) + '?' + createQueryString(key, '')),
    removeAll: (customPath?: string) => router.push(customPath ?? pathname)
  };
};

export default useQueryParams;
