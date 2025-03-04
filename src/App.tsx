import React, {Suspense} from "react";
import {Wallet} from "./components/Wallet";
import {QueryClientProvider} from "@tanstack/react-query";
import {QueryClient} from "@tanstack/react-query";
import {AlertTriangle, CheckSquare} from "lucide-react";
import {Toaster} from "./components/ui/sonner";
import TabNav from "./components/TabNav";

import HomePage from "./routes/_index";
import ConfigPage from "./routes/config";
import CreatePage from "./routes/create";
import SettingsPage from "./routes/settings";
import TransactionsPage from "./routes/transactions";
import {Routes, Route, BrowserRouter} from "react-router-dom";

import "./styles/global.css"; // ✅ Load Tailwind styles

const App = () => {
    const queryClient = new QueryClient();

    // @ts-ignore
    return (
        <QueryClientProvider client={queryClient}>
            <Wallet>
            <BrowserRouter>
            <div className="flex flex-col md:flex-row h-screen min-w-full bg-white">
                <TabNav/>

                    <div className="md:w-9/12 md:ml-auto space-y-2 p-3 pt-4 mt-1 md:space-y-4 md:p-8 md:pt-6 pb-24">
                        <Suspense>
                            <Suspense fallback={<p>Loading...</p>}>
                                <Routes>
                                    <Route index path="/" element={<HomePage />} />
                                    <Route path="/config" element={<ConfigPage />} />
                                    <Route path="/create" element={<CreatePage />} />
                                    <Route path="/settings" element={<SettingsPage />} />
                                    <Route path="/transactions" element={<TransactionsPage />} />
                                    <Route path="*" element={<p>404 - Not Found</p>} /> {/* Catch-all route */}
                                </Routes>
                            </Suspense>
                        </Suspense>
                    </div>

            </div>

            {/*<Toaster*/}
            {/*    expand*/}
            {/*    visibleToasts={3}*/}
            {/*    icons={{*/}
            {/*        error: <AlertTriangle className="w-4 h-4 text-red-600"/>,*/}
            {/*        success: <CheckSquare className="w-4 h-4 text-green-600"/>,*/}
            {/*    }}*/}
            {/*/>*/}
            </BrowserRouter>
            </Wallet>
        </QueryClientProvider>
    );
};

export default App;
