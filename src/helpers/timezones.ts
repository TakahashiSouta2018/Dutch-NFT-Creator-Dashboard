import moment from 'moment-timezone';

export default function getTimezones() {
  var timeZones = moment.tz.names();
  var offsetTmz = [];

  for (var i in timeZones) {
    offsetTmz.push(
      ' (GMT' + moment.tz(timeZones[i]).format('Z') + ') ' + timeZones[i]
    );
  }

  return offsetTmz;
}
