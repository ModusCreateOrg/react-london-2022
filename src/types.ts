import { EVENTS } from "./constants";

export type AnyFunction = () => void;
export type Events = Partial<Record<EVENTS, AnyFunction[]>>;
