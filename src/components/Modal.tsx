import React, { MouseEventHandler } from "react";

export default function Modal({ isOpen, onClose, children }: { isOpen: boolean, onClose: MouseEventHandler, children: any })  {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50" onClickCapture={onClose}></div>
            <div className="bg-white rounded-lg shadow-lg p-6 z-10">
                {children}
            </div>
        </div>
    );

}