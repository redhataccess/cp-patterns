describe("<%= props.name %> <%= props.type %>", function() {
	before(function() {
		browser.url("/tests/<%= props.name_underscore %>");
		return browser;
	});

	it("should look like baseline", function() {
		return browser
			.compareScreen("<%= props.name_underscore %>", {
			  	name: "<%= props.type %>",
			  	elem: "body",
			  	screenWidth: [1024]
			});
	});

});
