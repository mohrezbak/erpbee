frappe.pages['welcome-to-erpbee'].on_page_load = function(wrapper) {
	var parent = $('<div class="welcome-to-erpbee"></div>').appendTo(wrapper);

	parent.html(frappe.render_template("welcome_to_erpbee", {}));

	parent.find(".video-placeholder").on("click", function() {
		window.erpbee_welcome_video_started = true;
		parent.find(".video-placeholder").addClass("hidden");
		parent.find(".embed-responsive").append('<iframe class="embed-responsive-item video-playlist" src="https://www.youtube.com/embed/videoseries?list=PL3lFfCEoMxvxDHtYyQFJeUYkWzQpXwFM9&color=white&autoplay=1&enablejsapi=1" allowfullscreen></iframe>')
	});

	// pause video on page change
	$(document).on("page-change", function() {
		if (window.erpbee_welcome_video_started && parent) {
			parent.find(".video-playlist").each(function() {
				this.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
			});
		}
	});
}
