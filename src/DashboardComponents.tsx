import {
    Search,
    Plus,
    ArrowUpRight,
    TrendingUp,
    TrendingDown,
    Trash2,
} from "lucide-react";
import { useFinanceStore } from "./store/useFinanceStore";
import { cn } from "./Layout";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

export const SummaryCards = () => {
    const { transactions } = useFinanceStore();

    const balance = transactions.reduce((acc, t) => acc + t.amount, 0);
    const income = transactions
        .filter((t) => t.type === "income")
        .reduce((acc, t) => acc + t.amount, 0);
    const expenses = transactions
        .filter((t) => t.type === "expense")
        .reduce((acc, t) => acc + t.amount, 0);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard
                label="Total Balance"
                value={balance}
                trend="+2.4%"
                positive
            />
            <StatCard label="Monthly Income" value={income} />
            <StatCard
                label="Monthly Expenses"
                value={Math.abs(expenses)}
                color="text-red-400"
            />
        </div>
    );
};

const StatCard = ({
    label,
    value,
    trend,
    positive,
    color,
}: {
    label: string;
    value: number;
    trend?: string;
    positive?: boolean;
    color?: string;
}) => (
    <div className="bg-bg-elevated p-6 rounded-2xl border border-border-dark flex flex-col gap-4 group hover:border-brand/40 transition-all duration-300">
        <div className="text-text-muted text-xs font-semibold uppercase tracking-wider">
            {label}
        </div>
        <div
            className={cn(
                "text-3xl font-mono tracking-tighter font-medium",
                color || "text-text-primary",
            )}
        >
            $
            {value.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            })}
        </div>
        {trend && (
            <div className="flex items-center gap-1.5 mt-1">
                <div
                    className={cn(
                        "p-0.5 rounded-full",
                        positive ? "bg-green-500/10" : "bg-red-500/10",
                    )}
                >
                    {positive ? (
                        <TrendingUp className="w-3.5 h-3.5 text-green-500" />
                    ) : (
                        <TrendingDown className="w-3.5 h-3.5 text-red-500" />
                    )}
                </div>
                <span
                    className={cn(
                        "text-xs font-bold",
                        positive ? "text-green-500" : "text-red-500",
                    )}
                >
                    {trend} from last month
                </span>
            </div>
        )}
    </div>
);

export const TransactionSection = () => {
    const { transactions, role, deleteTransaction } = useFinanceStore();
    const [filter, setFilter] = React.useState("all");
    const [search, setSearch] = React.useState("");

    const filtered = transactions.filter((t) => {
        const matchesSearch =
            t.description.toLowerCase().includes(search.toLowerCase()) ||
            t.category.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === "all" || t.type === filter;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="bg-bg-elevated border border-border-dark rounded-2xl overflow-hidden p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Recent Transactions</h2>
                <div className="flex items-center gap-3">
                    <div className="relative group">
                        <Search className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-brand transition-colors" />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="bg-bg-hover border border-border-dark text-sm rounded-xl pl-9 pr-4 py-2 w-48 focus:outline-none focus:border-brand/50 transition-all"
                        />
                    </div>
                    <div className="flex bg-bg-hover rounded-xl p-1 border border-border-dark">
                        {["all", "income", "expense"].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={cn(
                                    "px-3 py-1 rounded-lg text-xs font-bold capitalize transition-all",
                                    filter === f
                                        ? "bg-bg-elevated text-brand border border-border-elevated"
                                        : "text-text-muted",
                                )}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                    {role === "Admin" && (
                        <button className="bg-brand text-white p-2 rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-brand/20">
                            <Plus className="w-5 h-5" />
                        </button>
                    )}
                </div>
            </div>

            <div className="w-full">
                <div className="grid grid-cols-[1fr_150px_120px_120px_auto] px-4 py-3 text-xs font-bold text-text-muted uppercase tracking-wider border-b border-border-dark mb-2">
                    <span>Transaction</span>
                    <span>Category</span>
                    <span>Date</span>
                    <span className="text-right">Amount</span>
                    <span className="w-10"></span>
                </div>
                <div className="flex flex-col gap-1">
                    <AnimatePresence mode="popLayout">
                        {filtered.map((t) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                key={t.id}
                                className="grid grid-cols-[1fr_150px_120px_120px_auto] px-4 py-3 items-center rounded-xl hover:bg-bg-hover transition-all group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-bg-elevated border border-border-dark flex items-center justify-center text-brand">
                                        {t.type === "income" ? (
                                            <ArrowUpRight className="w-5 h-5" />
                                        ) : (
                                            <TrendingDown className="w-5 h-5" />
                                        )}
                                    </div>
                                    <span className="font-semibold text-sm">
                                        {t.description}
                                    </span>
                                </div>
                                <span className="text-xs text-text-secondary">
                                    {t.category}
                                </span>
                                <span className="text-xs text-text-muted">
                                    {new Date(t.date).toLocaleDateString()}
                                </span>
                                <span
                                    className={cn(
                                        "text-sm font-mono font-bold text-right",
                                        t.type === "income"
                                            ? "text-green-500"
                                            : "text-text-primary",
                                    )}
                                >
                                    {t.type === "income" ? "+" : "-"}$
                                    {Math.abs(t.amount).toLocaleString()}
                                </span>
                                <div className="flex justify-end w-10">
                                    {role === "Admin" && (
                                        <button
                                            onClick={() =>
                                                deleteTransaction(t.id)
                                            }
                                            className="opacity-0 group-hover:opacity-100 p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {filtered.length === 0 && (
                        <div className="py-20 text-center text-text-muted text-sm italic">
                            No transactions found matching your criteria.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
