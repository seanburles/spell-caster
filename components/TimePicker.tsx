"use client";

import * as React from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import Popover from "./Popover";

interface CustomTimePickerProps {
    selected: Date | null;
    onChange: (date: Date | null) => void;
    placeholder?: string;
    error?: string;
    label?: string;
}

export default function CustomTimePicker({
    selected,
    onChange,
    placeholder = "Select time",
    error,
    label,
}: CustomTimePickerProps) {
    const [isOpen, setIsOpen] = React.useState(false);

    // Generate time slots (every 15 mins)
    const times = React.useMemo(() => {
        const slots = [];
        for (let i = 0; i < 24; i++) {
            for (let j = 0; j < 60; j += 15) {
                const hour = i.toString().padStart(2, "0");
                const minute = j.toString().padStart(2, "0");
                slots.push(`${hour}:${minute}`);
            }
        }
        return slots;
    }, []);

    const handleSelect = (timeStr: string) => {
        const [hours, minutes] = timeStr.split(":").map(Number);
        const newDate = new Date();
        newDate.setHours(hours);
        newDate.setMinutes(minutes);
        newDate.setSeconds(0);
        newDate.setMilliseconds(0);
        onChange(newDate);
        setIsOpen(false);
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });
    };

    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium mb-1 text-slate-300">
                    {label}
                </label>
            )}
            <Popover
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                trigger={
                    <button
                        type="button"
                        onClick={() => setIsOpen(true)}
                        className={cn(
                            "w-full p-4 rounded-xl border bg-white/5 text-left flex items-center justify-between transition-all hover:bg-white/10",
                            error ? "border-red-400" : "border-slate-600",
                            !selected && "text-slate-500"
                        )}
                    >
                        <span className={cn("text-lg", selected ? "text-slate-200" : "text-slate-500")}>
                            {selected ? formatTime(selected) : placeholder}
                        </span>
                        <Clock className="w-5 h-5 text-slate-400" />
                    </button>
                }
                content={
                    <div className="h-64 w-full overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                        <div className="grid grid-cols-1 gap-1">
                            {times.map((time) => {
                                const [h, m] = time.split(":").map(Number);
                                const d = new Date();
                                d.setHours(h, m);
                                const label = formatTime(d);
                                const isSelected =
                                    selected?.getHours() === h && selected?.getMinutes() === m;

                                return (
                                    <button
                                        key={time}
                                        onClick={() => handleSelect(time)}
                                        className={cn(
                                            "w-full text-left px-3 py-2 text-sm rounded-md transition-colors",
                                            isSelected
                                                ? "bg-amber-500 text-slate-900 font-medium"
                                                : "text-slate-300 hover:bg-slate-800 hover:text-white"
                                        )}
                                    >
                                        {label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                }
            />
            {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
        </div>
    );
}
