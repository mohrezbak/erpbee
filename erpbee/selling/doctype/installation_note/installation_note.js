// Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
// License: GNU General Public License v3. See license.txt

frappe.ui.form.on('Installation Note', {
	setup: function(frm) {
		frappe.dynamic_link = {doc: frm.doc, fieldname: 'customer', doctype: 'Customer'}
		frm.set_query('customer_address', erpbee.queries.address_query);
		frm.set_query('contact_person', erpbee.queries.contact_query);
		frm.set_query('customer', erpbee.queries.customer);
	},
	onload: function(frm) {
		if(!frm.doc.status) {
			frm.set_value({ status:'Draft'});
		}
		if(frm.doc.__islocal) {
			frm.set_value({inst_date: frappe.datetime.get_today()});
		}
	},
	customer: function(frm) {
		erpbee.utils.get_party_details(frm);
	},
	customer_address: function(frm) {
		erpbee.utils.get_address_display(frm);
	},
	contact_person: function(frm) {
		erpbee.utils.get_contact_details(frm);
	}
});

frappe.provide("erpbee.selling");

// TODO commonify this code
erpbee.selling.InstallationNote = frappe.ui.form.Controller.extend({
	refresh: function() {
		var me = this;
		if (this.frm.doc.docstatus===0) {
			this.frm.add_custom_button(__('From Delivery Note'),
				function() {
					erpbee.utils.map_current_doc({
						method: "erpbee.stock.doctype.delivery_note.delivery_note.make_installation_note",
						source_doctype: "Delivery Note",
						target: me.frm,
						date_field: "posting_date",
						setters: {
							customer: me.frm.doc.customer || undefined,
						},
						get_query_filters: {
							docstatus: 1,
							status: ["not in", ["Stopped", "Closed"]],
							per_installed: ["<", 99.99],
							company: me.frm.doc.company
						}
					})
				}, "fa fa-download", "btn-default"
			);
		}
	},
});

$.extend(cur_frm.cscript, new erpbee.selling.InstallationNote({frm: cur_frm}));