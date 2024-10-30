"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from "react-hook-form";

import { cn } from "./lib/utils";
import { Label } from "./label";

const Form = FormProvider;

const FormFieldContext = React.createContext({});

const FormField = function (props) {
  return React.createElement(
    FormFieldContext.Provider,
    { value: { name: props.name } },
    React.createElement(Controller, props)
  );
};

const useFormField = function () {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

const FormItemContext = React.createContext({});

const FormItem = React.forwardRef(function FormItem(
  { className, ...props },
  ref
) {
  const id = React.useId();

  return React.createElement(
    FormItemContext.Provider,
    { value: { id } },
    React.createElement(
      "div",
      { ref, className: cn("space-y-2", className), ...props }
    )
  );
});
FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef(function FormLabel(
  { className, ...props },
  ref
) {
  const { error, formItemId } = useFormField();

  return React.createElement(
    Label,
    {
      ref,
      className: cn(error && "text-destructive", className),
      htmlFor: formItemId,
      ...props,
    }
  );
});
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef(function FormControl(
  props,
  ref
) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

  return React.createElement(
    Slot,
    {
      ref,
      id: formItemId,
      "aria-describedby": !error
        ? `${formDescriptionId}`
        : `${formDescriptionId} ${formMessageId}`,
      "aria-invalid": !!error,
      ...props,
    }
  );
});
FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef(function FormDescription(
  { className, ...props },
  ref
) {
  const { formDescriptionId } = useFormField();

  return React.createElement(
    "p",
    {
      ref,
      id: formDescriptionId,
      className: cn("text-sm text-muted-foreground", className),
      ...props,
    }
  );
});
FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef(function FormMessage(
  { className, children, ...props },
  ref
) {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return React.createElement(
    "p",
    {
      ref,
      id: formMessageId,
      className: cn("text-sm font-medium text-destructive", className),
      ...props,
    },
    body
  );
});
FormMessage.displayName = "FormMessage";

export {

  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
  
};
export { Button } from "./button";