$(function() {

	$("#fixed-footer").kinetic({
		y: false,
		filterTarget: function(target, e) {
			if(!/down|start/.test(e.type)) {
				return !(/area|a|input/i.test(target.tagName));
			}
		}
	});

	$("#footer-clip-left").click(function(){
		$("#fixed-footer").kinetic("start", { velocity: -35 });
		$("#fixed-footer").kinetic("stop");
	});

	$("#footer-clip-right").click(function(){
		$("#fixed-footer").kinetic("start", { velocity: 35 });
		$("#fixed-footer").kinetic("stop");
	});

	if("ontouchstart" in document.documentElement) {
		window.touchable = true;
		$(document.body).addClass("touch");
	} else {
		window.touchable = false;
		$(document.body).addClass("no-touch");
	}

	$(".logo-text").fitText(1.2, {minFontSize: "60px", maxFontSize: "120px"});
	if($("#did-u-mean")[0]) {
		setTabContentHeight();
		$(window).resize(setTabContentHeight);
	}
	$("#did-u-mean-close").click(function() {
		$("#did-u-mean").hide();
		setTabContentHeight();
	});
	$("#filter-collapser").click(function(e) {
		$("#filter-wrap").toggleClass("collapsed");
		if($("html").hasClass("o-browser")) {
			$("body").css({zoom: 1});
		}
		if($("html").hasClass("m-browser")) {
			setTileWidth();
		}
		return false;
	});
	if($("#price-slider").ionRangeSlider) {
		$("#price-slider").ionRangeSlider({
			min: 0,
			max: 5000,
			type: "double",
			prefix: "$",
			prettify: false,
			hasGrid: true,
			hideMinMax: true
		});
	}
	$(document.body).on("click", "#overlay-close, #back-button", function(e) {
		$("#overlay").hide();
		return false;
	});
	// $(document.body).on("click", ".item", showOverlay);
	$(document.body).on("click", ".more-less-link", function(e) {
		$("#desc-desc-contain").toggleClass("desc-desc-contain-expanded");
		return false;
	});
	$(document.body).on("click", "#desc-deal-link", function(e) {
		$("#desc-desc-link").parent().removeClass("active");
		$(this).parent().addClass("active");
		$("#desc-desc").hide();
		$("#desc-deal").show();
		return false;
	});
	$(document.body).on("click", "#desc-desc-link", function(e) {
		$("#desc-deal-link").parent().removeClass("active");
		$(this).parent().addClass("active");
		$("#desc-deal").hide();
		$("#desc-desc").show();
		return false;
	});
	$("#tab-menu-link").click(function(e) {
		$("#tab-strip").toggleClass("tab-menu");
		$(document.body).one("click", function() {
			$("#tab-strip").removeClass("tab-menu");
		});
		return false;
	});
	$("#tab-strip > li > a").click(function(e) {
		$(this).parent().parent().find(".active").removeClass("active");
		$(this).parent().addClass("active");
		$("#tab-strip").removeClass("tab-menu");
		return false;
	});
	$("#filter-link").click(function(e) {
		$(".filter-wrap").addClass("filter-active");
		try {
			$("#price-slider").ionRangeSlider("update");
		} catch(ex){}
		return false;
	});
	$("#filter-done-button").click(function(e) {
		$(".filter-wrap").removeClass("filter-active");
		try {
			$("#price-slider").ionRangeSlider("update");
		} catch(ex){}
		return false;
	});
	$(window).resize(function() {
		if($("#price-slider").ionRangeSlider) {
			try {
				$("#price-slider").ionRangeSlider("update");
			} catch(ex){}
		}
	});
	$("#item-wrap-inner").scroll(function() {
		if($(this)[0].scrollTop + $(this)[0].offsetHeight >= $(this)[0].scrollHeight) {
			fetchNextBatch();
		}
	});
	if($("#item-wrap-inner")[0]) {
		$("#item-wrap-inner")[0].scrollTop = 0;
	}
});

window.fetchInProgress = false;
window.windowLoaded = false;

$(window).load(function() {
	window.windowLoaded = true;
});

var fetchCount = 0;

var fetchNextBatch = function() {
	if(!window.fetchInProgress && window.windowLoaded && fetchCount < 10) {
		fetchCount++;
		$("#loading-indicator").show();
		$("#item-wrap-inner")[0].scrollTop = $("#item-wrap-inner")[0].scrollHeight;
		window.fetchInProgress = true;
		$.ajax({
			url: "response.html",
			cache: false,
			success: function(res) {
				//setTimeout(function() {
					$("#clear-div").before(res);
					window.fetchInProgress = false;
					$("#loading-indicator").hide();
				//}, 500);
			}
		});
	} else {
		if(fetchCount >= 10) {
			$("#loading-done").show();
		}
	}
};

var setTabContentHeight = function() {
	$("#tab-content").css({
		top: (58 + $("#did-u-mean")[0].offsetHeight) + "px"
	});
};

$(function() {
	var availableTags = [
		{vendor: "WalMart.com", title: "ActionScript", img: 'images/image_place_holder.png'},
		{vendor: "WalMart.com", title: "AppleScript", img: 'images/image_place_holder.png'},
		{vendor: "WalMart.com", title: "Asp", img: 'images/image_place_holder.png'},
		{vendor: "WalMart.com", title: "BASIC", img: 'images/image_place_holder.png'},
		{vendor: "WalMart.com", title: "C", img: 'images/image_place_holder.png'},
		{vendor: "WalMart.com", title: "C++", img: 'images/image_place_holder.png'},
		{vendor: "WalMart.com", title: "Clojure", img: 'images/image_place_holder.png'},
		{vendor: "WalMart.com", title: "COBOL", img: 'images/image_place_holder.png'},
		{vendor: "WalMart.com", title: "ColdFusion", img: 'images/image_place_holder.png'},
		{vendor: "WalMart.com", title: "Erlang", img: 'images/image_place_holder.png'},
		{vendor: "WalMart.com", title: "Fortran", img: 'images/image_place_holder.png'},
		{vendor: "WalMart.com", title: "Groovy", img: 'images/image_place_holder.png'},
		{vendor: "WalMart.com", title: "Haskell", img: 'images/image_place_holder.png'},
		{vendor: "WalMart.com", title: "Java", img: 'images/image_place_holder.png'},
		{vendor: "WalMart.com", title: "JavaScript", img: 'images/image_place_holder.png'},
		{vendor: "WalMart.com", title: "Lisp", img: 'images/image_place_holder.png'},
		{vendor: "WalMart.com", title: "Perl", img: 'images/image_place_holder.png'},
		{vendor: "WalMart.com", title: "PHP", img: 'images/image_place_holder.png'},
		{vendor: "WalMart.com", title: "Python", img: 'images/image_place_holder.png'},
		{vendor: "WalMart.com", title: "Ruby", img: 'images/image_place_holder.png'},
		{vendor: "WalMart.com", title: "Scala", img: 'images/image_place_holder.png'},
		{vendor: "WalMart.com", title: "Scheme", img: 'images/image_place_holder.png'}
	];
	var termTemplate = "<span class='ui-autocomplete-term'>%s</span>";
	$.widget("app.autocomplete", $.ui.autocomplete, {
		options: {
			highlightClass: "ui-state-highlight"
		},
		_renderItem: function(ul, item) {
			var re = new RegExp("(" + this.term + ")", "gi");
			var cls = this.options.highlightClass;
			var template = "<span class='" + cls + "'>$1</span>";
			var label = item.label.replace(re, template);
			var $li = $("<li/>").appendTo(ul);
			var $a = $("<a/>").attr("href", "#").html("<div class=\"res-icon\" style=\"background-image: url(" + item.img + ");\" />" + "<div class='itemlabel'>" + label + "</div>" + "<div class='vendor'>" + item.vendor + "</div>").appendTo($li);
			this.menu.element.width($("#search-field").width());
			return $li;
		},
		_resizeMenu: function() {
			this.menu.element.width($("#search-field")[0].offsetWidth - 2);
			this.menu.element.position({
				my : "left top",
				at: "left bottom",
				of: "#search-field"
			});
		}
	});
	$("#search-field").autocomplete({
		source: function(request, response) {
			response($.map(availableTags, function(m) {
				return {
					label: m.title,
					img: m.img,
					vendor: m.vendor
				}
			}));
		},
		minLength: 0,
		highlightClass: "ui-state-highlight",
		collision: "flip"
	});
});

$.fn.preload = function() {
	this.each(function(){
		$('<img/>')[0].src = this;
	});
}

// Usage:

$(["img/18-0.gif", "img/287.gif"]).preload();

var setTileWidth = function() {
	if($("#item-wrap-inner")[0]) {
		var clientWidth = $("#item-wrap-inner")[0].clientWidth;
		var noOfTiles = clientWidth / 232;
		//noOfTiles = Math.floor(noOfTiles);
		if(noOfTiles >= Math.floor(noOfTiles) + 0.75) {
			noOfTiles = Math.ceil(noOfTiles);
		} else {
			noOfTiles = Math.floor(noOfTiles);
		}
		$("#item-wrap-inner")[0].className = "item-wrap-inner " + "tile-" + noOfTiles;
	}
};

var showOverlay = function(e) {
	if($("#overlay")[0]) {
		$("#overlay-content").addClass("overlay-content-wrap-loading").html("");
		$("#overlay").show();
		setupOverlay();
		$.ajax({
			url: "overlay-response.html",
			cache: false,
			success: function(res) {
				$("#overlay-content").removeClass("overlay-content-wrap-loading").html(res);
			}
		});
	}
	return false;
};

var setupOverlay = function() {
	if($("#overlay")[0]) {
		var oldBrowser = $("html").hasClass("o-browser");
		var windowHeight = (oldBrowser ? 650 : $("#overlay")[0].offsetHeight - 40);
		var windowWidth = (oldBrowser ? 590 : $("#overlay")[0].offsetWidth - 40);
		var contentHeight = (windowHeight > 650 ? 650 : windowHeight);
		var contentWidth = (windowWidth > 590 ? 590 : windowWidth);
		var marginTop = -1 * Math.floor(contentHeight/2);
		var marginLeft = -1 * Math.floor(contentWidth/2);
		$("#overlay-content").css({width: contentWidth + "px", height: contentHeight + "px", marginTop: marginTop + "px", marginLeft: marginLeft + "px"});
	}
};

if($("html").hasClass("m-browser")) {
	$(window).resize(setTileWidth);
	$(window).resize(setupOverlay);
	$(window).on("orientationchange", setTileWidth);
	$(window).on("orientationchange", setupOverlay);
	$(window).load(setTileWidth);
	$(setTileWidth);
}