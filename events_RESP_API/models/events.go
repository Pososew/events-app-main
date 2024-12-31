package models

import (
	"time"

	"github.com/events/db"
)

type Registration struct {
	EventID int64
	UserID  int64
}

type Event struct {
	ID          int64
	Title       string    `binding:"required"`
	Description string    `binding:"required"`
	Location    string    `binding:"required"`
	DateTime    time.Time `binding:"required"`
	UserID      int64
}

var events = []Event{}

func (s *Event) Save() error {
	query := `
	INSERT INTO events(name, description, location, dateTime, user_id) 
	VALUES (?, ?, ?, ?, ?)`
	stmt, err := db.DB.Prepare(query)

	if err != nil {
		return err
	}
	defer stmt.Close()
	result, err := stmt.Exec(s.Title, s.Description, s.Location, s.DateTime, s.UserID)

	if err != nil {
		return err
	}

	id, err := result.LastInsertId()
	s.ID = id

	return err
}

func GetAllEvents() ([]Event, error) {
	query := "SELECT * FROM events"
	rows, err := db.DB.Query(query)

	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var events []Event

	for rows.Next() {
		var event Event
		err := rows.Scan(&event.ID, &event.Title, &event.Description, &event.Location, &event.DateTime, &event.UserID)

		if err != nil {
			return nil, err
		}

		events = append(events, event)
	}

	return events, nil
}

func GetEventByID(id int64) (*Event, error) {
	query := "SELECT * FROM events WHERE id = ?"
	row := db.DB.QueryRow(query, id)

	var event Event
	err := row.Scan(&event.ID, &event.Title, &event.Description, &event.Location, &event.DateTime, &event.UserID)

	if err != nil {
		return nil, err
	}

	return &event, nil
}

func (s *Event) Update() error {
	query := `
	UPDATE events
	SET name = ?, description = ?, location = ?, dateTime = ?
	WHERE id = ?
	`

	stmt, err := db.DB.Prepare(query)

	if err != nil {
		return err
	}

	defer stmt.Close()

	_, err = stmt.Exec(s.Title, s.Description, s.Location, s.DateTime, s.ID)
	return err
}

func (s *Event) Delete() error {
	query := "DELETE FROM events WHERE id = ?"

	stmt, err := db.DB.Prepare(query)
	if err != nil {
		return err
	}

	defer stmt.Close()

	_, err = stmt.Exec(s.ID)
	return err
}

func (s *Event) Register(userId int64) error {
	query := "INSERT INTO registration(event_id, user_id) VALUES (?, ?)"
	stmt, err := db.DB.Prepare(query)
	if err != nil {
		return err
	}

	defer stmt.Close()

	_, err = stmt.Exec(s.ID, userId)
	return nil
}

func GetRegisteredEvents(userId int64) ([]Registration, error) {
	query := `
		SELECT r.event_id, r.user_id
		FROM registration r
		WHERE r.user_id = ?
	`

	rows, err := db.DB.Query(query, userId)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var registrations []Registration
	for rows.Next() {
		var registration Registration
		if err := rows.Scan(&registration.EventID, &registration.UserID); err != nil {
			return nil, err
		}
		registrations = append(registrations, registration)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return registrations, nil
}

func GetEventsByUserID(userId int64) ([]Event, error) {
	query := "SELECT * FROM events WHERE user_id = ?"
	rows, err := db.DB.Query(query, userId)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var userEvents []Event
	for rows.Next() {
		var e Event
		err := rows.Scan(&e.ID, &e.Title, &e.Description, &e.Location, &e.DateTime, &e.UserID)
		if err != nil {
			return nil, err
		}
		userEvents = append(userEvents, e)
	}
	return userEvents, nil
}
