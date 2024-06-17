export type StateForm<T, R = unknown> =
  | {
      errors?: T;
      message?: string;
    }
  | undefined
  | R;

export const ATIVO_OPTIONS = {
  S: {
    value: "S",
    label: "Sim",
  },
  N: {
    value: "N",
    label: "Não",
  },
};
