"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "./lib/utils";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef(
  (props, ref) => {
    const { className, ...restProps } = props;
    return React.createElement(
      DialogPrimitive.Overlay,
      {
        ref,
        className: cn(
          "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          className
        ),
        ...restProps,
      }
    );
  }
);
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef(
  (props, ref) => {
    const { className, children, ...restProps } = props;
    return React.createElement(
      DialogPortal,
      null,
      React.createElement(DialogOverlay),
      React.createElement(
        DialogPrimitive.Content,
        {
          ref,
          className: cn(
            "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
            className
          ),
          ...restProps,
        },
        children,
        React.createElement(
          DialogPrimitive.Close,
          {
            className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
          },
          React.createElement(X, { className: "h-4 w-4" }),
          React.createElement("span", { className: "sr-only" }, "Close")
        )
      )
    );
  }
);
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = (props) => {
  const { className, ...restProps } = props;
  return React.createElement(
    "div",
    {
      className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
      ...restProps,
    }
  );
};
DialogHeader.displayName = "DialogHeader";

const DialogFooter = (props) => {
  const { className, ...restProps } = props;
  return React.createElement(
    "div",
    {
      className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
      ...restProps,
    }
  );
};
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef(
  (props, ref) => {
    const { className, ...restProps } = props;
    return React.createElement(
      DialogPrimitive.Title,
      {
        ref,
        className: cn("text-lg font-semibold leading-none tracking-tight", className),
        ...restProps,
      }
    );
  }
);
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef(
  (props, ref) => {
    const { className, ...restProps } = props;
    return React.createElement(
      DialogPrimitive.Description,
      {
        ref,
        className: cn("text-sm text-muted-foreground", className),
        ...restProps,
      }
    );
  }
);
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};