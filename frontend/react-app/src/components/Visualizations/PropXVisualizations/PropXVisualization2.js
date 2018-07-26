import React, { Component } from 'react'
import '../../../App.css'
import './PropXvis1.css'
import { viz1_height, viz1_width } from './propx-visualization-styles'
import axios from 'axios'
var d3 = require('d3')



var passedBills = {"R": 0, "D": 0};
var lawData = [];

class PropXVisualization2 extends Component {
	constructor(props){
		super(props)
		this.drawLawChart = this.drawLawChart.bind(this);
		this.getLawData = this.getLawData.bind(this);
	}
	

	drawLawChart(dataList) {
	const node = this.node

	let color = d3.scaleOrdinal(['#FF0000','#0000FF','#C0C0C0']);
	let partyNumbers = [];
	let partyLabels = [];
	let total = 0;
	for(let key in dataList) {
		partyNumbers.push(dataList[key]);
		partyLabels.push(key);
		total += dataList[key];
	}
	//console.log(total);

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
                	.data(pie(partyNumbers))
                	.enter()
                	.append("g")
                	.attr("class", "arc");

    arcs.append("g")
    	.attr("class", "labels");

    arcs.append("g")
		.attr("class", "lines");

    let tooltip = d3.select("#chart")
        	.append("div")
        	.attr("class", "tooltip");

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
        		tooltip.select(".count").html(partyLabels[d.index] + ": " + d.data);
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

    let outerArc = d3.arc()
		.innerRadius(radius * 0.9)
		.outerRadius(radius * 0.9);

    let text = d3.select(".labels").selectAll("text")
		.data(pie(partyNumbers));

	text.enter()
		.append("text")
		.text(function(d) {
			return partyLabels[d.index] + ": " + d.data;
		});

	function midAngle(d){
		return d.startAngle + (d.endAngle - d.startAngle)/2;
	}

	text.transition().duration(500)
		.attrTween("transform", function(d) {
			this._current = this._current || d;
			var interpolate = d3.interpolate(this._current, d);
			this._current = interpolate(0);
			return function(t) {
				var d2 = interpolate(t);
				var pos = outerArc.centroid(d2);
				pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
				return "translate("+ pos +")";
			};
		})
		.styleTween("text-anchor", function(d){
			this._current = this._current || d;
			var interpolate = d3.interpolate(this._current, d);
			this._current = interpolate(0);
			let t1 = d3.select(this)["_groups"][0][0];
			d3.select(this)["_groups"][0][0]["innerHTML"] = partyLabels[d.index] + ": " + d.data;
			return function(t) {
				var d2 = interpolate(t);
				return midAngle(d2) < Math.PI ? "start":"end";
			};
		});

	text.exit()
		.remove();

	var polyline = d3.select(".lines").selectAll("polyline")
		.data(pie(partyNumbers));

	polyline.enter()
		.append("polyline");

	polyline.transition().duration(500)
		.attrTween("points", function(d){
			this._current = this._current || d;
			var interpolate = d3.interpolate(this._current, d);
			this._current = interpolate(0);
			return function(t) {
				var d2 = interpolate(t);
				var pos = outerArc.centroid(d2);
				pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
				return [arc.centroid(d2), outerArc.centroid(d2), pos];
			};			
		});

	polyline.exit()
		.remove();
}

async getLawData(pgNum) {
	let data = await d3.json("http://api.propxdoeswhat.me/api/laws?page=" + pgNum + "&results_per_page=100")
			let totalPgs = data["total_pages"];
			document.getElementById("textText").innerHTML = "Getting data from page " + pgNum + " out of " + totalPgs;
			let billList = data["objects"];
			for(let bill of billList) {
				if(bill["enacted"] != null) {
					passedBills[bill["sponsor"]["party"]] += 1;
				}
			}
			if(pgNum < totalPgs) {
				this.drawLawChart(passedBills);
				this.getLawData(pgNum + 1);
			}
			else {
				// Finished getting data, draw stuff now
				this.drawLawChart(passedBills);
			}
	
}
render(){
	this.getLawData(1);
	return(
			<div>

		<div style={{ paddingTop: '100px', textAlign: 'center', color: 'black' }}>
                <h1> Politicians by Party </h1>
                <p id="textText" >Getting data</p>
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


export default PropXVisualization2;
