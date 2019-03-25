#!/usr/bin/env bash
# To run this bash script, enter command: ./run.sh
echo 'Generating csv output. This may take a minute.'
sqlite3 zcta.db < zcta.SQL.txt > zcta.OUT.txt
rm zcta.db
echo 'Results sent to docs/data/2017/zcta_out.csv'
