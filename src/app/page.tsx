"use client";
import expenseData from "../../data/expenses.json";
import ExpenseList from "../components/ExpenseList";
import { useEffect, useState } from "react";
import { Expense } from "./types/Expense";
import Modal from "../components/Modal";
import ExpenseEdition from "@/components/ExepnseEdition";
import ExpenseAddition from "@/components/ExpenseAddition";

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  useEffect(() => {
    setExpenses(expenseData);
  }, []);

  const handleDelete = async (id: string) => {
    setExpenses((prev) => prev.filter((expense) => expense.id.toString() !== id));
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => {
          setIsAddModalOpen(true);
        }}>Add new expense</button>
        <ExpenseList expenses={expenses} onDelete={(x) => {
          handleDelete(x);
        }} onEditClick={(e) => {
          setSelectedExpense(e);
          setIsEditModalOpen(true)}
          } />
          <Modal isOpen={isEditModalOpen} onClose={() => {setIsEditModalOpen(false);}}>
            <ExpenseEdition expense={selectedExpense!} onSaveEdit={(expense) => {
              console.log(expense);
              var newExpenses = expenses.map((exp) => {
                return exp.id === expense.id ? { ...exp, ...expense } : exp;
              });
              console.log(newExpenses);
              setExpenses(newExpenses);
              setIsEditModalOpen(false);
              setSelectedExpense(null);
            }} />
          </Modal>

          <Modal isOpen={isAddModalOpen} onClose={() => {setIsAddModalOpen(false);}}>
            <ExpenseAddition onAdd={(expense) => {
              setExpenses([...expenses, expense]);
              setIsAddModalOpen(false);
            }} />
          </Modal>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <p>s23447</p>
      </footer>
    </div>
  );
}
