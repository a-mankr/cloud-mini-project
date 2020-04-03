#!/bin/bash

echo "Importing all collections"

mongoimport --db bluffmaster --collection participants --file participants.json
mongoimport --db bluffmaster --collection questions --file questions.json
mongoimport --db bluffmaster --collection votes --file votes.json
mongoimport --db bluffmaster --collection scores --file scores.json
mongoimport --db bluffmaster --collection variables --file variables.json
   