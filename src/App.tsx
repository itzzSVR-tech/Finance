import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
} from "react-router-dom";
import { Sidebar, Header } from "./Layout";
import { Dashboard } from "./pages/Dashboard";
import { Transactions } from "./pages/Transactions";
import { Insights } from "./pages/Insights";
import { Settings } from "./pages/Settings";
import { useFinanceStore, type TransactionType } from "./store/useFinanceStore";
import { Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AddTransactionModal = ({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) => {
    const addTransaction = useFinanceStore((state) => state.addTransaction);
    const [formData, setFormData] = React.useState({
        description: "",
        amount: "",
        category: "Shopping",
        type: "expense" as TransactionType,
        date: new Date().toISOString().split("T")[0],
    });

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addTransaction({
            description: formData.description,
            amount:
                formData.type === "expense"
                    ? -Math.abs(Number(formData.amount))
                    : Math.abs(Number(formData.amount)),
            category: formData.category,
            type: formData.type,
            date: formData.date,
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className="relative bg-bg-elevated border border-border-elevated w-full max-w-md rounded-2xl shadow-2xl p-8"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-text-muted hover:text-white transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <h2 className="text-2xl font-serif text-text-primary mb-6">
                    Add Transaction
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-text-muted uppercase tracking-wider">
                            Description
                        </label>
                        <input
                            required
                            className="bg-bg-hover border border-border-dark rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand/50 transition-all font-medium"
                            placeholder="e.g. Amazon Purchase"
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    description: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-text-muted uppercase tracking-wider">
                                Amount
                            </label>
                            <input
                                required
                                type="number"
                                className="bg-bg-hover border border-border-dark rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand/50 transition-all font-mono"
                                placeholder="0.00"
                                value={formData.amount}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        amount: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-text-muted uppercase tracking-wider">
                                Type
                            </label>
                            <select
                                className="bg-bg-hover border border-border-dark rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand/50 transition-all font-medium"
                                value={formData.type}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        type: e.target.value as TransactionType,
                                    })
                                }
                            >
                                <option value="expense">Expense</option>
                                <option value="income">Income</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-text-muted uppercase tracking-wider">
                            Category
                        </label>
                        <select
                            className="bg-bg-hover border border-border-dark rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand/50 transition-all font-medium"
                            value={formData.category}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    category: e.target.value,
                                })
                            }
                        >
                            {[
                                "Shopping",
                                "Electronics",
                                "Food",
                                "Bill",
                                "Income",
                                "Transport",
                                "Healthcare",
                            ].map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="bg-brand text-white font-bold py-3 rounded-xl mt-4 hover:brightness-110 shadow-lg shadow-brand/40 transition-all active:scale-[0.98]"
                    >
                        Create Transaction
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

const AppContent = () => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const { role } = useFinanceStore();
    const location = useLocation();

    // Determine page title based on path
    const getPageTitle = (path: string) => {
        switch (path) {
            case "/":
                return "Overview";
            case "/transactions":
                return "Transactions";
            case "/insights":
                return "Insights";
            case "/settings":
                return "Settings";
            default:
                return "Finance";
        }
    };

    return (
        <div className="flex min-h-screen bg-bg-deep text-text-primary font-sans selection:bg-brand/30">
            <Sidebar />
            <main className="flex-1 overflow-y-auto p-10 relative">
                <div className="max-w-7xl mx-auto">
                    <Header title={getPageTitle(location.pathname)} />

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={location.pathname}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Routes>
                                <Route path="/" element={<Dashboard />} />
                                <Route
                                    path="/transactions"
                                    element={<Transactions />}
                                />
                                <Route
                                    path="/insights"
                                    element={<Insights />}
                                />
                                <Route
                                    path="/settings"
                                    element={<Settings />}
                                />
                            </Routes>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Floating Add Button for Admin */}
                {role === "Admin" && location.pathname !== "/settings" && (
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="fixed bottom-10 right-10 w-16 h-16 bg-brand rounded-full flex items-center justify-center shadow-2xl shadow-brand/40 border-4 border-bg-deep hover:scale-110 active:scale-95 transition-all z-40 group"
                    >
                        <Plus className="w-8 h-8 text-white group-hover:rotate-90 transition-transform duration-300 shadow-xl" />
                    </button>
                )}

                <AnimatePresence>
                    {isModalOpen && (
                        <AddTransactionModal
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                        />
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
};

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;
