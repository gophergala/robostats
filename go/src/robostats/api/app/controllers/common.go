package controllers

import (
	"github.com/revel/revel"
	"net/http"
)

type Common struct {
	*revel.Controller
}

func (c Common) writeStatus() revel.Result {
	c.Response.ContentType = "text/plain"
	return c.RenderText(http.StatusText(c.Response.Status) + "\n")
}

func (c Common) Data(data interface{}) revel.Result {
	c.Response.Status = http.StatusOK
	return c.RenderJson(data)
}

func (c Common) StatusOK() revel.Result {
	c.Response.Status = http.StatusOK
	return c.writeStatus()
}

func (c Common) StatusUnauthorized() revel.Result {
	c.Response.Status = http.StatusUnauthorized
	return c.writeStatus()
}

func (c Common) StatusBadRequest() revel.Result {
	c.Response.Status = http.StatusBadRequest
	return c.writeStatus()
}
