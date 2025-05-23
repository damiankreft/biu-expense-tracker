import React, { MouseEventHandler } from "react";
import { Expense } from "../app/types/Expense";

type ExpenseItemProps = {
    expense: Expense;
    click?: MouseEventHandler<HTMLTableRowElement>;
    children?: React.ReactNode;
};

export default function ExpenseItem({ expense, click: rowClick, children }: ExpenseItemProps) {
    return (
        <tr onClick={rowClick} className="hover:bg-gray-100 cursor-pointer transition-colors duration-150">
            <td className="p-2">{expense.title}</td>
            <td className="text-center p-2">${expense.amount}</td>
            <td className="p-2">{expense.category}</td>
            <td className="text-center p-2">{new Date(expense.date).toLocaleDateString()}</td>
            {
                children
            }
        </tr>
    );
}