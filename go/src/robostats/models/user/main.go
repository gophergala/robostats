// package user provides logic and authentication routines for robostats users.
package user

import (
	"labix.org/v2/mgo/bson"
	"robostats/errmsg"
	"robostats/storage"
	"time"
	"upper.io/db"
)

type User struct {
	ID           bson.ObjectId `bson:"id" json:"id"`
	Email        string        `bson:"email" json:"email"`
	PasswordHash string        `bson:"password_hash" json:"-"`
	CreatedAt    time.Time     `bson:"created_at" json:"created_at"`
}

const (
	userCollectionName = "user"
)

var (
	UserCollection db.Collection
)

func init() {
	UserCollection = storage.C(userCollectionName)
}

func GetByID(id bson.ObjectId) (u *User, err error) {
	src := UserCollection.Find(db.Cond{
		"_id": id,
	})

	if c, _ := src.Count(); c < 1 {
		return nil, errmsg.ErrNoSuchUser
	}

	if err = src.One(u); err != nil {
		return nil, err
	}

	return u, err
}

func Login() {

}
