package database

import (
	"context"

	"github.com/alicelerias/desafio-sharenergy-2023-01/models"
	"github.com/alicelerias/desafio-sharenergy-2023-01/types"
	"go.mongodb.org/mongo-driver/mongo"
)

type Repository interface {
	GetAll(context.Context) []*types.Client
	GetClient(context.Context, string) (*types.Client, error)
	CreateClient(context.Context, *types.Client) (*types.Client, error)
	UpdateClient(context.Context, *types.Client, string) (*types.Client, error)
	DeleteClient(context.Context, string) error

	GetUser(context.Context, string) (*models.User, error)
	CreateUser(context.Context, *models.User) (err error)
}

type MongoDBRepository struct {
	db *mongo.Database
}

var mongoDBRepository Repository = &MongoDBRepository{}

func NewMongoDBRepository() *MongoDBRepository {
	connection := GetConnection()
	return &MongoDBRepository{db: connection}
}
