// errmsg provides error messages
package errmsg

import (
	"errors"
)

var (
	ErrInvalidID  = errors.New(`Invalid ID.`)
	ErrNoSuchItem = errors.New(`No such item.`)

	ErrNoSuchUser          = errors.New(`No such user.`)
	ErrNoSuchSession       = errors.New(`No such session.`)
	ErrLoginError          = errors.New(`Login error.`)
	ErrPasswordsDoNotMatch = errors.New(`Passwords do not match.`)
	ErrMissingPassword     = errors.New(`Missing password.`)
	ErrMissingEmail        = errors.New(`Missing e-mail.`)
)
