import React, { useContext, createContext } from "react";
import { InputError } from "./ui/input-error";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { StateForm } from "@/lib/constants";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FormContextData<T extends { [key: string]: string[] | undefined }, R> = {
  state: StateForm<T, R>;
};

const FormContext = createContext<FormContextData<any, any>>({
  state: undefined,
});

type PropsGroup<T, R> = {
  state: StateForm<T, R>;
  children: React.ReactNode;
};

export function FormProvider<T, R>({ children, state }: PropsGroup<T, R>) {
  return (
    <FormContext.Provider value={{ state }}>{children}</FormContext.Provider>
  );
}

export const Form = {
  Root<T, R = void>({
    state,
    ...props
  }: React.ComponentProps<"form"> & PropsGroup<T, R>) {
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
  Select({
    options,
    placeholder,
    name,
    showError = true,
    ...rest
  }: React.ComponentProps<"select"> & {
    options: { value: string; label: string }[];
    placeholder?: string;
    showError?: boolean;
  }) {
    const { state } = useContext(FormContext);

    const messageError = name ? state?.errors?.[name]?.[0] : undefined;
    return (
      <>
        <Select {...rest} name={name}>
          <SelectTrigger>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {options.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {showError && messageError && <InputError>{messageError}</InputError>}
      </>
    );
  },
};
