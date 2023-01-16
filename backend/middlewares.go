package main

import (
	"net/http"

	"github.com/alicelerias/desafio-sharenergy-2023-01/auth"
	"github.com/alicelerias/desafio-sharenergy-2023-01/config"
	"github.com/alicelerias/desafio-sharenergy-2023-01/errors"
	"github.com/gin-gonic/gin"
)

func CORSMiddleware() gin.HandlerFunc {
	configs := config.GetConfig()
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", configs.AllowedHosts)
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

func AuthenticationMiddleware() gin.HandlerFunc {
	configs := config.GetConfig()
	return func(c *gin.Context) {
		token, _ := c.Cookie(configs.AuthCookie)
		if err := auth.ValidateToken(token); err != nil {
			err = errors.NewForbiddenError()
			c.AbortWithError(http.StatusForbidden, err)
		}

		c.Next()
	}
}
