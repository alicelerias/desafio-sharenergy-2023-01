package server

import (
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"strings"

	"github.com/alicelerias/desafio-sharenergy-2023-01/config"
	"github.com/alicelerias/desafio-sharenergy-2023-01/types"
	"github.com/gin-gonic/gin"
)

func (s *Server) GetCats(ctx *gin.Context) {
	configs := config.GetConfig()
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
}

func (s *Server) GetDogs(ctx *gin.Context) {
	configs := config.GetConfig()
	var dog string = "woof.json"

	url := fmt.Sprintf("%s/%s", configs.ApiRandomDog, dog)
	res, err := http.Get(url)
	if err != nil {
		log.Fatal(err)
	}

	io.Copy(ctx.Writer, res.Body)
	ctx.Status(http.StatusOK)
	ctx.Writer.CloseNotify()

}

func (s *Server) GetUsers(ctx *gin.Context) {
	configs := config.GetConfig()
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
		var r types.Result

		body, err := ioutil.ReadAll(res.Body)
		if err != nil {
			panic("err")
		}

		err = json.Unmarshal(body, &r)
		if err != nil {
			panic(err)
		}

		newResult := types.Result{
			Results: []types.User{},
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
}
