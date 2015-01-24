package controllers

import (
	"github.com/revel/revel"
	"robostats/models/class"
)

func init() {
	revel.InterceptFunc(addHeaderCORS, revel.AFTER, &Class{})
}

type classEnvelope struct {
	Class class.Class `json:"device_class"`
}

type classesEnvelope struct {
	Classes []class.Class `json:"device_classes"`
}

type Class struct {
	Common
}

/*
func (c Class) Create() revel.Result {
	var c classEnvelope
	var err error

	if err = c.decodeBody(&c); err != nil {
		c.StatusBadRequest()
	}

	if err = c.Class.Create(); err != nil {
		return c.writeError(err)
	}

	return c.dataCreated(classEnvelope{c.Class})
}

*/
