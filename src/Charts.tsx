import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";
import { useFinanceStore } from "./store/useFinanceStore";

const COLORS = ["#FF5C00", "#FF8A4C", "#FF5C0033", "#FF5C0018", "#6B6B70"];

export const CardLineChart = () => {
    const { transactions } = useFinanceStore();

    const sorted = [...transactions].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
    let currentBalance = 38000;
    const data = sorted.map((t) => {
        currentBalance += t.amount;
        return {
            date: t.date,
            balance: currentBalance,
        };
    });

    return (
        <div className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                    <defs>
                        <linearGradient
                            id="colorBalance"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                                offset="5%"
                                stopColor="#FF5C00"
                                stopOpacity={0.3}
                            />
                            <stop
                                offset="95%"
                                stopColor="#FF5C00"
                                stopOpacity={0}
                            />
                        </linearGradient>
                    </defs>
                    <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#1F1F23"
                    />
                    <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#6B6B70", fontSize: 10 }}
                        tickFormatter={(str) =>
                            new Date(str).toLocaleDateString(undefined, {
                                month: "short",
                                day: "numeric",
                            })
                        }
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#6B6B70", fontSize: 10 }}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "#141417",
                            border: "1px solid #2A2A2E",
                            borderRadius: "8px",
                            fontSize: "12px",
                        }}
                        itemStyle={{ color: "#FF5C00" }}
                    />
                    <Area
                        type="monotone"
                        dataKey="balance"
                        stroke="#FF5C00"
                        fillOpacity={1}
                        fill="url(#colorBalance)"
                        strokeWidth={2}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export const CategoryChart = () => {
    const { transactions } = useFinanceStore();

    const categories = transactions.reduce((acc: any, t) => {
        if (t.type === "expense") {
            acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
        }
        return acc;
    }, {});

    const data = Object.keys(categories).map((name) => ({
        name,
        value: categories[name],
    }));

    return (
        <div className="h-full w-full flex flex-col">
            <div className="flex-1 min-h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((_entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#141417",
                                border: "1px solid #2A2A2E",
                                borderRadius: "8px",
                                fontSize: "10px",
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4">
                {data.slice(0, 4).map((entry, index) => (
                    <div key={entry.name} className="flex items-center gap-2">
                        <div
                            className="w-2 h-2 rounded-full"
                            style={{
                                backgroundColor: COLORS[index % COLORS.length],
                            }}
                        ></div>
                        <span className="text-[10px] text-text-secondary uppercase font-bold tracking-wider">
                            {entry.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};
