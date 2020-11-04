import Transaction from '../models/Transaction';

interface Balance {
  income: number
  outcome: number
  total: number
}

class TransactionsRepository {
  private transactions: Transaction[]

  constructor() {
    this.transactions = []
  }

  public all(): Transaction[] {
    return this.transactions
  }

  public getBalance(): Balance {

    const income = this.transactions.reduce((total, currentValue) => (currentValue.type === 'income' ? total + currentValue.value : total + 0), 0)
    const outcome = this.transactions.reduce((total, currentValue) => (currentValue.type === 'outcome' ? total + currentValue.value : total + 0), 0)

    const result: Balance = {
      income,
      outcome,
      total: income - outcome
    }
    return result
  }

  public create({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    const transaction = new Transaction({ title, value, type })
    this.transactions.push(transaction)
    return transaction
  }
}

export default TransactionsRepository;
