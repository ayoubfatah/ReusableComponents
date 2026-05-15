import React from "react";
import { motion } from "framer-motion";
import { Field } from "../components/form/Filed";
import { cn } from "@/lib/utils";
import { ConnectButton } from "../components/buttons/ConnectButton";
import { useIntegrationStore } from "../store/store";
import { wait } from "../helper";

const inputStyle =
  " w-full px-3 py-2 text-sm border border-[#e8e8e5] rounded-lg bg-[#fafaf9] text-[#111] outline-none transition-colors placeholder:text-[#bbb] focus:border-[#bbb] focus:bg-white";

export default function IntegrationForm() {
  const {
    setIsRunning,
    setBtnState,
    setFooterHint,
    isRunning,
    btnState,
    setDone,
    footerHint,
  } = useIntegrationStore();

  const handleConnect = async (): Promise<void> => {
    if (isRunning || btnState === "CONNECTED") return;

    setIsRunning(true);
    setBtnState("CONNECTING");
    setFooterHint("Verifying credentials…");

    await wait(1500);

    setBtnState("CONNECTED");
    setIsRunning(false);

    await wait(700);
    setDone(true);
  };

  return (
    <motion.div
      key="form"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, height: 200 }}
      transition={{ duration: 0.3 }}
    >
      {/* Form body */}
      <div className="px-7 pt-7 pb-0">
        <p className="text-[15px] font-medium text-[#111] mb-1">
          Connect integration
        </p>
        <p className="text-[13px] text-[#888] mb-6">
          Enter your API credentials to link your account.
        </p>

        <div className="flex flex-col gap-2.5">
          <div className="grid grid-cols-2 gap-2.5">
            <Field label="Workspace">
              <input
                type="text"
                placeholder="my-workspace"
                className={cn("", inputStyle)}
              />
            </Field>
            <Field label="Region">
              <select className={cn("", inputStyle)}>
                <option>US East</option>
                <option>EU West</option>
                <option>AP South</option>
              </select>
            </Field>
          </div>

          <Field label="API Key">
            <input
              type="password"
              placeholder="sk-••••••••••••••••"
              className={cn("", inputStyle)}
            />
          </Field>

          <Field label="Webhook URL">
            <input
              type="text"
              placeholder="https://hooks.example.com/…"
              className={cn("", inputStyle)}
            />
          </Field>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-[#f0f0ed] mt-6" />

      {/* Footer */}
      <div className="px-7 pt-4 pb-6 flex items-center justify-between">
        <span className="text-[11px] font-mono text-[#bbb]">{footerHint}</span>

        <ConnectButton
          state={btnState}
          disabled={isRunning}
          onClick={handleConnect}
        />
      </div>
    </motion.div>
  );
}
