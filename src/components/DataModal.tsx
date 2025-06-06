import React from "react";

export default function DataModal<T>({ isOpen, onClose, children, data }: { isOpen: boolean, onClose: () => void, children: React.ReactNode, data: T }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
            <div className="bg-white rounded-lg shadow-lg p-6 z-10">
                {children}
            </div>
        </div>
    );
}