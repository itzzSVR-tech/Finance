import React from "react"
import { NavLink } from "react-router-dom"
import { LayoutDashboard, CreditCard, Settings as SettingsIcon, Users, PieChart } from "lucide-react"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export { cn }

import { useFinanceStore } from "./store/useFinanceStore"

export const Sidebar = () => {
    return (
        <div className="w-64 bg-bg-elevated border-r border-border-dark flex flex-col p-6 gap-8 shrink-0 h-screen sticky top-0">
            <div className="flex items-center gap-2">
                <div className="text-brand font-mono font-bold tracking-[4px] text-xl">
                    FINANCE
                </div>
            </div>

            <nav className="flex flex-col gap-2">
                <SidebarItem to="/" icon={LayoutDashboard} label="Dashboard" />
                <SidebarItem to="/transactions" icon={CreditCard} label="Transactions" />
                <SidebarItem to="/insights" icon={PieChart} label="Insights" />
                <SidebarItem to="/settings" icon={SettingsIcon} label="Settings" />
            </nav>

            <div className="mt-auto p-4 glass rounded-xl flex flex-col gap-3">
                <div className="text-xs text-text-muted uppercase tracking-wider font-semibold">
                    Pro Plan
                </div>
                <div className="text-sm text-text-secondary leading-relaxed">
                    Unlock advanced analytics and PDF exports.
                </div>
                <button className="bg-brand text-white text-xs font-bold py-2.5 rounded-lg hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-brand/20">
                    Upgrade Now
                </button>
            </div>
        </div>
    )
}

const SidebarItem = ({ to, icon: Icon, label }: { to: string, icon: any, label: string }) => (
    <NavLink
        to={to}
        className={({ isActive }) => cn(
            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer group",
            isActive 
                ? "bg-brand-muted text-brand border border-brand/20 shadow-[0_0_15px_-5px_rgba(255,92,0,0.3)]" 
                : "text-text-muted hover:text-text-secondary hover:bg-bg-hover"
        )}
    >
        <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
        <span className="font-semibold text-sm tracking-wide">{label}</span>
    </NavLink>
)

export const Header = ({ title = "Overview" }: { title?: string }) => {
    const { role, setRole, theme } = useFinanceStore()
    
    React.useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
    }, [theme])

    return (
        <header className="flex justify-between items-center mb-8 px-2">
            <h1 className="font-serif text-4xl text-text-primary capitalize">{title}</h1>

            <div className="flex items-center gap-4">
                <div className="flex bg-bg-elevated p-1 rounded-xl border border-border-dark shadow-inner">
                    <button
                        onClick={() => setRole("Admin")}
                        className={cn(
                            "px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                            role === "Admin"
                                ? "bg-brand text-white shadow-lg"
                                : "text-text-muted hover:text-text-secondary"
                        )}
                    >
                        Admin
                    </button>
                    <button
                        onClick={() => setRole("Viewer")}
                        className={cn(
                            "px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                            role === "Viewer"
                                ? "bg-brand text-white shadow-lg"
                                : "text-text-muted hover:text-text-secondary"
                        )}
                    >
                        Viewer
                    </button>
                </div>

                <div className="w-10 h-10 rounded-xl bg-brand-muted border border-brand/20 flex items-center justify-center shadow-lg shadow-brand/10">
                    <Users className="w-5 h-5 text-brand" />
                </div>
            </div>
        </header>
    )
}
