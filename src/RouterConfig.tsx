import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { App } from "./App"
import { Start } from "./Start";
import { Result } from "./result";

export const RouterConfig: React.VFC = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Start />} />
                    <Route path="app" element={<App />} />
                    <Route path="result" element={<Result />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}