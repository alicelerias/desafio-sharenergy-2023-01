export const validateEMail = (email: string) => {
  const re = /\S+@\S+\.\S+/

  if (!re.test(email)) {
    return "Campo inválido"
  }
  return re.test(email)
}

export const validateCPF = (cpf: string) => {
  const re = /[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}/

  if (!re.test(cpf)) {
    return "Campo inválido"
  }
  return re.test(cpf)
}

export const validateTelefone = (telefone: string) => {
  const re = /\d{9,12}/

  if (!re.test(telefone)) {
    return "Campo inválido"
  }
  return re.test(telefone)
}
