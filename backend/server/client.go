package server

import (
	"net/http"

	"github.com/alicelerias/desafio-sharenergy-2023-01/queries"
	"github.com/alicelerias/desafio-sharenergy-2023-01/types"
	"github.com/gin-gonic/gin"
)

func GetClient(ctx *gin.Context) {
	id := ctx.Param("id")

	if id == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "id"})
		return
	}

	client, err := queries.GetUser(ctx, id)
	if err != nil {
		panic(err)
	}
	ctx.JSON(http.StatusOK, gin.H{"client": client})
}

func GetAll(ctx *gin.Context) {

	out := queries.GetAll(ctx)
	if out == nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "array is empty"})
	}
	ctx.JSON(http.StatusOK, gin.H{"clients": out})
}

func CreateClient(ctx *gin.Context) {
	var client types.Client
	if err := ctx.ShouldBindJSON(&client); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "invalid request body"})
		return
	}
	client, err := queries.CreateUser(ctx, client)
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
	client, err := queries.UpdateClient(ctx, client, id)
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
	if err := queries.DeleteClient(ctx, id); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{})

}
