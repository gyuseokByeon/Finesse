import React, { Component } from "react";
import financialStatementService from "../utils/financialStatementService";

const IncomeExpenseContext = React.createContext();
export const IncomeExpenseConsumer = IncomeExpenseContext.Consumer;

export class IncomeExpenseProvider extends Component {
	state = {
		totalIncome: [],
		totalExpensesAndSelfFirst: [],

		totalEarnedIncome: [],
		newEarnedIncome: {
			type: "Job",
			amount: "",
			category: "Earned",
			class: "Income",
		},
		updatedEarnedIncome: {},
		earnedFormInvalid: true,

		totalPortfolioIncome: [],
		newPortfolioIncome: {
			type: "Stock",
			amount: "",
			category: "Portfolio",
			class: "Income",
		},
		updatedPortfolioIncome: {},
		portfolioFormInvalid: true,

		totalPassiveIncome: [],
		newPassiveIncome: {
			type: "Real Estate",
			amount: "",
			category: "Passive",
			class: "Income",
		},
		passiveFormInvalid: true,

		totalExpenses: [],
		newExpense: {
			type: "Taxes",
			amount: "",
			category: "Expense",
			class: "Expense",
		},
		expenseFormInvalid: true,

		totalPayYourselfFirst: [],
		newPayYourselfFirst: {
			// type: 'Self',
			amount: "",
			category: "Self",
			class: "Self",
		},
		selfFirstFormInvalid: true,
	};
	earnedFormRef = React.createRef();
	portfolioFormRef = React.createRef();
	passiveFormRef = React.createRef();
	expenseFormRef = React.createRef();
	selfFirstFormRef = React.createRef();

	handleFetchData = async () => {
		try {
			await financialStatementService.show().then((data) => {
				this.setState({
					totalEarnedIncome: data.user.userFinances.filter(
						(elem) => elem.category === "Earned"
					),
					totalPortfolioIncome: data.user.userFinances.filter(
						(elem) => elem.category === "Portfolio"
					),
					totalPassiveIncome: data.user.userFinances.filter(
						(elem) => elem.category === "Passive"
					),

					totalExpenses: data.user.userFinances.filter(
						(elem) => elem.category === "Expense"
					),
					totalPayYourselfFirst: data.user.userFinances.filter(
						(elem) => elem.category === "Self"
					),

					totalIncome: data.user.userFinances.filter(
						(elem) =>
							elem.category === "Earned" ||
							elem.category === "Portfolio" ||
							elem.category === "Passive"
					),
					totalExpensesAndSelfFirst: data.user.userFinances.filter(
						(elem) => elem.category === "Expense" || elem.category === "Self"
					),
				});
			});
		} catch (err) {
			console.error(err);
		}
	};

	handleGetCurrentEarnedIncome = (id) => {
		const currentEarnedIncome = this.state.totalEarnedIncome.find(
			({ _id }) => _id === id
		);
		this.setState({ updatedEarnedIncome: currentEarnedIncome });
	};

	handleGetCurrentPortfolioIncome = (id) => {
		const currentPortfolioIncome = this.state.totalPortfolioIncome.find(
			({ _id }) => _id === id
		);
		this.setState({ updatedPortfolioIncome: currentPortfolioIncome });
	};

	//Earned Income Methods
	handleEarnedIncomeSubmit = async (e) => {
		e.preventDefault();
		if (!this.earnedFormRef.current.checkValidity()) return;
		try {
			await financialStatementService
				.create({
					type: this.state.newEarnedIncome.type,
					amount: this.state.newEarnedIncome.amount,
					category: this.state.newEarnedIncome.category,
					class: this.state.newEarnedIncome.class,
				})
				.then((data) => {
					this.setState({
						totalEarnedIncome: data.user.userFinances.filter(
							(elem) => elem.category === "Earned"
						),
						totalIncome: data.user.userFinances.filter(
							(elem) =>
								elem.category === "Earned" ||
								elem.category === "Portfolio" ||
								elem.category === "Passive"
						),
						newEarnedIncome: {
							type: "Job",
							amount: "",
							category: "Earned",
							class: "Income",
						},
						earnedFormInvalid: true,
					});
				});
		} catch (err) {
			console.error(err);
		}
	};

	handleEarnedIncomeChange = (e) => {
		const newEarnedIncome = {
			...this.state.newEarnedIncome,
			[e.target.name]: e.target.value,
		};
		this.setState({
			newEarnedIncome: newEarnedIncome,
			earnedFormInvalid: !this.earnedFormRef.current.checkValidity(),
		});
	};

	handleEarnedIncomeUpdateChange = (e) => {
		const updatedEarnedIncome = {
			...this.state.updatedEarnedIncome,
			[e.target.name]: e.target.value,
		};
		this.setState({
			updatedEarnedIncome: updatedEarnedIncome,
		});
	};

	handleEarnedIncomeDelete = async (e) => {
		try {
			await financialStatementService
				.deleteOne({ id: e.target.value })
				.then((data) => {
					this.setState({
						totalEarnedIncome: data.user.userFinances.filter(
							(elem) => elem.category === "Earned"
						),
						totalIncome: data.user.userFinances.filter(
							(elem) =>
								elem.category === "Earned" ||
								elem.category === "Portfolio" ||
								elem.category === "Passive"
						),
					});
				});
		} catch (err) {
			console.error(err);
		}
	};

	handleEarnedIncomeUpdateSubmit = async (e) => {
		// e.preventDefault();
		try {
			await financialStatementService
				.update({
					id: e.target.value,
					type: this.state.updatedEarnedIncome.type,
					amount: this.state.updatedEarnedIncome.amount,
				})
				.then((data) => {
					this.setState({
						totalEarnedIncome: data.user.userFinances.filter(
							(elem) => elem.category === "Earned"
						),
						totalIncome: data.user.userFinances.filter(
							(elem) =>
								elem.category === "Earned" ||
								elem.category === "Portfolio" ||
								elem.category === "Passive"
						),
						updatedEarnedIncome: {},
					});
				});
		} catch (err) {
			console.error(err);
		}
	};

	//Portfolio Income Methods
	handlePortfolioIncomeSubmit = async (e) => {
		e.preventDefault();
		if (!this.portfolioFormRef.current.checkValidity()) return;
		try {
			await financialStatementService
				.create({
					type: this.state.newPortfolioIncome.type,
					amount: this.state.newPortfolioIncome.amount,
					category: this.state.newPortfolioIncome.category,
					class: this.state.newPortfolioIncome.class,
				})
				.then((data) => {
					this.setState({
						totalPortfolioIncome: data.user.userFinances.filter(
							(elem) => elem.category === "Portfolio"
						),
						totalIncome: data.user.userFinances.filter(
							(elem) =>
								elem.category === "Earned" ||
								elem.category === "Portfolio" ||
								elem.category === "Passive"
						),
						newPortfolioIncome: {
							type: "Stock",
							amount: "",
							category: "Portfolio",
							class: "Income",
						},
						portfolioFormInvalid: true,
					});
				});
		} catch (err) {
			console.error(err);
		}
	};

	handlePortfolioIncomeChange = (e) => {
		const newPortfolioIncome = {
			...this.state.newPortfolioIncome,
			[e.target.name]: e.target.value,
		};
		this.setState({
			newPortfolioIncome: newPortfolioIncome,
			portfolioFormInvalid: !this.portfolioFormRef.current.checkValidity(),
		});
	};

	handlePortfolioIncomeUpdateChange = (e) => {
		const updatedPortfolioIncome = {
			...this.state.updatedPortfolioIncome,
			[e.target.name]: e.target.value,
		};
		this.setState({
			updatedPortfolioIncome: updatedPortfolioIncome,
		});
	};

	handlePortfolioIncomeDelete = async (e) => {
		try {
			await financialStatementService
				.deleteOne({ id: e.target.value })
				.then((data) => {
					this.setState({
						totalPortfolioIncome: data.user.userFinances.filter(
							(elem) => elem.category === "Portfolio"
						),
						totalIncome: data.user.userFinances.filter(
							(elem) =>
								elem.category === "Earned" ||
								elem.category === "Portfolio" ||
								elem.category === "Passive"
						),
					});
				});
		} catch (err) {
			console.error(err);
		}
	};

	handlePortfolioIncomeUpdateSubmit = async (e) => {
		// e.preventDefault();
		try {
			await financialStatementService
				.update({
					id: e.target.value,
					type: this.state.updatedPortfolioIncome.type,
					amount: this.state.updatedPortfolioIncome.amount,
				})
				.then((data) => {
					this.setState({
						totalPortfolioIncome: data.user.userFinances.filter(
							(elem) => elem.category === "Portfolio"
						),
						totalIncome: data.user.userFinances.filter(
							(elem) =>
								elem.category === "Earned" ||
								elem.category === "Portfolio" ||
								elem.category === "Passive"
						),
						updatedPortfolioIncome: {},
					});
				});
		} catch (err) {
			console.error(err);
		}
	};

	//Passive Income Methods
	handlePassiveIncomeSubmit = async (e) => {
		e.preventDefault();
		if (!this.passiveFormRef.current.checkValidity()) return;
		try {
			await financialStatementService
				.create({
					type: this.state.newPassiveIncome.type,
					amount: this.state.newPassiveIncome.amount,
					category: this.state.newPassiveIncome.category,
					class: this.state.newPassiveIncome.class,
				})
				.then((data) => {
					this.setState({
						totalPassiveIncome: data.user.userFinances.filter(
							(elem) => elem.category === "Passive"
						),
						totalIncome: data.user.userFinances.filter(
							(elem) =>
								elem.category === "Earned" ||
								elem.category === "Portfolio" ||
								elem.category === "Passive"
						),
						newPassiveIncome: {
							type: "Real Estate",
							amount: "",
							category: "Passive",
							class: "Income",
						},
						passiveFormInvalid: true,
					});
				});
		} catch (err) {
			console.error(err);
		}
	};

	handlePassiveIncomeChange = (e) => {
		const newPassiveIncome = {
			...this.state.newPassiveIncome,
			[e.target.name]: e.target.value,
		};
		this.setState({
			newPassiveIncome: newPassiveIncome,
			passiveFormInvalid: !this.passiveFormRef.current.checkValidity(),
		});
	};

	handlePassiveIncomeDelete = async (e) => {
		try {
			await financialStatementService
				.deleteOne({ id: e.target.value })
				.then((data) => {
					this.setState({
						totalPassiveIncome: data.user.userFinances.filter(
							(elem) => elem.category === "Passive"
						),
						totalIncome: data.user.userFinances.filter(
							(elem) =>
								elem.category === "Earned" ||
								elem.category === "Portfolio" ||
								elem.category === "Passive"
						),
					});
				});
		} catch (err) {
			console.error(err);
		}
	};

	//Expense Methods
	handleExpenseSubmit = async (e) => {
		e.preventDefault();
		if (!this.expenseFormRef.current.checkValidity()) return;
		try {
			await financialStatementService
				.create({
					type: this.state.newExpense.type,
					amount: this.state.newExpense.amount,
					category: this.state.newExpense.category,
					class: this.state.newExpense.class,
				})
				.then((data) => {
					this.setState({
						totalExpenses: data.user.userFinances.filter(
							(elem) => elem.category === "Expense"
						),
						totalExpensesAndSelfFirst: data.user.userFinances.filter(
							(elem) => elem.category === "Expense" || elem.category === "Self"
						),
						newExpense: {
							type: "Taxes",
							amount: "",
							category: "Expense",
							class: "Expense",
						},
						expenseFormInvalid: true,
					});
				});
		} catch (err) {
			console.error(err);
		}
	};

	handleExpenseChange = (e) => {
		const newExpense = {
			...this.state.newExpense,
			[e.target.name]: e.target.value,
		};
		this.setState({
			newExpense: newExpense,
			expenseFormInvalid: !this.expenseFormRef.current.checkValidity(),
		});
	};

	handleExpenseDelete = async (e) => {
		try {
			await financialStatementService
				.deleteOne({ id: e.target.value })
				.then((data) => {
					this.setState({
						totalExpenses: data.user.userFinances.filter(
							(elem) => elem.category === "Expense"
						),
						totalExpensesAndSelfFirst: data.user.userFinances.filter(
							(elem) => elem.category === "Expense" || elem.category === "Self"
						),
					});
				});
		} catch (err) {
			console.error(err);
		}
	};

	//Pay Yourself First Methods
	handleSelfFirstSubmit = async (e) => {
		e.preventDefault();
		if (!this.selfFirstFormRef.current.checkValidity()) return;
		try {
			await financialStatementService
				.create({
					// type: this.state.newPayYourselfFirst.type,
					amount: this.state.newPayYourselfFirst.amount,
					category: this.state.newPayYourselfFirst.category,
					class: this.state.newPayYourselfFirst.class,
				})
				.then((data) => {
					this.setState({
						totalPayYourselfFirst: data.user.userFinances.filter(
							(elem) => elem.category === "Self"
						),
						totalExpensesAndSelfFirst: data.user.userFinances.filter(
							(elem) => elem.category === "Expense" || elem.category === "Self"
						),
						newPayYourselfFirst: {
							// type: 'Self',
							amount: "",
							category: "Self",
							class: "Self",
						},
						selfFirstFormInvalid: true,
					});
				});
		} catch (err) {
			console.error(err);
		}
	};

	handleSelfFirstChange = (e) => {
		const newPayYourselfFirst = {
			...this.state.newPayYourselfFirst,
			[e.target.name]: e.target.value,
		};
		this.setState({
			newPayYourselfFirst: newPayYourselfFirst,
			selfFirstFormInvalid: !this.selfFirstFormRef.current.checkValidity(),
		});
	};

	handleSelfFirstDelete = async (e) => {
		try {
			await financialStatementService
				.deleteOne({ id: e.target.value })
				.then((data) => {
					this.setState({
						totalPayYourselfFirst: data.user.userFinances.filter(
							(elem) => elem.category === "Self"
						),
						totalExpensesAndSelfFirst: data.user.userFinances.filter(
							(elem) => elem.category === "Expense" || elem.category === "Self"
						),
					});
				});
		} catch (err) {
			console.error(err);
		}
	};

	render() {
		const {
			totalIncome,
			totalEarnedIncome,
			newEarnedIncome,
			updatedEarnedIncome,
			earnedFormInvalid,
			totalPortfolioIncome,
			newPortfolioIncome,
			updatedPortfolioIncome,
			portfolioFormInvalid,
			totalPassiveIncome,
			newPassiveIncome,
			passiveFormInvalid,
			totalExpensesAndSelfFirst,
			totalExpenses,
			newExpense,
			expenseFormInvalid,
			totalPayYourselfFirst,
			newPayYourselfFirst,
			selfFirstFormInvalid,
		} = this.state;

		const {
			handleFetchData,

			handleEarnedIncomeSubmit,
			handleEarnedIncomeChange,
			handleEarnedIncomeUpdateChange,
			handleEarnedIncomeUpdateSubmit,
			handleGetCurrentEarnedIncome,
			handleEarnedIncomeDelete,
			earnedFormRef,

			handlePortfolioIncomeSubmit,
			handlePortfolioIncomeChange,
			handlePortfolioIncomeDelete,
			handleGetCurrentPortfolioIncome,
			handlePortfolioIncomeUpdateChange,
			handlePortfolioIncomeUpdateSubmit,
			portfolioFormRef,

			handlePassiveIncomeSubmit,
			handlePassiveIncomeChange,
			handlePassiveIncomeDelete,
			passiveFormRef,

			expenseFormRef,
			handleExpenseSubmit,
			handleExpenseChange,
			handleExpenseDelete,

			selfFirstFormRef,
			handleSelfFirstSubmit,
			handleSelfFirstChange,
			handleSelfFirstDelete,
		} = this;

		return (
			<IncomeExpenseContext.Provider
				value={{
					totalIncome,

					totalEarnedIncome,
					newEarnedIncome,
					updatedEarnedIncome,
					earnedFormInvalid,
					earnedFormRef,

					totalPortfolioIncome,
					newPortfolioIncome,
					updatedPortfolioIncome,
					portfolioFormInvalid,
					portfolioFormRef,

					totalPassiveIncome,
					newPassiveIncome,
					passiveFormInvalid,
					passiveFormRef,

					handleEarnedIncomeSubmit,
					handleEarnedIncomeChange,
					handleEarnedIncomeUpdateChange,
					handleEarnedIncomeUpdateSubmit,
					handleGetCurrentEarnedIncome,
					handleEarnedIncomeDelete,

					handlePortfolioIncomeSubmit,
					handlePortfolioIncomeChange,
					handlePortfolioIncomeDelete,
					handleGetCurrentPortfolioIncome,
					handlePortfolioIncomeUpdateChange,
					handlePortfolioIncomeUpdateSubmit,

					handlePassiveIncomeSubmit,
					handlePassiveIncomeChange,
					handlePassiveIncomeDelete,

					totalExpensesAndSelfFirst,
					totalExpenses,
					newExpense,
					expenseFormInvalid,
					expenseFormRef,

					totalPayYourselfFirst,
					newPayYourselfFirst,
					selfFirstFormInvalid,
					selfFirstFormRef,

					handleExpenseSubmit,
					handleExpenseChange,
					handleExpenseDelete,

					handleSelfFirstSubmit,
					handleSelfFirstChange,
					handleSelfFirstDelete,

					handleFetchData,
				}}
			>
				{this.props.children}
				{/* this.props.children = components you want to provide this data to */}
			</IncomeExpenseContext.Provider>
		);
	}
}

export default IncomeExpenseContext;
