import { useRef, useEffect, useCallback, RefObject } from 'react';

function useClickAway<T extends RefObject<HTMLElement>>(
  root: T,
  callback: () => void,
) {
  const callbackRef = useRef<() => void>(callback);

  const onClickAway = useCallback(
    (e: MouseEvent) => {
      if (root.current) {
        const $rootEl = root.current;
        const $targetEl = e.target;

        if ($targetEl) {
          !$rootEl.contains($targetEl as Node) && callbackRef?.current?.();
        }
      }
    },
    [root],
  );

  useEffect(() => {
    document.body.addEventListener('click', onClickAway);

    return () => document.body.removeEventListener('click', onClickAway);
  }, [onClickAway]);
}

export default useClickAway;
