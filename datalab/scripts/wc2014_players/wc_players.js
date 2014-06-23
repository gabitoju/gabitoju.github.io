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
var httpsync = require('httpsync');
var cheerio = require('cheerio');
var fs = require('fs');

var CONTINENTS = {
    'URU': 'América',
    'USA': 'América',
    'CHI': 'América',
    'COL': 'América',
    'ECU': 'América',
    'CRC': 'América',
    'HON': 'América',
    'MEX': 'América',
    'BRA': 'América',
    'ARG': 'América',
    'CAN': 'América',
    'AUS': 'Oceanía',
    'JPN': 'Asia',
    'KOR': 'Asia',
    'IRN': 'Asia',
    'QAT': 'Asia',
    'CHN': 'Asia',
    'UAE': 'Asia',
    'TUN': 'África',
    'RSA': 'África',
    'CMR': 'África',
    'NGA': 'África',
    'GHA': 'África',
    'CIV': 'África',
    'ALG': 'África',
    'AUT': 'Europa',
    'BUL': 'Europa',
    'ENG': 'Europa',
    'BEL': 'Europa',
    'NED': 'Europa',
    'FRA': 'Europa',
    'ESP': 'Europa',
    'POR': 'Europa',
    'GER': 'Europa',
    'SUI': 'Europa',
    'ITA': 'Europa',
    'CRO': 'Europa',
    'BIH': 'Europa',
    'GRE': 'Europa',
    'RUS': 'Europa',
    'TUR': 'Europa',
    'HUN': 'Europa',
    'UKR': 'Europa',
    'SWE': 'Europa',
    'WAL': 'Europa',
    'NOR': 'Europa',
    'DEN': 'Europa',
};

var TEAMS = [
        {"type":"teams","title":"Teams","type_link":"/worldcup/teams/index.html","idteam":"43843","webname":"Algeria","countrycode":"ALG","idgroup":"255947","groupname":"Group H","groupnameabbr":"H","link":"/worldcup/teams/team=43843/index.html"},{"type":"teams","title":"Teams","type_link":"/worldcup/teams/index.html","idteam":"43922","webname":"Argentina","countrycode":"ARG","idgroup":"255943","groupname":"Group F","groupnameabbr":"F","link":"/worldcup/teams/team=43922/index.html"},{"type":"teams","title":"Teams","type_link":"/worldcup/teams/index.html","idteam":"43976","webname":"Australia","countrycode":"AUS","idgroup":"255935","groupname":"Group B","groupnameabbr":"B","link":"/worldcup/teams/team=43976/index.html"},{"type":"teams","title":"Teams","type_link":"/worldcup/teams/index.html","idteam":"43935","webname":"Belgium","countrycode":"BEL","idgroup":"255947","groupname":"Group H","groupnameabbr":"H","link":"/worldcup/teams/team=43935/index.html"},{"type":"teams","title":"Teams","type_link":"/worldcup/teams/index.html","idteam":"44037","webname":"Bosnia and Herzegovina","countrycode":"BIH","idgroup":"255943","groupname":"Group F","groupnameabbr":"F","link":"/worldcup/teams/team=44037/index.html"},{"type":"teams","title":"Teams","type_link":"/worldcup/teams/index.html","idteam":"43924","webname":"Brazil","countrycode":"BRA","idgroup":"255933","groupname":"Group A","groupnameabbr":"A","link":"/worldcup/teams/team=43924/index.html"},{"type":"teams","title":"Teams","type_link":"/worldcup/teams/index.html","idteam":"43849","webname":"Cameroon","countrycode":"CMR","idgroup":"255933","groupname":"Group A","groupnameabbr":"A","link":"/worldcup/teams/team=43849/index.html"},{"type":"teams","title":"Teams","type_link":"/worldcup/teams/index.html","idteam":"43925","webname":"Chile","countrycode":"CHI","idgroup":"255935","groupname":"Group B","groupnameabbr":"B","link":"/worldcup/teams/team=43925/index.html"},{"type":"teams","title":"Teams","type_link":"/worldcup/teams/index.html","idteam":"43926","webname":"Colombia","countrycode":"COL","idgroup":"255937","groupname":"Group C","groupnameabbr":"C","link":"/worldcup/teams/team=43926/index.html"},{"type":"teams","title":"Teams","type_link":"/worldcup/teams/index.html","idteam":"43901","webname":"Costa Rica","countrycode":"CRC","idgroup":"255939","groupname":"Group D","groupnameabbr":"D","link":"/worldcup/teams/team=43901/index.html"},{"type":"teams","title":"Teams","type_link":"/worldcup/teams/index.html","idteam":"43854","webname":"Côte d'Ivoire","countrycode":"CIV","idgroup":"255937","groupname":"Group C","groupnameabbr":"C","link":"/worldcup/teams/team=43854/index.html"},{"type":"teams","title":"Teams","type_link":"/worldcup/teams/index.html","idteam":"43938","webname":"Croatia","countrycode":"CRO","idgroup":"255933","groupname":"Group A","groupnameabbr":"A","link":"/worldcup/teams/team=43938/index.html"},{"type":"teams","title":"Teams","type_link":"/worldcup/teams/index.html","idteam":"43927","webname":"Ecuador","countrycode":"ECU","idgroup":"255941","groupname":"Group E","groupnameabbr":"E","link":"/worldcup/teams/team=43927/index.html"},{"type":"teams","title":"Teams","type_link":"/worldcup/teams/index.html","idteam":"43942","webname":"England","countrycode":"ENG","idgroup":"255939","groupname":"Group D","groupnameabbr":"D","link":"/worldcup/teams/team=43942/index.html"},{"type":"teams","title":"Teams","type_link":"/worldcup/teams/index.html","idteam":"43946","webname":"France","countrycode":"FRA","idgroup":"255941","groupname":"Group E","groupnameabbr":"E","link":"/worldcup/teams/team=43946/index.html"},{"type":"teams","title":"Teams","type_link":"/worldcup/teams/index.html","idteam":"43948","webname":"Germany","countrycode":"GER","idgroup":"255945","groupname":"Group G","groupnameabbr":"G","link":"/worldcup/teams/team=43948/index.html"},{"type":"teams","title":"Teams","type_link":"/worldcup/teams/index.html","idteam":"43860","webname":"Ghana","countrycode":"GHA","idgroup":"255945","groupname":"Group G","groupnameabbr":"G","link":"/worldcup/teams/team=43860/index.html"},{"type":"teams","title":"Teams","type_link":"/worldcup/teams/index.html","idteam":"43949","webname":"Greece","countrycode":"GRE","idgroup":"255937","groupname":"Group C","groupnameabbr":"C","link":"/worldcup/teams/team=43949/index.html"},{"type":"teams","title":"Teams","type_link":"/worldcup/teams/index.html","idteam":"43909","webname":"Honduras","countrycode":"HON","idgroup":"255941","groupname":"Group E","groupnameabbr":"E","link":"/worldcup/teams/team=43909/index.html"},{"type":"teams","title":"Teams","type_link":"/worldcup/teams/index.html","idteam":"43817","webname":"Iran","countrycode":"IRN","idgroup":"255943","groupname":"Group F","groupnameabbr":"F","link":"/worldcup/teams/team=43817/index.html"},{"type":"teams","title":"Teams","type_link":"/worldcup/teams/index.html","idteam":"43954","webname":"Italy","countrycode":"ITA","idgroup":"255939","groupname":"Group D","groupnameabbr":"D","link":"/worldcup/teams/team=43954/index.html"},{"type":"teams","title":"Teams","type_link":"/worldcup/teams/index.html","idteam":"43819","webname":"Japan","countrycode":"JPN","idgroup":"255937","groupname":"Group C","groupnameabbr":"C","link":"/worldcup/teams/team=43819/index.html"},{"type":"teams","title":"Teams","type_link":"/worldcup/teams/index.html","idteam":"43822","webname":"Korea Republic","countrycode":"KOR","idgroup":"255947","groupname":"Group H","groupnameabbr":"H","link":"/worldcup/teams/team=43822/index.html"},{"type":"teams","title":"Teams","type_link":"/worldcup/teams/index.html","idteam":"43911","webname":"Mexico","countrycode":"MEX","idgroup":"255933","groupname":"Group A","groupnameabbr":"A","link":"/worldcup/teams/team=43911/index.html"},{"type":"teams","title":"Teams","type_link":"/worldcup/teams/index.html","idteam":"43960","webname":"Netherlands","countrycode":"NED","idgroup":"255935","groupname":"Group B","groupnameabbr":"B","link":"/worldcup/teams/team=43960/index.html"},{"type":"teams","title":"Teams","type_link":"/worldcup/teams/index.html","idteam":"43876","webname":"Nigeria","countrycode":"NGA","idgroup":"255943","groupname":"Group F","groupnameabbr":"F","link":"/worldcup/teams/team=43876/index.html"},{"type":"teams","title":"Teams","type_link":"/worldcup/teams/index.html","idteam":"43963","webname":"Portugal","countrycode":"POR","idgroup":"255945","groupname":"Group G","groupnameabbr":"G","link":"/worldcup/teams/team=43963/index.html"},{"type":"teams","title":"Teams","type_link":"/worldcup/teams/index.html","idteam":"43965","webname":"Russia","countrycode":"RUS","idgroup":"255947","groupname":"Group H","groupnameabbr":"H","link":"/worldcup/teams/team=43965/index.html"},{"type":"teams","title":"Teams","type_link":"/worldcup/teams/index.html","idteam":"43969","webname":"Spain","countrycode":"ESP","idgroup":"255935","groupname":"Group B","groupnameabbr":"B","link":"/worldcup/teams/team=43969/index.html"},{"type":"teams","title":"Teams","type_link":"/worldcup/teams/index.html","idteam":"43971","webname":"Switzerland","countrycode":"SUI","idgroup":"255941","groupname":"Group E","groupnameabbr":"E","link":"/worldcup/teams/team=43971/index.html"},{"type":"teams","title":"Teams","type_link":"/worldcup/teams/index.html","idteam":"43930","webname":"Uruguay","countrycode":"URU","idgroup":"255939","groupname":"Group D","groupnameabbr":"D","link":"/worldcup/teams/team=43930/index.html"},{"type":"teams","title":"Teams","type_link":"/worldcup/teams/index.html","idteam":"43921","webname":"USA","countrycode":"USA","idgroup":"255945","groupname":"Group G","groupnameabbr":"G","link":"/worldcup/teams/team=43921/index.html"}
    ];


var TEMPLATE_URL = 'http://www.fifa.com/worldcup/edition=2014/_final/teams/team=${team}/library/edition2014/_players/_players_list.html';

var teams_html = '<div class="megamenu-allflags"><ul><li class="item-1" data-idteam="43843"><a href="/worldcup/teams/team=43843/index.html" title="Algeria"><img alt="Algeria" src="http://img.fifa.com/images/flags/2/alg.png" data-src="http://img.fifa.com/images/flags/2/alg.png" class="flag"><span class="team-name">Algeria</span></a></li><li class="item-2" data-idteam="43922"><a href="/worldcup/teams/team=43922/index.html" title="Argentina"><img alt="Argentina" src="http://img.fifa.com/images/flags/2/arg.png" data-src="http://img.fifa.com/images/flags/2/arg.png" class="flag"><span class="team-name">Argentina</span></a></li><li class="item-3" data-idteam="43976"><a href="/worldcup/teams/team=43976/index.html" title="Australia"><img alt="Australia" src="http://img.fifa.com/images/flags/2/aus.png" data-src="http://img.fifa.com/images/flags/2/aus.png" class="flag"><span class="team-name">Australia</span></a></li><li class="item-4" data-idteam="43935"><a href="/worldcup/teams/team=43935/index.html" title="Belgium"><img alt="Belgium" src="http://img.fifa.com/images/flags/2/bel.png" data-src="http://img.fifa.com/images/flags/2/bel.png" class="flag"><span class="team-name">Belgium</span></a></li><li class="item-5" data-idteam="44037"><a href="/worldcup/teams/team=44037/index.html" title="Bosnia and Herzegovina"><img alt="Bosnia and Herzegovina" src="http://img.fifa.com/images/flags/2/bih.png" data-src="http://img.fifa.com/images/flags/2/bih.png" class="flag"><span class="team-name">Bosnia and Herzegovina</span></a></li><li class="item-6" data-idteam="43924"><a href="/worldcup/teams/team=43924/index.html" title="Brazil"><img alt="Brazil" src="http://img.fifa.com/images/flags/2/bra.png" data-src="http://img.fifa.com/images/flags/2/bra.png" class="flag"><span class="team-name">Brazil</span></a></li><li class="item-7" data-idteam="43849"><a href="/worldcup/teams/team=43849/index.html" title="Cameroon"><img alt="Cameroon" src="http://img.fifa.com/images/flags/2/cmr.png" data-src="http://img.fifa.com/images/flags/2/cmr.png" class="flag"><span class="team-name">Cameroon</span></a></li><li class="item-8" data-idteam="43925"><a href="/worldcup/teams/team=43925/index.html" title="Chile"><img alt="Chile" src="http://img.fifa.com/images/flags/2/chi.png" data-src="http://img.fifa.com/images/flags/2/chi.png" class="flag"><span class="team-name">Chile</span></a></li></ul><ul class="col-2"><li class="item-9" data-idteam="43926"><a href="/worldcup/teams/team=43926/index.html" title="Colombia"><img alt="Colombia" src="http://img.fifa.com/images/flags/2/col.png" data-src="http://img.fifa.com/images/flags/2/col.png" class="flag"><span class="team-name">Colombia</span></a></li><li class="item-10" data-idteam="43901"><a href="/worldcup/teams/team=43901/index.html" title="Costa Rica"><img alt="Costa Rica" src="http://img.fifa.com/images/flags/2/crc.png" data-src="http://img.fifa.com/images/flags/2/crc.png" class="flag"><span class="team-name">Costa Rica</span></a></li><li class="item-11" data-idteam="43854"><a href="/worldcup/teams/team=43854/index.html" title="Côte d\'Ivoire"><img alt="Côte d\'Ivoire" src="http://img.fifa.com/images/flags/2/civ.png" data-src="http://img.fifa.com/images/flags/2/civ.png" class="flag"><span class="team-name">Côte d\'Ivoire</span></a></li><li class="item-12" data-idteam="43938"><a href="/worldcup/teams/team=43938/index.html" title="Croatia"><img alt="Croatia" src="http://img.fifa.com/images/flags/2/cro.png" data-src="http://img.fifa.com/images/flags/2/cro.png" class="flag"><span class="team-name">Croatia</span></a></li><li class="item-13" data-idteam="43927"><a href="/worldcup/teams/team=43927/index.html" title="Ecuador"><img alt="Ecuador" src="http://img.fifa.com/images/flags/2/ecu.png" data-src="http://img.fifa.com/images/flags/2/ecu.png" class="flag"><span class="team-name">Ecuador</span></a></li><li class="item-14" data-idteam="43942"><a href="/worldcup/teams/team=43942/index.html" title="England"><img alt="England" src="http://img.fifa.com/images/flags/2/eng.png" data-src="http://img.fifa.com/images/flags/2/eng.png" class="flag"><span class="team-name">England</span></a></li><li class="item-15" data-idteam="43946"><a href="/worldcup/teams/team=43946/index.html" title="France"><img alt="France" src="http://img.fifa.com/images/flags/2/fra.png" data-src="http://img.fifa.com/images/flags/2/fra.png" class="flag"><span class="team-name">France</span></a></li><li class="item-16" data-idteam="43948"><a href="/worldcup/teams/team=43948/index.html" title="Germany"><img alt="Germany" src="http://img.fifa.com/images/flags/2/ger.png" data-src="http://img.fifa.com/images/flags/2/ger.png" class="flag"><span class="team-name">Germany</span></a></li></ul><ul class="col-3"><li class="item-17" data-idteam="43860"><a href="/worldcup/teams/team=43860/index.html" title="Ghana"><img alt="Ghana" src="http://img.fifa.com/images/flags/2/gha.png" data-src="http://img.fifa.com/images/flags/2/gha.png" class="flag"><span class="team-name">Ghana</span></a></li><li class="item-18" data-idteam="43949"><a href="/worldcup/teams/team=43949/index.html" title="Greece"><img alt="Greece" src="http://img.fifa.com/images/flags/2/gre.png" data-src="http://img.fifa.com/images/flags/2/gre.png" class="flag"><span class="team-name">Greece</span></a></li><li class="item-19" data-idteam="43909"><a href="/worldcup/teams/team=43909/index.html" title="Honduras"><img alt="Honduras" src="http://img.fifa.com/images/flags/2/hon.png" data-src="http://img.fifa.com/images/flags/2/hon.png" class="flag"><span class="team-name">Honduras</span></a></li><li class="item-20" data-idteam="43817"><a href="/worldcup/teams/team=43817/index.html" title="Iran"><img alt="Iran" src="http://img.fifa.com/images/flags/2/irn.png" data-src="http://img.fifa.com/images/flags/2/irn.png" class="flag"><span class="team-name">Iran</span></a></li><li class="item-21" data-idteam="43954"><a href="/worldcup/teams/team=43954/index.html" title="Italy"><img alt="Italy" src="http://img.fifa.com/images/flags/2/ita.png" data-src="http://img.fifa.com/images/flags/2/ita.png" class="flag"><span class="team-name">Italy</span></a></li><li class="item-22" data-idteam="43819"><a href="/worldcup/teams/team=43819/index.html" title="Japan"><img alt="Japan" src="http://img.fifa.com/images/flags/2/jpn.png" data-src="http://img.fifa.com/images/flags/2/jpn.png" class="flag"><span class="team-name">Japan</span></a></li><li class="item-23" data-idteam="43822"><a href="/worldcup/teams/team=43822/index.html" title="Korea Republic"><img alt="Korea Republic" src="http://img.fifa.com/images/flags/2/kor.png" data-src="http://img.fifa.com/images/flags/2/kor.png" class="flag"><span class="team-name">Korea Republic</span></a></li><li class="item-24" data-idteam="43911"><a href="/worldcup/teams/team=43911/index.html" title="Mexico"><img alt="Mexico" src="http://img.fifa.com/images/flags/2/mex.png" data-src="http://img.fifa.com/images/flags/2/mex.png" class="flag"><span class="team-name">Mexico</span></a></li></ul><ul class="col-4"><li class="item-25" data-idteam="43960"><a href="/worldcup/teams/team=43960/index.html" title="Netherlands"><img alt="Netherlands" src="http://img.fifa.com/images/flags/2/ned.png" data-src="http://img.fifa.com/images/flags/2/ned.png" class="flag"><span class="team-name">Netherlands</span></a></li><li class="item-26" data-idteam="43876"><a href="/worldcup/teams/team=43876/index.html" title="Nigeria"><img alt="Nigeria" src="http://img.fifa.com/images/flags/2/nga.png" data-src="http://img.fifa.com/images/flags/2/nga.png" class="flag"><span class="team-name">Nigeria</span></a></li><li class="item-27" data-idteam="43963"><a href="/worldcup/teams/team=43963/index.html" title="Portugal"><img alt="Portugal" src="http://img.fifa.com/images/flags/2/por.png" data-src="http://img.fifa.com/images/flags/2/por.png" class="flag"><span class="team-name">Portugal</span></a></li><li class="item-28" data-idteam="43965"><a href="/worldcup/teams/team=43965/index.html" title="Russia"><img alt="Russia" src="http://img.fifa.com/images/flags/2/rus.png" data-src="http://img.fifa.com/images/flags/2/rus.png" class="flag"><span class="team-name">Russia</span></a></li><li class="item-29" data-idteam="43969"><a href="/worldcup/teams/team=43969/index.html" title="Spain"><img alt="Spain" src="http://img.fifa.com/images/flags/2/esp.png" data-src="http://img.fifa.com/images/flags/2/esp.png" class="flag"><span class="team-name">Spain</span></a></li><li class="item-30" data-idteam="43971"><a href="/worldcup/teams/team=43971/index.html" title="Switzerland"><img alt="Switzerland" src="http://img.fifa.com/images/flags/2/sui.png" data-src="http://img.fifa.com/images/flags/2/sui.png" class="flag"><span class="team-name">Switzerland</span></a></li><li class="item-31" data-idteam="43930"><a href="/worldcup/teams/team=43930/index.html" title="Uruguay"><img alt="Uruguay" src="http://img.fifa.com/images/flags/2/uru.png" data-src="http://img.fifa.com/images/flags/2/uru.png" class="flag"><span class="team-name">Uruguay</span></a></li><li class="item-32" data-idteam="43921"><a href="/worldcup/teams/team=43921/index.html" title="USA"><img alt="USA" src="http://img.fifa.com/images/flags/2/usa.png" data-src="http://img.fifa.com/images/flags/2/usa.png" class="flag"><span class="team-name">USA</span></a></li></ul></div>';
var $teams = cheerio.load(teams_html);

var csv_path = '../../data/wc2014_players_data.csv';
fs.appendFile(csv_path, "player,country,continent,team,team_country,team_continent,same_country,same_continent\r\n");

$teams('a').each(function (i, obj) {
    var href = obj.attribs.href.split('/');
    var id = href[3].split('=')[1];

    var url = TEMPLATE_URL.replace('${team}', id);    
    request(url, function(err, resp, body) {
        if (err)
            throw err;
        $ = cheerio.load(body);
        
        var players = [];
        var country = null;
        for (var j in TEAMS) {
            if (TEAMS[j].idteam == id)
                country = TEAMS[j].countrycode;
        }
        $('.p-n').each(function (ix, player) {
            var p_url = 'http://www.fifa.com' + $(player).find('a')[0].attribs.href;
            
            if (p_url.indexOf('coach') < 0) {
                var pl = { 'name': $(player).find('.p-n-webname')[0].children[0].data };
                var $p = cheerio.load(httpsync.get(p_url).end().data.toString());
                
                var team = $p('.clubname').find('.data')[0].children[0].data.trim();
                var team_country = team.substring(team.length - 4, team.length - 1);
                pl['country'] = country;
                pl['continent'] = CONTINENTS[country];
                pl['team'] = team;
                pl['team_country'] = team_country;
                pl['team_continent'] = CONTINENTS[team_country];
                pl['same_country'] = country == pl['team_country'] ? 1 : 0;
                pl['same_continent'] = pl['continent'] == pl['team_continent'] ? 1 : 0;
                pl['other_country'] = country == pl['team_country'] ? 0 : 1;
                pl['other_continent'] = pl['continent'] == pl['team_continent'] ? 0 : 1;
                players[players.length] = pl;
            }
            
        });
        for (var i in players) {
            var data = players[i];
            fs.appendFile(csv_path, data.name + ',' + data.country + ',' + data.continent + ',' + data.team + ',' + data.team_country + ',' + data.team_continent + ',' + data.same_country  + ',' + data.same_continent + "\r\n", function (err) {});
        }
    });
});