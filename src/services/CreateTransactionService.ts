import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    if (!['income', 'outcome'].includes(type))
      throw new Error('Incorrect Transaction Type!');

    const balance = this.transactionsRepository.getBalance();
    if (type === 'outcome' && value > balance.total)
      throw new Error('You are out of money');

    return this.transactionsRepository.create({ title, value, type });
  }
}

export default CreateTransactionService;
