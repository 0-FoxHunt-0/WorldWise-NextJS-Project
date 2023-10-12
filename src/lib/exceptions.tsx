"use client";

import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";

export function DateNotFoundToast(message: string = "Date not found.") {
  return toast({
    variant: "destructive",
    title: "Date Not Found",
    description: message,
    action: <ToastAction altText="Close">Close</ToastAction>,
  });
}

export function LocationNotFoundToast(
  message: string = "Location was not found or not provided.",
  handleTryAgain?: () => void
) {
  return toast({
    variant: "destructive",
    title: "Location Not Found",
    description: message,
    action: (
      <ToastAction altText="Try again" onClick={() => handleTryAgain()}>
        Try again
      </ToastAction>
    ),
  });
}

export function OutOfContextToast(
  message: string = "The Context used here is outside of the provider."
) {
  return toast({
    variant: "destructive",
    title: "Out of Context",
    description: message,
    action: <ToastAction altText="Close">Close</ToastAction>,
  });
}

export function ResourceNotFoundToast(message: string = "Resource not found.") {
  return toast({
    variant: "destructive",
    title: "Resource Not Found",
    description: message,
    action: <ToastAction altText="Close">Close</ToastAction>,
  });
}

export function AccessDeniedToast(
  message: string = "Access Denied, Please log in."
) {
  return toast({
    variant: "destructive",
    title: "Access Denied",
    description: message,
    action: <ToastAction altText="Close">Close</ToastAction>,
  });
}
