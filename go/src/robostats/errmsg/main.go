// errmsg provides error messages
package errmsg

import (
	"errors"
)

var (
	ErrNoSuchUser    = errors.New(`No such user.`)
	ErrNoSuchSession = errors.New(`No such session.`)
)
