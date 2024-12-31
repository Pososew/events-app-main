package middlewares

import (
	"net/http"

	"strings"

	"github.com/events/utils"
	"github.com/gin-gonic/gin"
)

func Authenticate(context *gin.Context) {
	token := context.Request.Header.Get("Authorization")

	// Need to remove 'Bearer' prefix for auth
	token = strings.TrimPrefix(token, "Bearer ")
	if token == "" {
		context.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"message": "Not authorized."})
		return
	}

	userId, err := utils.VerifyToken(token)

	if err != nil {
		context.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"message": "Not authorized."})
		return
	}
	context.Set("userId", userId)

	context.Next()
}
