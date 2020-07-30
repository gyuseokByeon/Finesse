import React, { Component } from 'react';
import financialStatementService from '../../utils/financialStatementService';
import Table from 'react-bootstrap/Table';

const earnedIncomeOptions = ['Job', 'Self-Employment', 'Other'];

export default class EarnedIncome extends Component {
    state = {
        totalEarnedIncome: [],
        newEarnedIncome: {
            type: 'Job',
            amount: '',
            //Add category
            category: 'Earned'
        },
        formInvalid: true,
    }
    formRef = React.createRef(); //object that provides access to a DOM element - validate form before creating newEarnedIncome

    //instance of component is created & inserted into DOM during COMMIT phase
    async componentDidMount() {
        try {
            console.log('App: componentDidMount')
            let data = await financialStatementService.show()
                .then(data => {
                    // data.user.userFinances.filter(elem => (elem.category === 'Earned'))
                    this.setState({ totalEarnedIncome: data.user.userFinances.filter(elem => (elem.category === 'Earned')) })
                })
            console.log(data)
        } catch (err) {
            console.error(err);
        }
    }

    componentDidUpdate() {
        console.log('App: componentDidUpdate')
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        if (!this.formRef.current.checkValidity()) return;
        try {
            //await financialStatementService.create({ type: this.state.newEarnedIncome.earnedIncomeType, amount: this.state.newEarnedIncome.amountEarned })
            await financialStatementService.create({
                type: this.state.newEarnedIncome.type,
                amount: this.state.newEarnedIncome.amount,
                //Add category
                category: this.state.newEarnedIncome.category
            })
                .then(
                    this.setState(state => ({
                        totalEarnedIncome: [...state.totalEarnedIncome, state.newEarnedIncome],
                        //add newEarnedIncome onto pre-existing totalEarnedIncome array

                        //newEarnedIncome: { earnedIncomeType: 'Job', amountEarned: '' },
                        newEarnedIncome: {
                            type: 'Job',
                            amount: '',
                            //Add category
                            category: 'Earned'
                        },
                        formInvalid: true,
                        //reset the inputs 
                    }))
                )
        } catch (err) {
            console.error(err);
        }
    }

    //triggers after every change to input value/character typed
    handleChange = e => {
        const newEarnedIncome = { ...this.state.newEarnedIncome, [e.target.name]: e.target.value }
        console.log(newEarnedIncome);
        this.setState({ newEarnedIncome: newEarnedIncome, formInvalid: !this.formRef.current.checkValidity() });
    }

    handleUpdate = async (e) => {
        try {
            const updateIncome = {
                id: e.target.value,
                // amount: this.state.totalEarnedIncome.amount, //undefined
                // type: this.state.totalEarnedIncome.type //undefined
                amount: this.state.newEarnedIncome.amount, //" "
                type: this.state.newEarnedIncome.type, //"Job"
            }
            //console.log(updateIncome)
            await financialStatementService.update(updateIncome)
                //.then(data => console.log(data)) //user object
                .then((data) => this.setState({ totalEarnedIncome: data.userFinances })) //state = data

            //.then(data => console.log(data))
        } catch (err) {
            console.error(err);
        }
    }

    handleDelete = async (e) => {
        // const deleteIncome = {
        //     id: e.target.value,
        //     amount: e.target.name
        // };
        // console.log(deleteIncome)
        try {
            await financialStatementService.deleteOne({ id: e.target.value, amount: e.target.name })
                .then(this.setState({ totalEarnedIncome: this.state.totalEarnedIncome }))
        } catch (err) {
            console.error(err);
        }
    }

    render() {
        console.log('App: render');
        return (
            <section>
                <h5>
                    <span>Earned</span>
                    <span>$</span>
                </h5>
                {this.state.totalEarnedIncome.map(ei => (
                    //<div key={ei.amountEarned}>
                    <div key={ei.amount}>
                        <Table striped bordered hover size="sm">
                            <tbody>
                                <tr>
                                    <td>{ei.type}</td>
                                    <td>{ei.amount}</td>
                                    <td>
                                        <button
                                            name={ei.amount}
                                            value={ei._id}
                                            onClick={this.handleUpdate}>U
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            name={ei.amount}
                                            value={ei._id}
                                            onClick={this.handleDelete}>X
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                ))}
                <form ref={this.formRef} onSubmit={this.handleSubmit}>
                    <label>
                        <select
                            //name="earnedIncomeType"
                            name="type"
                            //value={this.state.newEarnedIncome.earnedIncomeType}
                            value={this.state.newEarnedIncome.type}
                            onChange={this.handleChange}
                        >
                            {earnedIncomeOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        <input
                            // name="amountEarned"
                            // value={this.state.newEarnedIncome.amountEarned}
                            name="amount"
                            value={this.state.newEarnedIncome.amount}
                            onChange={this.handleChange}
                            required
                            pattern="[1-9]\d{0,}\.?\d{0,2}"
                            autocomplete="off"
                            placeholder="Salary/Commission"
                        />
                    </label>

                    {/* Add hidden input for category */}
                    <label>
                        <input
                            type="hidden"
                            name="category"
                            value={this.state.newEarnedIncome.category}
                            onChange={this.handleChange}
                        />
                    </label>

                    <button
                        className="form-submission"
                        onClick={this.handleSubmit}
                        disabled={this.state.formInvalid}
                    >+</button>
                </form>
            </section >
        )
    }
}
