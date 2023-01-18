package server

import (
	"net/http"

	"github.com/alicelerias/desafio-sharenergy-2023-01/types"
	"github.com/gin-gonic/gin"
)

func (s *Server) GetClient(ctx *gin.Context) {
	id := ctx.Param("id")

	if id == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "missing id"})
		return
	}

	client, err := s.repository.GetClient(ctx, id)
	if err != nil {
		panic(err)
	}
	ctx.JSON(http.StatusOK, client)
}

func (s *Server) GetAll(ctx *gin.Context) {
	out := s.repository.GetAll(ctx)
	ctx.JSON(http.StatusOK, gin.H{"clients": out})
}

func (s *Server) CreateClient(ctx *gin.Context) {
	var client *types.Client
	if err := ctx.ShouldBindJSON(&client); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "invalid request body"})
		return
	}
	client, err := s.repository.CreateClient(ctx, client)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"client": client})
}

func (s *Server) UpdateClient(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "invalid argument email"})
		return
	}
	var client *types.Client
	if err := ctx.ShouldBindJSON(&client); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "invalid request body"})
		return
	}
	client.ID = id
	client, err := s.repository.UpdateClient(ctx, client, id)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"client": client})
}

func (s *Server) DeleteClient(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
		return
	}
	if err := s.repository.DeleteClient(ctx, id); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{})

}
