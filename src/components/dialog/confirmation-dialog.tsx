"use client";

import { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface ConfirmationDialogProps {
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children?: React.ReactNode;
}

export default function ConfirmationDialog(props: ConfirmationDialogProps) {
  const handleClose = () => {
    props.setIsOpen(false);
    if (props.onCancel) props.onCancel();
  };

  const handleConfirm = () => {
    props.setIsOpen(false);
    props.onConfirm();
  };

  return (
    <Dialog open={props.isOpen} onOpenChange={(open) => props.setIsOpen(open)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{props.title ?? "Confirm"}</DialogTitle>
          <DialogDescription>{props.description}</DialogDescription>
        </DialogHeader>

        <div>{props.children ?? <p>Are you sure you want to proceed?</p>}</div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            {props.cancelLabel ?? "Cancel"}
          </Button>
          <Button onClick={handleConfirm}>{props.confirmLabel ?? "Confirm"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
