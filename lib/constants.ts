export type StateForm<T, R = never> =
  | {
      errors?: T;
      message?: string;
      data?: R;
    }
  | undefined;

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
