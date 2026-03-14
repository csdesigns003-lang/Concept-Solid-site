const ctx = document.getElementById('pressureChart');

new Chart(ctx, {

type: 'line',

data: {

labels: ['1','2','3','4','5','6'],

datasets: [{

label: 'Pressure PSI',

data: [100,102,98,101,99,100],

borderColor: 'blue',

tension:0.3

}]

}

});
