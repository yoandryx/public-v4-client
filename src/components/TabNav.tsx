import {ArrowDownUp, LucideHome, Settings, Users} from "lucide-react";
import ConnectWallet from "@/components/ConnectWalletButton";
import {Link} from "react-router-dom";

export default function TabNav() {
    const path = window.location.pathname;

    const tabs = [
        {name: "Home", icon: <LucideHome/>, route: "/"},
        {name: "Transactions", icon: <ArrowDownUp/>, route: "/transactions/"},
        {name: "Configuration", icon: <Users/>, route: "/config/"},
        {name: "Settings", icon: <Settings/>, route: "/settings/"},
    ];

    return (<>
            <aside
                id="sidebar"
                className="hidden md:block md:left-0 md:top-0 md:w-3/12 lg:w-3/12 z-40 h-auto md:h-screen md:fixed"
                aria-label="Sidebar"
            >
                <div
                    className="flex h-auto md:h-full flex-col overflow-y-auto justify-between md:border-r border-slate-200 px-3 py-4 bg-slate-200">
                    <div>
                        <Link to="/">
                            <div
                                className="mb-10 flex items-center rounded-lg px-3 py-2 text-slate-900 dark:text-white">
                                <img src="/logo.png" width="150" height="auto"/>
                            </div>
                        </Link>
                        <ul className="space-y-2 text-sm font-medium">
                            {tabs.map((tab) => (
                                <li key={tab.route}>
                                    <Link
                                        to={tab.route}
                                        className={`flex items-center rounded-lg px-4 py-3 text-slate-900 
                              ${
                                            (path!.startsWith(`${tab.route}/`) && tab.route !== "/") ||
                                            tab.route === path
                                                ? "bg-slate-400"
                                                : "hover:bg-slate-400"
                                        }`}
                                    >
                                        {tab.icon}
                                        <span className="ml-3 flex-1 whitespace-nowrap text-base text-black">
                              {tab.name}
                            </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <ConnectWallet/>
                </div>
            </aside>

            <aside
                id="mobile-navbar"
                className="block md:hidden inset-x-0 bottom-0 z-50 bg-slate-20 p-2 fixed bg-slate-300"
                aria-label="Mobile navbar"
            >
                <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium mt-1">
                    {tabs.map((tab) => (
                        <Link to={tab.route} key={tab.route}>
                            <button
                                type="button"
                                className="inline-flex flex-col items-center justify-center px-5 hover:bg-slate-400 rounded-md py-2 group"
                            >
                                {tab.icon}
                                <span
                                    className="flex-1 whitespace-nowrap text-sm text-slate-900">{tab.name}</span>
                            </button>
                        </Link>
                    ))}
                </div>
            </aside>
        </>
    );
};