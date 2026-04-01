import { TrendingUp, Check, ArrowRight, Zap, Target } from "lucide-react";
import { CategoryChart } from "../Charts";

export const Insights = () => {
    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-serif text-text-primary">
                    Financial Insights
                </h2>
                <p className="text-sm text-text-muted">
                    Smart analytics and AI-powered recommendations for your
                    financial growth.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-bg-elevated p-6 rounded-2xl border border-border-dark flex flex-col gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand">
                        <Zap className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold text-text-primary">
                        AI Advisor
                    </h3>
                    <p className="text-xs text-text-secondary leading-relaxed">
                        Your spending in{" "}
                        <span className="text-brand font-bold">
                            Electronics
                        </span>{" "}
                        is up 14%. You can save up to{" "}
                        <span className="text-brand font-bold">$120</span> by
                        delaying non-essential purchases.
                    </p>
                    <button className="flex items-center gap-2 text-[10px] uppercase font-black text-brand hover:gap-3 transition-all">
                        View Plan <ArrowRight className="w-3 h-3" />
                    </button>
                </div>

                <div className="bg-bg-elevated p-6 rounded-2xl border border-border-dark flex flex-col gap-4">
                    <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-500">
                        <Target className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold text-text-primary">
                        Savings Goal
                    </h3>
                    <div className="flex flex-col gap-2 mt-1">
                        <div className="flex justify-between text-[10px] text-text-muted font-bold">
                            <span>Holiday Fund</span>
                            <span>$3,200 / $5,000</span>
                        </div>
                        <div className="h-2 bg-bg-hover rounded-full overflow-hidden">
                            <div className="h-full bg-brand w-[64%] shadow-[0_0_10px_rgba(255,92,0,0.5)]"></div>
                        </div>
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed">
                        You're on track to reach your goal by December!
                    </p>
                </div>

                <div className="bg-bg-elevated p-6 rounded-2xl border border-border-dark flex flex-col gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-muted border border-brand/20 flex items-center justify-center text-brand">
                        <TrendingUp className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold text-text-primary">
                        Cashflow Health
                    </h3>
                    <div className="flex items-end gap-2">
                        <span className="text-2xl font-mono text-text-primary">
                            Good
                        </span>
                        <span className="text-xs text-green-500 font-bold mb-1">
                            +5% vs last month
                        </span>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-bg-hover rounded-xl border border-border-elevated mt-auto">
                        <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                        <div className="text-[10px] text-text-muted">
                            No overdraft warnings in the last 6 months.
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-bg-elevated p-8 rounded-2xl border border-border-dark flex flex-col gap-6">
                    <h3 className="text-lg font-bold">Category Distribution</h3>
                    <div className="h-[300px]">
                        <CategoryChart />
                    </div>
                </div>

                <div className="bg-bg-elevated p-8 rounded-2xl border border-border-dark flex flex-col gap-6">
                    <h3 className="text-lg font-bold">Recommendations</h3>
                    <div className="flex flex-col gap-4">
                        <RecItem
                            icon={ArrowRight}
                            title="Consolidate Subscriptions"
                            desc="We found 3 overlapping monthly bills for streaming services."
                        />
                        <RecItem
                            icon={ArrowRight}
                            title="Automate Savings"
                            desc="Setting up a recurring $50 transfer to 'Holiday Fund' would hit your goal faster."
                        />
                        <RecItem
                            icon={ArrowRight}
                            title="Debt Reduction"
                            desc="Consider paying off your highest interest credit card with your bonus."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export const BriefInsights = () => {
    return (
        <div className="flex flex-col gap-6">
            <div className="bg-bg-elevated p-6 rounded-2xl border border-border-dark flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
                        <Zap className="w-4 h-4 text-brand" />
                        AI Insights
                    </h3>
                    <div className="px-2 py-1 bg-brand/10 text-brand text-[10px] font-bold rounded-lg uppercase tracking-wider">Beta</div>
                </div>
                <div className="text-sm text-text-secondary leading-relaxed">
                    Based on your activity, your spending in <span className="text-brand font-bold">Electronics</span> is up <span className="text-brand font-bold">14%</span> since last month.
                </div>
                <div className="flex items-start gap-3 p-3 bg-bg-hover rounded-xl border border-border-elevated">
                    <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <div className="text-xs text-text-muted">You saved $420 more than last month. Great job!</div>
                </div>
            </div>

            <div className="bg-bg-elevated p-6 rounded-2xl border border-border-dark flex flex-col gap-6">
                <h3 className="text-sm font-bold text-text-primary">Spending Breakdown</h3>
                <div className="h-[250px]">
                    <CategoryChart />
                </div>
            </div>
        </div>
    )
}

const RecItem = ({
    icon: Icon,
    title,
    desc,
}: {
    icon: any;
    title: string;
    desc: string;
}) => (
    <div className="flex gap-4 p-4 rounded-xl hover:bg-bg-hover cursor-pointer transition-all border border-transparent hover:border-border-dark group">
        <div className="w-10 h-10 rounded-lg bg-bg-hover flex items-center justify-center border border-border-dark transition-all group-hover:border-brand/40 group-hover:bg-brand-muted">
            <Icon className="w-5 h-5 text-text-muted group-hover:text-brand" />
        </div>
        <div className="flex flex-col gap-1">
            <h4 className="text-sm font-bold text-text-primary">{title}</h4>
            <p className="text-xs text-text-secondary leading-relaxed">
                {desc}
            </p>
        </div>
    </div>
);
