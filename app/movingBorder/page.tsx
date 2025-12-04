"use client";
import "./test.css";

export default function Page() {
  return (
    <div className="bg-black flex justify-center items-center min-h-screen text-white p-8">
      <div className="w-[400px] h-[700px] bg-transparent relative  rounded-2xl overflow-hidden">
        <div className="clip absolute top-1/2 right-1/2 w-[800px] h-[800px] translate-x-[50%] -translate-y-[50%] z-10"></div>
        {/* if we need a border :3  */}
        <div className="bg-gray-800 absolute top-1/2 right-1/2 w-[800px] h-[800px] translate-x-[50%]  -translate-y-[50%] z-0"></div>

        <div className="absolute inset-[2px] bg-black rounded-2xl p-8 flex flex-col items-center z-20">
          <div className="w-full space-y-6">
            <div className="flex justify-center">
              <span className="px-4 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-black text-xs font-bold rounded-full uppercase tracking-wider">
                Most Popular
              </span>
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">
                Professional
              </h2>
              <p className="text-gray-400 text-sm">For growing teams</p>
            </div>

            <div className="text-center py-4">
              <div className="flex items-start justify-center">
                <span className="text-5xl font-bold text-white">$100</span>
                <span className="text-gray-400 text-lg mt-2 ml-2">/month</span>
              </div>
              <p className="text-gray-500 text-sm mt-2">
                Billed annually or $120 monthly
              </p>
            </div>

            <div className="space-y-3 py-4">
              {[
                "Unlimited projects",
                "Advanced analytics",
                "Priority support 24/7",
                "Custom integrations",
                "Team collaboration tools",
                "API access",
                "100GB storage",
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center space-x-3">
                  <svg
                    className="w-5 h-5 text-amber-500 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-300 text-sm">{feature}</span>
                </div>
              ))}
            </div>

            <button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold py-4 px-6 rounded-xl hover:from-amber-400 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-amber-500/50">
              Get Started Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// "use client";
// import "./test.css";

// export default function Page() {
//   return (
//     <div className="bg-black flex justify-center items-center h-screen text-white">
//       <div className="wrapper rounded-full w-[100px] h-[40px] bg-transparent px-6 py-4 flex justify-center items-end relative overflow-hidden ">
//         <div className="clip absolute top-1/2 right-1/2  w-[100px] h-[100px] translate-x-[50%] -translate-y-[50%] z-20"></div>
//         <div className="bg-gray-500 absolute top-1/2 right-1/2  w-[100px] h-[100px] translate-x-[50%] -translate-y-[50%] z-10"></div>

//         <button className="cursor-pointer z-40 rounded-full absolute inset-[2px] bg-black text-white flex flex-col items-center justify-center">
//           sign up
//         </button>
//       </div>
//     </div>
//   );
// }
