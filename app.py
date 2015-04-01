import os

from flask import Flask, render_template, request

import requests

app = Flask(__name__, instance_relative_config=True)
# Get default config (main app dir config.py)
app.config.from_object('config')
# Get instance config (hidden from git, is in app dir/instance/config.py)
app.config.from_pyfile('config.py')
# Get keys from the config (not tracked by source)
OBA_KEY = app.config['OBA_KEY']
MAPBOX_TOKEN = app.config['MAPBOX_TOKEN']


@app.route('/', methods=['GET'])
def index():
    location_args = {}
    if 'stop_id' in request.args:
        try:
            # TODO: validate input data and don't explode if it's invalid
            # TODO: This only works for the puget sound region (the 1_ prefix)
            stop_id = "1_" + str(request.args.get('stop_id'))
            # Find the LatLng of the stop's ID
            oba_url = 'http://api.pugetsound.onebusaway.org/api'
            r = requests.get('{}/where/stop/{}.json'.format(oba_url, stop_id),
                             params={'key': OBA_KEY})
            data_entry = r.json()['data']['entry']
            location_args['lat'] = data_entry['lat']
            location_args['lon'] = data_entry['lon']
        except:
            # FIXME: Fail gracefully and catch a proper exception
            pass

    return render_template('index.html', location_args=location_args,
                           mapbox_token=MAPBOX_TOKEN)


@app.route('/report')
def report():
    return render_template('report.html')


@app.route('/report-construction')
def construction():
    return render_template('report-construction.html')


@app.route('/report-incline')
def incline():
    return render_template('report-incline.html')


@app.route('/report-elevator')
def elevator():
    return render_template('report-elevator.html')


@app.route('/report-ramp')
def ramp():
    return render_template('report-ramp.html')


@app.route('/report-stairs')
def stairs():
    return render_template('report-stairs.html')


@app.route('/report-other')
def other():
    return render_template('report-other.html')


@app.route('/report-submitted')
def submit():
    return render_template('report-submitted.html')


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
