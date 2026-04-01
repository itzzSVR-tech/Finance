import { SummaryCards, TransactionSection } from "../DashboardComponents";
import { CardLineChart } from "../Charts";
import { TrendingUp } from "lucide-react";
import { BriefInsights } from "./Insights";

export const Dashboard = () => {
    return (
        <div className="flex flex-col gap-8">
            <SummaryCards />

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
                <div className="flex flex-col gap-8">
                    <div className="bg-bg-elevated border border-border-dark rounded-2xl p-6 h-[400px]">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">Balance Trend</h2>
                            <div className="flex items-center gap-2 bg-bg-hover p-1.5 rounded-lg border border-border-dark">
                                <TrendingUp className="w-4 h-4 text-brand" />
                                <span className="text-[10px] font-bold text-text-secondary uppercase">
                                    Live Data
                                </span>
                            </div>
                        </div>
                        <CardLineChart />
                    </div>

                    <TransactionSection />
                </div>

                <BriefInsights />
            </div>
        </div>
    );
};
