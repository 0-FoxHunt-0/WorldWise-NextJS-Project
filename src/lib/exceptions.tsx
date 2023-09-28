"use client";

import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";

export function DateNotFoundToast(message: string = "Date not found.") {
  return toast({
    variant: "destructive",
    title: "Date Not Found",
    description: message,
    action: <ToastAction altText="Try again">Try again</ToastAction>,
  });
}

export function LocationNotFoundToast(
  message: string = "Location was not found or not provided."
) {
  return toast({
    variant: "destructive",
    title: "Location Not Found",
    description: message,
    action: <ToastAction altText="Try again">Try again</ToastAction>,
  });
}

export function OutOfContextToast(
  message: string = "The Context used here is outside of the provider."
) {
  return toast({
    variant: "destructive",
    title: "Out of Context",
    description: message,
    action: <ToastAction altText="Try again">Try again</ToastAction>,
  });
}

export function ResourceNotFoundToast(message: string = "Resource not found.") {
  return toast({
    variant: "destructive",
    title: "Resource Not Found",
    description: message,
    action: <ToastAction altText="Try again">Try again</ToastAction>,
  });
}
