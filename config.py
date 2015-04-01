import os


try:
    MAPBOX_TOKEN = os.environ['MAPBOX_TOKEN']
except KeyError:
    pass


try:
    OBA_KEY = os.environ['OBA_KEY']
except KeyError:
    pass


DEBUG = True
