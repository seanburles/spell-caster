import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function SuccessPage({ params }: { params: { orderId: string } }) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>

                <h1 className="text-3xl font-serif font-medium mb-4">Ritual Initiated</h1>
                <p className="text-slate-600 dark:text-slate-400 mb-8">
                    Thank you! Your payment was successful. We are now crafting your personalized ritual.
                    <br /><br />
                    Order ID: <span className="font-mono text-sm">{params.orderId}</span>
                </p>

                <p className="text-sm text-slate-500 mb-8">
                    You will receive an email with your PDF shortly.
                </p>

                <Link
                    href="/"
                    className="inline-block px-8 py-3 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-full font-medium hover:opacity-90 transition-opacity"
                >
                    Return Home
                </Link>
            </div>
        </div>
    );
}
