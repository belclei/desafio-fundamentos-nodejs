import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const { income, outcome } = this.transactions.reduce(
      (accumulatedBalance: Balance, transaction) => {
        switch (transaction.type) {
          case 'income':
            return {
              income: accumulatedBalance.income + transaction.value,
              outcome: accumulatedBalance.outcome,
              total: 0,
            };
          case 'outcome':
            return {
              income: accumulatedBalance.income,
              outcome: accumulatedBalance.outcome + transaction.value,
              total: 0,
            };
          default:
            break;
        }
        return accumulatedBalance;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );
    const total = income - outcome;
    return { income, outcome, total };
  }

  public create(createTransactionDTO: CreateTransactionDTO): Transaction {
    const transaction = new Transaction(createTransactionDTO);

    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
