import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { App } from "./App"
import { Start } from "./Start";

export const RouterConfig: React.VFC = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Start />} />
                    <Route path="app" element={<App />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}