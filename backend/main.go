package main

import (
	"context"
	"log"
	"net/http"

	"github.com/alicelerias/desafio-sharenergy-2023-01/auth"
	"github.com/alicelerias/desafio-sharenergy-2023-01/database"
	"github.com/alicelerias/desafio-sharenergy-2023-01/server"
	"github.com/alicelerias/desafio-sharenergy-2023-01/types"
	"github.com/gin-gonic/gin"
)

func main() {
	mongoRepository := database.NewMongoDBRepository()
	ensure(mongoRepository.EnsureSchema())

	createAdmin(mongoRepository)

	server := server.NewServer(mongoRepository)

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

func ensure(err error) {
	if err != nil {
		log.Fatal(err)
	}
}

func createAdmin(repository database.Repository) {
	auth.CreateUser(context.Background(), repository, &types.User{
		Name: struct {
			Title string "json:\"title\""
			First string "json:\"first\""
			Last  string "json:\"last\""
		}{
			Title: "Corp.",
			First: "Sharenergy",
			Last:  "Inc.",
		},
		Login: struct {
			UserName string "json:\"username\""
			Password string "json:\"password\""
		}{
			UserName: "desafiosharenergy",
			Password: "sh@r3n3rgy",
		},
	})
}
