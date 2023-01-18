package server

import "github.com/alicelerias/desafio-sharenergy-2023-01/database"

type Server struct {
	repository database.Repository
}

func NewServer(repository database.Repository) *Server {
	return &Server{repository: repository}
}
