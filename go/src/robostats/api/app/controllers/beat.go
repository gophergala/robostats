package controllers

import (
	"github.com/revel/revel"
	"gopkg.in/mgo.v2/bson"
	"robostats/models/beat"
	"robostats/models/user"
)

func init() {
	revel.InterceptFunc(addHeaderCORS, revel.AFTER, &Beat{})
}

type beatEnvelope struct {
	Beat beat.Beat `json:"deviceLog"`
}

type beatsEnvelope struct {
	Beats []*beat.Beat `json:"deviceLogs"`
}

type Beat struct {
	Common
}

// Index returns all beats.
func (c Beat) Index() revel.Result {
	var err error
	var u *user.User
	var beats []*beat.Beat

	if u, err = c.requireAuthorization(); err != nil {
		return c.StatusUnauthorized()
	}

	if beats, err = beat.GetByUserID(u.ID); err != nil {
		return c.writeError(err)
	}

	return c.dataGeneric(beatsEnvelope{beats})
}

// Get returns a specific beat.
func (c Beat) Get() revel.Result {
	var err error
	var k *beat.Beat

	id := c.Params.Get("id")

	if _, err = c.requireAuthorization(); err != nil {
		return c.StatusUnauthorized()
	}

	if k, err = beat.GetByID(bson.ObjectIdHex(id)); err != nil {
		return c.writeError(err)
	}

	return c.dataGeneric(beatEnvelope{*k})
}

// Remove deletes a beat.
func (c Beat) Remove() revel.Result {
	var err error
	var k *beat.Beat

	id := c.Params.Get("id")

	if _, err = c.requireAuthorization(); err != nil {
		return c.StatusUnauthorized()
	}

	if k, err = beat.GetByID(bson.ObjectIdHex(id)); err != nil {
		return c.writeError(err)
	}

	if err = k.Remove(); err != nil {
		return c.statusNotFound()
	}

	return c.StatusOK()
}
