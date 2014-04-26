---
title: "Goleadores del Campeonato Uruguayo"
template: article
order: 2
---

Esta visualización muestra los goleadores por año, torneo y equipo de los campeonatos uruguayos de fútbol jugados entre los años 2008 y 2013.  

Incluye datos de los siguientes torneos:  

* Uruguayo 2008/2009
    * Apertura 2008
    * Clausura 2009    
* Uruguayo 2009/2010
    * Apertura 2009
    * Clausura 2010    
* Uruguayo 2010/2011
    * Apertura 2010
    * Clausura 2011    
* Uruguayo 2011/2012
    * Apertura 2011
    * Clausura 2012    
* Uruguayo 2012/2013
    * Apertura 2012
    * Clausura 2013    

Los datos fueron obtenidos de [Futbol.com.uy](http://www.futbol.com.uy/cattablas_857_1.html) y se transformaron a formato csv
usando este [script](scripts/uy_top_scorers/get_scorers.js) de nodejs. Los datos de origen presentan algunas inconsistencias que quedan como trabajo de limpieza a 
futuro. Por ejemplo, entre los goleadores de Nacional 2008/2009 aparece Pablo Gaglianone que nunca jugó en los tricolores. El CSV se puede 
descargar [aquí](data/uy_top_scorers.csv).

Para navegar en los datos y aumentar el nivel de detalle solo hay que hacer clic en cada elemento. Por ejemplo, si se quieren ver los goles por
equipo en el *Clausura 08/09* se da clic sobre ese ítem. Ahí se abre en detalle por equipo y jugador de cada equipo.

<label for="anio">Año: </label>
<select id="anio" class="form-control">
    <option value="2009">2009</option>
    <option value="2010">2010</option>
    <option value="2011">2011</option>
    <option value="2012">2012</option>
    <option value="2013">2013</option>
</select>

<!-- <style>
    text {
      font: 12px sans-serif;
      cursor: pointer;
    }
    g {
        cursor: pointer;
    }
</style>-->

<div id="chart"></div>

Esta visualización está basada en la gráfica *sunburst* de [D3](http://d3js.org) y toma elementos de los siguientes ejemplos:

+ [Sunburst Partition](http://bl.ocks.org/mbostock/4063423)
+ [Zoomable Sunburst](http://bl.ocks.org/mbostock/4348373)
+ [Extending the D3 Zoomable Sunburst with Labels](http://blog.luzid.com/2013/extending-the-d3-zoomable-sunburst-with-labels/)
+ [Coffee Flavour Wheel](http://www.jasondavies.com/coffee-wheel/)

<script type="text/javascript" src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>
<script type="text/javascript" src="js/hierarchy.js"></script>
<script type="text/javascript">
    var width = 620;
    var height = 660;
    var radius = Math.min(width, height) / 2;
    var color = d3.scale.category20c();
    var x = d3.scale.linear().range([0, 2 * Math.PI]);
    var y = d3.scale.linear().range([0, radius]);

    var partition = d3.layout.partition().value(function(d)  { return d.goals; });


    var arc = d3.svg.arc().startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
        .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
        .innerRadius(function(d) { return Math.max(0, y(d.y)); })
        .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });

    function goals(d) {
        if (d.goals != undefined)
            return parseInt(d.goals);
        else {
            var m_goals = 0;
            for (var i = 0; i < d.children.length; i++) {
                m_goals += goals(d.children[i]);
            }
            return m_goals;
        }
    }

    function isParentOf(p, c) {
        if (p === c)
            return true;
        if (p.children) {
            return p.children.some(function(d) {
                return isParentOf(d, c);
            });
        }
      return false;
    }

    function makeChart(root)  {
        d3.select('svg').remove();
        var svg = d3.select('#chart').append('svg').attr('width', width).attr('height', height).append('g')
                    .attr('transform', 'translate(' + width / 2 + ',' + height * .52 + ')');        
        var g = svg.datum(root).selectAll('g').data(partition.nodes).enter().append('g');

        var path = g.append('path')
              .attr('display', function(d) { return d.depth ? null : 'none'; })
              .attr('d', arc)
              .style('stroke', '#fff')
              .style('fill', function(d) { return color((d.children ? d : d.parent).name); })
              .style('fill-rule', 'evenodd')
              .on('click', click);


        var text = g.append('text').attr('text-anchor', function(d) {
            return x(d.x + d.dx / 2) > Math.PI ? 'end' : 'start';
        }).attr('dy', '.2em').attr('transform', function(d) {
            var multiline = (d.name || '').split(' ').length > 1,
            angle = x(d.x + d.dx / 2) * 180 / Math.PI - 90,
            rotate = angle + (multiline ? -.5 : 0);
            return 'rotate(' + rotate + ')translate(' + (y(d.y) + 0) + ')rotate(' + (angle > 90 ? -180 : 0) + ')';
        }).attr('opacity', function(d) {
                if (d.depth != 1 && d.depth != 2)
                    return 0;
                else
                    return 1;
            }).on('click', click);
  
        text.append('tspan').attr('x', 0)
            .text(function(d) { 
                if (d.depth != 0) {
                    if (d.goals <= 2)
                        return d.name + '(' + d.goals + ')';
                    if (d.depth == 3) {
                        if (d.name.split(' ').length == 3)
                            return d.name.split(' ')[0] + ' ' + d.name.split(' ')[1]; 
                        else
                            return d.name.split(' ')[0]; 

                    }
                    else
                        return d.name.split(' ')[0]; 
                }
                else
                    return '';
                
        });
  
        text.append('tspan').attr('x', 0).attr('dy', '1em')
            .text(function(d) { 
                if (d.depth != 0) {
                    if (d.goals <= 2)
                        return '';
                    if (d.name.split(' ')[1])
                        return d.name.split(' ')[2]? d.name.split(' ')[2] + '(' + goals(d) + ')' : d.name.split(' ')[1] + '(' + goals(d) + ')';
                    else
                        return '(' + goals(d) + ')';
                }
                else
                    return '';
            });

        function click(d) {

            text.transition().attr('opacity', 0);
            path.transition().duration(750).attrTween('d', arcTween(d));

            text.style('visibility', function(e) {
                return isParentOf(d, e) ? null : d3.select(this).style('visibility');
            }).transition().duration(750)
                .attrTween('text-anchor', function(d) {
                    return function() {
                        return x(d.x + d.dx / 2) > Math.PI ? 'end' : 'start';
                };})
            .attrTween('transform', function(d) {
                var multiline = (d.name || '').split(' ').length > 1;
                    return function() {
                        var angle = x(d.x + d.dx / 2) * 180 / Math.PI - 90,
                        rotate = angle + (multiline ? -.5 : 0);
                        return 'rotate(' + rotate + ')translate(' + (y(d.y) + 0) + ')rotate(' + (angle > 90 ? -180 : 0) + ')';
                    };
                })
                .style('fill-opacity', function(e) { return isParentOf(d, e) ? 1 : 1e-6; })
                .each('end', function(e) {
                    d3.select(this).style('visibility', isParentOf(d, e) ? null : 'hidden');
                }).attr('opacity', function (h) {
                        if (h.depth == d.depth || (d.depth + 1) == h.depth)
                            return 1;
                        else
                            return 0;
                    });
        }

        d3.select('#anio').on('change', function change() {
            d3.text('data/uy_top_scorers.csv?r=' + Math.random(), function (text) {
                var csv = d3.csv.parse(text);                
                var root = toHierarchy(csv, d3.select('#anio').node().value);
                makeChart(root);
            });
        });        
    }


    function arcTween(d) {
        var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
            yd = d3.interpolate(y.domain(), [d.y, 1]),
            yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
        return function(d, i) {
            return i
                ? function(t) { return arc(d); }
                : function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); return arc(d); };
        };
    }

    d3.text('data/uy_top_scorers.csv?r=' + Math.random(), function (text) {
        var csv = d3.csv.parse(text);
        var root = toHierarchy(csv, 2009);
        makeChart(root);
    });
</script>