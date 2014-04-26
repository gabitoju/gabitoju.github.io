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

var toHierarchy = function(csv, prmYear) {
	var root = {'name': 'competitions', 'children': []};

	for (var i = 0; i < csv.length; i++) {

		var year = csv[i]['year'];
		if (prmYear != null && year != prmYear)
			continue;
		
		var foundYear = false;
		var children = root.children;
		var child = null;
		var len = children.length;
		
		for (var j = 0; j < len; j++) {
			if (children[j]['name'] == year) {
				child = children[j];
				foundYear = true;
				break;
			}
		}
		
		if (!foundYear) {
			child = {'name': year, 'children': []};
			root.children.push(child);
		}

		var foundCompetition = false;
		var competition = csv[i]['competition'];
		var childc = null;

		var lenk = child.children.length;
		for (var k = 0; k < lenk; k++) {
			if (child.children[k]['name'] == competition) {
				foundCompetition = true;
				childc = child.children[k];
				break;
			}
		}

		if (!foundCompetition) {
			childc = {'name': competition, 'children': []};
			child.children.push(childc);
		}

		var foundTeam = false;
		var team = csv[i]['team'];
		var childt = null;

		var lenh = childc.children.length;
		for (var h = 0; h < lenh; h++) {
			if (childc.children[h]['name'] == team) {
				foundTeam = true;
				childt = childc.children[h];
				break;
			}
		}

		if (!foundTeam) {
			childt = {'name': team, 'children': []};
			childc.children.push(childt);
		}

		var foundPlayer = false;
		var player = csv[i]['player'];
		var childp = null;

		var lenm = childt.children.length;
		for (var m = 0; m < lenm; m++) {
			if (childt.children[m]['name'] == player) {
				foundPlayer = true;
				childp = childt.children[m];
				break;
			}
		}

		if (!foundPlayer) {
			childp = {'name': player, 'goals': csv[i]['goals']};
			childt.children.push(childp);
		}
	}
	
	return root;
}
