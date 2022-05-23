import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { App } from "./App"

export const RouterConfig: React.VFC = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route index element={<App />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}