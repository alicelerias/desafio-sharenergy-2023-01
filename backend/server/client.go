package server

import (
	"net/http"

	"github.com/alicelerias/desafio-sharenergy-2023-01/database"
	"github.com/alicelerias/desafio-sharenergy-2023-01/types"
	"github.com/gin-gonic/gin"
)

func GetClient(ctx *gin.Context) {
	id := ctx.Param("id")

	if id == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "id"})
		return
	}

	client, err := database.GetClient(ctx, id)
	if err != nil {
		panic(err)
	}
	ctx.JSON(http.StatusOK, gin.H{"client": client})
}

func GetAll(ctx *gin.Context) {
	out := database.GetAll(ctx)
	ctx.JSON(http.StatusOK, gin.H{"clients": out})
}

func CreateClient(ctx *gin.Context) {
	var client types.Client
	if err := ctx.ShouldBindJSON(&client); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "invalid request body"})
		return
	}
	client, err := database.CreateClient(ctx, client)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"client": client})
}

func UpdateClient(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "invalid argument email"})
		return
	}
	var client types.Client
	if err := ctx.ShouldBindJSON(&client); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "invalid request body"})
		return
	}
	client.ID = id
	client, err := database.UpdateClient(ctx, client, id)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"client": client})
}

func DeleteClient(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
		return
	}
	if err := database.DeleteClient(ctx, id); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{})

}
