import React from 'react';
import PayYourselfFirst from '../PayYourselfFirst/PayYourselfFirst';

export default function Expenses(props) {
    const expenseOptions = ['Housing', 'Transportation', 'Kids', 'Entertainment'];
    return (
        <div>
            Expenses
            <PayYourselfFirst />
            <table>
                <thead>
                    <tr>
                        <th>$</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <select>
                                {expenseOptions.map((option, index) => (
                                    <option>{option}</option>)
                                )}

                                {/*Give the user the ability to add an expense */}
                            </select>
                        </td>
                        <td>$<input type="number" min="0" /><button>+</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}