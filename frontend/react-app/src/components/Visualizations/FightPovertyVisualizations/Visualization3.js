import React, { Component } from 'react'
import '../../../App.css'
import d3tip from 'd3-tip'
import './vis3.css'
import { viz3_height, viz3_width } from './visualization-styles'
var d3 = require('d3')

// https://medium.com/@Elijah_Meeks/interactive-applications-with-react-d3-f76f7b3ebc71
class Visualization3 extends Component {
    constructor(props){
        super(props)
        this.createBarChart = this.createBarChart.bind(this)
    }

    componentDidMount() {
        this.createBarChart()
    }

    componentDidUpdate() {
        this.createBarChart()
    }

    async createBarChart() {
        const bars = this.bars
        const yaxis = this.yaxis

        var margin = {top: 120, right: 100, bottom: 120, left: 100},
        width = viz3_width - margin.left - margin.right,
        height = viz3_height - margin.top - margin.bottom;

        var formatPercent = d3.format("1.0%");
        
        var x = d3.scaleBand()
            .rangeRound([0, width])
            .round(true)
            .padding(.2)

        var y0 = d3.scaleLinear().domain([40, 100]).range([height, 0]),
            y1 = d3.scaleLinear().domain([40, 100]).range([height, 0]);
       
        // create x axis
        var xAxis = d3.axisBottom(x);

        // create left yAxis
        var yAxisLeft = d3.axisLeft().scale(y0).ticks(6);

        // create right yAxis
        var yAxisRight = d3.axisRight().scale(y1).ticks(6);
        
        var tip_cn = d3tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d) {
                return "<strong>" + d.charity + " Charity Navigator Score:</strong>" +
                "<span style='color:orange'>&nbsp;" + d.cn_score + "</span>";
            })

        var tip_fp = d3tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d) {
                return "<strong>" + d.charity + " Fight Poverty Score:</strong>" +
                "<span style='color:orange'>&nbsp;" + d.fp_score + "</span>";
            })


        var barChartSvg = d3.select(bars).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("class", "graph")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var yAxisSvg = d3.select(yaxis)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("class", "graph")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        const data = await d3.tsv("https://s3.us-east-2.amazonaws.com/unemployment-stats/charity-score.tsv", type)

        x.domain(data.map(function(d) { return d.charity; }));
        y0.domain([40, d3.max(data, function(d) { return d.cn_score; })]);
        y1.domain([40, d3.max(data, function(d) { return d.fp_score; })]);
          

        // y axis
        // barChartSvg.append("g")
        yAxisSvg.append("g")
            .attr("class", "y axis axisLeft")
            .attr("transform", "translate(0,0)")
            .call(yAxisLeft)
            .append("text")
            .attr("y", 6)
            .attr("dy", "-2em")
            .style("text-anchor", "end")
            .style("text-anchor", "beginning")
            .text("Score");

        const barsSvg = barChartSvg.selectAll(".bar").data(data).enter();

        barsSvg.append("rect")
            .attr("class", "bar1")
            .attr("x", function(d) { return x(d.charity); })
            .attr("width", x.bandwidth() / 2)
            .attr("y", function(d) { return y0(d.cn_score); })
            .attr("height", function(d,i,j) { return height - y0(d.cn_score); }) 
            .on('mouseover', tip_cn.show)
            .on('mouseout', tip_cn.hide)
        
        barsSvg.append("rect")
            .attr("class", "bar2")
            .attr("x", function(d) { return x(d.charity) + x.bandwidth() / 2; })
            .attr("width", x.bandwidth() / 2)
            .attr("y", function(d) { return y1(d.fp_score); })
            .attr("height", function(d,i,j) { return height - y1(d.fp_score); }) 
            .on('mouseover', tip_fp.show)
            .on('mouseout', tip_fp.hide)



        barChartSvg.call(tip_cn).call(tip_fp);

        
        function type(d) {
            d.cn_score = +d.cn_score;
            return d;
        }

    }


    render() {

        return (
            <div style={{ 
                paddingTop: '100px', 
                textAlign: 'center', 
                color: 'black',
                width: '90%',
                margin: 'auto'
            }}>
                <h5>
                Charity Scores
                </h5>

                <h6 style={{ color: 'orange'}}>
                Charity Navigator Score
                </h6>

                <h6 style={{ color: 'lightseagreen'}}>
                Fight Poverty Score
                </h6>

                <div style={{ marginTop: '-50px' }}>
                    <div style={{ float: 'left', marginLeft: '-40px' }}>
                        <svg 
                            ref={yaxis => this.yaxis = yaxis} 
                            width={110} 
                            height={viz3_height} 

                        />
                    </div>

                    <div style={{ overflow: 'auto' }}>
                        <svg 
                            ref={bars => this.bars = bars} 
                            width={viz3_width} 
                            height={viz3_height} 
                        /> 
                    </div> 

                </div>
            </div>
        )
    }
}

export default Visualization3