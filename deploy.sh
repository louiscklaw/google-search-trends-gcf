#!/usr/bin/env sh

gcloud functions deploy google-trends-crawler --source ./src  --entry-point main_routes --runtime nodejs8 --trigger-http --project louislabs-com
