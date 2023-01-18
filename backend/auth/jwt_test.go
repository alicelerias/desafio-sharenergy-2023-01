package auth_test

import (
	"testing"
	"time"

	"github.com/alicelerias/desafio-sharenergy-2023-01/auth"
	"github.com/alicelerias/desafio-sharenergy-2023-01/config"
)

func TestGetSignedToken(t *testing.T) {
	// Test case 1: get a token with valid inputs
	sub := "123"
	username := "user1"
	exp := time.Now().Add(time.Minute * 10).Unix()
	token, err := auth.GetSignedToken(sub, username, exp)
	if err != nil {
		t.Errorf("Error getting token: %v", err)
	}
	if token == "" {
		t.Error("Token is empty")
	}

	// Test case 2: get a token with invalid exp time
	sub = "456"
	username = "user2"
	exp = time.Now().Add(-time.Minute * 10).Unix()
	token, err = auth.GetSignedToken(sub, username, exp)
	if err != nil {
		t.Errorf("Error getting token: %v", err)
	}
	if token == "" {
		t.Error("Token is empty")
	}

	// Test case 3: get a token with empty sub
	sub = ""
	username = "user3"
	exp = time.Now().Add(time.Minute * 10).Unix()
	token, err = auth.GetSignedToken(sub, username, exp)
	if err != nil {
		t.Errorf("Error getting token: %v", err)
	}
	if token == "" {
		t.Error("Token is empty")
	}
}

func TestValidateToken(t *testing.T) {
	config.GetConfig().JWTSecret = []byte("secret")

	// Test case 1: validate a valid token
	sub := "123"
	username := "user1"
	exp := time.Now().Add(time.Minute * 10).Unix()
	token, _ := auth.GetSignedToken(sub, username, exp)
	err := auth.ValidateToken(token)
	if err != nil {
		t.Errorf("Error validating token: %v", err)
	}

	// Test case 2: validate an expired token
	sub = "456"
	username = "user2"
	exp = time.Now().Add(-time.Minute * 10).Unix()
	token, _ = auth.GetSignedToken(sub, username, exp)
	err = auth.ValidateToken(token)
	if err == nil {
		t.Error("Expired token should return an error")
	}

	// Test case 3: validate a token with invalid signature
	sub = "789"
	username = "user3"
	exp = time.Now().Add(time.Minute * 10).Unix()
	token, _ = auth.GetSignedToken(sub, username, exp)
	config.GetConfig().JWTSecret = []byte("wrongsecret")
	err = auth.ValidateToken(token)
	if err == nil {
		t.Error("Token with invalid signature should return an error")
	}

	// Test case 4: validate an empty token
	err = auth.ValidateToken("")
	if err == nil {
		t.Error("Empty token should return an error")
	}
}
