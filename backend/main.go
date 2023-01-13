package main

import (
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"strings"

	"github.com/alicelerias/desafio-sharenergy-2023-01/config"
	"github.com/alicelerias/desafio-sharenergy-2023-01/models"
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

	r.GET("/cats", func(ctx *gin.Context) {
		code, ok := ctx.GetQuery("code")
		if !ok {
			panic("request fail")
		}

		url := fmt.Sprintf("%s/%s", configs.ApiHttpCat, code)
		res, err := http.Get(url)
		if err != nil {
			log.Fatal(err)
		}

		io.Copy(ctx.Writer, res.Body)
		ctx.Status(http.StatusOK)
		ctx.Writer.CloseNotify()
	})

	r.GET("/users", func(ctx *gin.Context) {
		// http call to ramdomusers.com

		req, err := http.NewRequest("GET", configs.ApiRandomUser, nil)
		if err != nil {
			log.Fatal(err)
		}
		query := req.URL.Query()
		query.Add("seed", "a")

		if value, ok := ctx.GetQuery("page"); ok {
			query.Add("page", value)
		} else {
			query.Add("page", "1")
		}

		if value, ok := ctx.GetQuery("results"); ok {
			query.Add("results", value)
		} else {
			query.Add("results", "10")
		}

		req.URL.RawQuery = query.Encode()

		res, err := http.DefaultClient.Do(req)
		if err != nil {
			panic("request fail")
		}

		if search, ok := ctx.GetQuery("search"); ok {
			search = strings.ToLower(search)
			var r models.Result

			body, err := ioutil.ReadAll(res.Body)
			if err != nil {
				panic("err")
			}

			err = json.Unmarshal(body, &r)
			if err != nil {
				panic("err")
			}

			newResult := models.Result{
				Results: []models.User{},
			}

			for _, user := range r.Results {
				if strings.ToLower(user.Name.First) == search || user.Name.Last == search || user.Email == search || user.Login.UserName == search {
					newResult.Results = append(newResult.Results, user)
				}
			}
			fmt.Println(newResult)
			ctx.JSON(http.StatusOK, newResult)
		} else {
			io.Copy(ctx.Writer, res.Body)
			ctx.Status(http.StatusOK)
			ctx.Writer.CloseNotify()
		}

	})

	r.Run()
}
