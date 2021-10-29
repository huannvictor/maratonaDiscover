const Modal = {
  /*
  open() {
    // add class active ao modal
    document.querySelector('div.modal-overlay').classList.add('active')
  },
  close() {
    // remove class active do modal
    document.querySelector('div.modal-overlay').classList.remove('active')
  },*/

  ToggleModal() {
    document.querySelector('div.modal-overlay').classList.toggle('active')
  }
}


const Transaction = {
  all: [
    {
      description: 'luz',
      amount: -23000,
      date: '30/10/2021'
    },
    {
      description: 'website',
      amount: 500000,
      date: '20/10/2021'
    },
    {
      description: 'internet',
      amount: -13000,
      date: '30/10/2021'
    },
    {
      description: 'internet',
      amount: 12352,
      date: '30/10/2021'
    }
  ],

  add(transaction) {
    Transaction.all.push(transaction)
    App.reload()
  },

  remove(index) {
    Transaction.all.splice(index, 1)

    App.reload()
  },

  incomes() {
    let income = 0
    // pegar todas as transacoes
    // para cada transacao,
    Transaction.all.forEach(transaction => {
      // se ela for maior que zero
      if (transaction.amount > 0) {
        // somar à uma variável e retornar a variável
        income += transaction.amount
      }
    })
    return income
  },

  expenses() {
    let expense = 0
    Transaction.all.forEach(transaction => {
      if (transaction.amount < 0) {
        expense += transaction.amount
      }
    })
    return expense
  },

  total() {
    let total = Transaction.incomes() + Transaction.expenses()
    return total
  }
}

const DOM = {
  transactionsContainer: document.querySelector('#dataTable tbody'),

  addTransaction(transaction, index) {
    const tr = document.createElement('tr')
    tr.innerHTML = DOM.innerHTMLTransaction(transaction)
    DOM.transactionsContainer.appendChild(tr)
  },

  innerHTMLTransaction(transaction) {
    const CSSclass = transaction.amount > 0 ? 'income' : 'expense'
    const amount = Utils.formatCurrency(transaction.amount)
    const html = `
    <td class="description">${transaction.description}</td>
    <td class=${CSSclass}>${amount}</td>
    <td class="date">${transaction.date}</td>
    <td>
      <img src="assets/minus.svg" alt="remover transação" />
    </td>
    `
    return html
  },

  updateBalance() {
    document.getElementById('incomeDisplay').innerHTML = Utils.formatCurrency(
      Transaction.incomes()
    )
    document.getElementById('expenseDisplay').innerHTML = Utils.formatCurrency(
      Transaction.expenses()
    )
    document.getElementById('totalDisplay').innerHTML = Utils.formatCurrency(
      Transaction.total()
    )
  },

  ClearTransactions() {
    DOM.transactionsContainer.innerHTML = ''
  }
}

/*
pode ser usado para configurar o valor do amount
transaction.amount.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})
*/
// opção apresentada no curso:
const Utils = {
  formatCurrency(value) {
    const signal = Number(value) < 0 ? '-' : '+'
    value = String(value).replace(/\D/g, '')
    value = Number(value) / 100
    value = value.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL'
    })
    return signal + ' ' + value
  }
}

const Form = {
  submit(event) {
    event.preventDefault()
  }
}

const App = {
  init() {
    Transaction.all.forEach(transaction => {
      DOM.addTransaction(transaction)
    })

    DOM.updateBalance()
  },
  reload() {
    DOM.ClearTransactions()
    App.init()
  }
}

App.init()

Transaction.add({
  id: 2,
  description: 'vbl',
  amount: 32110,
  date: '27/10/2021'
})

Transaction.remove(0)
