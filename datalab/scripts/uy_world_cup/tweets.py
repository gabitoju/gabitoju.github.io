# -*- coding: utf-8 -*-

import tweepy
import json
import datetime
import sys
from elasticsearch import Elasticsearch
#from pymongo import MongoClient


consumer_key = 'ZQpI2bONoEHejn2oI6CHz9Hn1'
consumer_secret = '6kkfuwMCm7zXZpbOqL0KX3f38q5SAzlWZhgQikKpoZTNk2e6rw'
access_key = '62409525-Jux8Upvu7tzYF2z1duMEzVKiICuo4sTW7ddjZETII'
access_secret = 'rbkMLYgvRwWqmZL6SsYDfjRc78DyxfShhtKpuneRgenHV'
MATCH = 4


@classmethod
def parse(cls, api, raw):
    status = cls.first_parse(api, raw)
    setattr(status, 'json', json.dumps(raw))
    return status

tweepy.models.Status.first_parse = tweepy.models.Status.parse
tweepy.models.Status.parse = parse

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_key, access_secret)
api = tweepy.API(auth)
es = Elasticsearch()

#client = MongoClient()
#db = client.wc
#tweets = db.tweets


class CustomStreamListener(tweepy.StreamListener):
    def on_status(self, status):
        dict_status = json.loads(status.json)
        dict_status['match'] = MATCH
        es.index(index="tweets", doc_type="tweet", body=dict_status)
        #tweets.insert(dict_status)

    def on_error(self, status_code):
        print >> sys.stderr, 'Encountered error with status code:', status_code
        return True

    def on_timeout(self):
        print >> sys.stderr, 'Timeout...'
        return True

while 1 == 1:
    try:
        sapi = tweepy.streaming.Stream(auth, CustomStreamListener())
        sapi.filter(track=['#URU',])
    except:
        pass
