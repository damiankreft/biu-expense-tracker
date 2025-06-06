import React from "react";
import { Expense } from "../app/types/Expense";
import ExpenseItem from "./ExpenseItem";
import { useState, useEffect } from "react";
import Modal from "./Modal";
import ExpenseDetails from "./ExpenseDetails";
import { BiEdit, BiSolidTrash } from "react-icons/bi";

export default function ExpenseList({ expenses, onDelete, onEditClick: onEdit }: { expenses: Expense[], onDelete: (id: string) => void, onEditClick: (expense: Expense) => void }) {
    const [sortedExpenses, setSortedExpenses] = useState<Expense[]>([]);
    const [sortOrder, setSortOrderAmount] = useState<"asc" | "desc">("asc");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
    const [filterDate, setFilterDate] = useState<string | null>(null);
    const [filterCategory, setFilterCategory] = useState<string | null>(null);

    const categories = Array.from(new Set(expenses.map(e => e.category)));
    const [showDateFilter, setShowDateFilter] = useState(false);
    const [showCategoryFilter, setShowCategoryFilter] = useState(false);

    useEffect(() => {
        let filtered = [...expenses];
        if (filterDate) {
            filtered = filtered.filter(e => e.date === filterDate);
        }
        if (filterCategory) {
            filtered = filtered.filter(e => e.category === filterCategory);
        }
        const sorted = filtered.sort((a, b) => {
            if (sortOrder === "asc") {
                return a.amount - b.amount;
            } else {
                return b.amount - a.amount;
            }
        });
        setSortedExpenses(sorted);
    }, [expenses, sortOrder, filterDate, filterCategory]);


    const handleAmountSort = () => {
        setSortOrderAmount(prevOrder => (prevOrder === "asc" ? "desc" : "asc"));
    };

    return (
        <>
            <table className="table-auto">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th onClick={handleAmountSort} className="hover:cursor-pointer p-4">Amount</th>
                        <th onClick={() => setShowCategoryFilter(v => !v)} className="hover:cursor-pointer p-4">Category
                            {showCategoryFilter && (
                                <div onClick={(e) => e.stopPropagation()} className="absolute bg-white border rounded shadow p-2 mt-2 z-10">
                                    <select
                                        value={filterCategory ?? ""}
                                        onChange={e => {
                                            setFilterCategory(e.target.value || null);
                                            setShowCategoryFilter(false);
                                        }}
                                        className="border rounded px-2 py-1"
                                    >
                                        <option value="">All</option>
                                        {categories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                    <button
                                        className="ml-2 text-xs text-gray-500"
                                        onClick={e => {
                                            e.stopPropagation();
                                            setFilterCategory(null);
                                            setShowCategoryFilter(false);
                                        }}
                                    >
                                        ✕
                                    </button>
                                </div>
                            )}
                        </th>
                        <th onClick={() => setShowDateFilter(v => !v)} className="hover:cursor-pointer p-4">Date
                            {showDateFilter && (
                                <div onClick={e => e.stopPropagation()} className="absolute bg-white border rounded shadow p-2 mt-2 z-10">
                                    <input
                                        type="date"
                                        value={filterDate ?? ""}
                                        onChange={e => {
                                            setFilterDate(e.target.value || null);
                                            setShowDateFilter(false);
                                        }}
                                        className="border rounded px-2 py-1"
                                    />
                                    <button
                                        className="ml-2 text-xs text-gray-500"
                                        onClick={e => {
                                            e.stopPropagation();
                                            setFilterDate(null);
                                            setShowDateFilter(false);
                                        }}
                                    >
                                        ✕
                                    </button>
                                </div>
                            )}
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {sortedExpenses.map(expense => (
                        <ExpenseItem
                            key={expense.id}
                            expense={expense}
                            click={() => {
                                setIsModalOpen(true);
                                setSelectedExpense(expense);
                            }}
                            children={
                                <td className="text-center p-2">
                                    <button onClick={(e) => {
                                        e.stopPropagation();
                                        onDelete(expense.id.toString());
                                    }} className="bg-red-500 text-white px-2 py-1 ml-2 rounded"><BiSolidTrash /></button>
                                    <button onClick={(e) => {
                                        e.stopPropagation();
                                        onEdit(expense);
                                    }} className="bg-yellow-500 text-white px-2 py-1 ml-2 rounded"><BiEdit /></button>
                                </td>
                            }
                        />
                    ))}
                </tbody>
            </table>
            {selectedExpense && (
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <ExpenseDetails expense={selectedExpense} close={(e) => setIsModalOpen(false)} />
                </Modal>
            )}
        </>
    );
}