import {Component} from 'react'
import {v4} from 'uuid'

import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    optionId: transactionTypeOptions[0].optionId,
    titleInput: '',
    amountInput: '',
    transactionsList: [],
  }

  deleteTransaction = id => {
    const {transactionsList} = this.state
    const updatedTransactionList = transactionsList.filter(
      eachTransaction => eachTransaction.id !== id,
    )

    this.setState({transactionsList: updatedTransactionList})
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {titleInput, amountInput, optionId} = this.state
    const typeOption = transactionTypeOptions.find(
      eachTransaction => eachTransaction.optionId === optionId,
    )
    const {displayText} = typeOption
    const newTransaction = {
      id: v4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: displayText,
    }

    this.setState(prevState => ({
      transactionsList: [...prevState.transactionsList, newTransaction],
      titleInput: '',
      amountInput: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeAmountInput = event => {
    this.setState({amountInput: event.target.value})
  }

  onchangeOptionType = event => {
    this.setState({optionId: event.target.value})
  }

  getIncome = () => {
    const {transactionsList} = this.state
    let incomeAmount = 0

    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      }
    })
    return incomeAmount
  }

  getExpenses = () => {
    const {transactionsList} = this.state
    let expensesAmount = 0

    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[1].displayText) {
        expensesAmount += eachTransaction.amount
      }
    })
    return expensesAmount
  }

  getBalance = () => {
    const {transactionsList} = this.state
    let balanceAmount = 0
    let incomeAmount = 0
    let expensesAmount = 0

    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      } else {
        expensesAmount += eachTransaction.amount
      }
    })
    balanceAmount = incomeAmount - expensesAmount

    return balanceAmount
  }

  render() {
    const {titleInput, amountInput, optionId, transactionsList} = this.state
    const totalBalance = this.getBalance()
    const totalIncome = this.getIncome()
    const totalExpenses = this.getExpenses()

    return (
      <div className="app-container">
        <div className="money-manager-container">
          <div className="money-manager-user-container">
            <div className="money-manager-user-details">
              <h1 className="user-name">Hi, Richard</h1>
              <p className="user-welcome-tag">
                Welcome back to your
                <span className="app-name"> Money Manager</span>
              </p>
            </div>
          </div>
          <MoneyDetails
            balanceAmount={totalBalance}
            incomeAmount={totalIncome}
            expensesAmount={totalExpenses}
          />
          <div className="money-manager-transactions">
            <div className="add-transaction-container">
              <form className="form-container" onSubmit={this.onAddTransaction}>
                <h1 className="form-heading">Add Transaction</h1>
                <div className="form-inputs-container">
                  <label htmlFor="titleInput" className="label-text">
                    TITLE
                  </label>
                  <input
                    id="titleInput"
                    type="text"
                    className="input"
                    placeholder="TITLE"
                    onChange={this.onChangeTitleInput}
                    value={titleInput}
                  />
                </div>
                <div className="form-inputs-container">
                  <label htmlFor="amountInput" className="label-text">
                    AMOUNT
                  </label>
                  <input
                    id="amountInput"
                    type="text"
                    className="input"
                    placeholder="AMOUNT"
                    onChange={this.onChangeAmountInput}
                    value={amountInput}
                  />
                </div>
                <div className="form-inputs-container">
                  <label htmlFor="selectInput" className="label-text">
                    TYPE
                  </label>
                  <select
                    id="selectInput"
                    className="input"
                    onChange={this.onchangeOptionType}
                    value={optionId}
                  >
                    {transactionTypeOptions.map(eachOption => (
                      <option
                        key={eachOption.optionId}
                        value={eachOption.optionId}
                      >
                        {eachOption.displayText}
                      </option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="add-button">
                  Add
                </button>
              </form>
            </div>
            <div className="transaction-history-container">
              <div className="history-container">
                <h1 className="history-heading">History</h1>
                <div className="transactions-table-container">
                  <ul className="transactions-table">
                    <li className="table-header">
                      <p className="table-header-cell">Title</p>
                      <p className="table-header-cell">Amount</p>
                      <p className="table-header-cell">Type</p>
                    </li>
                    {transactionsList.map(eachTransaction => (
                      <TransactionItem
                        key={eachTransaction.id}
                        transactionDetails={eachTransaction}
                        deleteTransaction={this.deleteTransaction}
                      />
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
