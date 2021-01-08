// Copyright (c) 2016, Frappe Technologies Pvt. Ltd. and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.require("assets/erpbee/js/salary_slip_deductions_report_filters.js", function() {
	frappe.query_reports["Professional Tax Deductions"] = erpbee.salary_slip_deductions_report_filters;
});