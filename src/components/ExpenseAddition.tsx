import React from "react";
import { Expense, categories } from "@/app/types/Expense";
import { v7 } from "uuid";
import { useFormik } from 'formik';
import * as Yup from 'yup';

type ExpenseAdditionProps = {
    onAdd: (expense: Expense) => void;
};

export default function ExpenseAddition({ onAdd }: ExpenseAdditionProps) {
    const formik = useFormik({
        initialValues: {
            title: '',
            amount: '',
            category: '',
            date: '',
            description: '',
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .min(3)
                .required('Required'),
            amount: Yup.number()
                .positive('Amount must be positive')
                .required('Required'),
            category: Yup.string()
                .oneOf(categories, 'Invalid category')
                .required('Required'),
            date: Yup.date().required('Required'),
            description: Yup.string()
                .max(500, 'Must be 500 characters or less'),
        }),
        onSubmit: values => {
            let amount = Number(values.amount);
            let item = { id: v7(), ...values, amount } as Expense;
            onAdd(item);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
            <label htmlFor="title" className="text-sm font-medium">Title</label>
            <input
                type="text"
                placeholder="Title"
                id="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                className="border rounded px-3 py-2"
            />
            {formik.errors.title && <div className="text-red-500 text-sm">{formik.errors.title}</div>}
            <label htmlFor="amount" className="text-sm font-medium">Amount</label>
            <input
                type="number"
                placeholder="Amount"
                id="amount"
                value={formik.values.amount}
                onChange={formik.handleChange}
                className="border rounded px-3 py-2"
            />
            {formik.errors.amount && <div className="text-red-500 text-sm">{formik.errors.amount}</div>}
            <label htmlFor="category" className="text-sm font-medium">Category</label>
            <select 
                name="category"
                id="category"
                className="border rounded px-3 py-2"
                value={formik.values.category}
                onChange={formik.handleChange}>
                <option value="">-- select a category --</option>
                {categories.map(c => (
                <option key={c} value={c}>
                    {c.slice(0, 1).toUpperCase() + c.slice(1)}
                </option>
                ))}
            </select>
            {formik.errors.category && <div className="text-red-500 text-sm">{formik.errors.category}</div>}
            <label htmlFor="date" className="text-sm font-medium">Date</label>
            <input
                type="date"
                placeholder="Date"
                id="date"
                value={formik.values.date}
                onChange={formik.handleChange}
                className="border rounded px-3 py-2"
            />
            {formik.errors.date && <div className="text-red-500 text-sm">{formik.errors.date}</div>}
            <label htmlFor="description" className="text-sm font-medium">Description</label>
            <input
                type="text"
                placeholder="Description"
                id="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                className="border rounded px-3 py-2"
            />
            {formik.errors.description && <div className="text-red-500 text-sm">{formik.errors.description}</div>}
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
        </form>
    );
}