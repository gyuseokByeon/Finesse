import React from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const commodityOptions = ['Metals', 'Energy', 'Livestock & Meat', 'Agriculture', 'Cryptocurrency', 'Other'];

export default function Commodities(props) {
    return (
        <>
            <h5>
                <span>Commodities</span>
                <span className="right">${props.totalCommodities.map(elem => elem.amount).reduce(function (acc, num) {
                    return acc + num;
                }, 0)}</span>
            </h5>
            {props.totalCommodities.map(c => (
                <div key={c.amount}>
                    <Table borderless hover size="sm">
                        <tbody>
                            <tr>
                                <td className="left">{c.type}</td>
                                <td className="right">{c.amount}</td>
                                {/* <td><button value="Update">U</button></td>
                                    <td><button value="Delete">X</button></td> */}
                            </tr>
                        </tbody>
                    </Table>
                </div>
            ))}
            <Form ref={props.commodityFormRef} onSubmit={props.handleCommoditySubmit}>
                <Form.Row>
                    <Form.Group>
                        <select
                            name="type"
                            value={props.newCommodity.type}
                            onChange={props.handleCommodityChange}
                            className="select"
                        >
                            {commodityOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            name="amount"
                            value={props.newCommodity.amount}
                            onChange={props.handleCommodityChange}
                            required
                            pattern="[1-9]\d{0,}\.?\d{0,2}"
                            placeholder="Purchase Price"
                            autocomplete="off"
                            size="sm"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="hidden"
                            name="category"
                            value={props.newCommodity.category}
                            onChange={props.handleCommodityChange}
                        />
                        <Button
                            className="form-submission"
                            onClick={props.handleCommoditySubmit}
                            disabled={props.commodityFormInvalid}
                            size="sm"
                        >ADD</Button>
                    </Form.Group>
                </Form.Row>
            </Form>
        </>
    )
}