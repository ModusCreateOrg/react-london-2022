import { useEffect, useRef } from "react";
import { AnyFunction } from "../types";

export const useChangeEffect = (fn: AnyFunction, inputs: unknown[]) => {
  const didMount = useRef(false);
  useEffect(() => {
    if (didMount.current) {
      fn();
      return;
    }

    didMount.current = true;
  }, [inputs, fn]);
};
