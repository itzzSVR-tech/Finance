import { TransactionSection } from "../DashboardComponents";

export const Transactions = () => {
    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-serif text-text-primary">
                    Transaction History
                </h2>
                <p className="text-sm text-text-muted">
                    View and manage all your financial activities in one place.
                </p>
            </div>

            <TransactionSection />
        </div>
    );
};
