import { useState } from "react";
import { DollarSign } from "lucide-react";
import { SeminarModal } from "./SeminarModal";

export function SeminarCTA() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)} className="seminar-cta mt-8">
        <DollarSign size={18} />
        <span>Book a Seminar</span>
      </button>
      <SeminarModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}
