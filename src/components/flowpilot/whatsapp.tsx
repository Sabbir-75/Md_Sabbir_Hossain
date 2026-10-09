import { FaWhatsapp } from "react-icons/fa";

export const WHATSAPP_NUMBER = "8801756750000";

export function whatsappLink(text = "Hi FlowPilot, I want to discuss an automation project.") {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
      className="whatsapp-fab"
    >
      <span className="whatsapp-ping" aria-hidden />
      <FaWhatsapp className="relative h-7 w-7" />
    </a>
  );
}
