package auth

import (
	"fmt"
	"time"

	"github.com/alicelerias/desafio-sharenergy-2023-01/config"
	jwt "github.com/dgrijalva/jwt-go"
)

func GetSignedToken(sub string, username string, exp int64) (token string, err error) {
	unsignedToken := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub":      sub,
		"username": username,
		"iat":      time.Now().Unix(),
		"exp":      exp,
	})

	secret := []byte(config.GetConfig().JWTSecret)
	token, err = unsignedToken.SignedString(secret)
	return
}

func ValidateToken(tokenString string) error {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(config.GetConfig().JWTSecret), nil
	})

	if err != nil {
		return err
	}

	if !token.Valid {
		return NewInvalidToken("Invalid token!")
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		exp, ok := claims["exp"].(float64)
		if !ok {
			return NewInvalidToken("Invalid exp value")
		}
		if time.Now().Unix() > int64(exp) {
			return NewInvalidToken("Token expired")
		}
	}

	return nil
}
