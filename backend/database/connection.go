package database

import (
	"context"
	"log"

	"github.com/alicelerias/desafio-sharenergy-2023-01/config"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func GetConnection() *mongo.Database {
	configs := config.GetConfig()

	client, err :=
		mongo.NewClient(options.Client().ApplyURI(configs.MongoDbConnection))
	if err != nil {
		log.Fatal(err)
	}

	if err := client.Connect(context.TODO()); err != nil {
		log.Fatal(err)
	}

	return client.Database(configs.Database)
}
