import "./style.css";

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
    </div>
  );
}
