import en from "../../../messages/en.json";
export type Messages = typeof en;
export type MessageKeys = {
  [K in keyof Messages]: Messages[K] extends object
    ? {
        [P in keyof Messages[K]]: `${string & K}.${string & P}`;
      }[keyof Messages[K]]
    : never;
}[keyof Messages];
