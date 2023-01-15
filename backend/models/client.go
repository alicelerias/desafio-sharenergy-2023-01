package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Client struct {
	ID       primitive.ObjectID `bson:"_id"`
	Nome     string             `bson:"nome"`
	Email    string             `bson:"email"`
	Endereço string             `bson:"endereco"`
	Telefone string             `bson:"telefone"`
	CPF      string             `bson:"cpf"`
}
