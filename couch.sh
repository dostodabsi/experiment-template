#!/bin/bash

# run this after your experiment has finished
# gets the data from CouchDB, prettifies it and saves it in a file
url=$(heroku config:get CLOUDANT_URL)
curl "$url/bakk/_design/bakk/_view/getAll" | python -mjson.tool > data.json
