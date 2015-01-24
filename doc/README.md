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

```json
// Success response
```

```json
// Error response
```

### /user/login

Exchanges a e-mail/password combination for a unique session `token`.

* **email**
* **password**

```json
// Success response
```

```json
// Error response
```

### /user/me

Returns the current user's public data.

* **token**

```json
// Success response
```

```json
// Error response
```


