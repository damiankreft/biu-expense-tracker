import React from "react";
import { Expense } from "@/app/types/Expense";
import { v7 } from "uuid";

type ExpenseAdditionProps = {
    onAdd: (expense: Expense) => void;
};

export default function ExpenseAddition({ onAdd }: ExpenseAdditionProps) {
    const [title, setTitle] = React.useState("");
    const [amount, setAmount] = React.useState<number | string>("");
    const [category, setCategory] = React.useState("");
    const [date, setDate] = React.useState("");
    const [description, setDescription] = React.useState("");

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (title && amount && category) {
            let item = { id: v7(), title, amount, category, date, description } as Expense;
            onAdd(item as Expense);
            setTitle("");
            setAmount("");
            setCategory("");
            setDate("");
            setDescription("");
        }
    };

    return (
        <form onSubmit={handleAdd} className="flex flex-col gap-4">
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border rounded px-3 py-2"
            />
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border rounded px-3 py-2"
            />
            <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border rounded px-3 py-2"
            />
            <input
                type="date"
                placeholder="Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border rounded px-3 py-2"
            />
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border rounded px-3 py-2"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Expense</button>
        </form>
    );
}