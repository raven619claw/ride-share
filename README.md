# ride-share

For mock APIs have persisted the data to localStorage instead of creating a Node server to handle Calls

All data calls are promise based

At any time to revert to initial Store call `window.resetStore()`

To run it locally create a simple http server 

Have deployed it on: https://naughty-kirch-36042c.netlify.app/home.html

As of now 2 users exists
```
 1. username: user, password: password
 2. username: admin,password: password
```
can use these to login


registering new user would add users to existing List

for new users username is `fullname`

to see the current data key is `window.store`

Assuming Validations are handled 

Any active ride for one user would be blocked for another user

Availability of cars is based on vacant seats (so for multiple seats same car can be in active and available state)

Cannot have more than 1 active ride for a user(need to cancel to make that driver seat available again)

Map can be opened using map icon

Closed when clicking outside

Using free google maps so it shows overlay for dev

Both SCSS and CSS files are committed so as it runs on netlify
