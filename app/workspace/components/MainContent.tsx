import { useWorkspaceStore } from "../store";
import { InputSection } from "./InputSection";
import { WorkspaceCard } from "./WorkspaceCard";

export function MainContent() {
  const { slug, step, isConfirmed, isContinue } = useWorkspaceStore();

  return (
    <>
      <WorkspaceCard
        step={step}
        slug={slug}
        isConfirmed={isConfirmed}
        isContinue={isContinue}
      />

      <InputSection />
    </>
  );
}
