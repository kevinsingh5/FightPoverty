import React, { Component } from 'react'
import '../../App.css'
import { select } from 'd3-selection'
import { viz2_height, viz2_width } from './visualization-styles'
import './vis2.css'
import { feature, mesh } from 'topojson'
var d3 = require('d3')


// https://medium.com/@Elijah_Meeks/interactive-applications-with-react-d3-f76f7b3ebc71
class Visualization2 extends Component {
    constructor(props){
        super(props)
        this.createHeatMap = this.createHeatMap.bind(this)
    }

    componentDidMount() {
        this.createHeatMap()
    }

    componentDidUpdate() {
        this.createHeatMap()
    }

    async createHeatMap() {
        const node = this.node
        var svg = select(node)
        var width = +svg.attr("width")
        var height = +svg.attr("height")
        
        var unemployment = d3.map();
        
        var path = d3.geoPath();
        
        var x = d3.scaleLinear()
            .domain([0,9, 12, 15, 18, 21, 35])
            .rangeRound([550,630]);
        
        var color = d3.scaleThreshold()
            .domain([0,9, 12, 15, 18, 21, 35])
            .range(d3.schemePuBu[7]);
        
        var g = svg.append("g")
            .attr("class", "key")
            .attr("transform", "translate(0,40)");
        
        g.selectAll("rect")
          .data(color.range().map(function(d) {
              d = color.invertExtent(d);
              if (d[0] == null) d[0] = x.domain()[0];
              if (d[1] == null) d[1] = x.domain()[1];
              return d;
            }))
          .enter().append("rect")
            .attr("height", 8)
            .attr("x", function(d) { return x(d[0]); })
            .attr("width", function(d) { return x(d[1]) - x(d[0]); })
            .attr("fill", function(d) { return color(d[0]); });
        
        g.append("text")
            .attr("class", "caption")
            .attr("x", x.range()[0])
            .attr("y", -6)
            .attr("fill", "#000")
            .attr("text-anchor", "start")
            .attr("font-weight", "bold")
            .text("Poverty Percentage");
        
        g.call(d3.axisBottom(x)
            .tickSize(13)
            .tickFormat(function(x, i) { return i ? x : x + "%"; })
            .tickValues(color.domain()))
            .select(".domain")
            .remove();
        

        const us = await d3.json("https://d3js.org/us-10m.v1.json")
        await d3.tsv("https://gitlab.com/chris.amini/FightingPoverty/raw/6642182e34e84e46aad91437ffd987497dc3e80b/frontend/react-app/src/components/Visualizations/percentages.tsv", 
            function(d) { 
                unemployment.set(d.id, +d.rate); 
            }
        )

        svg.append("g")
            .attr("class", "counties")
            .selectAll("path")
            .data(feature(us, us.objects.counties).features)
            .enter().append("path")
            .attr("fill", function(d) { return color(d.rate = unemployment.get(d.id)); })
            .attr("d", path)
            .append("title")
            .text(function(d) { return d.rate + "%"; });
                

        svg.append("path")
            .datum(mesh(us, us.objects.states, function(a, b) { return a !== b; }))
            .attr("class", "states")
            .attr("d", path);

    }


    render() {
        return (
            <div style={{ paddingTop: '100px' }}>
                <svg 
                    ref={node => this.node = node} 
                    width={viz2_width} 
                    height={viz2_height} 
                    style={{ display: 'block', margin: 'auto' }}
                />
            </div>            
        )
    }
}

export default Visualization2