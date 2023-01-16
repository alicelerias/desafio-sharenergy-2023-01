package server

import (
	"net/http"

	"github.com/alicelerias/desafio-sharenergy-2023-01/auth"
	"github.com/alicelerias/desafio-sharenergy-2023-01/config"
	"github.com/alicelerias/desafio-sharenergy-2023-01/types"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
)

func Login(ctx *gin.Context) {
	configs := config.GetConfig()
	var credentials types.Credential
	if err := ctx.ShouldBindJSON(&credentials); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "invalid request"})
		return
	}
	token, err := auth.Authenticate(ctx, &credentials)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			ctx.AbortWithError(http.StatusUnauthorized, err)
			return
		}
		panic(err)
	}
	ctx.SetCookie(configs.AuthCookie, token.AccessToken, 3600, "/", configs.Host, true, true)
	ctx.AbortWithStatus(http.StatusOK)
}

func Logout(ctx *gin.Context) {
	configs := config.GetConfig()
	ctx.SetCookie(configs.AuthCookie, "", 3600, "/", configs.Host, true, true)
	ctx.AbortWithStatus(http.StatusOK)
}

func CreateUser(ctx *gin.Context) {
	user := &types.User{}
	if err := ctx.ShouldBindJSON(user); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "invalid request"})
		return
	}
	if err := auth.CreateUser(ctx, user); err != nil {
		if errs, ok := err.(mongo.WriteException); ok {
			for _, e := range errs.WriteErrors {
				if e.Code == 11000 {
					ctx.JSON(http.StatusBadRequest, gin.H{"error": "user already exists"})
				}
			}
		}
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "invalid request"})
		return
	}
	ctx.AbortWithStatus(http.StatusCreated)
}
