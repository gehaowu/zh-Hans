!function() {
	"use strict";
	angular.module("app", ["ngAnimate", "ngCookies", "ngSanitize", "ngTouch", "ngStorage", "ngResource", "ui.router", "ui.bootstrap", "ui.utils", "duScroll"])
}(), function() {
	"use strict";
	angular.module("app").value("duScrollDuration", 500).value("duScrollOffset", 0)
}(), function() {
	"use strict";
	angular.module("app").config(["$stateProvider", "$urlRouterProvider", function(a, b) {
		b.otherwise("/home"), a.state("home", {
			url: "/home",
			templateUrl: "views/app.html"
		})
	}])
}(), function() {
	"use strict";
	function a(a, b) {
		function c(a) {
			var b = [{
				stylers: [{
					hue: "#ff1a00"
				}, {
					invert_lightness: !0
				}, {
					saturation: -100
				}, {
					lightness: 33
				}, {
					gamma: .5
				}]
			}, {
				featureType: "water",
				elementType: "geometry",
				stylers: [{
					color: "#2D333C"
				}]
			}],
				c = 27.818515,
				d = 120.804048,
				e = {
					zoom: 14,
					center: new google.maps.LatLng(c, d - .01),
					mapTypeId: google.maps.MapTypeId.ROADMAP,
					mapTypeControl: !1,
					panControl: !1,
					zoomControl: !1,
					scaleControl: !1,
					streetViewControl: !1,
					styles: b
				},
				f = new google.maps.Map(a, e),
				g = "images/my-location.png",
				h = new google.maps.LatLng(c, d);
			new google.maps.Marker({
				position: h,
				map: f,
				icon: g
			})
		}
		var d = "https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&callback=",
			e = b.defer();
		a.googleMapsInitialized = e.resolve;
		var f = function(a, b) {
				var c = document.createElement("script");
				c.src = a + b, document.body.appendChild(c)
			};
		f(d, "googleMapsInitialized");
		var g = {
			mapsInitialized: e.promise,
			mapIntial: c
		};
		return g
	}
	angular.module("app").factory("googleMapLoader", a), a.$inject = ["$window", "$q"]
}(), function() {
	"use strict";
	function a(a) {
		function b() {
			return a("projects/projects.json").get().$promise
		}
		var c = {
			getPortfolio: b
		};
		return c
	}
	angular.module("app").factory("portfolioService", a), a.$inject = ["$resource"]
}(), function() {
	"use strict";
	function a(a, b) {
		function c() {
			e.loading = !0, b.getPortfolio().then(function(a) {
				e.portfolioList = a.projects, e.loading = !1
			})
		}
		function d(b) {
			a.open({
				templateUrl: "portfolioModal.html",
				controller: "ModalPortfolioCtrl",
				controllerAs: "vm",
				size: "lg",
				resolve: {
					detail: function() {
						return b
					}
				}
			})
		}
		var e = this;
		e.portfolioList = [], e.open = d, c()
	}
	angular.module("app").controller("AppCtrl", a), a.$inject = ["$modal", "portfolioService"]
}(), function() {
	"use strict";
	function a(a, b, c) {
		function d() {
			b.dismiss("cancel")
		}
		var e = this;
		e.detail = c, e.myInterval = 5e3, e.cancel = d
	}
	angular.module("app").controller("ModalPortfolioCtrl", a), a.$inject = ["$scope", "$modalInstance", "detail"]
}(), function() {
	"use strict";
	function a(a) {
		function b(b, c, d) {
			var e = angular.element(a);
			b.getTopOffets = function() {
				return e.scrollTop()
			}, b.$watch(b.getTopOffets, function(a, b) {
				a > 0 ? c.css("background-color", "#262b37") : c.css("background-color", "")
			}, !0), e.bind("scroll", function() {
				b.$apply()
			})
		}
		return {
			restrict: "A",
			link: b
		}
	}
	angular.module("app").directive("navbar", a), a.$inject = ["$window"]
}(), function() {
	"use strict";
	function a(a) {
		function b(b, c, d) {
			var e = function() {
					angular.element(".home-content").css({
						"margin-top": "-" + angular.element(".home-content").height() / 2 + "px"
					}), angular.element(".project-info").css({
						"margin-top": "-" + angular.element(".project-info").height() / 2 + "px"
					})
				},
				f = angular.element(a);
			b.resizable = function() {
				e()
			}, b.getWindowDimensions = function() {
				return {
					h: f.height(),
					w: f.width()
				}
			}, b.$watch(b.getWindowDimensions, function() {
				b.resizable()
			}, !0), f.bind("resize", function() {
				b.$apply()
			})
		}
		return {
			restrict: "A",
			link: b
		}
	}
	angular.module("app").directive("resizeFix", a), a.$inject = ["$window"]
}(), function() {
	"use strict";
	function a() {
		function a(a, b, c) {
			b.wallpaper({
				source: c.uiWallpaper
			})
		}
		return {
			restrict: "AC",
			link: a
		}
	}
	angular.module("app").directive("uiWallpaper", a)
}(), function() {
	"use strict";
	function a() {
		function a(a, b, c) {
			b.addClass("invisible"), b.appear();
			var d = function() {
					var a, c = $(b),
						d = c.data("animation") || "fadeIn";
					c.hasClass("animated") || (a = c.data("delay") || 0, setTimeout(function() {
						c.removeClass("invisible").addClass(d + " animated")
					}, a))
				};
			b.is(":appeared") && d(), b.on("appear", function() {
				d()
			})
		}
		return {
			restrict: "AC",
			link: a
		}
	}
	angular.module("app").directive("uiAppear", a)
}(), function() {
	"use strict";
	function a(a) {
		function b(b, c, d) {
			a.mapsInitialized.then(function() {
				a.mapIntial(c[0])
			})
		}
		return {
			restrict: "AC",
			link: b
		}
	}
	angular.module("app").directive("googleMap", a), a.$inject = ["googleMapLoader"]
}();