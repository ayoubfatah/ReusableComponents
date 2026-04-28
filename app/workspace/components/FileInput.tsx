import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useWorkspaceStore } from "../store";

export function FileInput() {
  const { setUploadedImage, setIsContinue } = useWorkspaceStore();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setUploadedImage(result);
        setIsContinue(true);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.input
      initial={{
        opacity: 0.2,
        filter: "blur(1px)",
      }}
      animate={{
        opacity: 1,
        filter: "blur(0px)",
      }}
      exit={{
        opacity: 0.2,
        filter: "blur(1px)",
      }}
      transition={{ duration: 0.23, ease: "easeIn" }}
      key="upload-input"
      type="file"
      accept="image/*"
      onChange={handleFileChange}
      className={cn(
        "ring-1 rounded-full bg-gray-100 p-2 px-4 w-full ring-green-500 placeholder:text-green-600/60",
        "focus:outline-none transition-all duration-300",
        "file:bg-green-500 file:text-white file:border-0 file:rounded-full",
        "file:px-2 file:py-0 file:mr-4 file:cursor-pointer",
        "file:hover:bg-green-600",
      )}
    />
  );
}
