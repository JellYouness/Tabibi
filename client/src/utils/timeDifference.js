export default function timeDifference(previous) {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    var dateTime = date + ' ' + time;
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = dateTime - previous;
    console.log(elapsed);

    if (elapsed < msPerMinute) {
        return 'il y a ' + Math.round(elapsed / 1000) + ' seconds';
    } else if (elapsed < msPerHour) {
        return 'il y a ' + Math.round(elapsed / msPerMinute) + ' minutes';
    } else if (elapsed < msPerDay) {
        return 'il y a ' + Math.round(elapsed / msPerHour) + ' heures';
    } else if (elapsed < msPerMonth) {
        return 'approximately ' + Math.round(elapsed / msPerDay) + ' jours';
    } else if (elapsed < msPerYear) {
        return 'approximately ' + Math.round(elapsed / msPerMonth) + ' mois';
    } else {
        return 'approximately ' + Math.round(elapsed / msPerYear) + ' années';
    }
}
