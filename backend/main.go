package main

import (
	"github.com/alicelerias/desafio-sharenergy-2023-01/server"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.Use(CORSMiddleware())

	r.GET("/api/heathcheck", server.HealthCheck)

	r.POST("/login", server.Login)

	r.GET("/refresh", server.Refresh)

	// r.Use(AuthenticationMiddleware())

	r.GET("/clients", server.GetAll)
	r.GET("/clients/:id", server.GetClient)
	r.POST("/clients", server.CreateClient)
	r.PUT("/clients/:id", server.UpdateClient)
	r.DELETE("/clients/:id", server.DeleteClient)

	r.GET("/cats", server.GetCats)
	r.GET("/dogs", server.GetDogs)
	r.GET("/users", server.GetUsers)

	r.Run()
}
