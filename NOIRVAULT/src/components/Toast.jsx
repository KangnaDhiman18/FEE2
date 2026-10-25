import { Check, X } from "lucide-react";

export default function Toast({ message, onClose }) {
  if (!message) return null;
  return (
    <div className="toast" role="status">
      <span className="toast-check"><Check size={16} /></span>
      <span>{message}</span>
      <button className="toast-close" onClick={onClose} aria-label="Dismiss message"><X size={15} /></button>
    </div>
  );
}
