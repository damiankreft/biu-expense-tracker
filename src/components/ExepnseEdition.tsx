import { Expense } from "@/app/types/Expense";
import React from "react";

export default function ExpenseEdition({ expense, onSaveEdit }: { expense: Expense | null, onSaveEdit: (expense: Expense) => void }) {
    if (expense === null) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 z-10">
                <h2 className="text-xl font-bold mb-4">Edit Expense</h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Title</label>
                        <input type="text" id="title" defaultValue={expense.title} className="border rounded px-3 py-2 w-full" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Amount</label>
                        <input type="number" id="amount" defaultValue={expense.amount} className="border rounded px-3 py-2 w-full" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Category</label>
                        <input type="text" id="category" defaultValue={expense.category} className="border rounded px-3 py-2 w-full" />
                    </div>
                    <button onClick={(e) => {
                        e.preventDefault();
                        const title = (e.target as HTMLButtonElement).form?.elements.namedItem("title") as HTMLInputElement;
                        const amount = (e.target as HTMLButtonElement).form?.elements.namedItem("amount") as HTMLInputElement;
                        const category = (e.target as HTMLButtonElement).form?.elements.namedItem("category") as HTMLInputElement;

                        onSaveEdit({
                            ...expense,
                            title: title.value,
                            amount: parseFloat(amount.value),
                            category: category.value
                        });
                    }} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
                </form>
            </div>
        </div>
    );
}