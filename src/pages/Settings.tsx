import {
    User,
    Shield,
    Bell,
    Moon,
    Sun,
    Monitor,
    Check,
    Mail,
} from "lucide-react";
import { useFinanceStore } from "../store/useFinanceStore";
import { cn } from "../Layout";

export const Settings = () => {
    const { theme, setTheme, role, setRole } = useFinanceStore();

    return (
        <div className="flex flex-col gap-8 max-w-4xl">
            <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-serif text-text-primary">
                    Settings
                </h2>
                <p className="text-sm text-text-muted">
                    Manage your account preferences and application settings.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1 flex flex-col gap-6">
                    <div className="bg-bg-elevated p-8 rounded-3xl border border-border-dark flex flex-col items-center text-center gap-4">
                        <div className="w-24 h-24 rounded-full bg-brand-muted border-4 border-bg-deep flex items-center justify-center relative overflow-hidden group">
                            <User className="w-12 h-12 text-brand group-hover:scale-110 transition-all duration-500" />
                            <div className="absolute inset-0 bg-brand/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                                <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                                    Edit
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <h3 className="text-lg font-bold text-text-primary">
                                Alex Jenkins
                            </h3>
                            <div className="flex items-center gap-1.5 justify-center text-xs text-text-muted">
                                <Mail className="w-3 h-3" />
                                alex.j@example.com
                            </div>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-brand-muted text-brand rounded-full border border-brand/20">
                            <Shield className="w-3 h-3" />
                            <span className="text-[10px] font-black uppercase tracking-widest">
                                {role}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-2 flex flex-col gap-6">
                    <div className="bg-bg-elevated p-8 rounded-3xl border border-border-dark flex flex-col gap-8">
                        <section className="flex flex-col gap-6">
                            <h4 className="text-sm font-bold text-text-secondary uppercase tracking-widest flex items-center gap-2">
                                <Monitor className="w-4 h-4 text-brand" />
                                Appearance
                            </h4>
                            <div className="grid grid-cols-2 gap-4">
                                <ThemeOption
                                    active={theme === "light"}
                                    onClick={() => setTheme("light")}
                                    icon={Sun}
                                    label="Light"
                                    desc="Clean and bright"
                                />
                                <ThemeOption
                                    active={theme === "dark"}
                                    onClick={() => setTheme("dark")}
                                    icon={Moon}
                                    label="Dark"
                                    desc="Elegant and focused"
                                />
                            </div>
                        </section>

                        <div className="h-px bg-border-dark"></div>

                        <section className="flex flex-col gap-6">
                            <h4 className="text-sm font-bold text-text-secondary uppercase tracking-widest flex items-center gap-2">
                                <Shield className="w-4 h-4 text-brand" />
                                Role Management
                            </h4>
                            <div className="flex items-center justify-between p-4 bg-bg-hover rounded-2xl border border-border-elevated">
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-bold">
                                        Account Privilege
                                    </span>
                                    <span className="text-xs text-text-muted">
                                        Currently acting as an {role}.
                                    </span>
                                </div>
                                <button
                                    onClick={() =>
                                        setRole(
                                            role === "Admin"
                                                ? "Viewer"
                                                : "Admin",
                                        )
                                    }
                                    className="px-4 py-2 bg-bg-elevated border border-border-dark text-xs font-bold rounded-xl hover:border-brand/40 transition-all text-text-primary"
                                >
                                    Switch to{" "}
                                    {role === "Admin" ? "Viewer" : "Admin"}
                                </button>
                            </div>
                        </section>

                        <div className="h-px bg-border-dark"></div>

                        <section className="flex flex-col gap-6">
                            <h4 className="text-sm font-bold text-text-secondary uppercase tracking-widest flex items-center gap-2">
                                <Bell className="w-4 h-4 text-brand" />
                                Notifications
                            </h4>
                            <div className="flex flex-col gap-3">
                                <ToggleItem
                                    label="Insight Reports"
                                    desc="Receive daily automated financial summaries."
                                    defaultChecked
                                />
                                <ToggleItem
                                    label="Balance Alerts"
                                    desc="Get notified when balance falls below $500."
                                />
                                <ToggleItem
                                    label="Security Alerts"
                                    desc="Unusual login or transaction notifications."
                                    defaultChecked
                                />
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ThemeOption = ({
    active,
    icon: Icon,
    label,
    desc,
    onClick,
}: {
    active: boolean;
    icon: any;
    label: string;
    desc: string;
    onClick: () => void;
}) => (
    <div
        onClick={onClick}
        className={cn(
            "flex flex-col gap-4 p-5 rounded-2xl border-2 transition-all cursor-pointer group",
            active
                ? "bg-brand-muted border-brand shadow-[0_0_20px_-5px_rgba(255,92,0,0.3)]"
                : "bg-bg-hover border-transparent hover:border-border-dark",
        )}
    >
        <div
            className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                active
                    ? "bg-brand text-white shadow-lg"
                    : "bg-bg-elevated text-text-muted group-hover:text-text-primary",
            )}
        >
            <Icon className="w-5 h-5" />
        </div>
        <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
                <span
                    className={cn(
                        "text-sm font-bold",
                        active ? "text-text-primary" : "text-text-secondary",
                    )}
                >
                    {label}
                </span>
                {active && <Check className="w-3 h-3 text-brand" />}
            </div>
            <span className="text-[10px] text-text-muted">{desc}</span>
        </div>
    </div>
);

const ToggleItem = ({
    label,
    desc,
    defaultChecked = false,
}: {
    label: string;
    desc: string;
    defaultChecked?: boolean;
}) => {
    const [checked, setChecked] = React.useState(defaultChecked);
    return (
        <div className="flex items-center justify-between group">
            <div className="flex flex-col">
                <span className="text-xs font-bold text-text-primary group-hover:text-brand transition-colors">
                    {label}
                </span>
                <span className="text-[10px] text-text-muted leading-relaxed">
                    {desc}
                </span>
            </div>
            <button
                onClick={() => setChecked(!checked)}
                className={cn(
                    "w-10 h-5 rounded-full relative transition-all duration-300 border",
                    checked
                        ? "bg-brand border-brand"
                        : "bg-bg-hover border-border-dark",
                )}
            >
                <div
                    className={cn(
                        "absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white transition-all duration-300",
                        checked ? "left-[calc(100%-1.1rem)]" : "left-1",
                    )}
                ></div>
            </button>
        </div>
    );
};

import React from "react";
