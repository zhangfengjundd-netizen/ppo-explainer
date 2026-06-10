"use client";

import { useEffect } from "react";

export const STEPS = [0, 1, 2, 3, 4, 621, 1207, 2187] as const;
export const DEFAULT_STEP: number = STEPS[0];

type ControllerProps = {
  isPlaying: boolean;
  step: number;
  onPlayingChange: (isPlaying: boolean) => void;
  onStepChange: (step: number) => void;
};

function getStepIndex(step: number) {
  const index = STEPS.findIndex((value) => value === step);
  return index === -1 ? 0 : index;
}

export default function Controller({
  isPlaying,
  step,
  onPlayingChange,
  onStepChange,
}: ControllerProps) {
  const stepIndex = getStepIndex(step);

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    const timer = window.setInterval(() => {
      const nextIndex = stepIndex >= STEPS.length - 1 ? 0 : stepIndex + 1;
      onStepChange(STEPS[nextIndex] ?? DEFAULT_STEP);
    }, 700);

    return () => window.clearInterval(timer);
  }, [isPlaying, onStepChange, stepIndex]);

  function handlePreviousStep() {
    const previousIndex = stepIndex <= 0 ? STEPS.length - 1 : stepIndex - 1;
    onStepChange(STEPS[previousIndex] ?? DEFAULT_STEP);
  }

  function handleNextStep() {
    const nextIndex = stepIndex >= STEPS.length - 1 ? 0 : stepIndex + 1;
    onStepChange(STEPS[nextIndex] ?? DEFAULT_STEP);
  }

  function handleSliderChange(value: string) {
    onStepChange(STEPS[Number(value)] ?? DEFAULT_STEP);
  }

  return (
    <div className="mx-auto flex w-[min(300px,calc(100vw-3rem))] items-center justify-center gap-4 rounded-xl border border-base-300 bg-base-100 px-5 py-3 shadow-sm">
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Previous step"
          onClick={handlePreviousStep}
          className="btn btn-circle btn-sm border-base-300 bg-base-200 text-base-content hover:bg-base-300"
        >
          &lt;
        </button>
        <button
          type="button"
          aria-label={isPlaying ? "Pause step playback" : "Play step playback"}
          onClick={() => onPlayingChange(!isPlaying)}
          className="btn btn-circle border-base-300 bg-base-200 text-base-content hover:bg-base-300"
        >
          {isPlaying ? "||" : ">"}
        </button>
        <button
          type="button"
          aria-label="Next step"
          onClick={handleNextStep}
          className="btn btn-circle btn-sm border-base-300 bg-base-200 text-base-content hover:bg-base-300"
        >
          &gt;
        </button>
      </div>

      <div className="grid w-40 min-w-0 grid-cols-[auto_auto] items-center gap-x-3 gap-y-1">
        <span className="text-xs font-semibold uppercase tracking-wide text-base-content/60">Step</span>
        <span className="text-right text-sm font-semibold tabular-nums text-base-content">{step}</span>
        <input
          type="range"
          min={0}
          max={STEPS.length - 1}
          value={stepIndex}
          onChange={(event) => handleSliderChange(event.target.value)}
          className="range range-primary range-xs col-span-2"
          aria-label="Step"
        />
      </div>
    </div>
  );
}
