const change = {
  data () {
    return {
      changebgCol: 'Copyright ©'
    }
  },
  directives: {
    changeBgColor: {
      bind: (elemen, binding) => {
        elemen.style.backgroundColor = binding.value
      }
    }
  }
}

export default change
