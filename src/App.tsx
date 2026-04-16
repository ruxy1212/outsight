import { useState } from "react";
import { judgeUser } from "./api/judge-user";

const loadingStates = [
  "Consulting the universe",
  "Gathering cosmic evidence",
  "Finalizing your verdict",
];

type ViewState = "idle" | "loading" | "success" | "error";

export default function App() {
  const [viewState, setViewState] = useState<ViewState>("idle");
  const [result, setResult] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [progressStep, setProgressStep] = useState(0);

  const handleJudge = async () => {
    setViewState("loading");
    setResult(null);
    setErrorMessage(null);
    setProgressStep(0);

    try {
      const res = await judgeUser((step) => {
        setProgressStep(step);
      });

      setTimeout(() => {
        setResult(res.message);
        setViewState("success");
      }, 1200);
    } catch {
      setErrorMessage("The universe got noisy. Please try again.");
      setViewState("error");
    }
  };

  return (
    <main className="h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center max-w-xl w-full p-6 border border-white/15 rounded-3xl bg-white/5 backdrop-blur-sm">
        {viewState === "idle" && (
          <>
            <p className="uppercase tracking-[0.2em] text-xs text-white/70 mb-3">
              Outsight Cosmic Assessment
            </p>
            <h1 className="text-4xl sm:text-5xl font-black leading-tight mb-8">
              Ready for your
              <br />
              chaotic verdict?
            </h1>

            <button
              onClick={handleJudge}
              className="cursor-pointer bg-white text-black px-8 py-3 rounded-2xl font-semibold hover:scale-105 transition"
            >
              Summon Judgment
            </button>
          </>
        )}

        {viewState === "loading" && (
          <>
            <h1 className="text-3xl font-bold mb-2">Decoding the cosmos</h1>

            <div className="space-y-3 text-left">
              {loadingStates.map((state, index) => {
                const isCompleted = progressStep > index;
                const isActive = progressStep === index;

                return (
                  <div
                    key={state}
                    className="flex items-center gap-3"
                  >
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        isCompleted ? "bg-green-500" : isActive ? "bg-green-200/80 animate-pulse" : "bg-white/30"
                      }`}
                    />
                    <p className={isCompleted  ? "" : "text-sm"}>
                      <span
                        className={isCompleted || isActive ? "text-white" : "text-white/45"}
                      >
                        {state}
                      </span>
                      <span className={isCompleted ? "hidden" : "text-white/45"}>...</span>
                    </p>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {viewState === "success" && result && (
          <>
            <h1 className="text-3xl font-bold mb-4">Your cosmic result</h1>
            <p className="whitespace-pre-line]text-lg text-left bg-white/5 border border-white/15 rounded-2xl p-5 mb-8">
              {result}
            </p>

            <button
              onClick={handleJudge}
              className="cursor-pointer mt-4 bg-white text-black px-7 py-3 rounded-2xl font-semibold hover:scale-105 transition"
            >
              Retry
            </button>
          </>
        )}

        {viewState === "error" && (
          <>
            <h1 className="text-3xl font-bold mb-4">Transmission failed</h1>
            <p className="text-left bg-white/5 border border-white/15 rounded-2xl p-5 mb-8">
              {errorMessage}
            </p>

            <button
              onClick={handleJudge}
              className="bg-white text-black px-7 py-3 rounded-2xl font-semibold hover:scale-105 transition"
            >
              Retry
            </button>
          </>
        )}
      </div>
    </main>
  );
}