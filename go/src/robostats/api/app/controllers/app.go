package controllers

import "github.com/revel/revel"

type App struct {
	*revel.Controller
}

func addHeaderCORS(c *revel.Controller) revel.Result {
	c.Response.Out.Header().Add("Access-Control-Allow-Origin", "*")
	c.Response.Out.Header().Add("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
	return nil
}

func (c App) Index() revel.Result {
	return c.Render()
}
