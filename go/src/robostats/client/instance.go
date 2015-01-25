package client

import (
	"time"
)

type Instance struct {
	ID        string      `json:"id"`
	UserID    string      `json:"user_id"`
	ClassID   string      `json:"class_id"`
	Data      interface{} `json:"data"`
	CreatedAt time.Time   `json:"created_at"`
}

type instanceEnvelope struct {
	Instance Instance `json:"deviceInstance"`
}

type instancesEnvelope struct {
	Instances []Instance `json:"deviceInstances"`
}
