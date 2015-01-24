# Robotstats

## Data types

This is a diagram of the data entities we think we'll use:

![erd](https://cloud.githubusercontent.com/assets/385670/5886012/1402d5b0-a348-11e4-8482-eea04c5a1875.png)

## Basic API rules

See [#2](https://github.com/gophergala/robostats/issues/2).

## API endpoints

### /user/register

Adds a new user to the database.

Input:

* **email**
* **password**

Output:

```json
// Success response
```

```json
// Error response
```

### /user/login

Exchanges a e-mail/password combination for a unique session `token`.

Input:

* **email**
* **password**

Output:

```json
// Success response
```

```json
// Error response
```

### /user/me

Returns the current user's public data.

Input:

* **token**

Output:

```json
// Success response
```

```json
// Error response
```

### /user/logout

Invalidates the current token.

Input:

* **token**

Output:

```json
// Success response
```

```json
// Error response
```

## /classes/create

Creates a class and returns the newly created public class data.

Input:

* **class_name**
* **token**

Output:

```json
// Success response
```

```json
// Error response
```

## /classes/list

Returns a paginated list of classes that the active user has crated.

Input:

* **token**

Output:

```json
// Success response
```

```json
// Error response
```

## /classes/remove

Deletes a class that the user created.

Input:

* **token**
* **class_id**

Output:

```json
// Success response
```

```json
// Error response
```

## /classes/get

Returns a class given its ID. Also returns the list of associated instances.

Input:

* **token**
* **class_id**

Output:

```json
// Success response
```

```json
// Error response
```

## /classes/instances

Returns a paginated list of instances that are associated with a class.

Input:

* **token**
* **class_id**

Output:

```json
// Success response
```

```json
// Error response
```

## /classes/plot/line

Returns a list of points that can be used to represent a line graph.

Input:

* **token**
* **class_id**
* **vertical**
* **horizontal**

Output:

```json
// Success response
```

```json
// Error response
```

## /instance/sessions

Returns a paginated list of sessions that are associated with an instance.

Input:

* **token**
* **instance_id**

Output:

```json
// Success response
```

```json
// Error response
```

## /instance/plot/line

Returns a list of points that can be used to represent a line graph.

Input:

* **token**
* **instance_id**
* **vertical**
* **horizontal**

Output:

```json
// Success response
```

```json
// Error response
```


## /session/events

Returns a paginated list of events that are associated with a session.

Input:

* **token**
* **session_id**

Output:

```json
// Success response
```

```json
// Error response
```

## /session/plot/line

Returns a list of points that can be used to represent a line graph.

Input:

* **token**
* **session_id**
* **vertical**
* **horizontal**

Output:

```json
// Success response
```

```json
// Error response
```

