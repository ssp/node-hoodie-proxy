# Hoodie Proxy

A proxy to allow running [Hoodie](https://github.com/hoodiehq/) or [CouchDB](http://couchdb.apache.org) behind an Apache Server on shared hosting.


## The Problem

CouchDB database names and document IDs may contain slashes. Slashes inside the names need to be escaped as `%2F` in the URL, so CouchDB can distinguish them from the slashes around the database name. Hoodie’s API is essentially CouchDB and Hoodie uses slashes in its database names and document IDs.

CouchDB’s [recommended reverse proxy setup](http://wiki.apache.org/couchdb/Apache_As_a_Reverse_Proxy) is not suitable for shared hosting as it requires configuring [`mod_proxy`](http://httpd.apache.org/docs/current/mod/mod_proxy.html) as well as [`AllowEncodedSlashes`](http://httpd.apache.org/docs/current/mod/core.html#allowencodedslashes) – neither of which can be done in `.htaccess` files.

Using `mod_rewrite` is possible in a shared hosting setup but will convert the escaped `%2F` slashes back to `/`. Using its [`[B]` flag](http://httpd.apache.org/docs/current/rewrite/flags.html#flag_b) will lead to double escaped `%252f`.

A number of problems come together here. Probably each of the involved softwares could make things easier:

* `mod_rewrite` letting my easily create exactly the URLs I want instead of changing the escaping
* Apache allowing proxy and slashes configuration on `.htaccess` level
* Hoodie not using slashes in database names and document IDs


## The Workaround

Set up a http proxy in node that tries to fix the URLs Hoodie needs after `mod_rewrite` breaks them by replacing `/` with `%2F` in some places.

The setup then is, with hoodie-proxy being able to access the port Hoodie runs on:

User → Apache with `mod_rewrite` reverse proxy → hoodie-proxy → Hoodie


## Contact

2014 by Sven-S. Porst <[ssp-web@earthlingsoft.net](mailto:ssp-web@earthlingsoft.net)>

https://github.com/ssp/node-hoodie-proxy
