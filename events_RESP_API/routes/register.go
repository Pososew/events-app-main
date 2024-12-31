package routes

import (
	"net/http"
	"strconv"

	"github.com/events/models"
	"github.com/gin-gonic/gin"
)

func registerForEvent(context *gin.Context) {
	userId := context.GetInt64("userId")
	eventId, err := strconv.ParseInt(context.Param("id"), 10, 64)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Could not parse an id."})
		return
	}

	event, err := models.GetEventByID(eventId)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Could not fetch event."})
		return
	}

	err = event.Register(userId)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Could not register user for event."})
		return
	}

	context.JSON(http.StatusCreated, gin.H{"message": "Registered!"})
}

func getRegisteredEvents(context *gin.Context) {
	userId := context.GetInt64("userId")

	events, err := models.GetRegisteredEvents(userId)
	if err != nil {
			context.JSON(http.StatusInternalServerError, gin.H{"message": "Could not fetch registered events."})
			return
	}

	context.JSON(http.StatusOK, gin.H{"events": events})
}

func cancelRegistration(context *gin.Context) {}