package controllers

import (
	"github.com/revel/revel"
	"robostats/models/class"
	"robostats/models/user"
)

func init() {
	revel.InterceptFunc(addHeaderCORS, revel.AFTER, &Class{})
}

type classEnvelope struct {
	Class class.Class `json:"device_class"`
}

type classesEnvelope struct {
	Classes []*class.Class `json:"device_classes"`
}

type Class struct {
	Common
}

func (c Class) Create() revel.Result {
	var err error
	var u *user.User
	var k classEnvelope

	if u, err = c.requireAuthorization(); err != nil {
		return c.StatusUnauthorized()
	}

	if err = c.decodeBody(&k); err != nil {
		return c.StatusBadRequest()
	}

	k.Class.UserID = u.ID

	if err = k.Class.Create(); err != nil {
		return c.writeError(err)
	}

	return c.dataCreated(classEnvelope{k.Class})
}

func (c Class) Index() revel.Result {
	var err error
	var u *user.User
	var classes []*class.Class

	if u, err = c.requireAuthorization(); err != nil {
		return c.StatusUnauthorized()
	}

	if classes, err = class.GetByUserID(u.ID); err != nil {
		return c.writeError(err)
	}

	return c.dataCreated(classesEnvelope{classes})
}

func (c Class) Get() revel.Result {
	return c.StatusUnauthorized()
}
