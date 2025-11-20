"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import "react-day-picker/dist/style.css";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
    className,
    classNames,
    showOutsideDays = true,
    ...props
}: CalendarProps) {
    return (
        <DayPicker
            showOutsideDays={showOutsideDays}
            className={cn("p-3", className)}
            captionLayout="dropdown"
            fromYear={1900}
            toYear={new Date().getFullYear()}
            classNames={{
                months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                month: "space-y-4",
                caption: "flex justify-center pt-1 relative items-center",
                caption_label: "hidden",
                caption_dropdowns: "flex justify-center gap-1",
                dropdown: "bg-slate-900 border border-slate-700 rounded-md p-1 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500",
                dropdown_month: "mr-2",
                dropdown_year: "ml-2",
                nav: "space-x-1 flex items-center",
                nav_button: cn(
                    "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 transition-opacity text-slate-300 hover:text-white"
                ),
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                table: "w-full border-collapse space-y-1",
                head_row: "flex",
                head_cell:
                    "text-slate-500 rounded-md w-9 font-normal text-[0.8rem]",
                row: "flex w-full mt-2",
                cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-slate-800/50 [&:has([aria-selected])]:bg-slate-800 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                day: cn(
                    "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-slate-800 rounded-full transition-colors text-slate-300"
                ),
                day_range_end: "day-range-end",
                day_selected:
                    "bg-amber-500 text-slate-900 hover:bg-amber-500 hover:text-slate-900 focus:bg-amber-500 focus:text-slate-900 font-bold",
                day_today: "bg-slate-800 text-slate-100",
                day_outside:
                    "day-outside text-slate-600 opacity-50 aria-selected:bg-slate-800/50 aria-selected:text-slate-500 aria-selected:opacity-30",
                day_disabled: "text-slate-600 opacity-50",
                day_range_middle:
                    "aria-selected:bg-slate-800 aria-selected:text-slate-100",
                day_hidden: "invisible",
                ...classNames,
            }}
            components={{
                IconLeft: () => <ChevronLeft className="h-4 w-4" />,
                IconRight: () => <ChevronRight className="h-4 w-4" />,
            }}
            {...props}
        />
    );
}
Calendar.displayName = "Calendar";

export { Calendar };
