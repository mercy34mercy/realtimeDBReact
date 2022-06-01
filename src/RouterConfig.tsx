import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Card } from "./Card"
import { Start } from "./Start";
import { Result } from "./result";
import { QrCodeReader } from "./QrCodeReader";

export const RouterConfig: React.VFC = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Start />} />
                    <Route path="app" element={<Card />} />
                    <Route path="result" element={<Result />} />
                    <Route path="qrcodereader" element={<QrCodeReader />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}