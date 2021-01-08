frappe.provide('erpbee.hub');

frappe.views.MarketplaceFactory = class MarketplaceFactory extends frappe.views.Factory {
	show() {
		is_marketplace_disabled()
			.then(disabled => {
				if (disabled) {
					frappe.show_not_found('Marketplace');
					return;
				}

				if (frappe.pages.marketplace) {
					frappe.container.change_to('marketplace');
					erpbee.hub.marketplace.refresh();
				} else {
					this.make('marketplace');
				}
			});
	}

	make(page_name) {
		const assets = [
			'/assets/js/marketplace.min.js'
		];

		frappe.require(assets, () => {
			erpbee.hub.marketplace = new erpbee.hub.Marketplace({
				parent: this.make_page(true, page_name)
			});
		});
	}
};

function is_marketplace_disabled() {
	return frappe.call({
		method: "erpbee.hub_node.doctype.marketplace_settings.marketplace_settings.is_marketplace_enabled"
	}).then(r => r.message)
}
