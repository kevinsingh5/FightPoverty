import React, { Component } from 'react'
import '../../../App.css'
import { select } from 'd3-selection'
import './vis1.css'
import { getAllCounties } from '../../../queries/countyQueries'
import { viz1_height, viz1_width } from './visualization-styles'
var d3 = require('d3')


// https://medium.com/@Elijah_Meeks/interactive-applications-with-react-d3-f76f7b3ebc71
// and https://medium.freecodecamp.org/learn-to-create-a-line-chart-using-d3-js-4f43f1ee716b
class Visualization1 extends Component {
    constructor(props) {
        super(props)
        this.createLineChart = this.createLineChart.bind(this)
    }

    componentDidMount() {
        this.createLineChart()
    }

    componentDidUpdate() {
        this.createLineChart()
    }

    async createLineChart() {
        const node = this.node
        var svgWidth = viz1_width, svgHeight = viz1_height;
        var margin = { top: 20, right: 20, bottom: 30, left: 50 };
        var width = svgWidth - margin.left - margin.right;
        var height = svgHeight - margin.top - margin.bottom;


        // setup x 
        var xValue = function(d) { return d.county_poverty_population;}, // data -> value
        xScale = d3.scaleLinear().range([0, width]), // value -> display
        xMap = function(d) { return xScale(xValue(d));}, // data -> display
        xAxis = d3.axisBottom(xScale);

        // setup y
        var yValue = function(d) { return d.county_poverty_percentage;}, // data -> value
        yScale = d3.scaleLinear().range([height, 0]), // value -> display
        yMap = function(d) { return yScale(yValue(d));}, // data -> display
        yAxis = d3.axisLeft(yScale);


        // setup fill color
        var cValue = function(d) { 
            // if (!d.fight_poverty_multiplier 
            //     || !d.county_poverty_percentage 
            //     || !d.county_poverty_population
            //     || d.county_poverty_percentage < 0
            // ) {
            //     d.fight_poverty_multiplier == 1
            //     d.county_poverty_percentage = 0
            //     d.county_poverty_population = 0
            // }


            if (d.fight_poverty_multiplier <= .85) {
                return "<= .85x";
            } else if (d.fight_poverty_multiplier <= .95) {
                return "<= .95x";
            } else if (d.fight_poverty_multiplier <= 1.05) {
                return "<= 1.05x";
            } else if (d.fight_poverty_multiplier <= 1.15) {
                return "<= 1.15x";
            } else if (d.fight_poverty_multiplier > 1.15) {
                return "<= 1.25x"
            } else {
                return "<= 1.05x"
            }
        },
        color = d3.scaleOrdinal(d3.schemeCategory10);


        // add the graph canvas to the body of the webpage
        var svg = select(node)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // add the tooltip area to the webpage
        var tooltip = select("body")
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        // load data
        const data = await getAllCounties()

        // don't want dots overlapping axis, so add in buffer to data domain
        xScale.domain([d3.min(data, xValue)-1, d3.max(data, xValue)+1]);
        yScale.domain([d3.min(data, yValue)-1, d3.max(data, yValue)+1]);

        // x-axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .append("text")
            .attr("class", "label")
            .attr("x", width)
            .attr("y", -6)
            .style("text-anchor", "end")
            .style("fill", "black")
            .text("County Poverty Population");

        // y-axis
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("class", "label")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .style("fill", "black")
            .text("County Poverty Percentage");

        // draw dots
        svg.selectAll(".dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("class", "dot")
            .attr("r", 3.5)
            .attr("cx", xMap)
            .attr("cy", yMap)
            .style("fill", function(d) { return color(cValue(d));}) 
            .on("mouseover", function(d) {
                tooltip
                    .transition()
                    .duration(200)
                    .style('left', (d3.event.pageX ) + 'px')
                    .style('top', (d3.event.pageY / 1.08) + 'px')
                    .style("opacity", .9);  

                tooltip.html(
                    "<div style='padding-left: 10px; padding-top: 10px;'>" +
                    d.name + ", " + d.state +                    
                    "<br/> (" + xValue(d) + ", " + yValue(d) + ")" + 
                    "<br/> Fight Poverty Multiplier: " + d.fight_poverty_multiplier + 
                    "<div>"
                )

            })
            .on("mouseout", function(d) {
                tooltip
                    .transition()
                    .duration(500)
                    .style("opacity", 0);
            });

        // draw legend
        var legend = svg.selectAll(".legend")
            .data(color.domain())
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function(d, i) { 
                // Make sure ordering is correct
                if (d === "<= .85x") {
                    return "translate(0, 0)"; 
                } else {
                    return "translate(0," + (i + 1) * 20 + ")"; 
                }
            });
        

        // draw legend colored rectangles
        legend.append("rect")
            .attr("x", width - 18)
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", color);

        // draw legend text
        legend.append("text")
            .attr("x", width - 24)
            .attr("y", 9)
            .attr("dy", ".35em")
            .style("text-anchor", "end")
            .text(function(d) { return d;})


        // draw title
        // http://www.d3noob.org/2013/01/adding-title-to-your-d3js-graph.html
        svg.append("text")
            .attr("x", (width / 2))             
            .attr("y", 0 - (margin.top / 2) + 10)
            .attr("text-anchor", "middle")  
            .style("font-size", "16px") 
            .text("County Poverty Stats");

        // draw subtitle
        svg.append("text")
            .attr("x", (width / 2))             
            .attr("y", 0 - (margin.top / 2) + 30)
            .attr("text-anchor", "middle")  
            .style("font-size", "12px") 
            .text("Colored by Fight Poverty multiplier");


    }


    render() {

        return (
            <div style={{ paddingTop: '100px' }}>
                <svg 
                    ref={node => this.node = node} 
                    width={viz1_width} 
                    height={viz1_height} 
                    style={{ display: 'block', margin: 'auto' }}
                />
            </div>            
        )
    }
}

export default Visualization1