package main

import (
	"net/http"

	"github.com/alicelerias/desafio-sharenergy-2023-01/config"
	"github.com/gin-gonic/gin"
)

func main() {

	r := gin.Default()
	configs := config.GetConfig()

	r.Use(CORSMiddleware())

	r.GET("/heathcheck", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status": "ok",
		})
	})

	r.GET("/login", func(ctx *gin.Context) {
		// validar senha do usuario
		// gera token
		ctx.SetCookie(configs.AuthCookie, "TOKENSLFADSKÇKLDSFAKÇLJDFS", 3600, "/", configs.Host, false, true)
		ctx.AbortWithStatus(http.StatusOK)
	})

	r.GET("/refresh", func(ctx *gin.Context) {
		// validar refreshtoken
		// set new accesstoken
		ctx.SetCookie(configs.AuthCookie, "TOKENSLFADSKÇKLDSFAKÇLJDFS", 3600*10, "/", configs.Host, false, true)
		ctx.AbortWithStatus(http.StatusOK)
	})

	r.Use(AuthenticationMiddleware())

	r.GET("/users", func(ctx *gin.Context) {
		// http call to ramdomusers.com
		//return
	})

	r.Run()
}
