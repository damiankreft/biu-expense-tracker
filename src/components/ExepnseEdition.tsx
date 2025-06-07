import { Expense, categories } from "@/app/types/Expense";
import React, { useState } from "react";

export default function ExpenseEdition({
    expense,
    onSaveEdit,
}: {
    expense: Expense | null;
    onSaveEdit: (expense: Expense) => void;
}) {
    if (expense === null) return null;

    const [title, setTitle] = useState(expense.title);
    const [amount, setAmount] = useState(expense.amount.toString());
    const [category, setCategory] = useState(expense.category.toLowerCase() as (typeof categories)[number]);
    const [date, setDate] = useState(expense.date);
    const [description, setDescription] = useState(expense.description);

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if (!title || title.length < 3) newErrors.title = "Title must be at least 3 characters";
        if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) newErrors.amount = "Amount must be a positive number";
        if (
            !category ||
            !categories.includes(category as (typeof categories)[number])
        )
            newErrors.category = "Invalid category";
        if (!date) newErrors.date = "Date is required";
        if (description.length > 500) newErrors.description = "Must be 500 characters or less";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        onSaveEdit({
            id: expense.id,
            title,
            amount: Number(amount),
            category,
            date,
            description,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label htmlFor="title" className="text-sm font-medium">Title</label>
            <input
                type="text"
                placeholder="Title"
                id="title"
                value={title}
                onChange={e => {
                    setTitle(e.target.value);
                    validate();
                }}
                className="border rounded px-3 py-2"
            />
            {errors.title && <div className="text-red-500 text-sm">{errors.title}</div>}

            <label htmlFor="amount" className="text-sm font-medium">Amount</label>
            <input
                type="number"
                placeholder="Amount"
                id="amount"
                value={amount}
                onChange={e => {
                    setAmount(e.target.value);
                    validate();
                } }
                className="border rounded px-3 py-2"
            />
            {errors.amount && <div className="text-red-500 text-sm">{errors.amount}</div>}

            <label htmlFor="category" className="text-sm font-medium">Category</label>
            <select
                name="category"
                id="category"
                className="border rounded px-3 py-2"
                value={category}
                onChange={e => {
                    setCategory(category as (typeof categories)[number]);
                    validate();
                }}
            >
                {categories.map(c => (
                    <option key={c} value={c}>
                        {c.slice(0, 1).toUpperCase() + c.slice(1)}
                    </option>
                ))}
            </select>
            {errors.category && <div className="text-red-500 text-sm">{errors.category}</div>}

            <label htmlFor="date" className="text-sm font-medium">Date</label>
            <input
                type="date"
                placeholder="Date"
                id="date"
                value={date}
                onChange={e => {
                    setDate(e.target.value);
                    validate();
                }}
                className="border rounded px-3 py-2"
            />
            {errors.date && <div className="text-red-500 text-sm">{errors.date}</div>}

            <label htmlFor="description" className="text-sm font-medium">Description</label>
            <input
                type="text"
                placeholder="Description"
                id="description"
                value={description}
                onChange={e => {
                    setDescription(e.target.value);
                    validate();
                }}
                className="border rounded px-3 py-2"
            />
            {errors.description && <div className="text-red-500 text-sm">{errors.description}</div>}

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save changes</button>
        </form>
    );
}