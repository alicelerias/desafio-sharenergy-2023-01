package config

import (
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	AuthCookie string
	Host       string
	LoginPage  string
}

var config *Config

func GetConfig() *Config {
	if config == nil {
		godotenv.Load()

		config = &Config{
			AuthCookie: os.Getenv("AUTH_COOKIE"),
			Host:       os.Getenv("HOST"),
			LoginPage:  os.Getenv("LOGIN_PAGE"),
		}
	}

	return config
}
