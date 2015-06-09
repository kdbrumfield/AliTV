/* global d3: false */
/* global $: false */
/* global _: false */
/* global document: false */

/**
 * Creates an object of type AliTV for drawing whole genome alignment visualizations
 * @author Markus Ankenbrand <markus.ankenbrand@uni-wuerzburg.de> 
 * @constructor
 * @param {Object} svg - jQuery object containing a svg DOM element. Visualizations will be drawn on this svg. Size may be changed by object methods. Previous content will be deleted.
 * @example
 * // initializes an AliTV object (wga) on the svg element with id 'canvas'
 * var svg = $('#canvas');
 * var wga = new AliTV(svg);
 */
function AliTV(svg) {
	/**
	 * property to contain the svg DOM element as jQuery Object
	 */
	this.svg = svg;
	/**
	 * property to contain the svg DOM element as d3 Object
	 */
	this.svgD3 = d3.selectAll(svg);
	/**
	 * property to store the data
	 * @property {Object}  karyo                        - the chromosome information
	 * @property {Object}  karyo.chromosomes            - the chromosome details, karyo IDs as keys
	 * @property {Number}  karyo.chromosomes.genome_id  - number of genome to which this chromosome belongs
	 * @property {Number}  karyo.chromosomes.length     - length in bp
	 * @property {String}  karyo.chromosomes.seq        - sequence of the chromosome
	 * @property {Object}  features                     - the feature information, feature IDs as keys
	 * @property {String}  features.karyo               - the karyo ID
	 * @property {Number}  features.start               - start position on the sequence
	 * @property {Number}  features.end                 - end position on the sequence
	 * @property {Object}  links                        - the link information, link IDs as keys
	 * @property {String}  links.source                 - source feature of the link
	 * @property {String}  links.target                 - target feature of the link
	 * @property {Number}  links.identity               - identity of the link
	 */
	this.data = {};
	/**
	 * property to store data specific drawing options (structure highly dependent on data structure)
	 * @property {Object}  filters                      				- the data dependent displaying information
	 * @property {Object}  filters.karyo                        		- the chromosome dependent displaying information
	 * @property {Boolean} filters.skipChromosomesWithoutVisibleLinks	- If a chromosome has no visible links, because they are filtered, it is possible to skip this chromosome.
	 * @property {Boolean} filters.skipChromosomesWithoutLinks			- If a chromosome has no links, the user have the possibility to skip them.
	 * @property {Boolean} filters.showAllChromosomes					- Allows to show all chromosomes, even if when they are set not visible.
	 * @property {Boolean} filters.onlyShowAdjacentLinks				- Allows to show only adjacent links or all links.			
	 * @property {Array}   filters.karyo.order                  		- array of chromosome IDs in the desired order (circular layout)
	 * @property {Array}   filters.karyo.genome_order          			- array of genome IDs in the desired order (linear layout)
	 * @property {Object}  filters.karyo.chromosomes           			- the chromosome drawing details, karyo IDs as keys
	 * @property {Boolean} filters.karyo.chromosomes.reverse    		- should the sequence be treated as its reverse (complement)
	 * @property {Boolean} filters.karyo.chromosomes.visible    		- should the sequence be displayed at all
	 * @property {Number}  filters.links.minLinkIdentity	    		- The minimum identity of links which should be draw.
	 * @property {Number}  filters.links.maxLinkIdentity    			- The maximum identity of links which should be draw.
	 * @property {Number}  filters.links.minLinkLength  				- The minimum length of links, which should be draw in bp.
	 * @property {Number}  filters.links.maxLinkLength  				- The maximum length of links, which should be draw in bp.
	 */
	this.filters = {};
	/**
	 * property to store configuration options
	 * @property {Object}  linear                                  - The configuration options for the linear layout.
	 * @property {Boolean} linear.drawAllLinks                     - Only adjacent links should be drawn, but the user has the possibility to set this value on true, so all links will be drawn.
	 * @property {String}  linear.startLineColor                   - The start color of the color gradient for drawing karyos according to their genomeId
	 * @property {String}  linear.endLineColor                     - The end color of the color gradient. 
	 * @property {Object}  circular                                - The configuration options for the circular layout.
	 * @property {Number}  circular.tickSize                       - The size of the ticks in pixels. 
	 * @property {Number}  minLinkIdentity                         - The minimum of the link identity the user wants to color.
	 * @property {Number}  maxLinkIdentity                         - The maximum of the link identity the user wants to color.
	 * @property {Number}  midLinkIdentity                         - The middle of the link identity the user wants to color.
	 * @property {String}  minLinkIdentityColor                    - The color of the minimum link.
	 * @property {String}  maxLinkIdentityColor                    - The color of the maximum link.
	 * @property {String}  midLinkIdentityColor                    - The color of the middle link.  
	 * @property {Number}  minLinkLength						   - The minimum length of a link:
	 * @property {Number}  maxLinkLength						   - The maximum length of a link.
	 * @property {Object}  graphicalParameters                     - The configuration options for all graphical parameters.
	 * @property {Number}  graphicalParameters.width               - The width of the svg in px.
	 * @property {Number}  graphicalParameters.height              - The height of the svg in px.
	 * @property {Number}  graphicalParameters.karyoHeight         - The height of each chromosome in px.
	 * @property {Number}  graphicalParameters.karyoDistance       - The horizontal distance between adjacent chromosomes of the same genome in bp.
	 * @property {Number}  graphicalParameters.linkKaryoDistance   - The vertical distance between chromosomes and links in px.
	 * @property {Number}  graphicalParameters.tickDistance        - The distance in bp of ticks on the drawn chromosomes.
	 * @property {Number}  graphicalParameters.treeWidth		   - The width of the svg drawing area, where the tree should be shown.
	 * @property {Number}  graphicalParameters.genomeLabelWidth    - The width of the svg drawing area, where the genome labels should be shown.
	 * @property {String}  layout                                  - Contains the current layout, this means linear or circular.
	 * @property {Object}  tree									   - Contains the configuration objects for drawing a tree.
	 * @property {Boolean} tree.drawTree						   - With this option it is possible to draw a phylogenetic tree ext to the chromosomes.
	 * @property {Boolean} tree.orientation						   - Defines where the tree should be drawn.
	 * @property {Object}  features								   - Contains the configuration for feature groups.
	 * @property {Boolean} features.showAllFeatures				   - Defines if all features are drawn or not.
	 * @property {Object}  features.gen							   - Contains the configuration for genes.
	 * @property {String}  features.gen.form					   - Defines the shape of a gen.
	 * @property {String}  features.gen.color					   - Defines the color of a gen.
	 * @property {Number}  features.gen.height					   - Defines the height of the drawn gen onto the chromosome.
	 * @property {Boolean} features.gen.visible					   - Defines if a gen is drawn or not.
	 * @property {Object}  features.invertedRepeat				   - Contains the configuration for inverted repeats.
	 * @property {String}  features.invertedRepeat.form			   - Defines the shape of an inverted repeat.
	 * @property {String}  features.invertedRepeat.color		   - Defines the color of an inverted repeat.
	 * @property {Number}  features.invertedRepeat.height		   - Defines the height of the drawn inverted repeat onto the chromosome.
	 * @property {Boolean} features.invertedRepeats.visible		   - Defines if an inverted repeat is drawn or not.
	 * @property {Object}  labels								   - The configuration options for the text labels.
	 * @property {Boolean} labels.showAllLabels					   - With this option it is possible to set labels to genomes, chromosomes and all features.
	 * @property {Object}  labels.chromosomes					   - Contains the configurations for the chromosome labels.
	 * @property {Boolean} labels.chromosomes.showChromosomeLabels - Defines if chromosome labels are shown or not.
	 * @property {Object}  labels.genome					   	   - Contains the configurations for the genome labels.
	 * @property {Boolean} labels.genome.showGenomeLabels 		   - Defines if genome labels are shown or not.
	 * @property {Object}  labels.features					   	   - Contains the configurations for the feature labels.
	 * @property {Boolean} labels.features.showFeatureLabels 	   - Defines if feature labels are shown or not.
	 */
	this.conf = {
		linear: {
			drawAllLinks: false,
			startLineColor: "#49006a",
			endLineColor: "#1d91c0",
		},
		circular: {
			tickSize: 5
		},
		graphicalParameters: {
			width: 1000,
			height: 1000,
			karyoHeight: 30,
			karyoDistance: 10,
			linkKaryoDistance: 10,
			tickDistance: 100,
			treeWidth: 300,
			genomeLabelWidth: 150
		},
		minLinkIdentity: 40,
		maxLinkIdentity: 100,
		midLinkIdentity: 60,
		minLinkIdentityColor: "#D21414",
		maxLinkIdentityColor: "#1DAD0A",
		midLinkIdentityColor: "#FFEE05",
		minLinkLength: 100,
		maxLinkLength: 5000,
		layout: "linear",
		tree: {
			drawTree: false,
			orientation: "left"
		},
		features: {
			showAllFeatures: false,
			supportedFeatures: {
				gen: {
					form: "rect",
					color: "#E2EDFF",
					height: 30,
					visible: false
				},
				invertedRepeat: {
					form: "arrow",
					color: "#e7d3e2",
					height: 30,
					visible: false
				}
			}
		},
		labels: {
			showAllLabels: false,
			chromosome: {
				showChromosomeLabels: true
			},
			genome: {
				showGenomeLabels: true
			},
			features: {
				showFeatureLabels: false
			}
		}
	};
	// Initialize svg size
	svg.width(this.conf.graphicalParameters.width);
	svg.height(this.conf.graphicalParameters.height);
}

/**
 * Sets the data of the AliTV object.
 * For the required format see the documentation of the data property
 * @author Markus Ankenbrand <markus.ankenbrand@uni-wuerzburg.de>
 * @param {Object} data - Object containing karyo, link and feature information
 * @example
 * var svg = $('#canvas');
 * var wga = new AliTV(svg);
 * var karyo = {
 * 	'chromosomes': {
 * 	'c1': {'genome_id': 0, 'length': 2000, 'seq': null},
 * 	'c2': {'genome_id': 1, 'length': 1000, 'seq': null}
 * 	}
 * };
 * var features = {
 * 	'f1': {'karyo': 'c1', 'start': 300, 'end': 800},
 * 	'f2': {'karyo': 'c2', 'start': 100, 'end': 600}
 * };
 * var links = { "l1":
 * 	{'source': 'f1', 'target': 'f2', 'identity': 90}
 * };
 * wga.setData({'karyo': karyo, 'features': features, 'links': links};
 */
AliTV.prototype.setData = function(data) {
	this.data = data;
};

/**
 * Sets the filters of the AliTV object.
 * For the required format see the documentation of the filters property
 * The filters are highly dependent on the data object and have to resemble its layout
 * @author Markus Ankenbrand <markus.ankenbrand@uni-wuerzburg.de>
 * @param {Object} filters - Object containing data specific drawing information
 * @example
 * var svg = $('#canvas');
 * var wga = new AliTV(svg);
 * var karyo = {
 * 	'chromosomes': {
 * 	'c1': {'genome_id': 0, 'length': 2000, 'seq': null},
 * 	'c2': {'genome_id': 1, 'length': 1000, 'seq': null}
 * 	}
 * };
 * var features = {
 * 	'f1': {'karyo': 'c1', 'start': 300, 'end': 800},
 * 	'f2': {'karyo': 'c2', 'start': 100, 'end': 600}
 * };
 * var links = {"l1":
 * 	{'source': 'f1', 'target': 'f2', 'identity': 90}
 * };
 * wga.setData({'karyo': karyo, 'features': features, 'links': links};
 * var filters = {
 * 	'karyo': {
 * 		'order': ['c1', 'c2'],
 * 		'genome_order': ['0', '1'],
 * 		'chromosomes': {
 * 	 		'c1': {'reverse': false, 'visible': true},
 * 			'c2': {'reverse': false, 'visible': true}
 * 		}
 * 	}
 * };
 * wga.setFilters(filters);
 * wga.drawLinear();
 * wga.drawCircular();
 */
AliTV.prototype.setFilters = function(filters) {
	this.filters = filters;
};

/**
 * Calculates coordinates for the chromosomes to draw in the linear layout.
 * This function operates on the data property of the object and therefore needs no parameters.
 * This function is primarily meant for internal usage, the user should not need to call this directly.
 * @author Markus Ankenbrand <markus.ankenbrand@uni-wuerzburg.de>
 * @returns {Array} Array containing one Object for each element in data.karyo of the form {karyo: 'karyo_name', x:0, y:0, width:10, height:10}
 */
AliTV.prototype.getLinearKaryoCoords = function() {
	var linearKaryoCoords = [];
	var genome_order = this.filters.karyo.genome_order;
	var conf = this.conf;
	var genomeDistance = this.getGenomeDistance();
	var that = this;
	var visibleChromosomes = that.filterChromosomes();
	var orderOfVisibleChromosomes = that.filterChromosomeOrder(visibleChromosomes);

	var total = [];
	var current = [];
	var i;
	// Initialize total with the negative of one karyoDistance - as there is one space less then karyos per genome
	for (i = 0; i < genome_order.length; i++) {
		total.push(-conf.graphicalParameters.karyoDistance);
		current.push(0);
	}

	$.each(visibleChromosomes, function(key, value) {
		total[genome_order.indexOf(value.genome_id)] += value.length + conf.graphicalParameters.karyoDistance;
	});
	var maxTotalSize = Math.max.apply(null, total);

	for (i = 0; i < orderOfVisibleChromosomes.length; i++) {
		var key = orderOfVisibleChromosomes[i];
		var value = visibleChromosomes[key];
		var coord = {
			'karyo': key,
			'y': genome_order.indexOf(value.genome_id) * genomeDistance,
			'height': conf.graphicalParameters.karyoHeight,
			'genome': value.genome_id
		};

		if (this.filters.karyo.chromosomes[key].reverse === false) {
			coord.width = (value.length / maxTotalSize) * conf.graphicalParameters.width;
			coord.x = (current[genome_order.indexOf(value.genome_id)] / maxTotalSize) * conf.graphicalParameters.width;
		} else {
			coord.x = (current[genome_order.indexOf(value.genome_id)] / maxTotalSize) * conf.graphicalParameters.width + (value.length / maxTotalSize) * conf.graphicalParameters.width;
			coord.width = (value.length / maxTotalSize) * conf.graphicalParameters.width * (-1);
		}
		current[genome_order.indexOf(value.genome_id)] += value.length + conf.graphicalParameters.karyoDistance;
		linearKaryoCoords.push(coord);
	}
	return linearKaryoCoords;
};

/**
 * Calculate coordinates for the links to draw in the linear layout and uses link-data and karyo-coordinates
 * this function should also check if links are adjacent or not and save this information in the link property "adjacent"
 * This function is primarily meant for internal usage, the user should not need to call this directly
 * @author Sonja Hohlfeld
 * @param {Array} The array containing the coordinates as returned by getLinearKaryoCoords()
 * @returns {Array} Returns an Array which is presented in the following example
 * @example [
 *					{"linkID": "l1", "source0": {"x":0, "y":10}, "target0": {"x": 0, "y":20}, "source1": {"x":10, "y":10}, "target1": {"x":10, "y":20}, "adjacent": true}
 *			]
 */

AliTV.prototype.getLinearLinkCoords = function(coords) {
	var linearLinkCoords = [];
	if (typeof coords === 'undefined') {
		return linearLinkCoords;
	}
	var that = this;
	var conf = this.conf;
	var visibleChromosomes = that.filterChromosomes();
	var visibleLinks = that.filterLinks(visibleChromosomes);
	var karyoMap = {};
	$.each(coords, function(key, value) {
		karyoMap[value.karyo] = key;
	});
	$.each(visibleLinks, function(key, value) {
		var link = {};
		link.linkID = key;
		link.source0 = {};
		link.source1 = {};
		link.target0 = {};
		link.target1 = {};
		var feature1 = that.data.features[value.source];
		var feature2 = that.data.features[value.target];
		var karyo1 = that.data.karyo.chromosomes[feature1.karyo];
		var karyo2 = that.data.karyo.chromosomes[feature2.karyo];
		var karyo1Coords = coords[karyoMap[feature1.karyo]];
		var karyo2Coords = coords[karyoMap[feature2.karyo]];
		var genomePosition1 = that.filters.karyo.genome_order.indexOf(karyo1.genome_id);
		var genomePosition2 = that.filters.karyo.genome_order.indexOf(karyo2.genome_id);
		var lengthOfFeature1 = Math.abs(that.data.features[value.source].end - that.data.features[value.source].start);
		var lengthOfFeature2 = Math.abs(that.data.features[value.target].end - that.data.features[value.target].start);


		if (genomePosition1 > genomePosition2) {
			var tmp = feature1;
			feature1 = feature2;
			feature2 = tmp;
			tmp = karyo1;
			karyo1 = karyo2;
			karyo2 = tmp;
			tmp = karyo1Coords;
			karyo1Coords = karyo2Coords;
			karyo2Coords = tmp;
		}
		link.source0.x = karyo1Coords.x + karyo1Coords.width * feature1.start / karyo1.length;
		link.source0.y = karyo1Coords.y + karyo1Coords.height + conf.graphicalParameters.linkKaryoDistance;
		link.source1.x = karyo1Coords.x + karyo1Coords.width * feature1.end / karyo1.length;
		link.source1.y = karyo1Coords.y + karyo1Coords.height + conf.graphicalParameters.linkKaryoDistance;

		link.target0.x = karyo2Coords.x + karyo2Coords.width * feature2.start / karyo2.length;
		link.target0.y = karyo2Coords.y - conf.graphicalParameters.linkKaryoDistance;
		link.target1.x = karyo2Coords.x + karyo2Coords.width * feature2.end / karyo2.length;
		link.target1.y = karyo2Coords.y - conf.graphicalParameters.linkKaryoDistance;

		linearLinkCoords.push(link);

	});
	return linearLinkCoords;
};

/**
 * This function draws the karyos in the linear layout, color them according to their genome_id and add some events to the chromosome.
 * @author Markus Ankenbrand and Sonja Hohlfeld
 * @param {Array} The array containing the coordinates as returned by getLinearKaryoCoords()
 */
AliTV.prototype.drawLinearKaryo = function(linearKaryoCoords) {
	var that = this;

	that.svgD3.selectAll(".karyoGroup").remove();
	that.svgD3.append("g")
		.attr("class", "karyoGroup")
		.selectAll("path")
		.data(linearKaryoCoords)
		.enter()
		.append("rect")
		.attr("class", "karyo")
		.attr("x", function(d) {
			if (d.width < 0) {
				return d.x + d.width;
			} else {
				return d.x;
			}
		})
		.attr("y", function(d) {
			return d.y;
		})
		.attr("width", function(d) {
			return Math.abs(d.width);
		})
		.attr("height", function(d) {
			return d.height;
		})
		.on("mouseover", function(g) {
			that.fadeLinks(g, 0.1);
		})
		.on("mouseout", function(g) {
			that.fadeLinks(g, 1);
		})
		.on("click", function(g) {
			that.filters.karyo.chromosomes[g.karyo].reverse = !that.filters.karyo.chromosomes[g.karyo].reverse;
			that.drawLinear();
		})
		.style("fill", function(d) {
			return that.colorKaryoByGenomeId(that.data.karyo.chromosomes[d.karyo].genome_id);
		});

	if (that.conf.labels.showAllLabels === true || that.conf.labels.genome.showGenomeLabels === true) {
		that.svgD3.selectAll(".karyoGroup").attr("transform", "translate(" + that.conf.graphicalParameters.genomeLabelWidth + ", 0)");
	}
	if (that.conf.tree.drawTree === true && that.conf.tree.orientation === "left") {
		that.svgD3.selectAll(".karyoGroup").attr("transform", "translate(" + that.conf.graphicalParameters.treeWidth + ", 0)");
	}
	if ((that.conf.labels.showAllLabels === true || that.conf.labels.genome.showGenomeLabels) && that.conf.tree.drawTree === true && that.conf.tree.orientation === "left") {
		that.svgD3.selectAll(".karyoGroup").attr("transform", "translate(" + (that.conf.graphicalParameters.treeWidth + that.conf.graphicalParameters.genomeLabelWidth) + ", 0)");
	}
};

/**
 * This function color links according to their identity and is called by drawLinearLinks within the style attribute
 * It operates on the identity value of the links and therefore the identity should be assigned to the function
 * The identity is assigned to a color which is used by the drawLinearLinks function, so the returned value is the RGB farbcode
 * @author Sonja Hohlfeld
 */
AliTV.prototype.colorLinksByIdentity = function(identity) {
	var that = this;
	var linkIdentityDomain = [0, that.conf.minLinkIdentity, that.conf.midLinkIdentity, that.conf.maxLinkIdentity, 100];
	var linkIdentityColorRange = [that.conf.minLinkIdentityColor, that.conf.minLinkIdentityColor, that.conf.midLinkIdentityColor, that.conf.maxLinkIdentityColor, that.conf.maxLinkIdentityColor];
	var color = d3.scale.linear()
		.domain(linkIdentityDomain)
		.range(linkIdentityColorRange);

	return color(identity);
};

/**
 * This function color karyos according to their genome_id and is called by drawLinearKaryo within the style attribute
 * It operates on the genome_id of the links and therefore the genome_id should be assigned to the function
 * The genome_id is assigned to a color which is used by the drawLinearKaryo function, so the returned value is the RGB farbcode
 * @author Sonja Hohlfeld
 */
AliTV.prototype.colorKaryoByGenomeId = function(genomeId) {
	var that = this;
	var genomeOrder = [0, (that.filters.karyo.genome_order.length - 1)];
	var colorRange = [that.conf.linear.startLineColor, that.conf.linear.endLineColor];
	var color = d3.scale.linear()
		.domain(genomeOrder)
		.range(colorRange);

	return color(genomeId);
};

/**
 * This function calculates the tick coords and operates on the chromosomes and need the length in bp and the width in px of the karyo.
 * @author Sonja Hohlfeld
 * @param {Array} The array containing the coordinates as returned by getLinearKaryoCoords()
 * @return {Array} The array containing the tick coordinates as shown in the following example
 * @example linearTickCoords = [[0, 50, 100, 150, 200], [0, 50, 100], [100, 150, 200]]
 */

AliTV.prototype.getLinearTickCoords = function(karyoCoords) {
	var that = this;
	var linearTickCoords = [];
	$.each(karyoCoords, function(key, value) {
		var ticks = [];
		var scale = d3.scale.linear()
			.domain([0, that.data.karyo.chromosomes[value.karyo].length])
			.range([value.x, value.x + value.width]);

		var chromosomePosition = 0;
		while (chromosomePosition <= that.data.karyo.chromosomes[value.karyo].length) {
			ticks.push(scale(chromosomePosition));
			chromosomePosition += that.conf.graphicalParameters.tickDistance;
			var coords = {};
			coords.x1 = ticks[ticks.length - 1];
			coords.y1 = value.y - 5;
			coords.x2 = ticks[ticks.length - 1];
			coords.y2 = value.y + value.height + 5;
			linearTickCoords.push(coords);
		}
	});
	return linearTickCoords;
};

/**
 * This function draw the ticks in the linear layout.
 * @author Sonja Hohlfeld
 * @param {Array} The array containing the coordinates as returned by getLinearTickCoords()
 */

AliTV.prototype.drawLinearTicks = function(linearTickCoords) {
	var that = this;
	this.svgD3.selectAll(".tickGroup").remove();
	that.svgD3.append("g")
		.attr("class", "tickGroup")
		.selectAll("path")
		.data(linearTickCoords)
		.enter()
		.append("line")
		.attr("class", "tick")
		.attr("x1", function(d) {
			return d.x1;
		})
		.attr("y1", function(d) {
			return d.y1;
		})
		.attr("x2", function(d) {
			return d.x2;
		})
		.attr("y2", function(d) {
			return d.y2;
		})
		.style("stroke", "#000");

	if (that.conf.tree.drawTree === true && that.conf.tree.orientation === "left") {
		that.svgD3.selectAll(".tickGroup").attr("transform", "translate(" + that.conf.graphicalParameters.treeWidth + ", 0)");
	}
	if (that.conf.labels.showAllLabels === true || that.conf.labels.genome.showGenomeLabels === true) {
		that.svgD3.selectAll(".tickGroup").attr("transform", "translate(" + that.conf.graphicalParameters.genomeLabelWidth + ", 0)");
	}
	if ((that.conf.labels.showAllLabels === true || that.conf.labels.genome.showGenomeLabels === true) && that.conf.tree.drawTree === true && that.conf.tree.orientation === "left") {
		that.svgD3.selectAll(".tickGroup").attr("transform", "translate(" + (that.conf.graphicalParameters.treeWidth + that.conf.graphicalParameters.genomeLabelWidth) + ", 0)");
	}
};

/**
 * This function is called by a mouse event.
 * If the mouse pointer enters the area of a chromosome all links should be faded out except the the links of the chromosome the mouse points to.
 * If the mouse pointer leaves the area of a chromosome all links should be faded in.
 * @param {Number} The opacity value is a number between 0 and 1 and indicates the degree of the colored link opacity.
 */
AliTV.prototype.fadeLinks = function(g, opacity) {
	var that = this;
	that.svgD3.selectAll(".link")
		.filter(function(d) {
			return that.data.features[that.data.links[d.linkID].source].karyo != g.karyo && that.data.features[that.data.links[d.linkID].target].karyo != g.karyo;
		})
		.transition()
		.style("opacity", opacity);
};

/**
 * This function draws adjacent links in the linear layout
 * @author Sonja Hohlfeld
 * @param {Array} The array linearLinkCoords containing the coordinates of all links as returned by getLinearLinkCoords()
 */

AliTV.prototype.drawLinearLinks = function(linearLinkCoords) {
	var that = this;
	var coordsToPath = function(link) {
		var diagonal = d3.svg.diagonal().source(function(d) {
			return d.source;
		}).target(function(d) {
			return d.target;
		});
		var path1 = diagonal({
			source: link.source0,
			target: link.target0
		});
		var path2 = diagonal({
			source: link.target1,
			target: link.source1
		}).replace(/^M/, 'L');
		var shape = path1 + path2 + 'Z';
		return shape;
	};

	this.svgD3.selectAll(".linkGroup").remove();
	this.svgD3.append("g")
		.attr("class", "linkGroup")
		.selectAll("path")
		.data(linearLinkCoords)
		.enter()
		.append("path")
		.attr("class", "link")
		.attr("d", coordsToPath)
		.style("fill", function(d) {
			return that.colorLinksByIdentity(that.data.links[d.linkID].identity);
		});

	if (that.conf.tree.drawTree === true && that.conf.tree.orientation === "left") {
		that.svgD3.selectAll(".linkGroup").attr("transform", "translate(" + that.conf.graphicalParameters.treeWidth + ", 0)");
	}
	if (that.conf.labels.showAllLabels === true || that.conf.labels.genome.showGenomeLabels === true) {
		that.svgD3.selectAll(".linkGroup").attr("transform", "translate(" + that.conf.graphicalParameters.genomeLabelWidth + ", 0)");
	}
	if ((that.conf.labels.showAllLabels === true || that.conf.labels.genome.showGenomeLabels === true) && that.conf.tree.drawTree === true && that.conf.tree.orientation === "left") {
		that.svgD3.selectAll(".linkGroup").attr("transform", "translate(" + (that.conf.graphicalParameters.treeWidth + that.conf.graphicalParameters.genomeLabelWidth) + ", 0)");
	}
};


/**
 * This function draws the data in the linear layout.
 * It operates on the data of the object and therefore needs no parameters.
 * It draws directly on the svg and therefore has no return value.
 * @author Markus Ankenbrand <markus.ankenbrand@uni-wuerzburg.de>
 */
AliTV.prototype.drawLinear = function() {
	this.svgD3.selectAll(".treeGroup").remove();
	this.svgD3.selectAll(".chromosomeLabelGroup").remove();
	this.svgD3.selectAll(".featureLabelGroup").remove();
	this.svgD3.selectAll(".genomeLabelGroup").remove();

	var karyoCoords = this.getLinearKaryoCoords();
	var linearTickCoords = this.getLinearTickCoords(karyoCoords);
	this.drawLinearTicks(linearTickCoords);
	this.drawLinearKaryo(karyoCoords);
	var linkCoords = this.getLinearLinkCoords(karyoCoords);
	this.drawLinearLinks(linkCoords);


	if (this.conf.labels.showAllLabels === true || this.conf.labels.genome.showGenomeLabels === true) {
		var linearGenomeLabelCoords = this.getGenomeLabelCoords();
		this.drawLinearGenomeLabels(linearGenomeLabelCoords);
		$('#wgaCanvas').width(this.conf.graphicalParameters.width + this.conf.graphicalParameters.genomeLabelWidth);
	}

	if (this.conf.features.showAllFeatures === true || this.conf.features.supportedFeatures.gen.visible === true || this.conf.features.supportedFeatures.invertedRepeat.visible === true) {
		var linearFeatureCoords = this.getLinearFeatureCoords(karyoCoords);
		this.drawLinearFeatures(linearFeatureCoords);
		if (this.conf.labels.showAllLabels === true || this.conf.labels.features.showFeatureLabels === true) {
			var linearFeatureLabelCoords = this.getFeatureLabelCoords(linearFeatureCoords);
			this.drawLinearFeatureLabels(linearFeatureLabelCoords);
		}
	}
	if (this.conf.labels.showAllLabels === true || this.conf.labels.chromosome.showChromosomeLabels === true) {
		var linearChromosomeLabelCoords = this.getChromosomeLabelCoords(karyoCoords);
		this.drawLinearChromosomeLabels(linearChromosomeLabelCoords);
	}

	if (this.conf.tree.drawTree === true && this.hasTree() === true) {
		this.drawPhylogeneticTree();
		$('#wgaCanvas').width(this.conf.graphicalParameters.width + this.conf.graphicalParameters.treeWidth);
	}

	if (this.conf.tree.drawTree === true && (this.conf.labels.showAllLabels === true || this.conf.labels.genome.showGenomeLabels)) {
		$('#wgaCanvas').width(this.conf.graphicalParameters.width + this.conf.graphicalParameters.treeWidth + this.conf.graphicalParameters.genomeLabelWidth);
	}
	this.conf.layout = "linear";
};

/**
 * Calculates coordinates for the chromosomes to draw in the circular layout.
 * This function operates on the data property of the object and therefore needs no parameters.
 * This function is primarily meant for internal usage, the user should not need to call this directly.
 * @author Markus Ankenbrand <markus.ankenbrand@uni-wuerzburg.de>
 * @returns {Array} Array containing one Object for each element in data.karyo of the form {karyo: 'karyo_name', startAngle:0, endAngle:1}
 */
AliTV.prototype.getCircularKaryoCoords = function() {
	var circularKaryoCoords = [];
	var total = 0;
	var spacer = this.conf.graphicalParameters.karyoDistance;
	var current = -spacer;
	$.each(this.data.karyo.chromosomes, function(key, value) {
		total += value.length + spacer;
	});
	for (var i = 0; i < this.filters.karyo.order.length; i++) {
		var key = this.filters.karyo.order[i];
		var value = this.data.karyo.chromosomes[key];
		var data = {
			"karyo": key,
			"startAngle": ((current + spacer) / total) * (2 * Math.PI),
		};
		current += value.length + spacer;
		data.endAngle = (current / total) * (2 * Math.PI);
		if (this.filters.karyo.chromosomes[key].reverse === true) {
			var startAngle = data.startAngle;
			var endAngle = data.endAngle;
			data.startAngle = endAngle;
			data.endAngle = startAngle;
		}
		circularKaryoCoords.push(data);
	}
	return circularKaryoCoords;
};

/**
 * Calculate coordinates for the links to draw in the cirular layout and uses link-data and karyo-coordinates
 * This function is primarily meant for internal usage, the user should not need to call this directly
 * @author Markus Ankenbrand
 * @param {Array} The array containing the coordinates as returned by getCircularKaryoCoords()
 * @returns {Array} Returns an Array which is presented in the following example
 * @example [
 *					{"linkID": "l1", "source": {"startAngle":1, "endAngle":3}, "target": {"startAngle":4, "endAngle":6}}
 *			]
 */
AliTV.prototype.getCircularLinkCoords = function(coords) {
	var circularLinkCoords = [];
	if (typeof coords === 'undefined') {
		return circularLinkCoords;
	}
	var that = this;
	var karyoMap = {};
	$.each(coords, function(key, value) {
		karyoMap[value.karyo] = key;
	});

	$.each(that.data.links, function(key, value) {
		var link = {};
		link.linkID = key;

		var feature1 = that.data.features[value.source];
		var feature2 = that.data.features[value.target];
		var karyo1 = that.data.karyo.chromosomes[feature1.karyo];
		var karyo2 = that.data.karyo.chromosomes[feature2.karyo];
		var karyo1Coords = coords[karyoMap[feature1.karyo]];
		var karyo2Coords = coords[karyoMap[feature2.karyo]];

		var sourceScale = d3.scale.linear().domain([0, karyo1.length]).range([karyo1Coords.startAngle, karyo1Coords.endAngle]);
		var targetScale = d3.scale.linear().domain([0, karyo2.length]).range([karyo2Coords.startAngle, karyo2Coords.endAngle]);

		link.source = {
			startAngle: sourceScale(feature1.start),
			endAngle: sourceScale(feature1.end)
		};
		link.target = {
			startAngle: targetScale(feature2.start),
			endAngle: targetScale(feature2.end)
		};

		circularLinkCoords.push(link);
	});

	return circularLinkCoords;
};

/**
 * This function calculates the coordinates (angles) for the ticks in the circular layout
 * @author Markus Ankenbrand
 * @param {Array} The array containing the coordinates as returned by getCircularKaryoCoords()
 * @returns {Array} Returns an Array of angles
 */
AliTV.prototype.getCircularTickCoords = function(coords) {
	var that = this;
	var circularTickCoords = [];
	$.each(coords, function(key, value) {
		var karyoLength = that.data.karyo.chromosomes[value.karyo].length;
		var baseToAngle = d3.scale.linear().domain([0, karyoLength]).range([value.startAngle, value.endAngle]);
		var chromosomePosition = 0;
		while (chromosomePosition <= karyoLength) {
			circularTickCoords.push(baseToAngle(chromosomePosition));
			chromosomePosition += that.conf.graphicalParameters.tickDistance;
		}
	});
	return circularTickCoords;
};

/**
 * This function draws the karyos in the circular layout, color them according to their genome_id and add some eventHandlers.
 * @author Markus Ankenbrand
 * @param {Array} The array containing the coordinates as returned by getCircularKaryoCoords()
 */
AliTV.prototype.drawCircularKaryo = function(coords) {
	var that = this;
	this.svgD3.selectAll(".karyoGroup").remove();
	var outerRadius = this.getOuterRadius();
	this.svgD3.append("g")
		.attr("class", "karyoGroup")
		.attr("transform", "translate(" + this.conf.graphicalParameters.width / 2 + "," + this.conf.graphicalParameters.height / 2 + ")")
		.selectAll("path")
		.data(coords)
		.enter()
		.append("path")
		.attr("d", d3.svg.arc().innerRadius(outerRadius - this.conf.graphicalParameters.karyoHeight).outerRadius(outerRadius))
		.attr("class", "karyo")
		.style("fill", function(d) {
			return that.colorKaryoByGenomeId(that.data.karyo.chromosomes[d.karyo].genome_id);
		})
		.on("mouseover", function(g) {
			that.fadeLinks(g, 0.1);
		})
		.on("mouseout", function(g) {
			that.fadeLinks(g, 1);
		})
		.on("click", function(g) {
			that.filters.karyo.chromosomes[g.karyo].reverse = !that.filters.karyo.chromosomes[g.karyo].reverse;
			that.drawCircular();
		});
};

/**
 * This function draws the ticks to the karyos in the circular layout
 * @author Markus Ankenbrand
 * @param {Array} The array containing the coordinates as returned by getCircularTickCoords()
 */
AliTV.prototype.drawCircularTicks = function(coords) {
	var that = this;
	that.svgD3.selectAll(".tickGroup").remove();

	that.svgD3.append("g")
		.attr("class", "tickGroup")
		.attr("transform", "translate(" + this.conf.graphicalParameters.width / 2 + "," + this.conf.graphicalParameters.height / 2 + ")")
		.selectAll("path")
		.data(coords)
		.enter()
		.append("path")
		.attr("d", function(d) {
			var startPoint = d3.svg.line.radial()([
				[that.getOuterRadius() + that.conf.circular.tickSize, d]
			]);
			var endPoint = d3.svg.line.radial()([
				[that.getOuterRadius(), d]
			]);
			endPoint = endPoint.replace(/^M/, 'L');
			return startPoint + endPoint + "Z";
		})
		.style("stroke", "#000");
};

/**
 * This function draws links in the circular layout
 * @author Markus Ankenbrand
 * @param {Array} The array circularLinkCoords containing the coordinates of all links as returned by getCircularLinkCoords()
 */
AliTV.prototype.drawCircularLinks = function(circularLinkCoords) {
	var that = this;
	this.svgD3.selectAll(".linkGroup").remove();
	this.svgD3.append("g")
		.attr("class", "linkGroup")
		.attr("transform", "translate(" + this.conf.graphicalParameters.width / 2 + "," + this.conf.graphicalParameters.height / 2 + ")")
		.selectAll("path")
		.data(circularLinkCoords)
		.enter()
		.append("path")
		.attr("class", "link")
		.attr("d", d3.svg.chord().radius(this.getOuterRadius() - this.conf.graphicalParameters.karyoHeight - this.conf.graphicalParameters.linkKaryoDistance))
		.style("fill", function(d) {
			return that.colorLinksByIdentity(that.data.links[d.linkID].identity);
		});
};

/**
 * This function draws the data in the circular layout.
 * It operates on the data of the object and therefore needs no parameters.
 * It draws directly on the svg and therefore has no return value.
 * @author Markus Ankenbrand <markus.ankenbrand@uni-wuerzburg.de>
 */
AliTV.prototype.drawCircular = function() {
	this.svgD3.selectAll(".treeGroup").remove();
	this.svgD3.selectAll(".featureGroup").remove();
	var karyoCoords = this.getCircularKaryoCoords();
	var tickCoords = this.getCircularTickCoords(karyoCoords);
	this.drawCircularTicks(tickCoords);
	this.drawCircularKaryo(karyoCoords);
	var linkCoords = this.getCircularLinkCoords(karyoCoords);
	this.drawCircularLinks(linkCoords);
	this.conf.layout = "circular";
};

/**
 * This function returns the information of the spacer between two chromosomes which is set in the configuration.
 * @returns {Number} The actual spacer.
 * @author Sonja Hohlfeld
 */

AliTV.prototype.getLinearSpacer = function() {
	return this.conf.graphicalParameters.karyoDistance;
};


/**
 * This function replaces the old spacer with the new spacer in the config-object.
 * It is called by a blur()-event, when the decription field loses focus.
 * When the method gets a wrong spacer it throws an error message.
 * @param {Number} The function gets the spacer which can be set by the user.
 * @throws Will throw an error if the argument is empty.
 * @throws Will throw an error if the argument is not a number.
 * @throws Will throw an error if the argument is less than 0 or equal to 0.
 * @author Sonja Hohlfeld
 */

AliTV.prototype.setLinearSpacer = function(spacer) {
	if (spacer === "") {
		throw "empty";
	} else if (isNaN(spacer)) {
		throw "not a number";
	} else if (spacer <= 0) {
		throw "spacer is to small, it should be > 0";
	} else {
		spacer = Number(spacer);
		this.conf.graphicalParameters.karyoDistance = spacer;
		return this.conf.graphicalParameters.karyoDistance;
	}
};

/**
 * This function returns the height of the chromosomes between two genomes which is set in the configuration.
 * @returns {Number} The actual height of chromosomes.
 * @author Sonja Hohlfeld
 */

AliTV.prototype.getKaryoHeight = function() {
	return this.conf.graphicalParameters.karyoHeight;
};

/**
 * This function replaces the old height of the chromosomes with the new value in the config-object.
 * It is called by a blur()-event, when the decription field loses focus.
 * When the method gets a wrong value it throws an error message.
 * @param {Number} The function gets the height of chromosomes which can be set by the user.
 * @throws Will throw an error if the argument is empty.
 * @throws Will throw an error if the argument is not a number.
 * @throws Will throw an error if the argument is less than 0 or equal to 0.
 * @author Sonja Hohlfeld
 */

AliTV.prototype.setKaryoHeight = function(height) {
	if (height === "") {
		throw "empty";
	} else if (isNaN(height)) {
		throw "not a number";
	} else if (height <= 0) {
		throw "genome distance is to small, it should be > 0";
	} else {
		height = Number(height);
		this.conf.graphicalParameters.karyoHeight = height;
		return this.conf.graphicalParameters.karyoHeight;
	}
};

/**
 * This function returns the width of the svg drawing area.
 * @returns {Number} The width of canvas.
 * @author Sonja Hohlfeld
 */

AliTV.prototype.getCanvasWidth = function() {
	return this.conf.graphicalParameters.width;
};

/**
 * This function replaces the old width of the drawing area with the new width in the config-object.
 * It is called by a blur()-event, when the decription field loses focus.
 * When the method gets a wrong value it throws an error message.
 * @param {Number} The function gets the width of the svg drawing area which can be set by the user.
 * @throws Will throw an error if the argument is empty.
 * @throws Will throw an error if the argument is not a number.
 * @throws Will throw an error if the argument is less than 0 or equal to 0.
 * @author Sonja Hohlfeld
 */

AliTV.prototype.setCanvasWidth = function(width) {
	if (width === "") {
		throw "empty";
	} else if (isNaN(width)) {
		throw "not a number";
	} else if (width <= 0) {
		throw "width is to small, it should be > 0";
	} else {
		width = Number(width);
		this.conf.graphicalParameters.width = width;
		$('#wgaCanvas').width(this.conf.graphicalParameters.width);
		return this.conf.graphicalParameters.width;
	}
};

/**
 * This function returns the height of the svg drawing area.
 * @returns {Number} The height of canvas.
 * @author Sonja Hohlfeld
 */

AliTV.prototype.getCanvasHeight = function() {
	return this.conf.graphicalParameters.height;
};


/**
 * This function replaces the old height of the drawing area with the new height in the config-object.
 * It is called by a blur()-event, when the decription field loses focus.
 * When the method gets a wrong value it throws an error message.
 * @param {Number} The function gets the height of the svg drawing area which can be set by the user.
 * @throws Will throw an error if the argument is empty.
 * @throws Will throw an error if the argument is not a number.
 * @throws Will throw an error if the argument is less than 0 or equal to 0.
 * @author Sonja Hohlfeld
 */

AliTV.prototype.setCanvasHeight = function(height) {
	if (height === "") {
		throw "empty";
	} else if (isNaN(height)) {
		throw "not a number";
	} else if (height <= 0) {
		throw "height is to small, it should be > 0";
	} else {
		height = Number(height);
		this.conf.graphicalParameters.height = height;
		$('#wgaCanvas').height(this.conf.graphicalParameters.height);
		return this.conf.graphicalParameters.height;
	}
};

/**
 * This function returns the distance of the chromosome ticks in bp.
 * @returns {Number} The tick distance in bp.
 * @author Sonja Hohlfeld
 */

AliTV.prototype.getTickDistance = function() {
	return this.conf.graphicalParameters.tickDistance;
};

/**
 * This function replaces the old distance between ticks with the new distance in the config-object.
 * It is called by a blur()-event, when the decription field loses focus.
 * When the method gets a wrong value it throws an error message.
 * @param {Number} The function gets the distance between ticks which can be set by the user.
 * @throws Will throw an error if the argument is empty.
 * @throws Will throw an error if the argument is not a number.
 * @throws Will throw an error if the argument is less than 0 or equal to 0.
 * @author Sonja Hohlfeld
 */

AliTV.prototype.setTickDistance = function(distance) {
	if (distance === "") {
		throw "empty";
	} else if (isNaN(distance)) {
		throw "not a number";
	} else if (distance <= 0) {
		throw "distance is to small, it should be > 0";
	} else {
		distance = Number(distance);
		this.conf.graphicalParameters.tickDistance = distance;
		return this.conf.graphicalParameters.tickDistance;
	}
};

/**
 * This function returns the current layout.
 * @returns {String} The current layout: linear or circular.
 * @author Sonja Hohlfeld
 */

AliTV.prototype.getLayout = function() {
	return this.conf.layout;
};

/**
 * This function should draw the equal layout according to the current layout.
 * @param {String} The current layout, this means circular or linear.
 * @author Sonja Hohlfeld
 */

AliTV.prototype.drawEqualLayout = function(layout) {
	if (layout === "linear") {
		this.drawLinear();
		return this.conf.layout;
	} else {
		this.drawCircular();
		return this.conf.layout;
	}
};

/**
 * This function returns the current width of the phylogenetic tree.
 * @returns {Number} The current tree width.
 * @author Sonja Hohlfeld
 */

AliTV.prototype.getTreeWidth = function() {
	return this.conf.graphicalParameters.treeWidth;
};

/**
 * This function replaces the old tree width with the new tree width in the config-object.
 * When the method gets a wrong value it throws an error message.
 * @param {Number} The function gets the width of a phylogenetic tree which can be set by the user.
 * @throws Will throw an error if the argument is empty.
 * @throws Will throw an error if the argument is not a number.
 * @throws Will throw an error if the argument is less than 0 or equal to 0.
 * @author Sonja Hohlfeld
 */

AliTV.prototype.setTreeWidth = function(treeWidth) {
	if (treeWidth === "") {
		throw "empty";
	} else if (isNaN(treeWidth)) {
		throw "not a number";
	} else if (treeWidth <= 0) {
		throw "the tree width is to small, it should be > 0";
	} else {
		treeWidth = Number(treeWidth);
		this.conf.graphicalParameters.treeWidth = treeWidth;
		return this.conf.graphicalParameters.treeWidth;
	}
};

/**
 * This function calculates the appropriate outerRadius of the circular layout for the current svg dimensions.
 * @returns {Number} outerRadius - the outer radius in px
 * @author Markus Ankenbrand
 */
AliTV.prototype.getOuterRadius = function() {
	var outerRadius = 0.45 * Math.min(this.getCanvasHeight(), this.getCanvasWidth());
	return outerRadius;
};

/**
 * This function calculates the appropriate genomeDistance of the linear layout for the current svg height.
 * @returns {Number} genomeDistance - the distance between genomes in the linear layout.
 * @author Sonja Hohlfeld
 */
AliTV.prototype.getGenomeDistance = function() {
	var genomeDistance = (this.getCanvasHeight() - this.getKaryoHeight()) / (this.filters.karyo.genome_order.length - 1);
	return Math.round(genomeDistance);
};

/**
 * This method should call other filter functions in order to filter the visible chromosomes.
 * @returns visibleChromosomes: returns only chromosomes which are visible
 * @author Sonja Hohlfeld
 */
AliTV.prototype.filterChromosomes = function() {
	var visibleChromosomes = this.data.karyo.chromosomes;
	if (this.filters.showAllChromosomes === false) {
		visibleChromosomes = this.filterVisibleChromosomes(visibleChromosomes);
	} else {
		return visibleChromosomes;
	}
	if (this.filters.skipChromosomesWithoutLinks === true) {
		visibleChromosomes = this.filterChromosomeWithoutLinkageInformation(visibleChromosomes);
	}
	if (this.filters.skipChromosomesWithoutVisibleLinks === true) {
		visibleChromosomes = this.filterChromosomeWithoutVisibleLinks(visibleChromosomes);
	}
	return visibleChromosomes;
};

/**
 *This method should filter all chromosome which are set visible in conf.filters.karyo.chromosomes[<chromosome>].visible
 * @param visibleChromosomes: the method gets all current visible chromosomes.
 * @returns filteredChromosomes: the method returns only chromosomes whose visibility is set true
 * @author Sonja Hohlfeld 
 */
AliTV.prototype.filterVisibleChromosomes = function(visibleChromosomes) {
	var that = this;
	var filteredChromosomes = {};
	$.each(visibleChromosomes, function(key, value) {
		if (that.filters.karyo.chromosomes[key].visible === true) {
			filteredChromosomes[key] = value;
		}
	});
	return filteredChromosomes;
};

/**
 *This method should filter all chromosome which have no linkage information
 * @param visibleChromosomes: the method gets all current visible chromosomes.
 * @returns filteredChromosomes: the method returns only chromosomes which have linkage information
 * @author Sonja Hohlfeld 
 */
AliTV.prototype.filterChromosomeWithoutLinkageInformation = function(visibleChromosomes) {
	var that = this;
	var filteredChromosomes = {};
	$.each(visibleChromosomes, function(key, value) {
		var currentChromosome = key;
		var valueOfCurrentChromosome = value;
		$.each(that.data.links, function(key, value) {
			if (that.data.features[value.source].karyo === currentChromosome && (currentChromosome in filteredChromosomes) === false || that.data.features[value.target].karyo === currentChromosome && (currentChromosome in filteredChromosomes) === false) {
				filteredChromosomes[currentChromosome] = valueOfCurrentChromosome;
			}
		});
	});
	return filteredChromosomes;
};

/**
 * This method should filter all chromosome which have no visible links with the current configurations
 * @param visibleChromosomes: the method gets all current visible chromosomes.
 * @returns filteredChromosomes: the method returns only chromosomes which have visible links
 * @author Sonja Hohlfeld 
 */
AliTV.prototype.filterChromosomeWithoutVisibleLinks = function(visibleChromosomes) {
	var that = this;
	var filteredChromosomes = {};
	var allLinks = that.data.links;
	var filteredLinks = that.filterLinks(visibleChromosomes);
	$.each(visibleChromosomes, function(key, value) {
		var currentChromosome = key;
		var valueOfCurrentChromosome = value;
		$.each(filteredLinks, function(key, value) {
			if (that.data.features[value.source].karyo === currentChromosome && (currentChromosome in filteredChromosomes) === false || that.data.features[value.target].karyo === currentChromosome && (currentChromosome in filteredChromosomes) === false) {
				filteredChromosomes[currentChromosome] = valueOfCurrentChromosome;
			}
		});
	});
	return filteredChromosomes;
};

/**
 * This method is supposed to filter the order of chromosomes according to all visible chromosomes.
 * @param visibleChromosomes: gets all visible chromosomes
 * @return chromosomeOrder: returns the order of the visible chromosomes
 * @author Sonja Hohlfeld
 */
AliTV.prototype.filterChromosomeOrder = function(visibleChromosomes) {
	var orderOfVisibleChromosomes = [];
	var keysOfVisibleChromosomes = [];
	$.each(visibleChromosomes, function(key, value) {
		keysOfVisibleChromosomes.push(key);
	});
	$.each(this.filters.karyo.order, function(key, value) {
		if (keysOfVisibleChromosomes.indexOf(value) !== -1) {
			orderOfVisibleChromosomes.push(value);
		}
	});
	return orderOfVisibleChromosomes;
};

/**
 * This method should call functions in order to filter the links.
 * @param visibleChromosomes: gets the chromosomes which are visible in the current configurations.
 * @returns visibleLinks: return all links which are visible
 * @author Sonja Hohlfeld
 */
AliTV.prototype.filterLinks = function(visibleChromosomes) {
	var visibleLinks = this.filterVisibleLinks(visibleChromosomes);
	visibleLinks = this.filterLinksByIdentity(visibleLinks);
	visibleLinks = this.filterLinksByLength(visibleLinks);
	if (this.filters.onlyShowAdjacentLinks === true) {
		visibleLinks = this.filterLinksByAdjacency(visibleLinks);
	}
	return visibleLinks;
};

/**
 * This method should filter the visible links according to visible chromosomes
 * @param visibleChromosomes: gets the chromosomes, which are visible in the current configurations in order to filter all links, which have no target or source chromosome.
 * @return visibleLinks: returns only links which source or target are in visible chromosomes
 * @author Sonja Hohlfeld
 */
AliTV.prototype.filterVisibleLinks = function(visibleChromosomes) {
	var allLinks = this.data.links;
	var that = this;
	var filteredLinks = {};
	var listOfVisibleChromosomes = [];
	$.each(visibleChromosomes, function(key, value) {
		listOfVisibleChromosomes.push(key);
	});
	$.each(allLinks, function(key, value) {
		var targetKaryo = that.data.features[value.target].karyo;
		var sourceKaryo = that.data.features[value.source].karyo;
		if (listOfVisibleChromosomes.indexOf(targetKaryo) !== -1 && listOfVisibleChromosomes.indexOf(sourceKaryo) !== -1 && (value in filteredLinks) === false) {
			filteredLinks[key] = value;
		}
	});
	return filteredLinks;
};
/**
 * This method should filter links according to their identity.
 * @returns filteredLinks: return all links which are visible with the current configuration.
 * @param visibleLinks: gets all current visible links.
 * @author Sonja Hohlfeld
 */
AliTV.prototype.filterLinksByIdentity = function(visibleLinks) {
	var minIdentity = this.filters.links.minLinkIdentity;
	var maxIdentity = this.filters.links.maxLinkIdentity;
	var filteredLinks = {};
	$.each(visibleLinks, function(key, value) {
		var currentLink = value;
		if (currentLink.identity >= minIdentity && currentLink.identity <= maxIdentity) {
			filteredLinks[key] = currentLink;
		}
	});
	return filteredLinks;
};

/**
 * This method should filter links according to their length.
 * @returns filteredLinks: return all links which are visible with the current configuration.
 * @param visibleLinks: gets all current visible links.
 * @author Sonja Hohlfeld
 */
AliTV.prototype.filterLinksByLength = function(visibleLinks) {
	var minLength = this.filters.links.minLinkLength;
	var maxLength = this.filters.links.maxLinkLength;
	var that = this;
	var filteredLinks = {};
	$.each(visibleLinks, function(key, value) {
		var currentLink = value;
		var sourceFeature = currentLink.source;
		var targetFeature = currentLink.target;
		var lengthOfSourceFeature = Math.abs(that.data.features[sourceFeature].end - that.data.features[sourceFeature].start);
		var lengthOfTargetFeature = Math.abs(that.data.features[targetFeature].end - that.data.features[targetFeature].start);
		if (lengthOfSourceFeature >= minLength && lengthOfSourceFeature <= maxLength || lengthOfTargetFeature >= minLength && lengthOfTargetFeature <= maxLength) {
			filteredLinks[key] = currentLink;
		}
	});
	return filteredLinks;
};

/**
 * This method should filter links according to their adjacency.
 * @return filteredLinks: returns only links which are between adjacent chromosomes.
 * @param visibleLinks: gets all current visible links.
 * @author Sonja Hohlfeld
 */
AliTV.prototype.filterLinksByAdjacency = function(visibleLinks) {
	var that = this;
	var filteredLinks = {};
	$.each(visibleLinks, function(key, value) {
		var currentLink = value;
		var targetFeature = that.data.features[currentLink.source];
		var sourceFeature = that.data.features[currentLink.target];
		var targetKaryo = that.data.karyo.chromosomes[targetFeature.karyo];
		var sourceKaryo = that.data.karyo.chromosomes[sourceFeature.karyo];
		var genomePositionOfTargetKaryo = that.filters.karyo.genome_order.indexOf(targetKaryo.genome_id);
		var genomePositionOfSourceKaryo = that.filters.karyo.genome_order.indexOf(sourceKaryo.genome_id);
		if (Math.abs(genomePositionOfTargetKaryo - genomePositionOfSourceKaryo) === 1) {
			filteredLinks[key] = currentLink;
		} else {
			if (that.conf.linear.drawAllLinks === true) {
				filteredLinks[key] = currentLink;
			}
		}
	});
	return filteredLinks;
};

/**
 * This method is supposed to draw a phylogenetic tree next to the chromosomes.
 * In the default configuration the tree is not drawn, but the user can set drawTree equal true and this method wil be called.
 * @author {Sonja Hohlfeld}
 */
AliTV.prototype.drawPhylogeneticTree = function() {
	var that = this;
	var treeData = that.data.tree;
	// Create a tree "canvas"
	var genomeDistance = that.getGenomeDistance();

	//Initialize the tree size. Every node of the tree has its own "spacer", therefore it is important not only use the canvas height, but you need
	// the canveas height and the genome distance - the heigth of one karyo in order to draw the branches in the right position. So we have exactly 6 branches, but one is not in the drawing area.
	var tree = d3.layout.tree()
		.size([that.conf.graphicalParameters.height + genomeDistance - that.conf.graphicalParameters.karyoHeight, that.conf.graphicalParameters.treeWidth])
		.separation(function() {
			return 1;
		});

	// Preparing the data for the tree layout, convert data into an array of nodes
	var nodes = tree.nodes(treeData);
	// Create an array with all the links
	var links = tree.links(nodes);

	//Now you want to draw every branch in the middle of a chromosome. Therefore you must move it the negative half of a chromosome height and negative the half of the genome distance in y direction.
	if (this.conf.tree.orientation === "left") {
		that.svgD3.append("g")
			.attr("class", "treeGroup")
			.selectAll("path")
			.data(links)
			.enter()
			.append("path")
			.attr("class", "branch")
			.attr("d", function(d) {
				return "M" + d.source.y + "," + d.source.x + "H" + d.target.y + "V" + d.target.x;
			})
			.attr("transform", "translate(0, " + 0.5 * (that.conf.graphicalParameters.karyoHeight - genomeDistance) + ")");

	} else {
		that.svgD3.append("g")
			.attr("class", "treeGroup")
			.attr("transform", "translate(" + that.conf.graphicalParameters.width + ", 0)")
			.selectAll("path")
			.data(links)
			.enter()
			.append("path")
			.attr("class", "branch")
			.attr("d", function(d) {
				return "M" + (that.conf.graphicalParameters.treeWidth - d.source.y) + "," + d.source.x + "H" + (that.conf.graphicalParameters.treeWidth - d.target.y) + "V" + d.target.x;
			})
			.attr("transform", "translate(0, " + 0.5 * (that.conf.graphicalParameters.karyoHeight - genomeDistance) + ")");
		if (that.conf.labels.showAllLabels === true || that.conf.labels.genome.showGenomeLabels === true) {
			that.svgD3.selectAll(".treeGroup").attr("transform", "translate(" + (that.conf.graphicalParameters.width + that.conf.graphicalParameters.genomeLabelWidth) + ", 0)");
		}

	}

};

/**
 * This method should check if the user provides tree data.
 * @returns {Boolean} Returns true when tree data exists and false when there is no tree data.
 * @author Sonja Hohlfeld
 */
AliTV.prototype.hasTree = function() {
	if (typeof this.data.tree === "undefined" || $.isEmptyObject(this.data.tree) === true || this.data.tree === null) {
		return false;
	} else {
		return true;
	}
};


/**
 * Calculates coordinates for different shapes according to the different feature classes in order to draw in the linear layout.
 * This function operates on the linearKaryoCoords.
 * This function is primarily meant for internal usage, the user should not need to call this directly.
 * @author Sonja Hohlfeld
 * @param {Array} linearKaryoCoords: contains the coordinates for all chromosomes of the form: {karyo: 'karyo_name', x:0, y:0, width:10, height:10}.
 * @returns {Array} linearFeatureCoords: contains the coordinates for feature classes of the form: {id: "featureId", x:0, y:0, width: 45, height: 10}
 */
AliTV.prototype.getLinearFeatureCoords = function(linearKaryoCoords) {
	var that = this;
	var linearFeatureCoords = [];
	var supportedFeatures = [];
	var features = {};
	$.each(that.conf.features.supportedFeatures, function(key, value) {
		supportedFeatures.push(key);
	});
	$.each(that.data.features, function(key, value) {
		if (supportedFeatures.indexOf(value.group) !== -1) {
			features[key] = value;
		}
	});
	$.each(features, function(key, value) {
		var featureKaryo = value.karyo;
		var currentY;
		var currentWidth;
		var currentX;
		var currentFeature = {};
		var featureId = key;

		$.each(linearKaryoCoords, function(key, value) {
			if (featureKaryo === value.karyo) {
				currentY = value.y;
				currentX = value.x;
				currentWidth = value.width;
			}
		});
		if (that.conf.features.supportedFeatures[that.data.features[featureId].group].form === "rect" && (that.conf.features.supportedFeatures[that.data.features[featureId].group].visible === true || that.conf.features.showAllFeatures === true)) {
			currentFeature = {
				"id": key,
				"y": currentY,
				"x": currentX,
				"height": that.conf.features.supportedFeatures[value.group].height
			};
			if (that.filters.karyo.chromosomes[featureKaryo].reverse === false) {
				currentFeature.width = (Math.abs(value.end - value.start) * currentWidth) / that.data.karyo.chromosomes[featureKaryo].length;
				currentFeature.x = (Math.abs(value.start) * currentWidth) / that.data.karyo.chromosomes[featureKaryo].length;
			} else {
				currentFeature.width = (Math.abs(value.end - value.start) * currentWidth) / that.data.karyo.chromosomes[featureKaryo].length;
				currentFeature.x = currentX - (Math.abs(value.start) * currentWidth) / that.data.karyo.chromosomes[featureKaryo].length * (-1);
			}
			linearFeatureCoords.push(currentFeature);

		} else if (that.conf.features.supportedFeatures[that.data.features[featureId].group].form === "arrow" && (that.conf.features.supportedFeatures[that.data.features[featureId].group].visible === true || that.conf.features.showAllFeatures === true)) {
			currentFeature = {
				"id": key
			};
			currentFeature.arrowData = [];
			if (that.filters.karyo.chromosomes[featureKaryo].reverse === false) {
				currentFeature.arrowData.push({
					x: (Math.abs(value.start) * currentWidth) / that.data.karyo.chromosomes[featureKaryo].length,
					y: currentY + 1 / 5 * that.conf.features.supportedFeatures[value.group].height
				}, {
					x: (Math.abs(value.start) * currentWidth) / that.data.karyo.chromosomes[featureKaryo].length + 5 / 6 * (Math.abs(value.end - value.start) * currentWidth) / that.data.karyo.chromosomes[featureKaryo].length,
					y: currentY + 1 / 5 * that.conf.features.supportedFeatures[value.group].height
				}, {
					x: (Math.abs(value.start) * currentWidth) / that.data.karyo.chromosomes[featureKaryo].length + 5 / 6 * (Math.abs(value.end - value.start) * currentWidth) / that.data.karyo.chromosomes[featureKaryo].length,
					y: currentY
				}, {
					x: (Math.abs(value.start) * currentWidth) / that.data.karyo.chromosomes[featureKaryo].length + (Math.abs(value.end - value.start) * currentWidth) / that.data.karyo.chromosomes[featureKaryo].length,
					y: currentY + 1 / 2 * that.conf.features.supportedFeatures[value.group].height
				}, {
					x: (Math.abs(value.start) * currentWidth) / that.data.karyo.chromosomes[featureKaryo].length + 5 / 6 * (Math.abs(value.end - value.start) * currentWidth) / that.data.karyo.chromosomes[featureKaryo].length,
					y: currentY + that.conf.features.supportedFeatures[value.group].height
				}, {
					x: (Math.abs(value.start) * currentWidth) / that.data.karyo.chromosomes[featureKaryo].length + 5 / 6 * (Math.abs(value.end - value.start) * currentWidth) / that.data.karyo.chromosomes[featureKaryo].length,
					y: currentY + that.conf.features.supportedFeatures[value.group].height - 1 / 5 * that.conf.features.supportedFeatures[value.group].height
				}, {
					x: (Math.abs(value.start) * currentWidth) / that.data.karyo.chromosomes[featureKaryo].length,
					y: currentY + that.conf.features.supportedFeatures[value.group].height - 1 / 5 * that.conf.features.supportedFeatures[value.group].height
				});
			} else {
				currentFeature.arrowData.push({
					x: currentX - (-1) * (Math.abs(value.start) * currentWidth) / that.data.karyo.chromosomes[featureKaryo].length,
					y: currentY + 1 / 5 * that.conf.features.supportedFeatures[value.group].height
				}, {
					x: currentX - (-1) * (Math.abs(value.start) * currentWidth) / that.data.karyo.chromosomes[featureKaryo].length + 5 / 6 * (Math.abs(value.end - value.start) * currentWidth) / that.data.karyo.chromosomes[featureKaryo].length,
					y: currentY + 1 / 5 * that.conf.features.supportedFeatures[value.group].height
				}, {
					x: currentX - (-1) * (Math.abs(value.start) * currentWidth) / that.data.karyo.chromosomes[featureKaryo].length + 5 / 6 * (Math.abs(value.end - value.start) * currentWidth) / that.data.karyo.chromosomes[featureKaryo].length,
					y: currentY
				}, {
					x: currentX - (-1) * (Math.abs(value.start) * currentWidth) / that.data.karyo.chromosomes[featureKaryo].length + (Math.abs(value.end - value.start) * currentWidth) / that.data.karyo.chromosomes[featureKaryo].length,
					y: currentY + 1 / 2 * that.conf.features.supportedFeatures[value.group].height
				}, {
					x: currentX - (-1) * (Math.abs(value.start) * currentWidth) / that.data.karyo.chromosomes[featureKaryo].length + 5 / 6 * (Math.abs(value.end - value.start) * currentWidth) / that.data.karyo.chromosomes[featureKaryo].length,
					y: currentY + that.conf.features.supportedFeatures[value.group].height
				}, {
					x: currentX - (-1) * (Math.abs(value.start) * currentWidth) / that.data.karyo.chromosomes[featureKaryo].length + 5 / 6 * (Math.abs(value.end - value.start) * currentWidth) / that.data.karyo.chromosomes[featureKaryo].length,
					y: currentY + that.conf.features.supportedFeatures[value.group].height - 1 / 5 * that.conf.features.supportedFeatures[value.group].height
				}, {
					x: currentX - (-1) * (Math.abs(value.start) * currentWidth) / that.data.karyo.chromosomes[featureKaryo].length,
					y: currentY + that.conf.features.supportedFeatures[value.group].height - 1 / 5 * that.conf.features.supportedFeatures[value.group].height
				});
			}
			linearFeatureCoords.push(currentFeature);
		}
	});
	return linearFeatureCoords;
};

/**
 * This function draws the features on the karyos in the linear layout, color them according to the configuration.
 * @author Sonja Hohlfeld
 * @param {Array} The array containing the coordinates of the features as returned by getLinearFeatureCoords()
 */
AliTV.prototype.drawLinearFeatures = function(linearFeatureCoords) {
	var that = this;

	that.svgD3.selectAll(".featureGroup").remove();
	var shapes = that.svgD3.append("g")
		.attr("class", "featureGroup")
		.selectAll("path")
		.data(linearFeatureCoords)
		.enter();

	shapes.append("rect")
		.filter(function(d) {
			return that.conf.features.supportedFeatures[that.data.features[d.id].group].form === "rect" && (that.conf.features.supportedFeatures[that.data.features[d.id].group].visible === true || that.conf.features.showAllFeatures === true);
		})
		.attr("class", "feature")
		.attr("x", function(d) {
			if (d.width < 0) {
				return d.x + d.width;
			} else {
				return d.x;
			}
		})
		.attr("y", function(d) {
			return d.y;
		})
		.attr("width", function(d) {
			return Math.abs(d.width);
		})
		.attr("height", function(d) {
			return d.height;
		})
		.style("fill", function(d) {
			var color = that.conf.features.supportedFeatures[that.data.features[d.id].group].color;
			return color;
		});


	var lineFunction = d3.svg.line()
		.x(function(d) {
			return d.x;
		})
		.y(function(d) {
			return d.y;
		})
		.interpolate("linear");
	shapes.append("path")
		.filter(function(d) {
			return that.conf.features.supportedFeatures[that.data.features[d.id].group].form === "arrow" && (that.conf.features.supportedFeatures[that.data.features[d.id].group].visible === true || that.conf.features.showAllFeatures === true);
		})
		.each(function(d, i) {
			d3.select(this)
				.attr("class", "feature")
				.attr("d", lineFunction(d.arrowData))
				.attr("fill", function(d) {
					var color = that.conf.features.supportedFeatures[that.data.features[d.id].group].color;
					return color;
				});
		});
	if (that.conf.tree.drawTree === true && that.conf.tree.orientation === "left") {
		that.svgD3.selectAll(".featureGroup").attr("transform", "translate(" + that.conf.graphicalParameters.treeWidth + ", 0)");
	}
	if (that.conf.labels.showAllLabels === true || that.conf.labels.genome.showGenomeLabels === true) {
		that.svgD3.selectAll(".featureGroup").attr("transform", "translate(" + that.conf.graphicalParameters.genomeLabelWidth + ", 0)");
	}
	if ((that.conf.labels.showAllLabels === true || that.conf.labels.genome.showGenomeLabels === true) && that.conf.tree.drawTree === true && that.conf.tree.orientation === "left") {
		that.svgD3.selectAll(".featureGroup").attr("transform", "translate(" + (that.conf.graphicalParameters.treeWidth + that.conf.graphicalParameters.genomeLabelWidth) + ", 0)");
	}


};

/**
 * This method is supposed to calculate the coordinates for genome labels.
 * This is called if the configuration of addGenomeLables is true.
 * @returns genomeLabelCoords: returns an array which contains the coords for the genome labels.
 * @author Sonja Hohlfeld
 */
AliTV.prototype.getGenomeLabelCoords = function() {
	var that = this;
	var linearGenomeLabelCoords = [];
	var genomeDistance = that.getGenomeDistance();
	$.each(that.filters.karyo.genome_order, function(key, value) {
		var genome = {
			name: value,
			x: 1 / 2 * that.conf.graphicalParameters.genomeLabelWidth,
			y: key * genomeDistance + 0.9 * that.conf.graphicalParameters.karyoHeight
		};
		linearGenomeLabelCoords.push(genome);
	});
	return linearGenomeLabelCoords;
};

/**
 * This function is supposed to draw the text labels for genomes.
 * @param linearGenomeLabelCoords: gets the coords of the genome labels whcih is returned by getGenomeLabelCoords.
 * @author Sonja Hohlfeld
 */
AliTV.prototype.drawLinearGenomeLabels = function(linearGenomeLabelCoords) {
	var that = this;
	this.svgD3.selectAll(".genomeLabelGroup").remove();
	that.svgD3.append("g")
		.attr("class", "genomeLabelGroup")
		.selectAll("path")
		.data(linearGenomeLabelCoords)
		.enter()
		.append("text")
		.attr("class", "genomeLabel")
		.attr("x", function(d) {
			return d.x;
		})
		.attr("y", function(d) {
			return d.y;
		})
		.text(function(d) {
			return d.name;
		})
		.attr("font-family", "sans-serif")
		.attr("font-size", that.conf.graphicalParameters.karyoHeight + "px")
		.attr("fill", "red")
		.style("text-anchor", "middle");

	if (that.conf.tree.drawTree === true && that.conf.tree.orientation === "left") {
		that.svgD3.selectAll(".genomeLabelGroup").attr("transform", "translate(" + that.conf.graphicalParameters.treeWidth + ", 0)");
	}
};

/**
 * This method is supposed to calculate the coordinates for chromosome labels.
 * This is called if the configuration of addChromosomeLabels or showAllLabels is true.
 * @param gets the coordinates of the drawn chromosomes.
 * @returns chromosomeLabelCoords: returns an array which contains the coords for the chromosome labels.
 * @author Sonja Hohlfeld
 */
AliTV.prototype.getChromosomeLabelCoords = function(linearKaryoCoords) {
	var that = this;
	var linearChromosomeLabelCoords = [];
	$.each(linearKaryoCoords, function(key, value) {
		var genome = {
			name: value.karyo,
			x: value.x + 1 / 2 * value.width,
			y: value.y + 0.85 * that.conf.graphicalParameters.karyoHeight
		};
		linearChromosomeLabelCoords.push(genome);
	});
	return linearChromosomeLabelCoords;
};

/**
 * This function is supposed to draw the text labels for chromosome.
 * @param linearChromosomeLabelCoords: gets the coords of the chromosome labels which is returned by getChromosomeLabelCoords.
 * @author Sonja Hohlfeld
 */
AliTV.prototype.drawLinearChromosomeLabels = function(linearChromosomeLabelCoords) {
	var that = this;
	this.svgD3.selectAll(".chromosomeLabelGroup").remove();
	that.svgD3.append("g")
		.attr("class", "chromosomeLabelGroup")
		.selectAll("path")
		.data(linearChromosomeLabelCoords)
		.enter()
		.append("text")
		.attr("class", "chromosomeLabel")
		.attr("x", function(d) {
			return d.x;
		})
		.attr("y", function(d) {
			return d.y;
		})
		.text(function(d) {
			return d.name;
		})
		.attr("font-family", "sans-serif")
		.attr("font-size", that.conf.graphicalParameters.karyoHeight + "px")
		.attr("fill", "red")
		.style("text-anchor", "middle");

	if (that.conf.labels.showAllLabels === true || that.conf.labels.genome.showGenomeLabels === true) {
		that.svgD3.selectAll(".chromosomeLabelGroup").attr("transform", "translate(" + that.conf.graphicalParameters.genomeLabelWidth + ", 0)");
	}
	if ((that.conf.labels.showAllLabels === true || that.conf.labels.genome.showGenomeLabels === true) && that.conf.tree.drawTree === true && that.conf.tree.orientation === "left") {
		that.svgD3.selectAll(".chromosomeLabelGroup").attr("transform", "translate(" + (that.conf.graphicalParameters.treeWidth + that.conf.graphicalParameters.genomeLabelWidth) + ", 0)");
	}
	if ((that.conf.labels.showAllLabels === false && that.conf.labels.genome.showGenomeLabels === false) && that.conf.tree.drawTree === true && that.conf.tree.orientation === "left") {
		that.svgD3.selectAll(".chromosomeLabelGroup").attr("transform", "translate(" + that.conf.graphicalParameters.treeWidth + ", 0)");
	}
};

/**
 * This method is supposed to calculate the coordinates for feature labels.
 * This method is called if the configuration of addFeatureLabels or showAllLabels is true.
 * @param gets the coordinates of the drawn features.
 * @returns featureLabelCoords: returns an array which contains the coords for the feature labels.
 * @author Sonja Hohlfeld
 */
AliTV.prototype.getFeatureLabelCoords = function(linearFeatureCoords) {
	var that = this;
	var linearFeatureLabelCoords = [];
	$.each(linearFeatureCoords, function(key, value) {
		var feature = {
			name: value.id
		};
		if (that.conf.features.supportedFeatures[that.data.features[value.id].group].form === "rect") {
			feature.x = value.x + 1 / 2 * value.width;
			feature.y = value.y + 0.85 * that.conf.graphicalParameters.karyoHeight;
		}
		if (that.conf.features.supportedFeatures[that.data.features[value.id].group].form === "arrow") {
			if (that.filters.karyo.chromosomes[that.data.features[value.id].karyo].reverse === false) {
				feature.x = value.arrowData[0].x + 1 / 2 * Math.abs(value.arrowData[3].x - value.arrowData[0].x);
				feature.y = value.arrowData[0].y + 1 / 2 * that.conf.graphicalParameters.karyoHeight;
			} else {
				feature.x = value.arrowData[3].x + 1 / 2 * Math.abs(value.arrowData[0].x - value.arrowData[3].x);
				feature.y = value.arrowData[0].y + 1 / 2 * that.conf.graphicalParameters.karyoHeight;
			}
		}
		linearFeatureLabelCoords.push(feature);
	});
	return linearFeatureLabelCoords;
};

/**
 * This method is supposed to draw labels to all features.
 * @param linearFeatureLabelCoords: get the coords for the feature labels which are returned by getFeatureLabelCoords.
 * @author Sonja Hohlfeld
 */
AliTV.prototype.drawLinearFeatureLabels = function(linearFeatureLabelCoords) {
	var that = this;
	this.svgD3.selectAll(".featureLabelGroup").remove();
	that.svgD3.append("g")
		.attr("class", "featureLabelGroup")
		.selectAll("path")
		.data(linearFeatureLabelCoords)
		.enter()
		.append("text")
		.attr("class", "featureLabel")
		.attr("x", function(d) {
			return d.x;
		})
		.attr("y", function(d) {
			return d.y;
		})
		.text(function(d) {
			return d.name;
		})
		.attr("font-family", "sans-serif")
		.attr("font-size", 2 / 3 * that.conf.graphicalParameters.karyoHeight + "px")
		.attr("fill", "red")
		.style("text-anchor", "middle");

	if (that.conf.labels.showAllLabels === true || that.conf.labels.genome.showGenomeLabels === true) {
		that.svgD3.selectAll(".featureLabelGroup").attr("transform", "translate(" + that.conf.graphicalParameters.genomeLabelWidth + ", 0)");
	}
	if ((that.conf.labels.showAllLabels === true || that.conf.labels.genome.showGenomeLabels === true) && that.conf.tree.drawTree === true && that.conf.tree.orientation === "left") {
		that.svgD3.selectAll(".featureLabelGroup").attr("transform", "translate(" + (that.conf.graphicalParameters.treeWidth + that.conf.graphicalParameters.genomeLabelWidth) + ", 0)");
	}
};
