"use client";

import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { unstable_useForkRef as useForkRef } from "@mui/utils";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import {
  unstable_useDateField as useDateField,
  UseDateFieldProps,
} from "@mui/x-date-pickers/DateField";
import { useClearableField } from "@mui/x-date-pickers/hooks";
import {
  BaseSingleInputFieldProps,
  DateValidationError,
  FieldSection,
} from "@mui/x-date-pickers/models";
import { Input } from "../ui/input";
import "dayjs/locale/pt-br";
import { pickersLayoutClasses } from "@mui/x-date-pickers/PickersLayout/pickersLayoutClasses";
import { Label } from "../ui/label";
import { InputError } from "../ui/input-error";
import { FormContext } from "../form";

interface BrowserFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: React.ReactNode;
  inputRef?: React.Ref<any>;
  InputProps?: {
    ref?: React.Ref<any>;
    endAdornment?: React.ReactNode;
    startAdornment?: React.ReactNode;
  };
  error?: boolean;
  focused?: boolean;
  ownerState?: any;
  sx?: any;
  enableAccessibleFieldDOMStructure: boolean;
}

const BrowserField = React.forwardRef(
  (props: BrowserFieldProps, ref: React.Ref<HTMLDivElement>) => {
    const {
      // Should be ignored
      enableAccessibleFieldDOMStructure,
      disabled,
      id,
      label,
      inputRef,
      InputProps: { ref: containerRef, startAdornment, endAdornment } = {},
      error,
      focused,
      ownerState,
      sx,
      name,
      ...other
    } = props;

    const { state } = React.useContext(FormContext);

    const messageError = name ? state?.errors?.[name]?.[0] : undefined;

    const handleRef = useForkRef(containerRef, ref);

    return (
      <div className="space-y-1">
        <Label htmlFor={id}>{label || "unknown"}</Label>
        <div className="flex items-center relative" id={id} ref={handleRef}>
          {startAdornment}

          <Input
            id={id}
            name={name}
            disabled={disabled}
            ref={inputRef}
            {...other}
          />

          <div className="[&>.MuiInputAdornment-root>button]:!text-stone-500 flex absolute right-4">
            {endAdornment}
          </div>
        </div>
        {messageError && <InputError>{messageError}</InputError>}
      </div>
    );
  }
);

BrowserField.displayName = "BrowserField";

interface BrowserDateFieldProps
  extends UseDateFieldProps<Dayjs, false>,
    BaseSingleInputFieldProps<
      Dayjs | null,
      Dayjs,
      FieldSection,
      false,
      DateValidationError
    > {}

const BrowserDateField = React.forwardRef(
  (
    props: BrowserDateFieldProps & { onAdornmentClick: () => void },
    ref: React.Ref<HTMLDivElement>
  ) => {
    const { slots, slotProps, ...textFieldProps } = props;

    const fieldResponse = useDateField<Dayjs, false, typeof textFieldProps>({
      ...textFieldProps,
      enableAccessibleFieldDOMStructure: false,
    });

    /* If you don't need a clear button, you can skip the use of this hook */
    const processedFieldProps = useClearableField({
      ...fieldResponse,
      slots,
      slotProps,
    });

    return <BrowserField ref={ref} {...processedFieldProps} />;
  }
);

BrowserDateField.displayName = "BrowserDateField";

const BrowserDatePicker = React.forwardRef(
  (props: DatePickerProps<Dayjs, false>, ref: React.Ref<HTMLDivElement>) => {
    console.log(props.defaultValue);
    return (
      <DatePicker<Dayjs, false>
        ref={ref}
        {...props}
        slots={{ ...props.slots, field: BrowserDateField }}
        slotProps={{
          ...props.slotProps,
        }}
      />
    );
  }
);

BrowserDatePicker.displayName = "BrowserDatePicker";

type Props = Omit<DatePickerProps<Dayjs, false>, "value" | "onChange"> & {
  label?: string;
  name?: string;
  value: Date | null;
  onChange: (v: Date | null) => void;
  error?: string;
};

export default function BrowserV6Field({
  label,
  name,
  value,
  onChange,
  ...props
}: Props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <BrowserDatePicker
        label={label}
        name={name}
        value={dayjs(value)}
        onChange={(v) => onChange(v?.toDate() || null)}
        slotProps={{
          field: { clearable: true },
          layout: {
            sx: {
              [`.${pickersLayoutClasses.contentWrapper}`]: {
                bgcolor: "#1c1917 !important",
                [`.MuiPickersDay-root`]: {
                  color: "white !important",
                },
                [`.MuiPickersCalendarHeader-label`]: {
                  color: "white !important",
                },
                [`.MuiDayCalendar-weekDayLabel`]: {
                  color: "white !important",
                },
                [`.MuiIconButton-sizeSmall`]: {
                  color: "white !important",
                },
                [`.MuiIconButton-root`]: {
                  color: "white !important",
                },
                [`.Mui-selected`]: {
                  bgcolor: "#581c87",
                },
              },
            },
          },
        }}
        {...props}
      />
    </LocalizationProvider>
  );
}
