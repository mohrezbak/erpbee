from __future__ import unicode_literals
import frappe
import erpbee.setup.install

def execute():
	frappe.reload_doc("website", "doctype", "web_form_field", force=True, reset_permissions=True)
	#erpbee.setup.install.add_web_forms()
