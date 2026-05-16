"use client";

export default function ScrollDrivenCards() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="stage">
        <div className="track">
          <div className="scene">
            <div className="cards-wrap">
              <div className="card card-1">
                <div className="card-eyebrow">scroll-driven CSS</div>
                <div className="card-title">
                  No JavaScript.
                  <br />
                  At all.
                </div>
                <div className="card-sub">
                  Pure CSS animation-timeline drives everything.
                </div>
              </div>

              <div className="card card-2">
                <div className="card-eyebrow">modular scale</div>
                <div className="card-title">Every step is a ratio.</div>
                <div className="card-sub">
                  Consistent hierarchy from one number.
                </div>
              </div>

              <div className="card card-3">
                <div className="card-eyebrow">fluid type</div>
                <div className="card-title">Scales with the viewport.</div>
                <div className="card-sub">
                  clamp() between min and max — always right.
                </div>
              </div>

              <div className="card card-4">
                <div className="card-eyebrow">the result</div>
                <div className="card-title">CSS that thinks for itself.</div>
                <div className="card-sub">Less code. More craft.</div>
              </div>
            </div>

            <div className="tag-line">
              <span className="tag tag-dark">#css</span>
              <span className="tag tag-purp">#scrolldriven</span>
              <span className="tag tag-amber">#fluidtype</span>
              <span className="tag tag-teal">#webdesign</span>
            </div>

            <div className="hint">↑ scroll up here to begin</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .stage {
          width: 380px;
          height: 560px;
          overflow-y: scroll;
          background: #fff;
          scroll-timeline: --main block;
          position: relative;
          border-radius: 28px;
          box-shadow:
            0 0 0 1px rgba(0, 0, 0, 0.08),
            0 24px 64px rgba(0, 0, 0, 0.1);
        }

        .track {
          height: 400vh;
        }

        .scene {
          position: sticky;
          top: 0;
          height: 560px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          overflow: hidden;
          background: #fff;
        }

        .cards-wrap {
          position: relative;
          width: 300px;
          height: 280px;
        }

        .card {
          position: absolute;
          inset: 0;
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 28px;
          animation-timeline: --main;
          animation-fill-mode: both;
          animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
        }

        .card-eyebrow {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 8px;
          opacity: 0.6;
        }

        .card-title {
          font-size: 22px;
          font-weight: 700;
          line-height: 1.2;
          margin-bottom: 6px;
        }

        .card-sub {
          font-size: 13px;
          opacity: 0.65;
          line-height: 1.5;
        }

        .card-1 {
          background: #0f0f0f;
          color: #fff;
          z-index: 2;
          animation-name: bring-from-left;
          animation-range: cover 10% cover 35%;
          animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
        }

        .card-2 {
          background: #f0eeff;
          color: #2a1fa8;
          z-index: 3;
          animation-name: bring-from-right;
          animation-range: cover 40% cover 60%;
          animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
        }

        .card-3 {
          background: #fff5e6;
          color: #7a3d00;
          z-index: 1;
        }

        .card-4 {
          background: #e6f9f2;
          color: #064e36;
          z-index: 4;
          animation-name: final-in;
          animation-range: cover 65% cover 85%;
          animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes bring-from-left {
          0% {
            translate: -340px 40px;
            rotate: -22deg;
            scale: 0.82;
            opacity: 0;
            filter: blur(1.5px);
          }
          100% {
            translate: 0 0;
            rotate: 0deg;
            scale: 1;
            opacity: 1;
            filter: blur(0px);
          }
        }

        @keyframes bring-from-right {
          0% {
            translate: 340px 40px;
            rotate: 22deg;
            scale: 0.82;
            opacity: 0;
            filter: blur(1.5px);
          }
          100% {
            translate: 0 0;
            rotate: 0deg;
            scale: 1;
            opacity: 1;
            filter: blur(0px);
          }
        }

        @keyframes final-in {
          0% {
            translate: 0 120px;
            scale: 0.94;
            opacity: 0;
            filter: blur(1.5px);
          }
          100% {
            translate: 0 0;
            scale: 1;
            opacity: 1;
            filter: blur(0px);
          }
        }

        @keyframes tag-in {
          0% {
            opacity: 0;
            translate: 0 10px;
            filter: blur(1.5px);
          }
          100% {
            opacity: 1;
            translate: 0 0;
            filter: blur(0px);
          }
        }

        .tag-line {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          justify-content: center;
          padding: 20px 24px 0;
          animation: tag-in linear both;
          animation-timeline: --main;
          animation-range: cover 80% cover 95%;
        }

        .tag {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.05em;
          padding: 5px 14px;
          border-radius: 999px;
          border: 1.5px solid;
        }

        .tag-dark {
          background: #0f0f0f;
          color: #fff;
          border-color: #0f0f0f;
        }

        .tag-purp {
          background: #f0eeff;
          color: #2a1fa8;
          border-color: #c4b8ff;
        }

        .tag-amber {
          background: #fff5e6;
          color: #7a3d00;
          border-color: #ffd49a;
        }

        .tag-teal {
          background: #e6f9f2;
          color: #064e36;
          border-color: #84ddc0;
        }

        .hint {
          position: absolute;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 12px;
          font-weight: 500;
          color: #bbb;
          white-space: nowrap;
          letter-spacing: 0.04em;
          animation: hint-out linear both;
          animation-timeline: --main;
          animation-range: cover 0% cover 18%;
        }

        @keyframes hint-out {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
