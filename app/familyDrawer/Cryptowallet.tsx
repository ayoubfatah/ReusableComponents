"use client";
import { motion } from "framer-motion";

function AssetRow({
  iconBg,
  iconColor,
  symbol,
  name,
  amount,
  value,
  change,
}: any) {
  const isUp = change > 0;
  const isFlat = change === 0;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: 12,
        borderRadius: 14,
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: iconBg,
          color: iconColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 16,
          fontWeight: 700,
          flexShrink: 0,
        }}
      >
        {symbol}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: 14,
            color: "#1c1c1e",
            fontWeight: 600,
          }}
        >
          {name}
        </div>

        <div
          style={{
            fontSize: 12,
            color: "#8e8e93",
            marginTop: 1,
          }}
        >
          {amount}
        </div>
      </div>

      <div style={{ textAlign: "right" }}>
        <div
          style={{
            fontSize: 14,
            color: "#1c1c1e",
            fontWeight: 600,
          }}
        >
          {value}
        </div>

        <div
          style={{
            fontSize: 12,
            marginTop: 1,
            fontWeight: 500,
            color: isFlat ? "#8e8e93" : isUp ? "#16a34a" : "#dc2626",
          }}
        >
          {isFlat ? "0.0%" : `${isUp ? "+" : ""}${change}%`}
        </div>
      </div>
    </div>
  );
}

function ActionButton({ bg, color, label, onClick, children }: any) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        cursor: onClick ? "pointer" : "default",
      }}
    >
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: 16,
          background: bg,
          color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
        }}
      >
        {children}
      </div>

      <span
        style={{
          fontSize: 11,
          color: "#8e8e93",
          fontWeight: 500,
        }}
      >
        {label}
      </span>
    </div>
  );
}

function MiniChart() {
  return (
    <div style={{ padding: "20px 24px 0" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <span
          style={{
            fontSize: 13,
            color: "#8e8e93",
            fontWeight: 500,
          }}
        >
          Portfolio chart
        </span>

        <div style={{ display: "flex", gap: 4 }}>
          {["1D", "1W", "1M", "1Y"].map((t) => (
            <div
              key={t}
              style={{
                fontSize: 11,
                padding: "3px 8px",
                borderRadius: 6,
                fontWeight: 500,
                color: t === "1W" ? "#5856d6" : "#8e8e93",
                background: t === "1W" ? "#ede9fe" : "transparent",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>

      <svg
        width="100%"
        height="64"
        viewBox="0 0 327 64"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5856d6" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#5856d6" stopOpacity="0" />
          </linearGradient>
        </defs>

        <path
          d="M0,52 C20,50 30,44 50,38 C70,32 80,36 100,28 C120,20 130,24 150,18 C170,12 180,20 200,14 C220,8 235,16 255,10 C270,5 290,8 327,4"
          fill="none"
          stroke="#5856d6"
          strokeWidth="1.5"
        />

        <path
          d="M0,52 C20,50 30,44 50,38 C70,32 80,36 100,28 C120,20 130,24 150,18 C170,12 180,20 200,14 C220,8 235,16 255,10 C270,5 290,8 327,4 L327,64 L0,64 Z"
          fill="url(#cg)"
        />

        <circle cx="327" cy="4" r="3" fill="#5856d6" />
      </svg>
    </div>
  );
}

export default function CryptoWallet({ onClick }: { onClick: any }) {
  const assets = [
    {
      iconBg: "#fff8ec",
      iconColor: "#f7931a",
      symbol: "₿",
      name: "Bitcoin",
      amount: "0.1842 BTC",
      value: "$13,240",
      change: 3.2,
    },
    {
      iconBg: "#eef0fb",
      iconColor: "#627eea",
      symbol: "Ξ",
      name: "Ethereum",
      amount: "2.904 ETH",
      value: "$8,190",
      change: 7.8,
    },
    {
      iconBg: "#edfaf5",
      iconColor: "#26a17b",
      symbol: "◈",
      name: "USDT",
      amount: "2,400.00 USDT",
      value: "$2,400",
      change: 0,
    },
    {
      iconBg: "#f5eeff",
      iconColor: "#9945ff",
      symbol: "◎",
      name: "Solana",
      amount: "6.21 SOL",
      value: "$1,001",
      change: -1.4,
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "1.5rem 0 2rem",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
      }}
    >
      <div
        style={{
          width: 375,
          minHeight: 780,
          background: "#ffffff",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        {/* Notch */}
        <div
          style={{
            width: 120,
            height: 30,
            background: "#f5f5f7",
            borderRadius: "0 0 18px 18px",
            margin: "0 auto",
          }}
        />

        {/* MAIN CONTENT DISABLED */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            paddingBottom: 24,
            pointerEvents: "none",
          }}
        >
          {/* Top bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 24px 0",
            }}
          >
            <span
              style={{
                fontSize: 13,
                color: "#8e8e93",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              Portfolio
            </span>

            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "#5856d6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                fontWeight: 600,
                color: "#fff",
              }}
            >
              JD
            </div>
          </div>

          {/* Balance */}
          <div style={{ padding: "22px 24px 0", textAlign: "center" }}>
            <div
              style={{
                fontSize: 12,
                color: "#8e8e93",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              Total balance
            </div>

            <div
              style={{
                fontSize: 46,
                fontWeight: 700,
                color: "#1c1c1e",
                letterSpacing: -1,
                lineHeight: 1,
              }}
            >
              $24,831
            </div>

            <div
              style={{
                fontSize: 14,
                color: "#16a34a",
                marginTop: 6,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
                fontWeight: 500,
              }}
            >
              ↑ +$1,204 (+5.1%) today
            </div>
          </div>

          {/* Actions */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 12,
              padding: "22px 24px 0",
            }}
          >
            <ActionButton bg="#ede9fe" color="#5856d6" label="Send">
              ↗
            </ActionButton>

            <ActionButton bg="#dcfce7" color="#16a34a" label="Receive">
              ↙
            </ActionButton>

            <ActionButton bg="#fef9c3" color="#ca8a04" label="Swap">
              ⇄
            </ActionButton>

            {/* ONLY CLICKABLE BUTTON */}
            <motion.div
              style={{ pointerEvents: "auto" }}
              whileTap={{ scale: 0.94 }}
              transition={{
                type: "spring",
                stiffness: 700,
                damping: 35,
              }}
            >
              <ActionButton
                bg="#e5e5ea"
                color="#636366"
                label="More"
                onClick={onClick}
              >
                •••
              </ActionButton>
            </motion.div>
          </div>

          <MiniChart />

          {/* Assets */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "20px 24px 10px",
            }}
          >
            <span
              style={{
                fontSize: 15,
                color: "#1c1c1e",
                fontWeight: 600,
              }}
            >
              Assets
            </span>

            <span
              style={{
                fontSize: 12,
                color: "#5856d6",
                fontWeight: 500,
              }}
            >
              See all
            </span>
          </div>

          <motion.div
            style={{
              padding: "0 16px",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {assets.map((a) => (
              <AssetRow key={a.name} {...a} />
            ))}
          </motion.div>
        </div>

        <style>{`
          @keyframes slideUp {
            from {
              transform: translateY(100%);
            }
            to {
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </div>
  );
}
