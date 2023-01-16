package main

import (
	"log"
	"net/http"

	"github.com/alicelerias/desafio-sharenergy-2023-01/database"
	"github.com/alicelerias/desafio-sharenergy-2023-01/server"
	"github.com/gin-gonic/gin"
)

func main() {
	err := database.EnsureSchema()

	if err != nil {
		log.Fatal(err)
	}

	r := gin.Default()
	r.Use(CORSMiddleware())

	r.GET("/heathcheck", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status": "ok",
		})
	})

	r.POST("/user", server.CreateUser)

	r.POST("/login", server.Login)
	r.POST("/logout", server.Logout)

	r.Use(AuthenticationMiddleware())

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
