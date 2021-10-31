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

const Storage = {
  get(){
    return JSON.parse(localStorage.getItem("dev.finances:transactions")) || []
  },

  set(transactions){
    localStorage.setItem("dev.finances:transactions", JSON.stringify(transactions))
  },
}

const Transaction = {
  all: Storage.get(),

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
    return total = Transaction.incomes() + Transaction.expenses()
  }
}

const DOM = {
  transactionsContainer: document.querySelector('#dataTable tbody'),

  addTransaction(transaction, index) {
    const tr = document.createElement('tr')
    tr.innerHTML = DOM.innerHTMLTransaction(transaction, index)
    tr.dataset.index = index

    DOM.transactionsContainer.appendChild(tr)
  },

  innerHTMLTransaction(transaction, index) {
    const CSSclass = transaction.amount > 0 ? 'income' : 'expense'
    const amount = Utils.formatCurrency(transaction.amount)
    const html = `
    <td class="description">${transaction.description}</td>
    <td class=${CSSclass}>${amount}</td>
    <td class="date">${transaction.date}</td>
    <td>
      <img onclick="Transaction.remove(${index})" src="assets/minus.svg" alt="remover transação" />
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
  },

  formatAmount(value) {
    value = Number(value) * 100
    return value
  },
  formatDate(date) {
    const splitedDate = date.split('-')
    return `${splitedDate[2]}/${splitedDate[1]}/${splitedDate[0]}`
  }
}

const Form = {
  description: document.querySelector('#description'),
  amount: document.querySelector('#amount'),
  date: document.querySelector('#date'),

  getValues() {
    return {
      description: Form.description.value,
      amount: Form.amount.value,
      date: Form.date.value
    }
  },

  validateFilds() {
    const { description, amount, date } = Form.getValues()

    if (
      description.trim() === '' ||
      amount.trim() === '' ||
      date.trim() === ''
    ) {
      throw new Error('por favor, preencha todos os campos')
    }
  },

  formatValues() {
    let { description, amount, date } = Form.getValues()

    amount = Utils.formatAmount(amount)

    date = Utils.formatDate(date)

    return {
      description,
      amount,
      date
    }
  },

  clearFields() {
    Form.description.value = ''
    Form.amount.value = ''
    Form.date.value = ''
  },

  submit(event) {
    event.preventDefault()

    try {
      // verificar se todas as informações foram preenchidas
      Form.validateFilds()
      // formatar os dados para salvar
      const transaction = Form.formatValues()
      // salvar
      // atualizar a aplicação
      Transaction.add(transaction)
      // apagar os dados do formulário
      Form.clearFields()
      // fechar modal
      Modal.ToggleModal()
      console.log(Form.formatValues())
      
    } catch (error) {
      alert(error.message)
    }
  }
}

const App = {
  init() {
    Transaction.all.forEach((transaction, index) => {
      DOM.addTransaction(transaction, index)
    })

    DOM.updateBalance()
  },
  reload() {
    DOM.ClearTransactions()
    App.init()
  }
}

App.init()