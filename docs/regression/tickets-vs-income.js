"use strict"

/*
    manages DIS ticket count vs household median income
    * scatter: builds scatterplot
*/
const ticketVsIncome = (function() {

    function scatter(path, id, opts = { w: 960, h: 640, symbol: d3.symbol().type(d3.symbolCircle).size(32) }) {
        // chart setup
        let chart = Object.assign({
            dataPath: path, targetId: id, data: null,
            scales: { x: null, y: null, xAx: null, yAx: null },
            xLabel: 'Household Median Income ($)',
            yLabel: 'Annual DIS Ticket Count',
            title: 'Annual DIS Ticket Count vs. Household Median Income ($)'
        }, opts)

        chart.frame = (function() {
            const padding = {
                h: Math.max(50, chart.w * 0.15),
                v: Math.max(50, chart.h * 0.15),
            }
            return {
                l: padding.h,
                r: chart.w - padding.h,
                t: padding.v,
                b: chart.h - padding.v,
                w: chart.w - 2 * padding.h,
                xLabel: {
                    r: chart.w - padding.h - 15,
                    t: chart.h - padding.v / 2
                },
                yLabel: {
                    l: padding.h - 25,
                    t: padding.v
                }
            }
        })()

        function builder() {
            // build order: [1] load [2] clean [3] store [4] scale [5] plot
            const clean = soiled => soiled.filter(d => !isNaN(d.houseMedianIncome) && !isNaN(d.ticketsPerYr))
            const store = d => Object.assign(chart, { data: d })
            const parseRow = function(row) {
                const yrs = row.years_tickets_earned.split(',').map(yr => +yr)
                return {
                    id: +row.id,
                    ticketsPerYr: +row.sum_of_tickets_earned / yrs.length.toFixed(1),
                    houseMedianIncome: +row.HouseMedianIncome,
                }
            }

            return d3.csv(chart.dataPath, parseRow)
                        .then(clean, e => console.error(`Load err (${ chart.dataPath }): ${ e }`))
                        .then(store, e => console.error(`Clean err: ${ e }`))
                        .then(scaler, e => console.error(`Store err: ${ e }`))
                        .then(plotter, e => console.error(`Scaler err: ${ e }`))
        }

        function scaler() {
            const bounds = {
                xMin: d3.min(chart.data, d => d.houseMedianIncome) * 0.5,
                xMax: d3.max(chart.data, d => d.houseMedianIncome) * 1.05,
                yMin: Math.max(0, d3.min(chart.data, d => d.ticketsPerYr) - 2),
                yMax: d3.max(chart.data, d => d.ticketsPerYr) + 2,
            }
            Object.assign(chart.scales, {
                x: d3.scaleLinear()
                        .domain([bounds.xMin, bounds.xMax])
                        .range([chart.frame.l, chart.frame.r]),
                y: d3.scaleLinear()
                        .domain([bounds.yMin, bounds.yMax])
                        .range([chart.frame.b, chart.frame.t]),
                xAx: d3.scaleLinear()
                        .domain([bounds.xMin, bounds.xMax])
                        .range([chart.frame.l, chart.frame.r]),
                yAx: d3.scaleLinear()
                        .domain([bounds.yMin, bounds.yMax])
                        .range([chart.frame.b, chart.frame.t]),
            })
        }

        function plotter() {
            // setup svg structure
            let svg = d3.select(chart.targetId)
                        .append("svg")
                            .attr("width", "100%")
                            .attr("height", "100%")
                            .attr("viewBox", `0 0 ${ chart.w } ${ chart.h }`)
                            .attr("preserveAspectRatio", "xMinYMin meet")
            let axes = {
                x: d3.axisBottom(chart.scales.xAx)
                        .ticks(16, d3.format("$,.0f"))
                        .tickSizeOuter(0),
                y: d3.axisLeft(chart.scales.yAx)
                        .ticks(5, d3.format(",.0f"))
                        .tickSize(4)
                        .tickPadding(6)
                        .tickSizeOuter(0)
            }

            // plot x: HouseMedianIncome, y: sum_of_tickets_earned
            svg.selectAll(".datapt")
                .data(chart.data)
                .enter().append("path")
                    .attr("class", "datapt")
                    .attr("d", d => chart.symbol())
                    .attr("transform", d => `translate(${ chart.scales.x(d.houseMedianIncome) }, ${ chart.scales.y(d.ticketsPerYr) })`)

            // x-axis label
            svg.append("text")
                .text(chart.xLabel)
                .attr("class", "axis-label")
                .attr("text-anchor", "end")
                .attr("transform", `translate(${ chart.frame.xLabel.r }, ${ chart.frame.xLabel.t })`)

            // y-axis label
            svg.append("text")
                .text(chart.yLabel)
                .attr("class", "axis-label")
                .attr("text-anchor", "end")
                .attr("transform", `translate(${ chart.frame.yLabel.l }, ${ chart.frame.yLabel.t }) rotate(-90)`)

            // title
            svg.append("text")
                .text(chart.title)
                .attr("class", "plot-title")
                .attr("text-anchor", "middle")
                .attr("transform", `translate(${ chart.frame.w / 2.0 + chart.frame.l }, ${ chart.frame.t / 2.0 })`)

            // x-axis
            svg.append("g")
                .attr("class", "axis x-axis")
                .attr("transform", `translate(0, ${ chart.frame.b })`)
                .call(axes.x)

            // y-axis
            svg.append("g")
                .attr("class", "axis y-axis")
                .attr("transform", `translate(${ chart.frame.l}, 0)`)
                .call(axes.y)
        }

        return builder()
    }

    return {
        scatter: scatter
    }

}())

ticketVsIncome.scatter("../map/zip/basic/places.csv", "#ticketingChart")
