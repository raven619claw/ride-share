# ride-share

For mock APIs have persisted the data to localStorage
At any time to revert to initial Store call `window.resetStore()`

As of now 2 users exists
```
 1. username: user, password: password
 2. username: admin,password: password
```
can use these to login
registering new user would add users to existing List

Assuming Validations are handled 

Any active ride for one user would be blocked for another user

Cannot have more than 1 active ride for a user(need to cancel to make that driver seat available again)

Map can be opened using map icon
Closed when clicking outside
Using free google maps so it shows overlay for dev
