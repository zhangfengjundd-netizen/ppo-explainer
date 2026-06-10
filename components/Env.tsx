"use client";

import { useState } from "react";

export default function Environment({ step }: { step: number }) {
    const [expandedPadding, setExpandedPadding] = useState(false);

    return (
        <div className="tooltip tooltip-open tooltip-accent inline-block"
            data-tip={`Environment：\n接收动作并返回新的状态、\n 奖励和终止信号。`}
            >
            <button
                type="button"
                onClick={() => setExpandedPadding((value) => !value)}
                className="w-55 rounded-2xl border-2 border-accent bg-accent/10 py-4 shadow-md"
            >
                <div className="flex flex-col items-center gap-3">
                    <h3 className="text-sm font-semibold text-accent">
                        Environment
                    </h3>
                    {expandedPadding && (
                        <div>
                            <video
                                src={`/videos/${step}.mp4`}
                                controls
                                className="w-40 max-w-full h-auto rounded-md shadow-sm"
                            />
                        </div>
                    )}
                </div>
            </button>
        </div>
    );
}
