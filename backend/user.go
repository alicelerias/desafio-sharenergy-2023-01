package main

type user struct {
	Name struct {
		Title string `json:"title"`
		First string `json:"first"`
		Last  string `json:"last"`
	} `json:"name"`
	Login struct {
		UserName string `json:"username"`
	} `json:"login"`

	Email string `json:"email"`
}

type result struct {
	Results []user `json:"results"`
}
