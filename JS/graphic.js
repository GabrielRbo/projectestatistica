     
  //COMEÇO DO GRÁFICO
	var graphic = document.getElementById('myChart').getContext('2d');

	var myChart = new Chart(graphic, {
		type: 'bar',
		data: {
			datasets: [{
				label: "Qualitativa Nominal",
				data: vetorGrafico,
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)',
					'rgba(85, 129, 69, 0.2)'
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)',
					'rgba(85, 129, 69, 0.2)'
				],
				borderWidth: 1
			}],
			labels: ['arroz','arroz','arroz'],
		},
		options: {
			scales: {
				yAxes: [{
					display: true,
				ticks: {
				beginAtZero: true
				}
				}]
			}
		}
	});