package controllers

import (
	"github.com/revel/revel"
	"gopkg.in/mgo.v2/bson"
	"robostats/models/instance"
	"robostats/models/user"
)

func init() {
	revel.InterceptFunc(addHeaderCORS, revel.AFTER, &Instance{})
}

type instanceEnvelope struct {
	Instance instance.Instance `json:"deviceInstance"`
}

type instancesEnvelope struct {
	Instances []*instance.Instance `json:"deviceInstances"`
}

type Instance struct {
	Common
}

// Index returns all instances.
func (c Instance) Index() revel.Result {
	var err error
	var u *user.User
	var instances []*instance.Instance

	if u, err = c.requireAuthorization(); err != nil {
		return c.StatusUnauthorized()
	}

	if instances, err = instance.GetByUserID(u.ID); err != nil {
		return c.writeError(err)
	}

	return c.dataGeneric(instancesEnvelope{instances})
}

// Get returns a specific instance.
func (c Instance) Get() revel.Result {
	var err error
	var k *instance.Instance

	id := c.Params.Get("id")

	if _, err = c.requireAuthorization(); err != nil {
		return c.StatusUnauthorized()
	}

	if k, err = instance.GetByID(bson.ObjectIdHex(id)); err != nil {
		return c.writeError(err)
	}

	return c.dataGeneric(instanceEnvelope{*k})
}

// Remove deletes an instance.
func (c Instance) Remove() revel.Result {
	var err error
	var k *instance.Instance

	id := c.Params.Get("id")

	if _, err = c.requireAuthorization(); err != nil {
		return c.StatusUnauthorized()
	}

	if k, err = instance.GetByID(bson.ObjectIdHex(id)); err != nil {
		return c.writeError(err)
	}

	if err = k.Remove(); err != nil {
		return c.statusNotFound()
	}

	return c.StatusOK()
}
