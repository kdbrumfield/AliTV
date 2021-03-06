describe('The getKaryoSpacer method is supposed to get the information of the spacer between two karyos', function(){
	var svg = $('<svg></svg>');
	var ali = new AliTV(svg);
	
	it('getKaryoSpacer method is supposed to be a function', function(){
		expect(typeof ali.getKaryoSpacer).toEqual('function');
	});	
	it('the function should return a defined value', function(){
		var spacer = ali.getKaryoSpacer();
		expect(spacer).toBeDefined();
	});
	it('the function should return the spacer of the defaultConf', function(){
		var spacer = ali.getKaryoSpacer();
		expect(spacer).toEqual(defaultConf.graphicalParameters.karyoDistance);
	});
});
	
describe('The setKaryoSpacer method is supposed to set the new information of the karyoDistance in the conf object', function(){
	var svg = $('<svg></svg>');
	var ali = new AliTV(svg);
	it('setKaryoSpacer method is supposed to be a function', function(){
		expect(typeof ali.setKaryoSpacer).toEqual('function');
	});	
	it('the returned spacer of the getKaryoSpacer method should be the same as the spacer which is set and returned by the setter-method', function(){
		var returnedSpacer = 50;
		expect(ali.setKaryoSpacer(returnedSpacer)).toEqual(50);
	});	
	it('when setKaryoSpacer is called several times the spacer should have the same value as the returned spacer of getKaryoSpacer method', function(){
		ali.setKaryoSpacer(12);
		expect(ali.getKaryoSpacer()).toEqual(12);
		ali.setKaryoSpacer(100);
		expect(ali.getKaryoSpacer()).toEqual(100);
		ali.setKaryoSpacer(20);
		expect(ali.getKaryoSpacer()).toEqual(20);
	});	
	it('the returned Spacer of the getKaryoSpacer method should throw an error message if the spacer is empty', function(){
		var returnedSpacer = "";
		expect(function(){ali.setKaryoSpacer(returnedSpacer);}).toThrow("Sorry, you entered an empty value. Please try it again.");
	});
	it('the returned Spacer of the getKaryoSpacer method should throw an error message if the spacer is not a number', function(){
		var returnedSpacer = "test";
		expect(function(){ali.setKaryoSpacer(returnedSpacer);}).toThrow("Sorry, you entered not a number. Please try it again.");
	});
	it('the returned Spacer of the getKaryoSpacer method should throw an error message if the spacer is less than 0', function(){
		var returnedSpacer = -12;
		expect(function(){ali.setKaryoSpacer(returnedSpacer);}).toThrow("Sorry, the entered value is too small. Please, insert one which is not less than 0.");
	});
	it('the returned Spacer of the getKaryoSpacer method should throw an error message if the spacer is 0', function(){
		var returnedSpacer = 0;
		expect(function(){ali.setKaryoSpacer(returnedSpacer);}).toThrow("Sorry, the entered value is too small. Please, insert one which is not less than 0.");
	});
});

	
describe('The getKaryoHeight method is supposed to get the height of the chromosomes', function(){
	var svg = $('<svg></svg>');
	var ali = new AliTV(svg);
	
	it('getkaryoHeight method is supposed to be a function', function(){
		expect(typeof ali.getKaryoHeight).toEqual('function');
	});	
	it('the function should return a defined value', function(){
		var height = ali.getKaryoHeight();
		expect(height).toBeDefined();
	});
	it('the function should return the height of chromosomes which is defined in the defaultConf', function(){
		var height = ali.getKaryoHeight();
		expect(height).toEqual(defaultConf.graphicalParameters.karyoHeight);
	});
});

describe('The setKaryoHeight method is supposed to set the new height of chromosomes in the conf object', function(){
	var svg = $('<svg></svg>');
	var ali = new AliTV(svg);
	it('setKaryoHeight method is supposed to be a function', function(){
		expect(typeof ali.setKaryoHeight).toEqual('function');
	});	
	it('the returned value of the getKaryoHeight method should be the same as the height which is set and returned by the setter-method', function(){
		var height = 40;
		expect(ali.setKaryoHeight(height)).toEqual(40);
	});	
	it('when setKaryoHeight is called several times the height should have the same value as the returned height of getKaryoHeight method', function(){
		ali.setKaryoHeight(20);
		expect(ali.getKaryoHeight()).toEqual(20);
		ali.setKaryoHeight(40);
		expect(ali.getKaryoHeight()).toEqual(40);
		ali.setKaryoHeight(32);
		expect(ali.getKaryoHeight()).toEqual(32);
	});
	it('the setKaryoHeight method should throw an error message if the assigned height has no value', function(){
		var height = "";
		expect(function(){ali.setKaryoHeight(height);}).toThrow("Sorry, you entered an empty value. Please try it again.");
	});
	it('the setKaryoHeight method should throw an error message if the assigned height is not a number', function(){
		var height = "test";
		expect(function(){ali.setKaryoHeight(height);}).toThrow("Sorry, you entered not a number. Please try it again.");
	});
	it('the setKaryoHeight method should throw an error message if the assigned height is 0', function(){
		var height = 0;
		expect(function(){ali.setKaryoHeight(height);}).toThrow("Sorry, the entered value is too small. Please, insert one which is not less than 0.");
	});
	it('the setKaryoHeight method should throw an error message if the assigned height is less than 0', function(){
		var height = -12;
		expect(function(){ali.setKaryoHeight(height);}).toThrow("Sorry, the entered value is too small. Please, insert one which is not less than 0.");
	});

});

describe('The getCanvasWidth method is supposed to get the width of the svg drawing area', function(){
	var svg = $('<svg></svg>');
	var ali = new AliTV(svg);
	
	it('getCanvasWidth method is supposed to be a function', function(){
		expect(typeof ali.getCanvasWidth).toEqual('function');
	});	
	it('the function should return a defined value', function(){
		var width = ali.getCanvasWidth();
		expect(width).toBeDefined();
	});
	it('the function should return the width of canvas which is defined in the defaultConf', function(){
		var width = ali.getCanvasWidth();
		expect(width).toEqual(defaultConf.graphicalParameters.canvasWidth);
	});
});
	
describe('The setCanvasWidth method is supposed to set a new width of the svgDrawingArea', function(){
	var svg = $('<svg></svg>');
	var ali = new AliTV(svg);
	it('setCanvasWidth method is supposed to be a function', function(){
		expect(typeof ali.setCanvasWidth).toEqual('function');
	});	
	it('the returned object of the getCanvasWidth method should be the same as the width which is set and returned by the setter-method', function(){
		var width = 3000
		expect(ali.setCanvasWidth(width)).toEqual(width);
	});	
	it('when setCanvasWidth is called several times the width should have the same value as the returned width of getCanvasWidth method', function(){
		ali.setCanvasWidth(2000);
		expect(ali.getCanvasWidth()).toEqual(2000);
		ali.setCanvasWidth(1200);
		expect(ali.getCanvasWidth()).toEqual(1200);
		ali.setCanvasWidth(10000);
		expect(ali.getCanvasWidth()).toEqual(10000);
	});
	it('the setCanvasWidth method should throw an error message if the assigned width is Sorry, you entered an empty value. Please try it again.', function(){
		var width = "";
		expect(function(){ali.setCanvasWidth(width);}).toThrow("Sorry, you entered an empty value. Please try it again.");
	});
	it('the setCanvasWidth method should throw an error message if the assigned width is not a number', function(){
		var width = "test";
		expect(function(){ali.setCanvasWidth(width);}).toThrow("Sorry, you entered not a number. Please try it again.");
	});
	it('the setCanvasWidth method should throw an error message if the assigned width is 0', function(){
		var width = 0;
		expect(function(){ali.setCanvasWidth(width);}).toThrow("Sorry, the entered value is too small. Please, insert one which is not less than 0.");
	});
	it('the setCanvasWidth method should throw an error message if the assigned width is less than 0', function(){
		var width = -3000;
		expect(function(){ali.setCanvasWidth(width);}).toThrow("Sorry, the entered value is too small. Please, insert one which is not less than 0.");
	});
});

describe('The getCanvasHeight method is supposed to get the height of the svg drawing area', function(){
	var svg = $('<svg></svg>');
	var ali = new AliTV(svg);
	
	it('getCanvasHeight method is supposed to be a function', function(){
		expect(typeof ali.getCanvasHeight).toEqual('function');
	});	
	it('the function should return a defined value', function(){
		var height = ali.getCanvasHeight();
		expect(height).toBeDefined();
	});
	it('the function should return the height of canvas which is defined in the defaultConf', function(){
		var height = ali.getCanvasHeight();
		expect(height).toEqual(defaultConf.graphicalParameters.canvasHeight);
	});
});

describe('The setCanvasHeight method is supposed to set a new height of the svg drawing area', function(){
	var svg = $('<svg></svg>');
	var ali = new AliTV(svg);
	it('setCanvasHeight method is supposed to be a function', function(){
		expect(typeof ali.setCanvasHeight).toEqual('function');
	});	
	it('the returned object of the getCanvasHeight method should be the same as the height which is setted and returned by the setter-method', function(){
		var height = 3000;
		expect(ali.setCanvasHeight(height)).toEqual(height);
	});	
	it('when setCanvasHeight is called several times the width should have the same value as the returned height of getCanvasHeight method', function(){
		ali.setCanvasHeight(1234);
		expect(ali.getCanvasHeight()).toEqual(1234);
		ali.setCanvasHeight(4242);
		expect(ali.getCanvasHeight()).toEqual(4242);
		ali.setCanvasHeight(10000);
		expect(ali.getCanvasHeight()).toEqual(10000);
	});
	it('the setCanvasHeight method should throw an error message if the assigned height is empty.', function(){
		var height = "";
		expect(function(){ali.setCanvasHeight(height);}).toThrow("Sorry, you entered an empty value. Please try it again.");
	});
	it('the setCanvasHeight method should throw an error message if the assigned height is not a number', function(){
		var height = "test";
		expect(function(){ali.setCanvasHeight(height);}).toThrow("Sorry, you entered not a number. Please try it again.");
	});
	it('the setCanvasHeight method should throw an error message if the assigned height is 0', function(){
		var height = 0;
		expect(function(){ali.setCanvasHeight(height);}).toThrow("Sorry, the entered value is too small. Please, insert one which is not less than 0.");
	});
	it('the setCanvasHeight method should throw an error message if the assigned height is less than 0', function(){
		var height = -42;
		expect(function(){ali.setCanvasHeight(height);}).toThrow("Sorry, the entered value is too small. Please, insert one which is not less than 0.");
	});
});

describe('The getOuterRadius method is supposed to calculate the appropriate outerRadius for the circular layout', function(){
	var svg = $('<svg></svg>');
	var ali = new AliTV(svg);
	it('getOuterRadius method is supposed to be a function', function(){
		expect(typeof ali.getOuterRadius).toEqual('function');
	});
	it('getOuterRadius method is supposed to return not null', function(){
		expect(ali.getOuterRadius()).toBeDefined();
	});
	it('getOuterRadius method is supposed to return 450 if default width and height are used (45% of 1000)', function(){
		expect(ali.getOuterRadius()).toEqual(450);
	});
	it('getOuterRadius method is supposed to return 45% of the smaller dimension (width or height)', function(){
		ali.setCanvasHeight(500);
		ali.setCanvasWidth(1000);
		expect(ali.getOuterRadius()).toEqual(225);
	});
	it('getOuterRadius method is supposed to return 45% of the smaller dimension (width or height)', function(){
		ali.setCanvasHeight(2000);
		ali.setCanvasWidth(1000);
		expect(ali.getOuterRadius()).toEqual(450);
	});
	it('getOuterRadius method is supposed to return 45% of the smaller dimension (width or height)', function(){
		ali.setCanvasHeight(2000);
		ali.setCanvasWidth(2000);
		expect(ali.getOuterRadius()).toEqual(900);
	});
});

describe('The getGenomeDistance method is supposed to calculate the appropriate genomeDistance for the linear layout', function(){
	var svg = $('<svg></svg>');
	var ali = new AliTV(svg);
	it('getGenomeDistance method is supposed to be a function', function(){
		expect(typeof ali.getGenomeDistance).toEqual('function');
	});
	it('getGenomeDistance method is supposed to return not null', function(){
		ali.setData(data);
		ali.setFilters(filters);
		expect(ali.getGenomeDistance()).toBeDefined();
	});
	it('getGenomeDistance method is supposed to return 970 if default height and 2 genomes are used (1000 * 1/2)', function(){
		ali.setData(data);
		ali.setFilters(filters);
		var distance = (1000 - 30) * 1/(2 - 1);
		expect(ali.getGenomeDistance()).toEqual(distance);
	});
	it('getGenomeDistance method is supposed to return 323 if default height and 4 genomes are used (1000 * 1/4)', function(){
		ali.setData({karyo: karyo7});
		ali.setFilters(filters8);
		var distance = (1000 - 30) * 1/(4 - 1);
		expect(ali.getGenomeDistance()).toEqual(Math.round(distance));
	});
	it('getGenomeDistance method is supposed to return 1970 if the default height is set on 2000 and 2 genomes are used (2000 * 1/2)', function(){
		ali.setData(data);
		ali.setFilters(filters);
		ali.setCanvasHeight(2000);
		var distance = (2000 - 30) * 1/(2 -1);
		expect(ali.getGenomeDistance()).toEqual(distance);
	});
});

describe('The getTickDistance method is supposed to get the distance of the chromosome ticks in bp', function(){
	var svg = $('<svg></svg>');
	var ali = new AliTV(svg);
	
	it('getTickFrequency method is supposed to be a function', function(){
		expect(typeof ali.getTickDistance).toEqual('function');
	});	
	it('the function should return a defined value', function(){
		var distance = ali.getTickDistance();
		expect(distance).toBeDefined();
	});
	it('the function should return the tick distance which is defined in the defaultConf', function(){
		var distance = ali.getTickDistance();
		expect(distance).toEqual(defaultConf.graphicalParameters.tickDistance);
	});
});

describe('The setTickDistance method is supposed to set a new distance between the chromosome ticks', function(){
	var svg = $('<svg></svg>');
	var ali = new AliTV(svg);
	it('setTickDistance method is supposed to be a function', function(){
		expect(typeof ali.setTickDistance).toEqual('function');
	});	
	it('the returned object of the getTickDistance method should be the same as the distance which is setted and returned by the setter-method', function(){
		var distance = 200;
		expect(ali.setTickDistance(distance)).toEqual(distance);
	});	
	it('when setTickDistance is called several times the distance should have the same value as the returned distance of getTickDistance method', function(){
		ali.setTickDistance(20);
		expect(ali.getTickDistance()).toEqual(20);
		ali.setTickDistance(5);
		expect(ali.getTickDistance()).toEqual(5);
		ali.setTickDistance(250);
		expect(ali.getTickDistance()).toEqual(250);
	});
	it('the setTickDistance method should throw an error message if the assigned distance is Sorry, you entered an empty value. Please try it again.', function(){
		var distance = "";
		expect(function(){ali.setTickDistance(distance);}).toThrow("Sorry, you entered an empty value. Please try it again.");
	});
	it('the setTickDistance method should throw an error message if the assigned distance is not a number', function(){
		var distance = "test";
		expect(function(){ali.setTickDistance(distance);}).toThrow("Sorry, you entered not a number. Please try it again.");
	});
	it('the setTickDistance method should throw an error message if the assigned distance is 0', function(){
		var distance = 0;
		expect(function(){ali.setTickDistance(distance);}).toThrow("Sorry, the entered value is too small. Please, insert one which is not less than 0.");
	});
	it('the setTickDistance method should throw an error message if the assigned distance is less than 0', function(){
		var distance = -200;
		expect(function(){ali.setTickDistance(distance);}).toThrow("Sorry, the entered value is too small. Please, insert one which is not less than 0.");
	});
});

describe('The getLayout method is supposed to get the information of the current layout', function(){
	var svg = $('<svg></svg>');
	var ali = new AliTV(svg);
	it('getLayout method is supposed to be a function', function(){
		expect(typeof ali.getLayout).toEqual('function');
	});	
	it('the function should return a defined value', function(){
		var layout = ali.getLayout();
		expect(layout).toBeDefined();
	});
	it('the function should return "linear", because this is the default layout', function(){
		var layout = ali.getLayout();
		expect(layout).toEqual("linear");
	});
});

describe('The getTreeWidth method is supposed to get the current width of the phylogenetic tree', function(){
	var svg = $('<svg></svg>');
	var ali = new AliTV(svg);
	it('getLayout method is supposed to be a function', function(){
		expect(typeof ali.getTreeWidth).toEqual('function');
	});	
	it('the function should return a defined value', function(){
		var treeWidth = ali.getTreeWidth();
		expect(treeWidth).toBeDefined();
	});
	it('the function should return the tree width which is defined in the defaultConf', function(){
		var treeWidth = ali.getTreeWidth();
		expect(treeWidth).toEqual(defaultConf.graphicalParameters.treeWidth);
	});
	
});

describe('The setTreeWidth method is supposed to set a new tree width', function(){
	var svg = $('<svg></svg>');
	var ali = new AliTV(svg);
	it('setTreeWidth method is supposed to be a function', function(){
		expect(typeof ali.setTreeWidth).toEqual('function');
	});	
	it('the returned object of the getTreeWidth method should be the same as the tree width which is setted and returned by the setter-method', function(){
		var treeWidth = 400;
		expect(ali.setTreeWidth(treeWidth)).toEqual(treeWidth);
	});	
	it('when setTreeWidth is called several times the width of the tree should have the same value as the returned width of getTreeWidth method', function(){
		ali.setTreeWidth(250);
		expect(ali.getTreeWidth()).toEqual(250);
		ali.setTreeWidth(1000);
		expect(ali.getTreeWidth()).toEqual(1000);
		ali.setTreeWidth(888);
		expect(ali.getTreeWidth()).toEqual(888);
	});
	it('the setTreeWidth method should throw an error message if the assigned tree width is empty.', function(){
		var treeWidth = "";
		expect(function(){ali.setTreeWidth(treeWidth);}).toThrow("Sorry, you entered an empty value. Please try it again.");
	});
	it('the setTreeWidth method should throw an error message if the assigned tree width is not a number', function(){
		var treeWidth = "test";
		expect(function(){ali.setTreeWidth(treeWidth);}).toThrow("Sorry, you entered not a number. Please try it again.");
	});
	it('the setTreeWidth method should throw an error message if the assigned treeWidth is 0', function(){
		var treeWidth = 0;
		expect(function(){ali.setTreeWidth(treeWidth);}).toThrow("Sorry, the entered value is too small. Please, insert one which is not less than 0.");
	});
	it('the setTreeWidth method should throw an error message if the assigned distance is less than 0', function(){
		var treeWidth = -200;
		expect(function(){ali.setTreeWidth(treeWidth);}).toThrow("Sorry, the entered value is too small. Please, insert one which is not less than 0.");
	});
});

describe('The getTickLabelFrequency method is supposed to get the current frequency of tick labels', function(){
	var svg = $('<svg></svg>');
	var ali = new AliTV(svg);
	it('getTickLabelFrequency method is supposed to be a function', function(){
		expect(typeof ali.getTickLabelFrequency).toEqual('function');
	});	
	it('the function should return a defined value', function(){
		var tickLabelFrequency = ali.getTickLabelFrequency();
		expect(tickLabelFrequency).toBeDefined();
	});
	it('the function should return the tick label frequency which is defined in the defaultConf', function(){
		var tickLabelFrequency = ali.getTickLabelFrequency();
		expect(tickLabelFrequency).toEqual(defaultConf.graphicalParameters.tickLabelFrequency);
	});
	
});

describe('The setTickLabelFrequency method is supposed to set a new frequency of tick labels', function(){
	var svg = $('<svg></svg>');
	var ali = new AliTV(svg);
	it('setTickLabelFrequency method is supposed to be a function', function(){
		expect(typeof ali.setTickLabelFrequency).toEqual('function');
	});	
	it('the returned value of the setTickLabelFrequency method should be the same as the label frequency which is setted and returned by the setter-method', function(){
		var tickLabelFrequency = 15;
		expect(ali.setTickLabelFrequency(tickLabelFrequency)).toEqual(tickLabelFrequency);
	});	
	it('when setTickLabelFrequency is called several times the width of the tree should have the same value as the returned frequency of getTickLabelFrequency method', function(){
		ali.setTickLabelFrequency(5);
		expect(ali.getTickLabelFrequency()).toEqual(5);
		ali.setTickLabelFrequency(100);
		expect(ali.getTickLabelFrequency()).toEqual(100);
		ali.setTickLabelFrequency(22);
		expect(ali.getTickLabelFrequency()).toEqual(22);
	});
	it('the setTickLabelFrequency method should throw an error message if the assigned frequency is empty.', function(){
		var tickLabelFrequency = "";
		expect(function(){ali.setTickLabelFrequency(tickLabelFrequency);}).toThrow("Sorry, you entered an empty value. Please try it again.");
	});
	it('the setTickLabelFrequency method should throw an error message if the assigned frequency is not a number', function(){
		var tickLabelFrequency = "test";
		expect(function(){ali.setTickLabelFrequency(tickLabelFrequency);}).toThrow("Sorry, you entered not a number. Please try it again.");
	});
	it('the setTickLabelFrequency method should throw an error message if the assigned frequency is 0', function(){
		var tickLabelFrequency = 0;
		expect(function(){ali.setTickLabelFrequency(tickLabelFrequency);}).toThrow("Sorry, the entered value is too small. Please, insert one which is not less than 0.");
	});
	it('the setTickLabelFrequency method should throw an error message if the assigned frequency is less than 0', function(){
		var tickLabelFrequency = -200;
		expect(function(){ali.setTickLabelFrequency(tickLabelFrequency);}).toThrow("Sorry, the entered value is too small. Please, insert one which is not less than 0.");
	});
});

describe('The getGenomeColor method is supposed to get the current color of the first and the last genome', function(){
	var svg = $('<svg></svg>');
	var ali = new AliTV(svg);
	it('getChromosomeColor method is supposed to be a function', function(){
		expect(typeof ali.getGenomeColor).toEqual('function');
	});	
	it('the function should return a defined value', function(){
		var color = ali.getGenomeColor();
		expect(color).toBeDefined();
	});
	it('the function should return the color of the first and the last genome', function(){
		var color = ali.getGenomeColor();
		var startLineColor = color[0];
		var endLineColor = color[1];
		expect(startLineColor).toEqual(defaultConf.linear.startLineColor);
		expect(endLineColor).toEqual(defaultConf.linear.endLineColor);
	});	
});

describe('The setGenomeColor method is supposed to set the new start and end color for the genomes', function(){
	var svg = $('<svg></svg>');
	var ali = new AliTV(svg);
	it('setGenomeColor method is supposed to be a function', function(){
		expect(typeof ali.setGenomeColor).toEqual('function');
	});	
	it('the returned value of the setGenomeColor method should be the same as the color which is setted and returned by the setter-method', function(){
		var color = ["#000000", "#ffffff"];
		expect(ali.setGenomeColor(color)).toEqual(color);
	});	
	it('when setGenomeColor is called several times the color should have the same value as the returned color of getGenomeColor method', function(){
		var color = ["#000000", "#efefef"];
		ali.setGenomeColor(color);
		var newColor = ali.getGenomeColor();
		expect(newColor[0]).toEqual(color[0]);
		expect(newColor[1]).toEqual(color[1]);
	});
	it('the setGenomeColor method should throw an error message if the assigned color is Sorry, you entered an empty value. Please try it again.', function(){
		var color = "";
		expect(function(){ali.setGenomeColor(color);}).toThrow("Sorry, you entered an empty value. Please try it again.");
	});
});

describe('The getLinkColor method is supposed to get the color for minimal and maximal links', function(){
	var svg = $('<svg></svg>');
	var ali = new AliTV(svg);
	it('getLinkColor method is supposed to be a function', function(){
		expect(typeof ali.getLinkColor).toEqual('function');
	});	
	it('the function should return a defined value', function(){
		var color = ali.getLinkColor();
		expect(color).toBeDefined();
	});
	it('the function should return the color for the minLinkIdentity and the maxLinkIdentity', function(){
		var color = ali.getLinkColor();
		var minLinkIdentityColor = color[0];
		var midLinkIdentityColor = color[1];
		var maxLinkIdentityColor = color[2];
		expect(minLinkIdentityColor).toEqual(defaultConf.minLinkIdentityColor);
		expect(midLinkIdentityColor).toEqual(defaultConf.midLinkIdentityColor);
		expect(maxLinkIdentityColor).toEqual(defaultConf.maxLinkIdentityColor);
	});	
});

describe('The setLinkColor method is supposed to set the new colors for the minimal and maximal links', function(){
	var svg = $('<svg></svg>');
	var ali = new AliTV(svg);
	it('setLinkColor method is supposed to be a function', function(){
		expect(typeof ali.setLinkColor).toEqual('function');
	});	
	it('the returned value of the setLinkColor method should be the same as the color which is setted and returned by the setter-method', function(){
		var color = ["#000000", "#ffffff", "#efefef"];
		expect(ali.setLinkColor(color)).toEqual(color);
	});	
	it('when setLinkColor is called several times the color should have the same value as the returned color of getLinkColor method', function(){
		var color = ["#000000", "#efefef", "#ffffff"];
		ali.setLinkColor(color);
		var newColor = ali.getLinkColor();
		expect(newColor[0]).toEqual(color[0]);
		expect(newColor[1]).toEqual(color[1]);
		expect(newColor[2]).toEqual(color[2]);
	});
	it('the setLinkColor method should throw an error message if the assigned color is empty.', function(){
		var color = "";
		expect(function(){ali.setLinkColor(color);}).toThrow("Sorry, you entered an empty value. Please try it again.");
	});
});

describe('The setConfig method is supposed to extend the existing config values', function(){
	var svg = $('<svg></svg>');
	var ali = new AliTV(svg);
	it('setConf method is supposed to be a function', function(){
		expect(typeof ali.setConf).toEqual('function');
	});
	it('setConf method should not alter the defaultConf if an empty object is passed', function(){
		ali.setConf({});
		expect(ali.conf).toEqual(defaultConf);
	});
	it('setConf method should overwrite existing/conflicting conf value', function(){
		ali.conf = jQuery.extend(true, {}, defaultConf);
		ali.setConf({linear: {drawAllLinks: true}});
		var confClone = jQuery.extend(true, {}, defaultConf);
		confClone.linear.drawAllLinks = true;
		expect(ali.conf).toEqual(confClone);
	});
	it('setConf method should add non-existent conf value', function(){
		ali.conf = jQuery.extend(true, {}, defaultConf);
		ali.setConf({custom: "customstring"});
		var confClone = jQuery.extend(true, {}, defaultConf);
		confClone.custom = "customstring";
		expect(ali.conf).toEqual(confClone);
	});
});

describe('The getSvgWidth method is supposed to get the width of the svg', function(){
	var svg = $('<svg></svg>');
	var ali = new AliTV(svg);
	
	it('getSvgWidth method is supposed to be a function', function(){
		expect(typeof ali.getSvgWidth).toEqual('function');
	});	
	it('the function should return a defined value', function(){
		var width = ali.getSvgWidth();
		expect(width).toBeDefined();
	});
	it('the function should return the width of canvas which is defined in the defaultConf', function(){
		var width = ali.getSvgWidth();
		expect(width).toEqual(Number(ali.svg.attr("width")));
	});
});
	
describe('The setSvgWidth method is supposed to set a new width of the svg', function(){
	var svg = $('<svg></svg>');
	var ali = new AliTV(svg);
	it('setSvgWidth method is supposed to be a function', function(){
		expect(typeof ali.setSvgWidth).toEqual('function');
	});
	it('when setSvgWidth is called several times the width should have the same value as the returned width of getSvgWidth method', function(){
		ali.setSvgWidth(2000);
		expect(ali.getSvgWidth()).toEqual(2000);
		ali.setSvgWidth(1200);
		expect(ali.getSvgWidth()).toEqual(1200);
		ali.setSvgWidth(10000);
		expect(ali.getSvgWidth()).toEqual(10000);
	});
	it('when setSvgWidth is called and the offset is activated the method should return a greater width', function(){
		ali.conf.offset.isSet = true;
		ali.setSvgWidth(2000);
		expect(ali.getSvgWidth()).toEqual(2000 + defaultConf.graphicalParameters.buttonWidth);
	});
	it('the setSvgWidth method should throw an error message if the assigned width is empty', function(){
		var width = "";
		expect(function(){ali.setSvgWidth(width);}).toThrow("Sorry, you entered an empty value. Please try it again.");
	});
	it('the setSvgWidth method should throw an error message if the assigned width is not a number', function(){
		var width = "test";
		expect(function(){ali.setSvgWidth(width);}).toThrow("Sorry, you entered not a number. Please try it again.");
	});
	it('the setSvgWidth method should throw an error message if the assigned width is 0', function(){
		var width = 0;
		expect(function(){ali.setSvgWidth(width);}).toThrow("Sorry, the entered value is too small. Please, insert one which is not less than 0.");
	});
	it('the setSvgWidth method should throw an error message if the assigned width is less than 0', function(){
		var width = -3000;
		expect(function(){ali.setSvgWidth(width);}).toThrow("Sorry, the entered value is too small. Please, insert one which is not less than 0.");
	});
});

describe('The getSvgHeight method is supposed to get the height of the svg drawing area', function(){
	var svg = $('<svg></svg>');
	var ali = new AliTV(svg);
	
	it('getSvgHeight method is supposed to be a function', function(){
		expect(typeof ali.getSvgHeight).toEqual('function');
	});	
	it('the function should return a defined value', function(){
		var height = ali.getSvgHeight();
		expect(height).toBeDefined();
	});
	it('the function should return the height of canvas which is defined in the defaultConf', function(){
		var height = ali.getSvgHeight();
		expect(height).toEqual(Number(ali.svg.attr("height")));
	});
});

describe('The setSvgHeight method is supposed to set a new height of the svg drawing area', function(){
	var svg = $('<svg></svg>');
	var ali = new AliTV(svg);
	it('setSvgHeight method is supposed to be a function', function(){
		expect(typeof ali.setSvgHeight).toEqual('function');
	});
	it('when setSvgHeight is called several times the width should have the same value as the returned height of getSvgHeight method', function(){
		ali.setSvgHeight(1234);
		expect(ali.getSvgHeight()).toEqual(1234);
		ali.setSvgHeight(4242);
		expect(ali.getSvgHeight()).toEqual(4242);
		ali.setSvgHeight(10000);
		expect(ali.getSvgHeight()).toEqual(10000);
	});
	it('the setSvgHeight method should throw an error message if the assigned height is empty', function(){
		var height = "";
		expect(function(){ali.setSvgHeight(height);}).toThrow("Sorry, you entered an empty value. Please try it again.");
	});
	it('the setSvgHeight method should throw an error message if the assigned height is Sorry, you entered not a number. Please try it again.', function(){
		var height = "test";
		expect(function(){ali.setSvgHeight(height);}).toThrow("Sorry, you entered not a number. Please try it again.");
	});
	it('the setSvgHeight method should throw an error message if the assigned height is 0', function(){
		var height = 0;
		expect(function(){ali.setSvgHeight(height);}).toThrow("Sorry, the entered value is too small. Please, insert one which is not less than 0.");
	});
	it('the setSvgHeight method should throw an error message if the assigned height is less than 0', function(){
		var height = -42;
		expect(function(){ali.setSvgHeight(height);}).toThrow("Sorry, the entered value is too small. Please, insert one which is not less than 0.");
	});
});

describe('The getSvgAsText method is supposed to get the content of the svg as a text string', function(){
	var svg = $('<svg></svg>');
	var ali = new AliTV(svg);
	
	it('getSvgAsText method is supposed to be a function', function(){
		expect(typeof ali.getSvgAsText).toEqual('function');
	});	
	it('the function should return an empty svg with defined size if no data is provided', function(){
		var svgText = "<svg width=\""+defaultConf.graphicalParameters.canvasWidth+"\" height=\""+defaultConf.graphicalParameters.canvasHeight+"\"></svg>";
		svgText += "<svg height=\""+defaultConf.graphicalParameters.canvasHeight+"\" width=\""+defaultConf.graphicalParameters.canvasWidth+"\"></svg>";
		expect(svgText).toContain(ali.getSvgAsText());
	});
	// more complex test cases are too difficult right now as there would be a hard constraint on the order of elements
	// therefore a customMatcher has to be written that can decide if two svg strings are semantically equivalent.
});

describe('The getJSON method is supposed to return the internal data, filters and conf as one JSON object', function(){
	var svg = $('<svg></svg>');
	var ali = new AliTV(svg);
	
	it('getJSON method is supposed to be a function', function(){
		expect(typeof ali.getJSON).toEqual('function');
	});	
	it('the function should return the defaultConf and two empty objects if nothing is set', function(){
		var expectedJSON = {conf: defaultConf, data: {}, filters: {}};
		expect(ali.getJSON()).toEqual(expectedJSON);
	});
	it('the function should return the set values in the JSON object', function(){
		ali.setData(data);
		ali.setFilters(filters);
		var expectedJSON = {conf: defaultConf, data: data, filters: filters};
		expect(ali.getJSON()).toEqual(expectedJSON);
	});
});

describe('The setJSON method is supposed to set the internal data, filters and conf objects', function(){
	var svg = $('<svg></svg>');
	var ali = new AliTV(svg);
	
	it('setJSON method is supposed to be a function', function(){
		expect(typeof ali.getJSON).toEqual('function');
	});
	it('the function should return the set values in the JSON object', function(){
		var expectedJSON = {conf: defaultConf, data: data, filters: filters};
		ali.setJSON(expectedJSON);
		expect(ali.getJSON()).toEqual(expectedJSON);
	});
});

describe('The getAlignmentRegion method is supposed to return the inner alignmentRegion g element as d3 selection', function(){
	var svg = $('<svg></svg>');
	var ali = new AliTV(svg);
	
	it('getAlignmentRegion method is supposed to be a function', function(){
		expect(typeof ali.getAlignmentRegion).toEqual('function');
	});
	it('the function should return the alignmentRegion as d3 selection object', function(){
		ali.svgD3.append("g").attr("class", "alignmentRegion");
		expect(ali.getAlignmentRegion()).toEqual(ali.svgD3.selectAll(".alignmentRegion"));
	});
	it('the function should return a newly created alignmentRegion as d3 selection object if it did not exist', function(){
		svg = $('<svg></svg>');
		ali = new AliTV(svg);
		expect(ali.getAlignmentRegion().size()).toEqual(1);
	});
});

describe('The getLegendRegion method is supposed to return the inner legendRegion g element as d3 selection', function(){
	var svg = $('<svg></svg>');
	var ali = new AliTV(svg);
	
	it('getLegendRegion method is supposed to be a function', function(){
		expect(typeof ali.getLegendRegion).toEqual('function');
	});
	it('the function should return the legendRegion as d3 selection object', function(){
		ali.svgD3.append("g").attr("class", "legendRegion");
		expect(ali.getLegendRegion()).toEqual(ali.svgD3.selectAll(".legendRegion"));
	});
	it('the function should return a newly created legendRegion as d3 selection object if it did not exist', function(){
		svg = $('<svg></svg>');
		ali = new AliTV(svg);
		expect(ali.getLegendRegion().size()).toEqual(1);
	});
});

describe('The getGenomeLabelColor method is supposed to get the color of the genome labels', function(){
	var svg = $('<svg></svg>');
	var ali = new AliTV(svg);
	
	it('getGenomeLabelColor method is supposed to be a function', function(){
		expect(typeof ali.getGenomeLabelColor).toEqual('function');
	});	
	it('the function should return a defined value', function(){
		var color = ali.getGenomeLabelColor();
		expect(color).toBeDefined();
	});
	it('the function should return the color of the genome Labels which is set in the defaultConf', function(){
		var color = ali.getGenomeLabelColor();
		expect(color).toEqual(defaultConf.labels.genome.color);
	});
});

describe('The setGenomeLabelColor method is supposed to set a new color for the genome labels', function(){
	var svg = $('<svg></svg>');
	var ali = new AliTV(svg);
	it('setGenomeLabelColor method is supposed to be a function', function(){
		expect(typeof ali.setGenomeLabelColor).toEqual('function');
	});	
	it('the returned value of the setGenomeLabelColor method should be the same as the color which is setted and returned by the setter-method', function(){
		var color = "#000000";
		expect(ali.setGenomeLabelColor(color)).toEqual(color);
	});	
	it('when setGenomeLabelColor is called several times the color should have the same value as the returned color of getGenomeLabelColor method', function(){
		var color = "#000000";
		ali.setGenomeLabelColor(color);
		var newColor = ali.getGenomeLabelColor();
		expect(newColor).toEqual(color);
	});
	it('the setGenomeLabelColor method should throw an error message if the assigned color is empty', function(){
		var color = "";
		expect(function(){ali.setGenomeLabelColor(color);}).toThrow("Sorry, you entered an empty value. Please try it again.");
	});
});

describe('The getGenomeLabelSize method is supposed to get the size of the genome labels', function(){
	var svg = $('<svg></svg>');
	var ali = new AliTV(svg);
	
	it('getGenomeLabelSize method is supposed to be a function', function(){
		expect(typeof ali.getGenomeLabelSize).toEqual('function');
	});	
	it('the function should return a defined value', function(){
		var color = ali.getGenomeLabelSize();
		expect(color).toBeDefined();
	});
	it('the function should return the current size of the genome Labels which is set in the defaultConf', function(){
		var color = ali.getGenomeLabelSize();
		expect(color).toEqual(defaultConf.labels.genome.size);
	});
});

describe('The setGenomeLabelSize method is supposed to set a new size of the genome labels', function(){
	var svg = $('<svg></svg>');
	var ali = new AliTV(svg);
	it('setGenomeLabelSize method is supposed to be a function', function(){
		expect(typeof ali.setGenomeLabelSize).toEqual('function');
	});
	it('when setGenomeLabelSize is called several times the size should have the same value as the returned size of the getGenomeLabelSize method', function(){
		ali.setGenomeLabelSize(20);
		expect(ali.getGenomeLabelSize()).toEqual(20);
		ali.setGenomeLabelSize(1);
		expect(ali.getGenomeLabelSize()).toEqual(1);
		ali.setGenomeLabelSize(13.25);
		expect(ali.getGenomeLabelSize()).toEqual(13.25);
	});
	it('the setGenomeLabelSize method should throw an error message if the assigned size is empty', function(){
		var size = "";
		expect(function(){ali.setGenomeLabelSize(size);}).toThrow("Sorry, you entered an empty value. Please try it again.");
	});
	it('the setGenomeLabelSize method should throw an error message if the assigned size is not a number', function(){
		var size = "test";
		expect(function(){ali.setGenomeLabelSize(size);}).toThrow("Sorry, you entered not a number. Please try it again.");
	});
	it('the setGenomeLabelSize method should throw an error message if the assigned size is 0', function(){
		var size = 0;
		expect(function(){ali.setGenomeLabelSize(size);}).toThrow("Sorry, the entered value is too small. Please, insert one which is not less than 0.");
	});
	it('the setGenomeLabelSize method should throw an error message if the assigned size is less than 0', function(){
		var size = -30;
		expect(function(){ali.setGenomeLabelSize(size);}).toThrow("Sorry, the entered value is too small. Please, insert one which is not less than 0.");
	});
});

describe('The getTickLabelColor method is supposed to get the color of the Ticks labels', function(){
	var svg = $('<svg></svg>');
	var ali = new AliTV(svg);
	
	it('getTickLabelColor method is supposed to be a function', function(){
		expect(typeof ali.getTickLabelColor).toEqual('function');
	});	
	it('the function should return a defined value', function(){
		var color = ali.getTickLabelColor();
		expect(color).toBeDefined();
	});
	it('the function should return the color of the Tick labels which is set in the defaultConf', function(){
		var color = ali.getTickLabelColor();
		expect(color).toEqual(defaultConf.labels.ticks.color);
	});
});

describe('The setTickLabelColor method is supposed to set a new color for the Tick labels', function(){
	var svg = $('<svg></svg>');
	var ali = new AliTV(svg);
	it('setTickLabelColor method is supposed to be a function', function(){
		expect(typeof ali.setTickLabelColor).toEqual('function');
	});	
	it('the returned value of the setTickLabelColor method should be the same as the color which is setted and returned by the setter-method', function(){
		var color = "#000000";
		expect(ali.setTickLabelColor(color)).toEqual(color);
	});	
	it('when setTickLabelColor is called several times the color should have the same value as the returned color of getTickLabelColor method', function(){
		var color = "#000000";
		ali.setTickLabelColor(color);
		var newColor = ali.getTickLabelColor();
		expect(newColor).toEqual(color);
	});
	it('the setTickLabelColor method should throw an error message if the assigned color is empty', function(){
		var color = "";
		expect(function(){ali.setTickLabelColor(color);}).toThrow("Sorry, you entered an empty value. Please try it again.");
	});
});

describe('The getTickLabelSize method is supposed to get the size of the Tick labels', function(){
	var svg = $('<svg></svg>');
	var ali = new AliTV(svg);
	
	it('getTickLabelSize method is supposed to be a function', function(){
		expect(typeof ali.getTickLabelSize).toEqual('function');
	});	
	it('the function should return a defined value', function(){
		var size = ali.getTickLabelSize();
		expect(size).toBeDefined();
	});
	it('the function should return the current size of the Tick Labels which is set in the defaultConf', function(){
		var size = ali.getTickLabelSize();
		expect(size).toEqual(defaultConf.labels.ticks.size);
	});
});

describe('The setTickLabelSize method is supposed to set a new size of the Tick labels', function(){
	var svg = $('<svg></svg>');
	var ali = new AliTV(svg);
	it('setTickLabelSize method is supposed to be a function', function(){
		expect(typeof ali.setTickLabelSize).toEqual('function');
	});
	it('when setTickLabelSize is called several times the size should have the same value as the returned size of the getTickLabelSize method', function(){
		ali.setTickLabelSize(20);
		expect(ali.getTickLabelSize()).toEqual(20);
		ali.setTickLabelSize(1);
		expect(ali.getTickLabelSize()).toEqual(1);
		ali.setTickLabelSize(13.25);
		expect(ali.getTickLabelSize()).toEqual(13.25);
	});
	it('the setTickLabelSize method should throw an error message if the assigned size is empty', function(){
		var size = "";
		expect(function(){ali.setTickLabelSize(size);}).toThrow("Sorry, you entered an empty value. Please try it again.");
	});
	it('the setTickLabelSize method should throw an error message if the assigned size is not a number', function(){
		var size = "test";
		expect(function(){ali.setTickLabelSize(size);}).toThrow("Sorry, you entered not a number. Please try it again.");
	});
	it('the setTickLabelSize method should throw an error message if the assigned size is 0', function(){
		var size = 0;
		expect(function(){ali.setTickLabelSize(size);}).toThrow("Sorry, the entered value is too small. Please, insert one which is not less than 0.");
	});
	it('the setTickLabelSize method should throw an error message if the assigned size is less than 0', function(){
		var size = -30;
		expect(function(){ali.setTickLabelSize(size);}).toThrow("Sorry, the entered value is too small. Please, insert one which is not less than 0.");
	});
});

describe('The getFeatureProperty method is supposed to get the specified property of a given supported feature', function(){
	it('getFeatureProperty method is supposed to be a function', function(){
		var svg = $('<svg></svg>');
		var ali = new AliTV(svg);
		expect(typeof ali.getFeatureProperty).toEqual('function');
	});
	it('the function should throw an error if the feature group is not supported', function(){
		var svg = $('<svg></svg>');
		var ali = new AliTV(svg);
		expect(function(){ali.getFeatureProperty('blablabla', 'color');}).toThrow("Not a supported feature.");
	});
	it('the function should throw an error if the property is not defined', function(){
		var svg = $('<svg></svg>');
		var ali = new AliTV(svg);
		expect(function(){ali.getFeatureProperty('gene', 'blablabla');}).toThrow("Not a supported property.");
	});
	it('the function should return a defined value', function(){
		var svg = $('<svg></svg>');
		var ali = new AliTV(svg);
		var color = ali.getFeatureProperty('gene', 'color');
		expect(color).toBeDefined();
	});
	it('the function should return the color of invertedRepeats which is defined in the defaultConf', function(){
		var svg = $('<svg></svg>');
		var ali = new AliTV(svg);
		var color = ali.getFeatureProperty('invertedRepeat', 'color');
		expect(color).toEqual(defaultConf.features.supportedFeatures.invertedRepeat.color);
	});	
});

describe('The setFeatureProperty method is supposed to set a new color for the given supported feature', function(){
	it('setFeatureProperty method is supposed to be a function', function(){
		var svg = $('<svg></svg>');
		var ali = new AliTV(svg);
		expect(typeof ali.setFeatureProperty).toEqual('function');
	});	
	it('the returned value of the setFeatureProperty method should be the same as the property which is set and returned by the setter-method', function(){
		var svg = $('<svg></svg>');
		var ali = new AliTV(svg);
		var color = "#000000";
		expect(ali.setFeatureProperty("nStretch", "color", color)).toEqual(color);
	});	
	it('when setFeatureProperty is called several times the color should have the same value as the returned color of getFeatureProperty method', function(){
		var svg = $('<svg></svg>');
		var ali = new AliTV(svg);
		ali.setFeatureProperty("repeat","color","#000000");
		expect(ali.getFeatureProperty("repeat","color")).toEqual("#000000");
		ali.setFeatureProperty("repeat","color","#36b6cd");
		expect(ali.getFeatureProperty("repeat","color")).toEqual("#36b6cd");
		ali.setFeatureProperty("repeat","color","#334e53");
		expect(ali.getFeatureProperty("repeat","color")).toEqual("#334e53");
	});
	it('when setFeatureProperty is called with form the form should be updated', function(){
		var svg = $('<svg></svg>');
		var ali = new AliTV(svg);
		ali.setFeatureProperty("invertedRepeat","form","rect");
		expect(ali.getFeatureProperty("invertedRepeat","form")).toEqual("rect");
		ali.setFeatureProperty("invertedRepeat","form","arrow");
		expect(ali.getFeatureProperty("invertedRepeat","form")).toEqual("arrow");
	});
	it('the setFeatureProperty method should throw an error message if the assigned color is empty', function(){
		var svg = $('<svg></svg>');
		var ali = new AliTV(svg);
		var color = "";
		expect(function(){ali.setFeatureProperty("nStretch", "color", color);}).toThrow("Sorry, you entered an empty value. Please try it again.");
	});
	it('the setFeatureProperty method should throw an error message if the feature is not supported', function(){
		var svg = $('<svg></svg>');
		var ali = new AliTV(svg);
		var color = "#000000";
		expect(function(){ali.setFeatureProperty("blablabla", "color", color);}).toThrow("Not a supported feature.");
	});
});

describe("The getMaxChromosomeLength method is supposed to return the value of the longest chromosome", function(){
	var svg = $('<svg></svg>');
	var ali = new AliTV(svg);
	it('getMaxChromosomeLength method is supposed to be a function', function(){
		expect(typeof ali.getMaxChromosomeLength).toEqual('function');
	});	
	it('the returned value of the getMaxChromosomeLength method should return a defined value', function(){
		ali.setData(data);
		ali.setFilters(filters);
		var maxLength = ali.getMaxChromosomeLength();
		expect(maxLength).toBeDefined();
	});	
	it('the function should return the value of the longest chromosome', function(){
		ali.setData(data);
		ali.setFilters(filters);
		var maxLength = ali.getMaxChromosomeLength();
		expect(maxLength).toEqual(2000);
	});
});

describe('The getOffset method is supposed to get the offset for shifted chromosomes', function(){
	it('getOffset method is supposed to be a function', function(){
		var svg = $('<svg></svg>');
		var ali = new AliTV(svg);
		expect(typeof ali.getOffset).toEqual('function');
	});
	it('the function should return a defined value', function(){
		var svg = $('<svg></svg>');
		var ali = new AliTV(svg);
		ali.setData(data);
		ali.setFilters(filters);
		var karyoId = "c1";
		var offset = ali.getOffset(karyoId);
		expect(offset).toBeDefined();
	});
});

describe('The setOffset method is supposed to set a new offset for shifted chromosomes', function(){
	it('setOffset method is supposed to be a function', function(){
		var svg = $('<svg></svg>');
		var ali = new AliTV(svg);
		expect(typeof ali.setOffset).toEqual('function');
	});
	it('the returned object of the getOffset method should be the same as the offset which is setted and returned by the setter-method', function(){
		var svg = $('<svg></svg>');
		var ali = new AliTV(svg);
		ali.setData(data);
		ali.setFilters(filters);
		var karyoId = "c1";
		var offset = 200;
		expect(ali.setOffset(offset, karyoId)).toEqual(offset);
	});
	it('when setOffset is called several times the offset should have the same value as the returned distance of getTickDistance method', function(){
		var svg = $('<svg></svg>');
		var ali = new AliTV(svg);
		ali.setData(data);
		ali.setFilters(filters);
		var karyoId = "c1";
		ali.setOffset(20, karyoId);
		expect(ali.getOffset(karyoId)).toEqual(20);
		ali.setOffset(5, karyoId);
		expect(ali.getOffset(karyoId)).toEqual(5);
		ali.setOffset(250, karyoId);
		expect(ali.getOffset(karyoId)).toEqual(250);
	});
	it('the setOffset method should throw an error message if the assigned offset is empty.', function(){
		var svg = $('<svg></svg>');
		var ali = new AliTV(svg);
		ali.setData(data);
		ali.setFilters(filters);
		var karyoId = "c1";
		var offset = "";
		expect(function(){ali.setOffset(offset, karyoId);}).toThrow("Sorry, you entered an empty value. Please try it again.");
	});
	it('the setOffset method should throw an error message if the assigned offset is not a number', function(){
		var svg = $('<svg></svg>');
		var ali = new AliTV(svg);
		ali.setData(data);
		ali.setFilters(filters);
		var karyoId = "c1";
		var offset = "test";
		expect(function(){ali.setOffset(offset, karyoId);}).toThrow("Sorry, you entered not a number. Please try it again.");
	});
});
		
describe("The getSupportedFeatures method is supposed to return the supported features", function(){
	it('getSupportedFeatures method is supposed to be a function', function(){
		var svg = $('<svg></svg>');
		var ali = new AliTV(svg);
		expect(typeof ali.getSupportedFeatures).toEqual('function');
	});
	it('getSupportedFeatures method is supposed to return default supported features', function(){
		var svg = $('<svg></svg>');
		var ali = new AliTV(svg);
		expect(ali.getSupportedFeatures().sort()).toEqual(Object.keys(defaultConf.features.supportedFeatures).sort());
	});
	it('getSupportedFeatures method is supposed to return default and added features', function(){
		var svg = $('<svg></svg>');
		var ali = new AliTV(svg);
		ali.setConf({"features": {"supportedFeatures": {"bla": {}}}})
		var expected = Object.keys(defaultConf.features.supportedFeatures);
		expected.push("bla");
		expect(ali.getSupportedFeatures().sort()).toEqual(expected.sort());
	});
});

describe('The setNewFeature method is supposed to set a new feature group in the supported Features object', function(){
	var svg = $('<svg></svg>');
	var ali = new AliTV(svg);
	it('setNewFeature method is supposed to be a function', function(){
		expect(typeof ali.setNewFeature).toEqual('function');
	});	
	it('the expected object should be the same as the object which is set and returned by setNewFeature', function(){
		var expectedFeature = {
				form: "cake",
				color: "#ff002c",
				visible: true,
				height: 30
		};
		var newFeature = ali.setNewFeature("applepie", "cake", "#ff002c");
		expect(expectedFeature).toEqual(newFeature);
	});
});

describe('The getTickLabelColor method is supposed to get the color of the Ticks labels', function(){
	var svg = $('<svg></svg>');
	var ali = new AliTV(svg);
	
	it('getTickLabelColor method is supposed to be a function', function(){
		expect(typeof ali.getTickLabelColor).toEqual('function');
	});	
	it('the function should return a defined value', function(){
		var color = ali.getTickLabelColor();
		expect(color).toBeDefined();
	});
	it('the function should return the color of the Tick labels which is set in the defaultConf', function(){
		var color = ali.getTickLabelColor();
		expect(color).toEqual(defaultConf.labels.ticks.color);
	});
});

describe('The getMinLinkIdentity method is supposed to get the minimal link identity', function(){
	var svg = $('<svg></svg>');
	var ali = new AliTV(svg);
	ali.setData(data);
	ali.setFilters(filters);
	
	it('getMinLinkIdentity method is supposed to be a function', function(){
		expect(typeof ali.getMinLinkIdentity).toEqual('function');
	});	
	it('the function should return a defined value', function(){
		var identity = ali.getMinLinkIdentity();
		expect(identity).toBeDefined();
	});
	it('the function should return the minimal link identity which is setted in the filters', function(){
		var identity = ali.getMinLinkIdentity();
		expect(identity).toEqual(ali.filters.links.minLinkIdentity);
	});
});

describe('The getMaxLinkIdentity method is supposed to get the maximal link identity', function(){
	var svg = $('<svg></svg>');
	var ali = new AliTV(svg);
	ali.setData(data);
	ali.setFilters(filters);
	
	it('getMaxLinkIdentity method is supposed to be a function', function(){
		expect(typeof ali.getMaxLinkIdentity).toEqual('function');
	});	
	it('the function should return a defined value', function(){
		var identity = ali.getMaxLinkIdentity();
		expect(identity).toBeDefined();
	});
	it('the function should return the maximal link identity which is setted in the filters', function(){
		var identity = ali.getMaxLinkIdentity();
		expect(identity).toEqual(ali.filters.links.maxLinkIdentity);
	});
});

describe('The getMinLinkLength method is supposed to get the minimal length of links', function(){
	var svg = $('<svg></svg>');
	var ali = new AliTV(svg);
	ali.setData(data);
	ali.setFilters(filters);
	
	it('getMinLinkLength method is supposed to be a function', function(){
		expect(typeof ali.getMinLinkLength).toEqual('function');
	});	
	it('the function should return a defined value', function(){
		var length = ali.getMinLinkLength();
		expect(length).toBeDefined();
	});
	it('the function should return the minimal length of links which is setted in the filters', function(){
		var length = ali.getMinLinkLength();
		expect(length).toEqual(ali.filters.links.minLinkLength);
	});
});

describe('The getMaxLinkLength method is supposed to get the maximal length of links', function(){
	var svg = $('<svg></svg>');
	var ali = new AliTV(svg);
	ali.setData(data);
	ali.setFilters(filters);
	
	it('getMaxLinkLength method is supposed to be a function', function(){
		expect(typeof ali.getMaxLinkLength).toEqual('function');
	});	
	it('the function should return a defined value', function(){
		var length = ali.getMaxLinkLength();
		expect(length).toBeDefined();
	});
	it('the function should return the maximal length of links which is setted in the filters', function(){
		var length = ali.getMaxLinkLength();
		expect(length).toEqual(ali.filters.links.maxLinkLength);
	});
});

describe('The getLinkOpacity method is supposed to get the default opacity of links', function(){
	var svg = $('<svg></svg>');
	var ali = new AliTV(svg);
	ali.setData(data);
	ali.setFilters(filters);

	it('getLinkOpacity method is supposed to be a function', function(){
		expect(typeof ali.getLinkOpacity).toEqual('function');
	});
	it('the function should return a defined value', function(){
		var opacity = ali.getLinkOpacity();
		expect(opacity).toBeDefined();
	});
	it('the function should return the opacity set in the conf', function(){
		var opacity = ali.getLinkOpacity();
		expect(opacity).toEqual(ali.conf.graphicalParameters.linkOpacity);
	});
});

describe('The setLinkOpacity method is supposed to set the default opacity of links', function(){
	it('setLinkOpacity method is supposed to be a function', function(){
		var svg = $('<svg></svg>');
		var ali = new AliTV(svg);
		expect(typeof ali.setLinkOpacity).toEqual('function');
	});
	it('the returned opacity of the getLinkOpacity method should be the same as the one set by the setter-method', function(){
		var svg = $('<svg></svg>');
		var ali = new AliTV(svg);
		ali.setLinkOpacity(.7);
		expect(ali.getLinkOpacity()).toEqual(.7);
	});
	it('the setLinkOpacity method should throw an error message if the assigned value is not a number', function(){
		var svg = $('<svg></svg>');
		var ali = new AliTV(svg);
		expect(function(){ali.setLinkOpacity();}).toThrow("Sorry, you entered not a number. Please try it again.");
		expect(function(){ali.setLinkOpacity("bla");}).toThrow("Sorry, you entered not a number. Please try it again.");
	});
	it('the setLinkOpacity method should throw an error message if the assigned value is out of range', function(){
		var svg = $('<svg></svg>');
		var ali = new AliTV(svg);
		expect(function(){ali.setLinkOpacity(2);}).toThrow("Sorry, this value is out of range. Please enter a number between 0 and 1.");
		expect(function(){ali.setLinkOpacity(-1);}).toThrow("Sorry, this value is out of range. Please enter a number between 0 and 1.");
	});
});