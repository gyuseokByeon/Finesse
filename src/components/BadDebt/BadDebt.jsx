import React from 'react';
import Table from 'react-bootstrap/Table';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Button from 'react-bootstrap/Button';

const badDebtOptions = ['Home Mortgage', 'Car Loans', 'Credit Cards', 'School Loans', 'Other'];

const popover = (
    <Popover id="popover-basic">
        <Popover.Title as="h3">Bad Debt</Popover.Title>
        <Popover.Content>Debt that is used to buy liabilities</Popover.Content>
    </Popover>
);

const BadDebtPopover = () => (
    <OverlayTrigger trigger="click" placement="right" overlay={popover}>
        <Button variant="success" size="sm">&#8505;</Button>
    </OverlayTrigger>
);

export default function BadDebt(props) {
    return (
        <>
            <h5>
                <span>Bad Debt <BadDebtPopover /></span>
                <span className="right">${props.totalBadDebt.map(elem => elem.amount).reduce(function (acc, num) {
                    return acc + num;
                }, 0)}</span>
            </h5>
            {props.totalBadDebt.map(bd => (
                <div key={bd.amount}>
                    <Table hover size="sm">
                        <tbody>
                            <tr>
                                <td>{bd.type}</td>
                                <td className="right">{bd.amount}</td>
                                {/* <td><button value="Update">U</button></td>
                                    <td><button value="Delete">X</button></td> */}
                            </tr>
                        </tbody>
                    </Table>
                </div>
            ))}
            <form ref={props.badDebtFormRef} onSubmit={props.handleBadDebtSubmit}>
                <label>
                    <select
                        name="type"
                        value={props.newBadDebt.type}
                        onChange={props.handleBadDebtChange}
                    >
                        {badDebtOptions.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </label>
                <label>
                    <input
                        name="amount"
                        value={props.newBadDebt.amount}
                        onChange={props.handleBadDebtChange}
                        required
                        pattern="[1-9]\d{0,}\.?\d{0,2}"
                        placeholder="Debt Value"
                        autocomplete="off"
                    />
                </label>
                <label>
                    <input
                        type="hidden"
                        name="category"
                        value={props.newBadDebt.category}
                        onChange={props.handleBadDebtChange}
                    />
                </label>
                <button
                    className="form-submission"
                    onClick={props.handleBadDebtSubmit}
                    disabled={props.badDebtFormInvalid}
                >ADD</button>
            </form>
        </>
    )
}
