import React from 'react';

export default function ProgressBar({ progress, label, colorClass = 'bg-brand-primary' }) {
    // progress should be 0-100
    return (
        <div className="w-full">
            {label && (
                <div className="flex justify-between text-xs font-medium text-gray-500 mb-1">
                    <span>{label}</span>
                    <span>{progress}%</span>
                </div>
            )}
            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                <div
                    className={`h-2.5 rounded-full transition-all duration-1000 ease-out ${colorClass}`}
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </div>
    );
}
