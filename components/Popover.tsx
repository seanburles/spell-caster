"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

interface PopoverProps {
    trigger: React.ReactNode;
    content: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
    className?: string;
}

export default function Popover({
    trigger,
    content,
    isOpen,
    onClose,
    className,
}: PopoverProps) {
    const popoverRef = React.useRef<HTMLDivElement>(null);
    const triggerRef = React.useRef<HTMLDivElement>(null);
    const [position, setPosition] = React.useState<{ top: number; left: number; width: number; placement: string } | null>(null);
    const [isPositioned, setIsPositioned] = React.useState(false);

    const updatePosition = React.useCallback(() => {
        if (triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            const isBottomHalf = rect.bottom > window.innerHeight / 2;

            if (isBottomHalf) {
                setPosition({
                    top: rect.top + window.scrollY - 8, // 8px gap above
                    left: rect.left + window.scrollX,
                    width: rect.width,
                    placement: "top",
                });
            } else {
                setPosition({
                    top: rect.bottom + window.scrollY + 8, // 8px gap below
                    left: rect.left + window.scrollX,
                    width: rect.width,
                    placement: "bottom",
                });
            }
            setIsPositioned(true);
        }
    }, []);

    React.useEffect(() => {
        if (isOpen) {
            setIsPositioned(false);
            // Use requestAnimationFrame to ensure DOM is ready
            requestAnimationFrame(() => {
                updatePosition();
            });
            window.addEventListener("resize", updatePosition);
            window.addEventListener("scroll", updatePosition, true);
        } else {
            setIsPositioned(false);
            setPosition(null);
        }
        return () => {
            window.removeEventListener("resize", updatePosition);
            window.removeEventListener("scroll", updatePosition, true);
        };
    }, [isOpen, updatePosition]);

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                popoverRef.current &&
                !popoverRef.current.contains(event.target as Node) &&
                triggerRef.current &&
                !triggerRef.current.contains(event.target as Node)
            ) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]);

    return (
        <>
            <div ref={triggerRef} onClick={(e) => e.stopPropagation()}>
                {trigger}
            </div>
            {isOpen &&
                typeof document !== "undefined" &&
                position &&
                createPortal(
                    <div
                        ref={popoverRef}
                        className={cn(
                            "absolute z-[9999] p-1 rounded-xl border border-slate-700 bg-slate-900 shadow-2xl text-slate-100",
                            isPositioned ? "animate-in fade-in zoom-in-95 duration-200" : "opacity-0",
                            position.placement === "top" ? "-translate-y-full slide-in-from-bottom-2" : "slide-in-from-top-2",
                            className
                        )}
                        style={{
                            top: position.top,
                            left: position.left,
                            minWidth: position.width,
                        }}
                    >
                        {content}
                    </div>,
                    document.body
                )}
        </>
    );
}
