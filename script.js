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

const transactions = [
  {
    id: 1,
    description: 'luz',
    amount: -23000,
    date: '30/10/2021'
  },
  {
    id: 2,
    description: 'website',
    amount: 500000,
    date: '20/10/2021'
  },
  {
    id: 3,
    description: 'internet',
    amount: -13000,
    date: '30/10/2021'
  },
  {
    id: 3,
    description: 'internet',
    amount: -123.52,
    date: '30/10/2021'
  }
]

const Transaction = {
  incomes() {
    //somar as etradas
  },
  expanses() {
    //somar as saídas
  },
  total() {
    // entradas - saídas
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
    value = String(value).replace(/\D/g,"")
    value = Number(value) / 100
    value = value.toLocaleString('pt-br', {
      style: 'currency',
      currency: "BRL"
    })
    return signal + " " + value
  }
}

transactions.forEach(function (transaction) {
  DOM.addTransaction(transaction)
})

console.log(Utils)