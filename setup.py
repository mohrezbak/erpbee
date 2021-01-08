# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from setuptools import setup, find_packages
import re, ast

# get version from __version__ variable in erpbee/__init__.py
_version_re = re.compile(r'__version__\s+=\s+(.*)')

with open('requirements.txt') as f:
	install_requires = f.read().strip().split('\n')

with open('erpbee/__init__.py', 'rb') as f:
	version = str(ast.literal_eval(_version_re.search(
		f.read().decode('utf-8')).group(1)))

setup(
	name='erpbee',
	version=version,
	description='Open Source ERP',
	author='Frappe Technologies',
	author_email='info@erpbee.com',
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
