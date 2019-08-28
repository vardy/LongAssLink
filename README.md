# LongAssLink

> Because some links just aren't long enough.

Lengthen your links at https://longasslink.com/

## Dependencies and Testing

### Build and start (Docker)

```
$ docker-compose up --build
```

### Build and start

```
$ npm install
$ npm start
```

### Run tests

```
$ npm install
$ npm install nodeunit -g
$ nodeunit test/
```

## Architecture

```
 Docker Container       Port mapping: 3500(host):3500(container)
+---------------------------------------------------------------+
|                                                               |
|                                                               |
|    +--------------------+                                     |
|    |/bin/www.js         |                                     |
|    |                    |                                     |
|    |Startup entrypoint  |                                     |
|    |                    |                                     |
|    +----------+---------+                                     |
|               |                                               |
|               |                                               |
|               |                                               |
|               v                                               |
|    +----------+-----------+                                   |
|    |/lib/app.js           |                                   |
|    |                      |                                   |
|    |Initialise Express    |                                   |
|    |routes and middleware |                                   |
|    +---+---+-----+---+----+                                   |
|        |   |     |   |                                        |
|        |   |     |   v                                        |
|        |   |     |   Attach middleware                        |
|        |   |     v                                            |
|        |   |     Serve error messages                         |
|        |   v                                                  |
|        |   Parse Stylus into CSS                              |
|        |   Use Jade rendering engine                          |
|        |   for views.                                         |
|        |                                                      |
|        v                                                      |
|    +---+---+---------------------------------------------+    |
|    |Routes |                                             |    |
|    |       |  /routes/index.js                           |    |
|    +-------+    GET  --> Retrieve desired URL and 301    |    |
|    |            POST --> Generate URL and return to page |    |
|    |                                                     |    |
|    |                                                     |    |
|    |                                                     |    |
|    |                                                     |    |
|    |                                                     |    |
|    |                                                     |    |
|    |                                                     |    |
|    |                                                     |    |
|    +-----------------------------------------------------+    |
|                                                               |
|                                                               |
|                                                               |
+---------------------------------------------------------------+

```