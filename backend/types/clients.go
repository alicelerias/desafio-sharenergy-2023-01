package types

type Client struct {
	ID       string `json:"id"`
	Nome     string `json:"nome"`
	Email    string `json:"email"`
	Telefone string `json:"telefone"`
	Endereço string `json:"endereco"`
	CPF      string `json:"cpf"`
}
