import { readable, type Readable } from 'svelte/store';

export const isMobile: Readable<boolean> = readable(false, (set) => {
  const mq: MediaQueryList = window.matchMedia('(max-width: 950px)');

  set(mq.matches);

  const onChange = (e: MediaQueryListEvent): void => {
    set(e.matches);
  };

  mq.addEventListener('change', onChange);

  return (): void => {
    mq.removeEventListener('change', onChange);
  };
});
