package database

import (
	"context"
	"errors"
	"log"

	"github.com/alicelerias/desafio-sharenergy-2023-01/models"
	"github.com/alicelerias/desafio-sharenergy-2023-01/types"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

const COLLECTION_CLIENT = "client"

func (s *MongoDBRepository) GetAll(ctx context.Context) []*types.Client {
	var clients []*types.Client

	results, err := s.db.
		Collection(COLLECTION_CLIENT).
		Find(ctx, bson.M{})

	if err != nil {
		return []*types.Client{}
	}

	defer results.Close(ctx)
	for results.Next(ctx) {
		var singleClient *models.Client
		if err = results.Decode(&singleClient); err != nil {
			return []*types.Client{}
		}

		clients = append(clients, fromModel(singleClient))
	}
	return clients
}

func (s *MongoDBRepository) GetClient(ctx context.Context, id string) (*types.Client, error) {
	dbId, _ := primitive.ObjectIDFromHex(id)

	var out *models.Client
	err := s.db.
		Collection(COLLECTION_CLIENT).
		FindOne(ctx, bson.M{"_id": dbId}).
		Decode(&out)
	if err != nil {
		return &types.Client{}, err
	}
	return fromModel(out), nil

}

func (s *MongoDBRepository) CreateClient(ctx context.Context, client *types.Client) (*types.Client, error) {
	out, err := s.db.Collection(COLLECTION_CLIENT).InsertOne(ctx, toModel(client))
	if err != nil {
		return &types.Client{}, err
	}
	client.ID = out.InsertedID.(primitive.ObjectID).String()
	return client, nil
}

func (s *MongoDBRepository) UpdateClient(ctx context.Context, client *types.Client, id string) (*types.Client, error) {
	dbId, _ := primitive.ObjectIDFromHex(id)
	in := bson.M{}
	if client.Nome != "" {
		in["nome"] = client.Nome
	}
	if client.Endereco != "" {
		in["endereco"] = client.Endereco
	}
	if client.Telefone != "" {
		in["telefone"] = client.Telefone
	}
	if client.Email != "" {
		in["email"] = client.Email
	}
	if client.CPF != "" {
		in["cpf"] = client.CPF
	}

	out, err := s.db.
		Collection(COLLECTION_CLIENT).
		UpdateOne(ctx, bson.M{"_id": dbId}, bson.M{"$set": in})
	if err != nil {
		return &types.Client{}, err
	}
	if out.MatchedCount == 0 {
		return &types.Client{}, err
	}
	return client, nil
}

func (s *MongoDBRepository) DeleteClient(ctx context.Context, id string) error {

	dbID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return errors.New("Err")
	}

	out, err := s.db.
		Collection(COLLECTION_CLIENT).
		DeleteOne(ctx, bson.M{"_id": dbID})

	if err != nil {
		return errors.New("Err")
	}

	if out.DeletedCount == 0 {
		return errors.New("No document found!")
	}
	return nil
}

func toModel(in *types.Client) *models.Client {
	var id primitive.ObjectID
	if in.ID != "" {
		dbID, err := primitive.ObjectIDFromHex(in.ID)
		if err != nil {
			log.Fatal(err)
		}
		id = dbID
	} else {
		id = primitive.NewObjectID()
	}
	return &models.Client{
		ID:       id,
		Nome:     in.Nome,
		Email:    in.Email,
		Endereco: in.Endereco,
		Telefone: in.Telefone,
		CPF:      in.CPF,
	}

}

func fromModel(in *models.Client) *types.Client {
	return &types.Client{
		ID:       in.ID.Hex(),
		Nome:     in.Nome,
		Email:    in.Email,
		Endereco: in.Endereco,
		Telefone: in.Telefone,
		CPF:      in.CPF,
	}
}
