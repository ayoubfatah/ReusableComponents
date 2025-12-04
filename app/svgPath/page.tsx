import React from "react";
import InfinitePathCanvas from "./InfinitePathCanvas";

export default function page() {
  const config = {
    text: "Infinite loops are forever",
    fontSize: 24,
    speed: 5,
    isPlaying: true,
    opacity: 1,
  };

  return <InfinitePathCanvas config={config}></InfinitePathCanvas>;
}
