#!/usr/bin/env sh

gcloud functions deploy google-trends-crawler --entry-point main_routes --runtime nodejs8 --trigger-http --project louislabs-com
curl -vLk https://us-central1-louislabs-com.cloudfunctions.net/google-trends-crawler/?q=test
