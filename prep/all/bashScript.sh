#!/usr/bin/env bash
sqlite3 zcta.db < zcta.SQL.txt > zcta.OUT.txt
rm zcta.db
