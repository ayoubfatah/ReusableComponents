import Avatar from "./avatar";

export default function BriefInfo() {
  return (
    <section className="w-[500px] h-[613px] flex flex-col px-6 py-8 border-r">
      <div className="mb-10">
        <Avatar />
        <span className="font-extrabold text-gray-300 text-[17px]">
          Manager Name
        </span>
        <h1 className="text-black text-[30px] font-bold">Brief Discussion</h1>
      </div>
      <div>
        <div className="flex gap-2 mb-3.5">
          <svg
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_0_4961)">
              <path
                d="M0.998047 10.76C0.998047 13.141 1.94389 15.4244 3.6275 17.108C5.3111 18.7916 7.59457 19.7375 9.97555 19.7375C12.3565 19.7375 14.64 18.7916 16.3236 17.108C18.0072 15.4244 18.953 13.141 18.953 10.76C18.953 8.37899 18.0072 6.09553 16.3236 4.41192C14.64 2.72831 12.3565 1.78247 9.97555 1.78247C7.59457 1.78247 5.3111 2.72831 3.6275 4.41192C1.94389 6.09553 0.998047 8.37899 0.998047 10.76Z"
                stroke="#828891"
                strokeOpacity="0.61"
                strokeWidth="1.995"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.97559 7.3064V10.7597L13.4848 14.8535"
                stroke="#828891"
                strokeOpacity="0.61"
                strokeWidth="1.995"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_0_4961">
                <rect
                  width="19.95"
                  height="19.95"
                  fill="white"
                  transform="translate(0 0.784912)"
                />
              </clipPath>
            </defs>
          </svg>

          <h1 className="font-extrabold text-gray-400 text-[17px]">30 min</h1>
        </div>
        <div className="flex gap-2">
          <svg
            width="20"
            height="17"
            viewBox="0 0 20 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.9571 6.17281V3.76005C13.9571 3.24022 13.7506 2.74169 13.3831 2.37412C13.0155 2.00655 12.517 1.80005 11.9971 1.80005H2.80082C2.281 1.80005 1.78246 2.00655 1.41489 2.37412C1.04732 2.74169 0.84082 3.24022 0.84082 3.76005V13.56C0.84082 14.0799 1.04732 14.5784 1.41489 14.946C1.78246 15.3135 2.281 15.52 2.80082 15.52H11.9971C12.517 15.52 13.0155 15.3135 13.3831 14.946C13.7506 14.5784 13.9571 14.0799 13.9571 13.56V11.1473L17.0402 12.7917C17.1895 12.8712 17.3568 12.9107 17.5259 12.9064C17.6949 12.9021 17.86 12.8541 18.005 12.7671C18.15 12.68 18.2701 12.557 18.3535 12.4098C18.4368 12.2627 18.4807 12.0965 18.4808 11.9274V5.39273C18.4807 5.22361 18.4368 5.05739 18.3535 4.91025C18.2701 4.76311 18.15 4.64005 18.005 4.55304C17.86 4.46603 17.6949 4.41803 17.5259 4.4137C17.3568 4.40938 17.1895 4.44888 17.0402 4.52837L13.9571 6.17281Z"
              stroke="#828891"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <h1 className="font-extrabold text-gray-400 text-[17px]">
            Web conferencing details provided upon confirmation
          </h1>
        </div>
      </div>
      <div className="mt-auto text-black flex justify-between">
        <span className="text-blue-400">Cookie settings</span>
        <span>Report abuse</span>
      </div>
    </section>
  );
}
