# ride-share

For mock APIs have persisted the data to localStorage
At any time to revert to initial Store call `window.resetStore()`

As of now 2 users exists
```1. user,password
 2. admin,password
```
can use these to login
registering new user would add users to existing List

Any rides for one user would be blocked if logging out and logging in from another user

Cannot have more than 1 active ride for a user(need to cancel to make that driver seat available again)

Map can be opened using map icon
Closed when clicking outside
Using free google maps so it shows overlay for dev
