#!/bin/bash

export PGPASSWORD='Nodeuser31!'

database = "monstersdb"
echo "Configuring database: $database"

dropdb -U node_user monstersdb
createdb -U node_user monstersdb


psql -U node_user monstersdb < ./bin/sql/monsters.sql


echo "$database configured"