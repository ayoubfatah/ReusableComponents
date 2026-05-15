import { AnimatePresence } from "framer-motion";
import { JSX } from "react";
import IntegrationConnected from "../../views/IntegrationConnected";
import IntegrationForm from "../../views/IntegrationForm";
import { useIntegrationStore } from "../../store/store";

export default function ConnectForm(): JSX.Element {
  const { done } = useIntegrationStore();
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f5f5f3] p-8 font-sans">
      <div className="w-[380px] bg-white border border-[#e8e8e5] rounded-2xl overflow-hidden shadow-sm">
        <AnimatePresence mode="wait">
          {!done ? (
            <IntegrationForm key="form" />
          ) : (
            <IntegrationConnected key="done" />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
