#!/usr/bin/env bash

export PGPASSWORD='iloveyoumore2021'

database="weddingdb"

echo "Configuring database: $database"

dropdb -U oneinabullion weddingdb
createdb -U oneinabullion weddingdb

psql -U oneinabullion weddingdb < ./bin/sql/weddingdb.sql

echo "$database configured"
