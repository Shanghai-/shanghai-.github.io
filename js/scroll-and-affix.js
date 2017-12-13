$(document).ready(function(){
	var header = $("#widescreen");
	var headerHeight = header.outerHeight();
	var timeline = $("#timeline-wrapper");
	var timelineHeight = timeline.outerHeight();
	var stuck = false;

	var timelineEntries = $(".timeline-entry");
	var currIdx = 0;
	var startpoint = $(timelineEntries[0].hash).offset().top - (timelineHeight * 2);
	var endpoint = startpoint + $(timelineEntries[0].hash).outerHeight() - timelineHeight;
	
	$(window).scroll(function (event) {
	    var scroll = $(window).scrollTop();
	    if (scroll >= headerHeight) {
	    	if (!stuck) {
	    		timeline.addClass("fixed");
		    	header.append('<div id="spacer" style="height:' + timelineHeight + 'px"></div>');
		    	stuck = true;
	    	}
	    } else {
	    	if (stuck) {
	    		timeline.removeClass("fixed");
	    		$("#spacer").remove();
	    		stuck = false;
	    	}
	    }

	    if (scroll >= endpoint) {
			if (currIdx < timelineEntries.length - 1) {
				$(timelineEntries[currIdx]).removeClass("selected");
				currIdx++;
				$(timelineEntries[currIdx]).addClass("selected");
				startpoint = $(timelineEntries[currIdx].hash).offset().top - (timelineHeight * 2);
				endpoint = startpoint + $(timelineEntries[currIdx].hash).outerHeight() - timelineHeight;
			}
	    } else if (scroll <= startpoint) {
	    	if (currIdx > 0) {
	    		$(timelineEntries[currIdx]).removeClass("selected");
	    		currIdx--;
	    		var newEntry = $(timelineEntries[currIdx]);
	    		newEntry.addClass("selected");
	    		startpoint = $(timelineEntries[currIdx].hash).offset().top - (timelineHeight * 2);
				endpoint = startpoint + $(timelineEntries[currIdx].hash).outerHeight() - timelineHeight;
	    	}
	    }
	});
});