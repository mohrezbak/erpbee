/* global Clusterize */
frappe.provide('erpbee.PointOfSale');
{% include "erpbee/selling/page/point_of_sale/pos_controller.js" %}
frappe.provide('erpbee.queries');

frappe.pages['point-of-sale'].on_page_load = function(wrapper) {
	frappe.ui.make_app_page({
		parent: wrapper,
		title: __('Point of Sale'),
		single_column: true
	});

	wrapper.pos = new erpbee.PointOfSale.Controller(wrapper);
	window.cur_pos = wrapper.pos;
};

frappe.pages['point-of-sale'].refresh = function(wrapper) {
	if (document.scannerDetectionData) {
		onScan.detachFrom(document);
		wrapper.pos.wrapper.html("");
		wrapper.pos.check_opening_entry();
	}
}