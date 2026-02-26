"use client";

import { useEffect, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

export type ModalProps = {
  open: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  titleId?: string;
  showCloseButton?: boolean;
  closeOnBackdrop?: boolean;
  maxWidth?: string;
  noCard?: boolean;
  zIndex?: number;
};

export function Modal({
  open,
  onClose,
  children,
  titleId,
  showCloseButton = true,
  closeOnBackdrop = true,
  maxWidth = "max-w-sm",
  noCard = false,
  zIndex = 60,
}: ModalProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape" && onClose) onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open, handleEscape]);

  if (!open) return null;

  const content = (
    <div className="fixed inset-0 flex items-center justify-center" style={{ zIndex }} role="dialog" aria-modal="true" aria-labelledby={titleId}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeOnBackdrop && onClose ? onClose : undefined} aria-hidden="true" />
      <div className="relative mx-4 my-4 w-full shrink-0" style={{ maxWidth: noCard ? "none" : "24rem" }}>
        <div className={noCard ? "flex flex-col items-center justify-center" : `relative w-full rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl ${maxWidth}`}>
          {!noCard && showCloseButton && onClose && (
            <button type="button" onClick={onClose} className="absolute top-4 right-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors z-10" aria-label="Close">
              <X className="w-5 h-5" />
            </button>
          )}
          {children}
        </div>
      </div>
    </div>
  );

  if (mounted && typeof document !== "undefined") return createPortal(content, document.body);
  return content;
}
