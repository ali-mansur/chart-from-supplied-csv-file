chartObject = {
	chart: {
		type: 'line'
	},
	title: {
		text: 'Fission lab assignment'
	},
	subtitle: {
		text: 'submitted by Mansur'
	},
	xAxis: {
		categories: []
	},
	yAxis: {
		title: {
			text: 'Score'
		}
	},
	plotOptions: {
		line: {
			dataLabels: {
				enabled: true
			},
			enableMouseTracking: false
		}
	},
	series: [
	]
}

function handleFiles(files) {
	// Check for the various File API support.
	if (window.FileReader) {
		// FileReader are supported.
		getAsText(files[0]);
	} else {
		alert('FileReader are not supported in this browser.');
	}
}

function getAsText(fileToRead) {
	var reader = new FileReader();
	// Handle errors load
	reader.onload = loadHandler;
	reader.onerror = errorHandler;
	// Read file into memory as UTF-8      
	reader.readAsText(fileToRead);
}

function loadHandler(event) {
	var csv = event.target.result;
	processData(csv);             
}

function processData(csv) {
    var allTextLines = csv.split(/\r\n|\n/);
    var lines = [];
    while (allTextLines.length) {
        lines.push(allTextLines.shift().split(','));
    }
	prepareChartObject(lines);
}

function prepareChartObject(rows) {
	chartObject.series = [];
	let categories = [];
	let data = [];
	for (let i = 0; i < rows.length; i++) {
		data = [];
		for (let j = 1; j < rows[i].length; j++) {
			categories.push(rows[i][j].split("|")[0])
			data.push(Number(rows[i][j].split("|")[1]));
		}
		chartObject.series.push({
			name: rows[i][0],
			data: data
		})
	}

	chartObject.xAxis.categories = categories.filter((elem, pos, arr) => arr.indexOf(elem) == pos);
	Highcharts.chart('chart-container', chartObject);
	console.log("Chart Object", chartObject);
}

function errorHandler(evt) {
	if(evt.target.error.name == "NotReadableError") {
		alert("Canno't read file !");
	}
}
