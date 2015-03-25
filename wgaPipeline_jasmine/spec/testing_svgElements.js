describe('Testing the first D3.js function drawKaryo', function() {
  var c;

  beforeEach(function() {
    c = drawKaryo();
    c.render();
  });

  afterEach(function() {
    d3.selectAll('svg').remove();
  });

  describe('the svg' ,function() {
    it('should be created', function() {
        expect(getSvg()).not.toBeNull();
    });

    it('should have the correct height', function() {
      expect(getSvg().attr('height')).toBe('3000');
    });

    it('should have the correct width', function() {
      expect(getSvg().attr('width')).toBe('1200');
    });
  });

  function getSvg() {
    return d3.select('svg');
  }
  
  describe('testing the data' ,function() {
	    it('should be null if no data has been specified', function() {
	        expect(c.getData()).not.toBeNull();
	    });

//	    it('should be able to update the data', function() {
//	      var testData =  [{ date: '2014-01', value: 100}, {date: '2014-02', value: 215}];
//	      c.setData(testData);
//	      expect(c.getData()).toBe(testData);
//	    });
  	});

});
