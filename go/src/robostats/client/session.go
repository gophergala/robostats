package client

import (
	"time"
)

type Session struct {
	ID         string      `json:"id"`
	UserID     string      `json:"user_id"`
	ClassID    string      `json:"class_id"`
	InstanceID string      `json:"instance_id"`
	SessionKey string      `json:"session_key"`
	Data       interface{} `json:"data"`
	StartTime  time.Time   `json:"start_time"`
	EndTime    time.Time   `json:"end_time"`
	CreatedAt  time.Time   `json:"created_at"`
}

type sessionEnvelope struct {
	Session Session `json:"deviceSession"`
}

type sessionsEnvelope struct {
	Sessions []Session `json:"deviceSessions"`
}
