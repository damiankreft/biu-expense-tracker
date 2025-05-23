import React, { MouseEventHandler } from "react";
import { Expense } from "../app/types/Expense";

export default function ExpenseDetails({expense, close}: { expense: Expense, close?: MouseEventHandler }) {
    return (
        <div className="p-4">
            <h2 className="text-xl font-bold">{expense.title}</h2>
            <p><strong>ID:</strong> {expense.id}</p>
            <p><strong>Amount:</strong> ${expense.amount}</p>
            <p><strong>Category:</strong> {expense.category}</p>
            <p><strong>Date:</strong> {new Date(expense.date).toLocaleDateString()}</p>
            <p><strong>Description:</strong> {expense.description}</p>
            <p>
                <button onClick={close} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
                    Close
                </button>
            </p>
        </div>
    );
}
