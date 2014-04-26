/*
The MIT License (MIT)

Copyright (c) 2014 Juan Gabito

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.The MIT License (MIT)

Copyright (c) <year> <copyright holders>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

var data = [];

// Scorers data from Futbol.com.uy. Aditional data available at // http://www.futbol.com.uy/cattablas_857_1.html
var urls = [
	{'competition': 'Apertura 08/09', 'year': 2009, 'url': 'http://www.futbol.com.uy/deportes/apgoleadores.aspx?URUGUAYO,2008,16,1,4'},
	{'competition': 'Clausura 08/09', 'year': 2009, 'url': 'http://www.futbol.com.uy/deportes/apgoleadores.aspx?URUGUAYO,2008,0,0,26'},
	{'competition': 'Apertura 09/10', 'year': 2010, 'url': 'http://www.futbol.com.uy/deportes/apgoleadores.aspx?URUGUAYO,2009,15,1,4'},
	{'competition': 'Clausura 09/10', 'year': 2010, 'url': 'http://www.futbol.com.uy/deportes/apgoleadores.aspx?URUGUAYO,2009,0,0,26'},
	{'competition': 'Apertura 10/11', 'year': 2011, 'url': 'http://www.futbol.com.uy/deportes/apgoleadores.aspx?URUGUAYO,2010,15,1,4'},
	{'competition': 'Clausura 10/11', 'year': 2011, 'url': 'http://www.futbol.com.uy/deportes/apgoleadores.aspx?URUGUAYO,2010,15,2,4'},
	{'competition': 'Apertura 11/12', 'year': 2012, 'url': 'http://www.futbol.com.uy/deportes/apgoleadores.aspx?URUGUAYO,2011,15,1,4'},
	{'competition': 'Clausura 11/12', 'year': 2012, 'url': 'http://www.futbol.com.uy/deportes/apgoleadores.aspx?URUGUAYO,2011,16,2,4'},
	{'competition': 'Apertura 12/13', 'year': 2013, 'url': 'http://www.futbol.com.uy/deportes/apgoleadores.aspx?URUGUAYO,2012,15,1,4'},
	{'competition': 'Clausura 12/13', 'year': 2013, 'url': 'http://www.futbol.com.uy/deportes/apgoleadores.aspx?URUGUAYO,2012,0,0,26'}
];

// CSS class of the rows that contains scorer data
var row_class = '.goleadores_filas';
// Element that contains player name
var player_element = 'h2';
// Element that contains team name
var team_element = 'h3';
// Element that contains scored goals
var goals_element = 'h4';
// CSV path
var csv_path = '../../data/data.csv';

// Parse the page, get player and team data and append it to data.csv
var parse = function(comp_data, err, resp, body) {
	if (err)
		throw err;
	$ = cheerio.load(body);
	var aux_comp = comp_data;

	$(row_class).each(function (i, e) {
		var player = $(e).find(player_element).html();
		var team = $(e).find(team_element).html();
		var goals = $(e).find(goals_element).html();
		
		fs.appendFile(csv_path, aux_comp.year + ',' + aux_comp.competition + ',' + player + ',' + team + ',' + goals + "\r\n");
	});
}

// CSV column headers
fs.appendFile(csv_path, "year,competition,player,team,goals\r\n");

// Get page content and call parse function
var c_urls = urls.length;
for (var i = 0; i < c_urls; i++) {
	var comp_data = urls[i];
	
	request(comp_data.url, parse.bind(null, comp_data));
};
