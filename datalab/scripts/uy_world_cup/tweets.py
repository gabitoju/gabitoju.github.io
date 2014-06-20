# -*- coding: utf-8 -*-

import tweepy
import json
from pymongo import MongoClient
import datetime


consumer_key = 'ZQpI2bONoEHejn2oI6CHz9Hn1'
consumer_secret = '6kkfuwMCm7zXZpbOqL0KX3f38q5SAzlWZhgQikKpoZTNk2e6rw'
access_key = '62409525-Jux8Upvu7tzYF2z1duMEzVKiICuo4sTW7ddjZETII'
access_secret = 'rbkMLYgvRwWqmZL6SsYDfjRc78DyxfShhtKpuneRgenHV'
MATCH = 2


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

client = MongoClient()
db = client.wc
tweets = db.tweets


class CustomStreamListener(tweepy.StreamListener):
    def on_status(self, status):
        dict_status = json.loads(status.json)
        dict_status['match'] = MATCH
        tweets.insert(dict_status)

    def on_error(self, status_code):
        print >> sys.stderr, 'Encountered error with status code:', status_code
        return True  # Don't kill the stream

    def on_timeout(self):
        print >> sys.stderr, 'Timeout...'
        return True  # Don't kill the stream

sapi = tweepy.streaming.Stream(auth, CustomStreamListener())
sapi.filter(track=['#URU'])
