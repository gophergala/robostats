package controllers

import (
	"github.com/revel/revel"
	"gopkg.in/mgo.v2/bson"
	"robostats/models/session"
	"robostats/models/user"
)

func init() {
	revel.InterceptFunc(addHeaderCORS, revel.AFTER, &Session{})
}

type sessionEnvelope struct {
	Session session.Session `json:"deviceSession"`
}

type sessionsEnvelope struct {
	Sessions []*session.Session `json:"deviceSessions"`
}

type Session struct {
	Common
}

// Index returns all sessions.
func (c Session) Index() revel.Result {
	var err error
	var u *user.User
	var sessions []*session.Session

	if u, err = c.requireAuthorization(); err != nil {
		return c.StatusUnauthorized()
	}

	if sessions, err = session.GetByUserID(u.ID); err != nil {
		return c.writeError(err)
	}

	return c.dataGeneric(sessionsEnvelope{sessions})
}

// Get returns a specific session.
func (c Session) Get() revel.Result {
	var err error
	var k *session.Session

	id := c.Params.Get("id")

	if _, err = c.requireAuthorization(); err != nil {
		return c.StatusUnauthorized()
	}

	if k, err = session.GetByID(bson.ObjectIdHex(id)); err != nil {
		return c.writeError(err)
	}

	return c.dataGeneric(sessionEnvelope{*k})
}

// Remove deletes a session.
func (c Session) Remove() revel.Result {
	var err error
	var k *session.Session

	id := c.Params.Get("id")

	if _, err = c.requireAuthorization(); err != nil {
		return c.StatusUnauthorized()
	}

	if k, err = session.GetByID(bson.ObjectIdHex(id)); err != nil {
		return c.writeError(err)
	}

	if err = k.Remove(); err != nil {
		return c.statusNotFound()
	}

	return c.StatusOK()
}
