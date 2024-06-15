import React, { useContext, createContext } from "react";
import { InputError } from "./ui/input-error";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { StateForm } from "@/lib/constants";

type FormContextData<T extends { [key: string]: string[] | undefined }> = {
  state: StateForm<T>;
};

const FormContext = createContext<FormContextData<any>>({
  state: undefined,
});

type PropsGroup<T> = {
  state: StateForm<T>;
  children: React.ReactNode;
};

export function FormProvider<T>({ children, state }: PropsGroup<T>) {
  return (
    <FormContext.Provider value={{ state }}>{children}</FormContext.Provider>
  );
}

export const Form = {
  Root<T>({ state, ...props }: React.ComponentProps<"form"> & PropsGroup<T>) {
    return (
      <FormProvider state={state}>
        <form {...props} />
      </FormProvider>
    );
  },
  Input: ({
    showError = true,
    name,
    ...props
  }: React.ComponentProps<"input"> & { showError?: boolean }) => {
    const { state } = useContext(FormContext);

    const messageError = name ? state?.errors?.[name]?.[0] : undefined;

    return (
      <>
        <Input {...props} name={name} />
        {showError && messageError && <InputError>{messageError}</InputError>}
      </>
    );
  },
  Label: ({ ...props }: React.ComponentProps<"label">) => {
    return <Label {...props}>{props.children}</Label>;
  },
  Group({ ...props }: React.ComponentProps<"div">) {
    return <div {...props} className="space-y-1" />;
  },
};
