var cmd = require('node-cmd');
var sleep = require('sleep');

var p = process.argv[2];
var u = process.argv[3];

var dates = [
    'YYYY-MM-DD'
];

for (var i = dates.length - 1; i >= 0; i--) {
    cmd.run('echo "'+p+'" | sudo -S date --set="' + dates[i] + ' 10:05:59.990"');
    cmd.get('date', function (data) {
        console.log(data);
    });

    cmd.run('touch runners/' + dates[i] + u);
    cmd.get(
        `   git add .
            git commit -m "` + dates[i] + u + `"
            git push origin master
        `,
        function (data) {
            console.log(data);
        }
    );

    cmd.run('sleep 5');
}