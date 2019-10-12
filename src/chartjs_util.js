
const chart_config = `{
  type: 'bar',
  data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
      }]
  },
  options: {
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }]
      }
  }
}`;

const chart_html = ( chart_id ) => {
  return '<canvas id="' + chart_id + '" width="400" height="400"></canvas>';
};

const chart_js = ( chart_id, chart_config ) => {
  return [
    "var ctx = document.getElementById('"+chart_id+"').getContext('2d');",
    "var myChart = new Chart(ctx, " + chart_config + ");"
  ].join( '' );
} ;

const get_chart = ( chart_id, chart_config ) => {
  return {
    html: chart_html( chart_id ),
    script: chart_js( chart_id, chart_config )
  };
}

module.exports.helloworld_chart = () => {
  // return chart_sample;
  return get_chart( 'chart1', chart_config );
}

module.exports.helloworld = () => {
  console.log( 'helloworld' );
}
