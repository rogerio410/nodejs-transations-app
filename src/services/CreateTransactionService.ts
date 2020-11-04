import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string

  value: number

  type: 'income' | 'outcome'
}


class CreateTransactionService {
  private transactionsRepository: TransactionsRepository

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository
  }

  public execute(request: Request): Transaction {
    if (request.type === 'outcome' && request.value > this.transactionsRepository.getBalance().total) {
      throw Error('Insufficient Balance')
    }
    return this.transactionsRepository.create(request)
  }
}

export default CreateTransactionService;
