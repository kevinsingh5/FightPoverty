import React, { Component } from 'react'
import '../../../App.css'
import './PropXvis3.css'
import { viz1_height, viz1_width } from './propx-visualization-styles'
import axios from 'axios'
var d3 = require('d3')




class PropXVisualization3 extends Component {
	constructor(props){
		super(props)
		this.drawPieChart = this.drawPieChart.bind(this);
		this.updateSubjectCount = this.updateSubjectCount.bind(this);
	}
	

	drawPieChart(subjectCount) {
		const node = this.node
		let color = d3.scaleOrdinal(['#FF0000','#0000FF','#C0C0C0', '#ed7f09', '#eabd09', '#a6ea08', '#3b7c08', '#0ece7e', '#147a50', '#26efdb', '#14665d', '#113b47', '#053068', '#180468', '#421dd3', '#aa6de0', '#e49bef', '#4c0556', '#db00f9', '#e035c6', '#590d39', '#b7214e', '#5e0822', '#c12a3c', '#9b0719', '#b50117', '#0c0405', '#6d4e19', '#647c48', '#647c48']);
		let subjectNumbers = [];
		let subjectLabels = [];
		let total = 0;
		for(let key in subjectCount) {
			subjectNumbers.push(subjectCount[key]);
			subjectLabels.push(key);
			total += subjectCount[key];
		}

		let svg = d3.select(node),
       	width = 300,
   		height = 300,
        radius = Math.min(width, height) / 2,
        g = svg.append("g").attr("transform", "translate(" + (width / 2 + 40) + "," + (height / 2 + 40) + ")");

        let pie = d3.pie();

    	let arc = d3.arc()
                	.innerRadius(0)
                	.outerRadius(radius);

        let bigArc = d3.arc()
        			.innerRadius(0)
        			.outerRadius(radius + 20);

    	let arcs = g.selectAll("arc")
                	.data(pie(subjectNumbers))
                	.enter()
                	.append("g")
                	.attr("class", "arc");

        let tooltip = d3.select("#chart")
        	.append("div")
        	.attr("class", "tooltip4");

        tooltip.append("div")
        	.attr("class", "count");

        tooltip.append("div")
        	.attr("class", "percentage");

    	arcs.append("path")
        	.attr("fill", function(d, i) {
            	return color(i);
        	})
        	.attr("d", arc)
        	.on("mouseover", function(d) {
        		d3.select(this).transition()
        			.duration(500)
        			.attr("d", bigArc);
        		tooltip.select(".count").html(subjectLabels[d.index] + ": " + d.data);
        		tooltip.select(".percentage").html(Math.round(10000 * d.data / total) / 100 + "%");
        		tooltip.style('display', 'block');
        	})
        	.on("mouseout", function(d) {
        		d3.select(this).transition()
        			.duration(500)
        			.attr("d", arc);
        		tooltip.style("display", "none");
        	})
        	.on("mousemove", function(d) {
        		tooltip.style("top", (d3.event.pageY + 10) + "px")
        			.style("left", (d3.event.pageX + 10) + "px");
        	});
	}

	async updateSubjectCount(subjectCount, pgNum) {
		let data = await d3.json("http://api.propxdoeswhat.me/api/laws?page=" + pgNum + "&results_per_page=100");
			pgNum = data["page"];
			let maxPgNum = data["total_pages"];
			let subjectList = data["objects"];
			for(let law of subjectList) {
				let subject = law["subject"];
        //console.log(subject);
				if(subjectCount[subject] == undefined) {
					subjectCount[subject] = 1;
				} else {
					subjectCount[subject] += 1;
				}
			}
			console.log("Page " + pgNum);
			console.log(subjectCount);
			if(pgNum == maxPgNum) {
				// Done adding up numbers, draw stuff
				this.drawPieChart(subjectCount);
			} else {
				this.drawPieChart(subjectCount);
				this.updateSubjectCount(subjectCount, pgNum + 1);
			}
			return;
		
	}
render(){
	this.updateSubjectCount({}, 1);
	return(
			<div>

		<div style={{ paddingTop: '100px', textAlign: 'center', color: 'black' }}>
                <h1> Number of Bills Enacted by Party </h1>
                <div id="chart"></div>
                <svg 
                	ref={node => this.node = node} 

                    width={viz1_width} 
                    height={viz1_height} 
                    style={{ display: 'block', margin: 'auto' }}
                />
            </div>            
</div>
	)

}

}


export default PropXVisualization3;
