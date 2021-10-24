const Modal = {
  open() {
    // abrir modal
    // add class active ao modal
    document.querySelector('div.modal-overlay').classList.add('active')
  },
  close() {
    // fecha o modal
    // remove class active do modal
    document.querySelector('div.modal-overlay').classList.remove('active')
  }
}
