package client

import (
	"log"
	"testing"
)

func TestClientLogin(t *testing.T) {
	var err error

	client := Client{
		Email:    "user@example.com",
		Password: "pass",
	}

	if err = client.Login(); err != nil {
		t.Fatal(err)
	}

	var classes []Class
	if classes, err = client.GetClasses(); err != nil {
		t.Fatal(err)
	}

	for _, class := range classes {
		// Add new instance
		if _, err = client.RegisterInstance(class.ID, map[string]string{"foo": "bar"}); err != nil {
			t.Fatal(err)
		}

		// List instances.
		var instances []Instance
		if instances, err = client.GetInstancesByClassID(class.ID); err != nil {
			t.Log(err)
		}
		for _, instance := range instances {
			var sessions []Session
			if sessions, err = client.GetSessionsByInstanceID(instance.ID); err != nil {
				t.Log(err)
			}
			log.Printf("sessions: %v\n", sessions)
		}
	}

}
