"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAlertDialog } from "@/context/AlertDialogContext";

export function GlobalAlertDialog() {
  const { isOpen, hideDialog, options } = useAlertDialog();

  if (!options) return null; // Don't render if there's no dialog data

  return (
    <AlertDialog open={isOpen} onOpenChange={hideDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{options.title}</AlertDialogTitle>
          <AlertDialogDescription>{options.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={hideDialog}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              options.onConfirm();
              hideDialog();
            }}
          >
            Yes
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
