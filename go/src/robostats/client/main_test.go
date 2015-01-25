package client

import (
	"testing"
)

func TestClientLogin(t *testing.T) {
	var err error

	client := Client{
		Email:    "user@example.com",
		Password: "pass",
	}

	if err = client.Login(); err != nil {
		t.Fatal(err)
	}
}
