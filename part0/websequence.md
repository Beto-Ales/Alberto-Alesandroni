## 0.4 the user creates a new note

browser->server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note
server-->browser: HTTP status code 302

note over server:
server asks the browser to do a new HTTP GET request
to the address defined in the header's Location - the address notes.
end note

browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
server-->browser: html-code
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
server-->browser: main.css
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
server-->browser: main.js

note over browser:
browser starts executing js-code
that request JSON data from the server
end note

browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
server-->browser: data.json

server-->browser: [{ content: "HTML is easy", date: "2019-05-23" }, ...]

note over browser:
browser executes the event handler
that renders the notes to display
end note

## 0.5 Single page app

browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa
server-->browser: html-code
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
server-->browser: main.css
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
server-->browser: main.js

note over browser:
browser starts executing js-code
that request JSON data from the server
end note

browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
server-->browser: data.json

server-->browser: [{ content: "HTML is easy", date: "2019-05-23" }, ...]

note over browser:
browser executes the event handler
that renders the notes to display
end note

## 0.6 New note

browser->server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa

note over browser:
The POST request to the address new_note_spa contains the new note as JSON-data
containing both the content of the note (content) and the timestamp (date).
The Content-Type header of the request tells the server that
the included data is represented in the JSON format.

server->browser: status code 201 created {"message":"note created"}
