// Package client is a Go consumer for robotstats.
package client

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
)

const (
	endpointPrefix = "http://api.dev.robostats.io"
)

const (
	loginEndpoint = endpointPrefix + "/user/login"
)

const (
	MethodPost = "POST"
)

type Authorization struct {
	AccessToken string `json:"access_token"`
	TokenType   string `json:"token_type"`
}

type Client struct {
	Email    string
	Password string
	Auth     Authorization
}

func decodeBody(res *http.Response, dest interface{}) error {
	var buf []byte
	var err error

	if buf, err = ioutil.ReadAll(res.Body); err != nil {
		return err
	}

	log.Printf("got: %s\n", string(buf))

	if err := json.Unmarshal(buf, &dest); err != nil {
		return err
	}

	return nil
}

func (c *Client) Login() error {
	var res *http.Response
	var err error

	params := url.Values{
		"email":    {c.Email},
		"password": {c.Password},
	}

	if res, err = http.PostForm(loginEndpoint, params); err != nil {
		return err
	}

	if err = decodeBody(res, &c.Auth); err != nil {
		return err
	}

	return nil
}
