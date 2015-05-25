$('#themes').collapse({
	accordion: true,
	persist: false,
	open: function() {
		this.slideDown(500);
	},
	close: function() {
		this.slideUp(500);
	}
});
