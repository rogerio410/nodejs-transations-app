import { Router } from 'express';


import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router()

const transactionsRepository = new TransactionsRepository();
const createTransactionService = new CreateTransactionService(transactionsRepository)

transactionRouter.get('/', (request, response) => {
  try {
    return response.json({ transactions: transactionsRepository.all(), balance: transactionsRepository.getBalance() })
  } catch (err) {
    return response.status(400).json({ error: err.message })
  }
})

transactionRouter.get('/balance', (request, response) => {
  return response.json(transactionsRepository.getBalance())
})

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body

    const transaction = createTransactionService.execute({ title, value, type })
    return response.json(transaction)

  } catch (err) {
    return response.status(400).json({ error: err.message })
  }
})

export default transactionRouter
