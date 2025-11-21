"use client";

import * as React from "react";
import { MapPin, Loader2, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import Popover from "./Popover";

interface LocationPickerProps {
    value?: string;
    onChange: (value: string) => void;
    placeholder?: string;
    error?: string;
    label?: string;
}

interface LocationResult {
    id: number;
    name: string;
    admin1?: string; // State/Province
    country?: string;
}

export default function LocationPicker({
    value,
    onChange,
    placeholder = "Search city...",
    error,
    label,
}: LocationPickerProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [query, setQuery] = React.useState("");
    const [results, setResults] = React.useState<LocationResult[]>([]);
    const [loading, setLoading] = React.useState(false);

    // Debounce search
    React.useEffect(() => {
        const timer = setTimeout(() => {
            if (query.length >= 2) {
                searchLocations(query);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [query]);

    const searchLocations = async (searchQuery: string) => {
        setLoading(true);
        try {
            const response = await fetch(
                `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
                    searchQuery
                )}&count=10&language=en&format=json`
            );
            const data = await response.json();
            if (data.results) {
                setResults(data.results);
            } else {
                setResults([]);
            }
        } catch (err) {
            console.error("Location search failed:", err);
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSelect = (loc: LocationResult) => {
        const parts = [loc.name, loc.admin1, loc.country].filter(Boolean);
        const locationString = parts.join(", ");
        onChange(locationString);
        setQuery(""); // Reset query but keep value in parent
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
                            !value && "text-slate-500"
                        )}
                    >
                        <span className={cn("text-lg truncate mr-2", value ? "text-slate-200" : "text-slate-500")}>
                            {value || placeholder}
                        </span>
                        <MapPin className="w-5 h-5 text-slate-400 flex-shrink-0" />
                    </button>
                }
                content={
                    <div className="w-72 sm:w-80 bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-2xl">
                        <div className="p-2 border-b border-slate-700">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    autoFocus
                                    type="text"
                                    className="w-full bg-slate-800 text-slate-200 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4a574]/50 placeholder:text-slate-500"
                                    placeholder="Type to search..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="max-h-60 overflow-y-auto p-1 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                            {loading ? (
                                <div className="p-4 flex justify-center text-slate-400">
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                </div>
                            ) : results.length > 0 ? (
                                <div className="space-y-1">
                                    {results.map((loc) => (
                                        <button
                                            key={loc.id}
                                            onClick={() => handleSelect(loc)}
                                            className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors group"
                                        >
                                            <div className="text-slate-200 font-medium text-sm group-hover:text-white">
                                                {loc.name}
                                            </div>
                                            <div className="text-xs text-slate-500 group-hover:text-slate-400">
                                                {[loc.admin1, loc.country].filter(Boolean).join(", ")}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            ) : query.length >= 2 ? (
                                <div className="p-4 text-center text-sm text-slate-500">
                                    No locations found.
                                </div>
                            ) : (
                                <div className="p-4 text-center text-sm text-slate-500">
                                    Start typing to find a city...
                                </div>
                            )}
                        </div>
                    </div>
                }
            />
            {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
        </div>
    );
}
