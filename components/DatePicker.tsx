"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "./Calendar";
import Popover from "./Popover";

interface CustomDatePickerProps {
    selected: Date | null;
    onChange: (date: Date | null) => void;
    placeholder?: string;
    error?: string;
    label?: string;
}

export default function CustomDatePicker({
    selected,
    onChange,
    error,
    label,
}: CustomDatePickerProps) {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleSelect = (date: Date | undefined) => {
        onChange(date || null);
        setIsOpen(false);
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
                            {selected ? format(selected, "PPP") : "Pick a date"}
                        </span>
                        <CalendarIcon className="w-5 h-5 text-slate-400" />
                    </button>
                }
                content={
                    <Calendar
                        mode="single"
                        selected={selected || undefined}
                        onSelect={handleSelect}
                        initialFocus
                    />
                }
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
}
