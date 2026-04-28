import { motion } from "framer-motion";
import { useWorkspaceStore } from "../store";

export function UploadedImage() {
  const { uploadedImage } = useWorkspaceStore();

  if (!uploadedImage) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="size-[90px] rounded-full overflow-hidden"
    >
      <img
        src={uploadedImage}
        alt="Uploaded workspace avatar"
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
}
