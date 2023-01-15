package server

import (
	"fmt"
	"log"
	"net/http"

	"github.com/alicelerias/desafio-sharenergy-2023-01/config"
	"github.com/alicelerias/desafio-sharenergy-2023-01/types"
	"github.com/gin-gonic/gin"
)

func HealthCheck(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"status": "ok",
	})
}

func Login(ctx *gin.Context) {
	configs := config.GetConfig()
	var credencial types.Credencial
	if err := ctx.ShouldBindJSON(&credencial); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "invalid request"})
		return
	}
	if credencial.Username == "oi" && credencial.Password == "123" {
		ctx.SetCookie(configs.AuthCookie, "TOKENSLFADSKÇKLDSFAKÇLJDFS", 3600, "/", configs.Host, false, true)
		ctx.AbortWithStatus(http.StatusOK)
		fmt.Printf("sucess")
	} else {
		log.Fatal("Incorrect username or password")
	}
}

func Refresh(ctx *gin.Context) {
	configs := config.GetConfig()
	ctx.SetCookie(configs.AuthCookie, "TOKENSLFADSKÇKLDSFAKÇLJDFS", 3600*10, "/", configs.Host, false, true)
	ctx.AbortWithStatus(http.StatusOK)
}
