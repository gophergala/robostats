package beat

import (
	"gopkg.in/mgo.v2/bson"
	"robostats/errmsg"
	"robostats/storage"
	"time"
	"upper.io/db"
)

type Beat struct {
	ID         bson.ObjectId `bson:"_id,omitempty" json:"id"`
	UserID     bson.ObjectId `bson:"user_id" json:"user_id"`
	ClassID    bson.ObjectId `bson:"class_id" json:"class_id"`
	InstanceID bson.ObjectId `bson:"instance_id" json:"instance_id"`
	SessionID  bson.ObjectId `bson:"session_id" json:"session_id"`
	Data       interface{}   `bson:"data" json:"data"`
	LocalTime  int           `bson:"local_time" json:"local_time"`
	LatLng     []float64     `bson:"latlng"`
	CreatedAt  time.Time     `bson:"created_at" json:"created_at"`
}

const (
	beatCollectionName = "beat"
)

var (
	// BeatCollection is the actual storage reference for beats.
	BeatCollection db.Collection
)

func init() {
	BeatCollection = storage.C(beatCollectionName)
}

// GetByID returns a beat by the given ID.
func GetByID(id bson.ObjectId) (*Beat, error) {
	var err error
	var b Beat

	if id.Valid() == false {
		return nil, errmsg.ErrInvalidID
	}

	res := BeatCollection.Find(db.Cond{
		"_id": id,
	})

	if k, _ := res.Count(); k < 1 {
		return nil, errmsg.ErrNoSuchItem
	}

	if err = res.One(&b); err != nil {
		return nil, err
	}

	return &b, err
}

func (b *Beat) Remove() error {

	if b.ID.Valid() == false {
		return errmsg.ErrInvalidID
	}

	res := BeatCollection.Find(db.Cond{
		"_id": b.ID,
	})

	if k, _ := res.Count(); k < 1 {
		return errmsg.ErrNoSuchItem
	}

	return res.Remove()
}

// Update commits changes to permanent storage.
func (b *Beat) Update() error {
	var err error

	if b.ID.Valid() == false {
		return errmsg.ErrInvalidID
	}

	if err = b.save(); err != nil {
		return err
	}

	return nil
}

// Create adds a new beat to the database.
func (b *Beat) Create() error {
	var err error
	b.ID = bson.ObjectId("")

	if err = b.save(); err != nil {
		return nil
	}

	return nil
}

// save updates or appends a beat.
func (b *Beat) save() error {

	if b.ID.Valid() {
		res := BeatCollection.Find(db.Cond{
			"_id": b.ID,
		})
		return res.Update(b)
	}

	b.CreatedAt = time.Now()

	id, err := BeatCollection.Append(b)

	if err != nil {
		return err
	}

	b.ID = id.(bson.ObjectId)

	return nil
}
