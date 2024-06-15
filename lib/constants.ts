export type StateForm<T> =
  | {
      errors?: T;
      message?: string;
    }
  | undefined;
