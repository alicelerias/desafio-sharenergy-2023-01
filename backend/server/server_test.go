package server_test

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/alicelerias/desafio-sharenergy-2023-01/models"
	"github.com/alicelerias/desafio-sharenergy-2023-01/server"
	"github.com/alicelerias/desafio-sharenergy-2023-01/types"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/assert/v2"
)

func TestServer(t *testing.T) {
	mockRepository := newMockRepository()
	server := server.NewServer(mockRepository)
	router := gin.Default()

	router.GET("/clients", server.GetAll)
	router.GET("/clients/:id", server.GetClient)
	router.PUT("/clients/:id", server.UpdateClient)
	router.DELETE("/clients/:id", server.DeleteClient)
	gin.SetMode(gin.TestMode)

	// Test 404
	res := performRequest("GET", "/undefined", router, nil)
	assert.Equal(t, http.StatusNotFound, res.Code)
	assert.Equal(t, "404 page not found", res.Body.String())

	// Test for GetAll
	res = performRequest("GET", "/clients", router, nil)
	assert.Equal(t, http.StatusOK, res.Code)
	var data struct {
		Clients []*types.Client `json:"clients"`
	}
	fmt.Println(res.Body.String())
	json.Unmarshal([]byte(res.Body.String()), &data)
	assert.Equal(t, "client1", data.Clients[0].Nome)

	// Test for GetClient
	res = performRequest("GET", "/clients/1", router, nil)
	assert.Equal(t, http.StatusOK, res.Code)
	var data1 *types.Client
	json.Unmarshal([]byte(res.Body.String()), &data1)
	assert.Equal(t, "client1", data1.Nome)

	// Test for UpdateClient
	payload, _ := json.Marshal(&types.Client{
		Nome: "client1",
	})
	res = performRequest("PUT", "/clients/1", router, bytes.NewReader(payload))
	assert.Equal(t, http.StatusOK, res.Code)
	var data2 struct {
		Client *types.Client `json:"client"`
	}
	json.Unmarshal([]byte(res.Body.String()), &data2)
	assert.Equal(t, "client1", data2.Client.Nome)

	// Test for DeleteClient
	res = performRequest("GET", "/clients/1", router, nil)
	assert.Equal(t, http.StatusOK, res.Code)
}

func performRequest(method, path string, router *gin.Engine, payload io.Reader) *httptest.ResponseRecorder {
	req, _ := http.NewRequest(method, path, payload)
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)
	return w
}

type MockRepository struct {
}

func newMockRepository() *MockRepository {
	return &MockRepository{}
}

func (s *MockRepository) GetAll(context.Context) []*types.Client {
	return []*types.Client{
		{
			Nome: "client1",
		},
	}
}

func (s *MockRepository) GetClient(context.Context, string) (*types.Client, error) {
	return &types.Client{
		Nome: "client1",
	}, nil
}

func (s *MockRepository) CreateClient(context.Context, *types.Client) (*types.Client, error) {
	return &types.Client{}, nil
}

func (s *MockRepository) UpdateClient(ctx context.Context, value *types.Client, id string) (*types.Client, error) {
	return value, nil
}

func (s *MockRepository) DeleteClient(context.Context, string) error {
	return nil
}

func (s *MockRepository) GetUser(context.Context, string) (*models.User, error) {
	return &models.User{}, nil
}

func (s *MockRepository) CreateUser(context.Context, *models.User) (err error) {
	return nil
}
