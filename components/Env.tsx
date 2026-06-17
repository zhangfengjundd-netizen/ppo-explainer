"use client";

import { useEffect, useState } from "react";

type EnvironmentProps = {
    step: number;
    isPlaying: boolean;
};

export default function Environment({ step, isPlaying }: EnvironmentProps) {
    const [expandedPadding, setExpandedPadding] = useState(false);

    useEffect(() => {
        if (isPlaying) {
            setExpandedPadding(false);
        }
    }, [isPlaying]);

    return (
        <div className="tooltip tooltip-open tooltip-accent inline-block"
            data-tip="暂停时点击查看当前step的训练结果"
            >
            <button
                type="button"
                disabled={isPlaying}
                onClick={() => setExpandedPadding((value) => !value)}
                className="w-55 rounded-2xl border-2 border-accent bg-accent/10 py-4 shadow-md transition disabled:cursor-not-allowed disabled:opacity-60"
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
