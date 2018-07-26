import React, { Component } from 'react'
import '../../../App.css'
import './PropXvis1.css'
import { viz1_height, viz1_width } from './propx-visualization-styles'
import axios from 'axios'
var d3 = require('d3')


async function getPartyCount() {
    const politicianList = await getAllPoliticians()

    let partyCount = {"R": 0, "D": 0, "I": 0}

    for(let politician of politicianList) {
        let party = politician["party"];
        if(partyCount[party] == undefined) {
            partyCount[party] = 1;
        } else {
            partyCount[party] += 1;
        }
    }

    return partyCount

}



async function getAllPoliticians () {
	let dataObjects = []
	let response = await axios.get('http://api.propxdoeswhat.me/api/politicians?results_per_page=100&page=1');
	dataObjects.push(...response.data.objects)

	const totalNumObjects = response.data.num_results
	let currentPage = 1

	while (currentPage * 100 < totalNumObjects) {
		currentPage += 1
		response = await axios.get('http://api.propxdoeswhat.me/api/politicians?results_per_page=100&page=' + currentPage)
		dataObjects.push(...response.data.objects)
    }
    
	return dataObjects
}


async function getPoliticians (pgNum) {
    const response = await axios.get('http://api.propxdoeswhat.me/api/politicians?results_per_page=100&page=' + pgNum)
    return response.data
}



// https://medium.com/@Elijah_Meeks/interactive-applications-with-react-d3-f76f7b3ebc71
// and https://medium.freecodecamp.org/learn-to-create-a-line-chart-using-d3-js-4f43f1ee716b
class PropXVisualization1 extends Component {
    constructor(props) {
        super(props)

        this.state = {
            partyCount: {"R": 0, "D": 0, "I": 0}
        };

		this.drawPieChart = this.drawPieChart.bind(this)
		this.updatePartyCount = this.updatePartyCount.bind(this)
    }

    async componentDidMount() {
        await this.drawPieChart()
        this.updatePartyCount(1)
    }


    async drawPieChart() {
        const node = this.node

		let color = d3.scaleOrdinal(['#FF0000','#0000FF','#C0C0C0']);
		let partyNumbers = [];
		let partyLabels = [];
        let total = 0;

        let partyCount = this.state.partyCount

		for(let key in partyCount) {
			partyNumbers.push(partyCount[key]);
			partyLabels.push(key);
			total += partyCount[key];
		}

		let svg = d3.select(node),
       	width = 300,
   		height = 300,
        radius = Math.min(width, height) / 2,
        g = svg.append("g").attr("transform", "translate(" + (width / 2 + 90) + "," + (height / 2 + 40) + ")");

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
            

        let tooltip = d3.select("chart")
        	.append("div")
        	.attr("class", "tooltip2");

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
        		d3.select(node).transition()
        			.duration(500)
        			.attr("d", bigArc);
        		tooltip.select(".count").html(partyLabels[d.index] + ": " + d.data);
        		tooltip.select(".percentage").html(Math.round(10000 * d.data / total) / 100 + "%");
        		tooltip.style('display', 'block');
        	})
        	.on("mouseout", function(d) {
        		d3.select(node).transition()
        			.duration(500)
        			.attr("d", arc);
        		tooltip.style("display", "none");
        	})
        	.on("mousemove", function(d) {
        		tooltip.style("top", (d3.event.pageY + 10) + "px")
        			.style("left", (d3.event.pageX + 10) + "px");
        	});

       	let outerArc = d3.arc()
			.innerRadius(radius * 1.0)
			.outerRadius(radius * 1.0);

		let text = d3.select(".labels").selectAll("text")
			.data(pie(partyNumbers));

		text.enter()
			.append("text")
			.text(function(d) {
				return partyLabels[d.index] + ": " + d.data;
			});

		function midAngle(d) {
			return d.startAngle + (d.endAngle - d.startAngle)/2;
        }
        
        // console.log(d3.select(node)["_groups"])


		text.transition().duration(500)
		.attrTween("transform", function(d) {
			node._current = node._current || d;
			var interpolate = d3.interpolate(node._current, d);
			node._current = interpolate(0);
			return function(t) {
				var d2 = interpolate(t);
				var pos = outerArc.centroid(d2);
				pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
				return "translate("+ pos +")";
			};
		})
		.styleTween("text-anchor", function(d){
			node._current = node._current || d;
			var interpolate = d3.interpolate(node._current, d);
			node._current = interpolate(0);
			let t1 = d3.select(node)["_groups"][0][0];
			d3.select(node)["_groups"][0][0]["innerHTML"] = partyLabels[d.index] + ": " + d.data;
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
				node._current = node._current || d;
				var interpolate = d3.interpolate(node._current, d);
				node._current = interpolate(0);
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


    async updatePartyCount(pgNum) {
        console.log(pgNum)

        const data = await getPoliticians(pgNum)

        console.log(data)

        let partyCount = this.state.partyCount

        pgNum = data["page"];
        let maxPgNum = data["total_pages"];
        document.getElementById("theText").innerHTML = "Getting data from page " + pgNum + " out of " + maxPgNum;
        let politicianList = data["objects"];
        for(let politician of politicianList) {
            let party = politician["party"];
            if(partyCount[party] === undefined) {
                partyCount[party] = 1;
            } else {
                partyCount[party] += 1;
            }
        }


        if(pgNum == maxPgNum) {
            // Done adding up numbers, draw stuff
            this.setState({ partyCount: partyCount }, () => this.drawPieChart())
        } else {
            this.setState({ partyCount: partyCount }, async function () {
                await this.drawPieChart();
                this.updatePartyCount(pgNum + 1);
            })            
		}
		return
    }


    render() {

        return (
            <div style={{ paddingTop: '100px', textAlign: 'center', color: 'black' }}>
                <h1> Politicians by Party </h1>
                <p id="theText" >Getting data</p>
                <div id="chart"></div>
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

export default PropXVisualization1