/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "body {\n  font-family: \"Jaldi\", sans-serif;\n  justify-content: space-evenly;\n  background-color: #003249;\n  height: 740px;\n  width: 100%;\n  margin: 0;\n  flex-direction: column;\n}\n\nbody, article, section, .widget, .left, .middle, .right, .bottom, .user-wrapper, .admin-wrapper, aside, .user-data-wrapper, .overall-data-wrapper, .title-water, .title-sleep, .title-activity, #userHydrateInput, #userData {\n  display: flex;\n}\n\n.user-wrapper {\n  width: 1405px;\n  height: 775px;\n  justify-content: space-evenly;\n  align-self: center;\n  flex-wrap: wrap;\n}\n\n.admin-wrapper {\n  flex-wrap: wrap;\n  height: 100%;\n  width: 100%;\n}\n\n.toggle-button, .main-button, .main-button-2 {\n  width: 75px;\n  align-self: center;\n  background-color: #D9D9D9;\n  margin-top: 5px;\n}\n\n.hidden {\n  display: none;\n}\n\nsection {\n  justify-content: space-evenly;\n}\n\nh1, h2 {\n  font-weight: 700;\n  margin: 0;\n  font-size: 2.5em;\n}\n\nh2 {\n  font-size: 1.25em;\n}\n\np {\n  font-size: 1em;\n}\n\np, .header-ish, #snarkyRemark {\n  width: 150px;\n  text-wrap: wrap;\n  text-align: center;\n  margin: 0;\n}\n\n.header-ish, #snarkyRemark {\n  font-size: 1.75em;\n}\n\n.left, .middle, .right {\n  justify-content: space-evenly;\n  align-items: center;\n  flex-direction: column;\n  height: 800px;\n  width: 33%;\n}\n\n.left {\n  align-items: flex-start;\n}\n\n.middle {\n  align-content: center;\n}\n\n.right {\n  align-items: flex-end;\n}\n\n.bottom {\n  width: 875px;\n  height: 200px;\n  justify-content: space-between;\n}\n\n.widget {\n  flex-direction: column;\n  justify-content: space-evenly;\n  align-items: center;\n}\n\n.square {\n  height: 200px;\n  width: 200px;\n}\n\n.rectangle {\n  width: 500px;\n}\n\n.bot, #welcomeMat {\n  background-color: white;\n}\n\n#waterWeek {\n  background-color: #F9FBB2;\n}\n\n#waterDay {\n  background-color: #59C3C3;\n}\n\n#userHydrateInput, #stepsWeek {\n  background-color: #D9D9D9;\n}\n\n#userHydrateInput {\n  flex-direction: column;\n  justify-content: center;\n}\n\n#stepsWeek, #welcomeMat {\n  height: 200px;\n  width: 875px;\n}\n\n#sleepWeek {\n  background-color: #D1BCE3;\n}\n\n#sleepDay {\n  background-color: #DBD56E;\n}\n\n#sleepLife {\n  background-color: #8C2155;\n  color: white;\n}\n\n#datepicker {\n  padding: 10px;\n  border: 1px solid #ccc;\n  border-radius: 4px;\n  font-size: 1em;\n  color: #333;\n  background-color: white;\n  margin-top: 20px;\n}\n\n.dp-container {\n  z-index: 100;\n  background-color: white;\n  border-radius: 4px;\n  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);\n}\n\n.dp-day {\n  color: #333;\n}\n\n.dp-selected {\n  background-color: #003249;\n  color: white;\n}\n\n.dp-day:hover {\n  background-color: #f0f0f0;\n}\n\n/* ///////// Admin Content //////// */\naside {\n  width: 10%;\n  height: 110%;\n  flex-direction: column;\n}\n\n.user-data-button, .overall-data-button {\n  border: none;\n  width: 100%;\n  height: 50px;\n}\n\n.user-data-button {\n  color: black;\n  background-color: white;\n}\n\n.overall-data-button {\n  color: white;\n  background-color: #003249;\n}\n\n.user-data-wrapper {\n  flex-direction: column;\n  align-content: center;\n  flex-wrap: wrap;\n  width: 90%;\n  background-color: white;\n}\n\n.overall-data-wrapper {\n  justify-content: center;\n  align-items: center;\n  flex-wrap: wrap;\n  width: 90%;\n  background-color: white;\n}\n\nlabel {\n  align-self: center;\n}\n\n#userEmail {\n  width: 12%;\n  align-self: center;\n}\n\n.admin-search {\n  width: 6%;\n  align-self: center;\n}\n\n.user-data {\n  flex-wrap: wrap;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n  background-color: white;\n}\n\n.basic-info, .water-info, .steps-info, .sleep-info {\n  height: 350px;\n  width: 648px;\n  justify-content: space-evenly;\n  align-items: center;\n}\n\n.water-info, .steps-info, .sleep-info {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-evenly;\n}\n\n.water-info, .overall-water-bot {\n  background-color: #59C3C3;\n}\n\n.steps-info, .overall-activity-bot {\n  background-color: #F9FBB2;\n}\n\n.sleep-info {\n  background-color: #D1BCE3;\n}\n\n.overall-sleep-bot {\n  background-color: #DBD56E;\n}\n\n.basic-info {\n  background-color: #D9D9D9;\n}\n\n.overall-sleep-bot, .overall-water-bot, .overall-activity-bot {\n  width: 33%;\n  height: 50%;\n  align-items: center;\n  flex-wrap: wrap;\n}\n\n.title-water, .title-sleep, .title-activity {\n  font-size: x-large;\n  width: 100%;\n  justify-content: center;\n}", "",{"version":3,"sources":["webpack://./src/css/styles.css"],"names":[],"mappings":"AAAA;EACE,gCAAA;EACA,6BAAA;EACA,yBAAA;EACA,aAAA;EACA,WAAA;EACA,SAAA;EACA,sBAAA;AACF;;AAEA;EACE,aAAA;AACF;;AAEA;EACE,aAAA;EACA,aAAA;EACA,6BAAA;EACA,kBAAA;EACA,eAAA;AACF;;AAEA;EACE,eAAA;EACA,YAAA;EACA,WAAA;AACF;;AAEA;EACE,WAAA;EACA,kBAAA;EACA,yBAAA;EACA,eAAA;AACF;;AAEA;EACE,aAAA;AACF;;AAEA;EACE,6BAAA;AACF;;AAEA;EACE,gBAAA;EACA,SAAA;EACA,gBAAA;AACF;;AAEA;EACE,iBAAA;AACF;;AAEA;EACE,cAAA;AACF;;AAEA;EACE,YAAA;EACA,eAAA;EACA,kBAAA;EACA,SAAA;AACF;;AAEA;EACE,iBAAA;AACF;;AAEA;EACE,6BAAA;EACA,mBAAA;EACA,sBAAA;EACA,aAAA;EACA,UAAA;AACF;;AAEA;EACE,uBAAA;AACF;;AAEA;EACE,qBAAA;AACF;;AAEA;EACE,qBAAA;AACF;;AACA;EACE,YAAA;EACA,aAAA;EACA,8BAAA;AAEF;;AACA;EACE,sBAAA;EACA,6BAAA;EACA,mBAAA;AAEF;;AACA;EACE,aAAA;EACA,YAAA;AAEF;;AACA;EACE,YAAA;AAEF;;AACA;EACE,uBAAA;AAEF;;AACA;EACE,yBAAA;AAEF;;AACA;EACE,yBAAA;AAEF;;AACA;EACE,yBAAA;AAEF;;AACA;EACE,sBAAA;EACA,uBAAA;AAEF;;AACA;EACE,aAAA;EACA,YAAA;AAEF;;AACA;EACE,yBAAA;AAEF;;AACA;EACE,yBAAA;AAEF;;AACA;EACE,yBAAA;EACA,YAAA;AAEF;;AACA;EACE,aAAA;EACA,sBAAA;EACA,kBAAA;EACA,cAAA;EACA,WAAA;EACA,uBAAA;EACA,gBAAA;AAEF;;AACA;EACE,YAAA;EACA,uBAAA;EACA,kBAAA;EACA,yCAAA;AAEF;;AACA;EACE,WAAA;AAEF;;AACA;EACE,yBAAA;EACA,YAAA;AAEF;;AACA;EACE,yBAAA;AAEF;;AACA,qCAAA;AAEA;EACE,UAAA;EACA,YAAA;EACA,sBAAA;AACF;;AAEA;EACE,YAAA;EACA,WAAA;EACA,YAAA;AACF;;AAEA;EACE,YAAA;EACA,uBAAA;AACF;;AAEA;EACE,YAAA;EACA,yBAAA;AACF;;AAEA;EACE,sBAAA;EACA,qBAAA;EACA,eAAA;EACA,UAAA;EACA,uBAAA;AACF;;AAEA;EACE,uBAAA;EACA,mBAAA;EACA,eAAA;EACA,UAAA;EACA,uBAAA;AACF;;AAEA;EACE,kBAAA;AACF;;AAEA;EACE,UAAA;EACA,kBAAA;AACF;;AAEA;EACE,SAAA;EACA,kBAAA;AACF;;AAEA;EACE,eAAA;EACA,mBAAA;EACA,uBAAA;EACA,mBAAA;EACA,uBAAA;AACF;;AAEA;EACE,aAAA;EACA,YAAA;EACA,6BAAA;EACA,mBAAA;AACF;;AAEA;EACE,aAAA;EACA,sBAAA;EACA,6BAAA;AACF;;AAEA;EACE,yBAAA;AACF;;AAEA;EACE,yBAAA;AACF;;AAEA;EACE,yBAAA;AACF;;AAEA;EACE,yBAAA;AACF;;AAEA;EACE,yBAAA;AACF;;AAEA;EACE,UAAA;EACA,WAAA;EACA,mBAAA;EACA,eAAA;AACF;;AAEA;EACE,kBAAA;EACA,WAAA;EACA,uBAAA;AACF","sourcesContent":["body {\n  font-family: 'Jaldi', sans-serif;\n  justify-content: space-evenly;\n  background-color: #003249;\n  height: 740px;\n  width: 100%;\n  margin: 0;\n  flex-direction: column;\n}\n\nbody, article, section, .widget, .left, .middle, .right, .bottom, .user-wrapper, .admin-wrapper, aside, .user-data-wrapper, .overall-data-wrapper, .title-water, .title-sleep, .title-activity, #userHydrateInput, #userData {\n  display: flex;\n}\n\n.user-wrapper {\n  width: 1405px;\n  height: 775px;\n  justify-content: space-evenly;\n  align-self: center;\n  flex-wrap: wrap;\n}\n\n.admin-wrapper {\n  flex-wrap: wrap;\n  height: 100%;\n  width: 100%;\n}\n\n.toggle-button, .main-button, .main-button-2 {\n  width: 75px;\n  align-self: center;\n  background-color: #D9D9D9;\n  margin-top: 5px;\n}\n\n.hidden {\n  display: none;\n}\n\nsection {\n  justify-content: space-evenly;\n}\n\nh1, h2 {\n  font-weight: 700;\n  margin: 0;\n  font-size: 2.5em;\n}\n\nh2 {\n  font-size: 1.25em;\n}\n\np {\n  font-size: 1em;\n}\n\np, .header-ish, #snarkyRemark {\n  width: 150px;\n  text-wrap: wrap;\n  text-align: center;\n  margin: 0;\n}\n\n.header-ish, #snarkyRemark {\n  font-size: 1.75em;\n}\n\n.left, .middle, .right {\n  justify-content: space-evenly;\n  align-items: center;\n  flex-direction: column;\n  height: 800px;\n  width: 33%;\n}\n\n.left {\n  align-items: flex-start;\n}\n\n.middle {\n  align-content: center;\n}\n\n.right {\n  align-items: flex-end;\n}\n.bottom {\n  width: 875px;\n  height: 200px;\n  justify-content: space-between;\n}\n\n.widget {\n  flex-direction: column;\n  justify-content: space-evenly;\n  align-items: center;\n}\n\n.square {\n  height: 200px;\n  width: 200px;\n}\n\n.rectangle  {\n  width: 500px;\n}\n\n.bot, #welcomeMat {\n  background-color: white;\n}\n\n#waterWeek {\n  background-color: #F9FBB2;\n}\n\n#waterDay {\n  background-color: #59C3C3;\n}\n\n#userHydrateInput, #stepsWeek {\n  background-color: #D9D9D9;\n}\n\n#userHydrateInput {\n  flex-direction: column;\n  justify-content: center;\n}\n\n#stepsWeek, #welcomeMat {\n  height: 200px;\n  width: 875px;\n}\n\n#sleepWeek {\n  background-color: #D1BCE3;\n}\n\n#sleepDay {\n  background-color: #DBD56E;\n}\n\n#sleepLife {\n  background-color: #8C2155;\n  color: white;\n}\n\n#datepicker {\n  padding: 10px;\n  border: 1px solid #ccc;\n  border-radius: 4px;\n  font-size: 1em;\n  color: #333;\n  background-color: white;\n  margin-top: 20px;\n}\n\n.dp-container {\n  z-index: 100;\n  background-color: white;\n  border-radius: 4px;\n  box-shadow: 0 8px 16px rgba(0,0,0,0.1);\n}\n\n.dp-day {\n  color: #333;\n}\n\n.dp-selected {\n  background-color: #003249;\n  color: white;\n}\n\n.dp-day:hover {\n  background-color: #f0f0f0;\n}\n\n/* ///////// Admin Content //////// */\n\naside {\n  width: 10%;\n  height: 110%;\n  flex-direction: column;\n}\n\n.user-data-button, .overall-data-button {\n  border: none;\n  width: 100%;\n  height: 50px;\n}\n\n.user-data-button {\n  color: black;\n  background-color: white;\n}\n\n.overall-data-button {\n  color: white;\n  background-color: #003249;\n}\n\n.user-data-wrapper {\n  flex-direction: column;\n  align-content: center;\n  flex-wrap: wrap;\n  width: 90%;\n  background-color: white;\n}\n\n.overall-data-wrapper {\n  justify-content: center;\n  align-items: center;\n  flex-wrap: wrap;\n  width: 90%;\n  background-color: white;\n}\n\nlabel {\n  align-self: center;\n}\n\n#userEmail {\n  width: 12%;\n  align-self: center;\n}\n\n.admin-search {\n  width: 6%;\n  align-self: center;\n}\n\n.user-data {\n  flex-wrap: wrap;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n  background-color: white;\n}\n\n.basic-info, .water-info, .steps-info, .sleep-info {\n  height: 350px;\n  width: 648px;\n  justify-content: space-evenly;\n  align-items: center;\n}\n\n.water-info, .steps-info, .sleep-info {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-evenly;\n}\n\n.water-info, .overall-water-bot {\n  background-color: #59C3C3;\n}\n\n.steps-info, .overall-activity-bot {\n  background-color: #F9FBB2;\n}\n\n.sleep-info {\n  background-color: #D1BCE3;\n}\n\n.overall-sleep-bot {\n  background-color: #DBD56E;\n}\n\n.basic-info {\n  background-color: #D9D9D9;\n}\n\n.overall-sleep-bot, .overall-water-bot, .overall-activity-bot {\n  width: 33%;\n  height: 50%;\n  align-items: center;\n  flex-wrap: wrap\n}\n\n.title-water, .title-sleep, .title-activity {\n  font-size:x-large;\n  width: 100%;\n  justify-content: center;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 5 */
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   activityData: () => (/* binding */ activityData),
/* harmony export */   allUsers: () => (/* binding */ allUsers),
/* harmony export */   fetchAllTheData: () => (/* binding */ fetchAllTheData),
/* harmony export */   hydrationData: () => (/* binding */ hydrationData),
/* harmony export */   postHydrationData: () => (/* binding */ postHydrationData),
/* harmony export */   sleepData: () => (/* binding */ sleepData)
/* harmony export */ });
/////////////////// Global Variables /////////////////////
const usersApi = "http://localhost:3001/api/v1/users";
const hydrationApi = "http://localhost:3001/api/v1/hydration";
const activityApi = "http://localhost:3001/api/v1/activity";
const sleepApi = "http://localhost:3001/api/v1/sleep";
let allUsers = null;
let hydrationData = null;
let activityData = null;
let sleepData = null;

////////// FETCH USERS ////////////
const fetchUsers = () => {
	return fetch(usersApi)
		.then(response => {
			if (!response.ok) {
				throw Error(`Something is amiss. Request Code: ${response.status}`);
			}
			return response.json();
		})
		.then(data => {
			allUsers = data.users;
      return allUsers;
		})
		.catch(error => {
			console.log(error);
		});
}

///////// FETCH HYDRATION DATA ////////////
const fetchHydrationData = () => {
	return fetch(hydrationApi)
		.then(response => {
		if (!response.ok) {
			throw Error(`Something is amiss. Request Code: ${response.status}`);
		}
		return response.json();
	})
	.then(data => {
		hydrationData = data.hydrationData;
    return hydrationData;
	})
	.catch(error => {
		console.log(error);
	});
}

////////// FETCH ACTIVITY DATA ////////////
const fetchActivityData = () => {
	return fetch(activityApi)
		.then(response => {
		if (!response.ok) {
			throw Error(`Something is amiss. Request Code: ${response.status}`);
		}
		return response.json();
	})
	.then(data => {
		activityData = data.activityData;
    return activityData;
	})
	.catch(error => {
		console.log(error);
	});
}

//////////// FETCH SLEEP DATA //////////////
const fetchSleepData = () => {
	return fetch(sleepApi)
		.then(response => {
		if (!response.ok) {
			throw Error(`Something is amiss. Request Code: ${response.status}`);
		}
		return response.json();
	})
	.then(data => {
		sleepData = data.sleepData;
    return sleepData;
	})
	.catch(error => {
		console.log(error);
	});
}

/////////////POST/////////////////////
function postHydrationData(combinedData) {
    return fetch(hydrationApi, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(combinedData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Something went wrong: ${response.status} Error`);
        }
        return response.json();
    })
    .then(addedData => {
        console.log('Data added:', addedData);
        // fetch the latest hydration data
        return fetchHydrationData(); // return the promise from fetchHydrationData
    })
    .catch(error => {
        alert(error.message);
        console.error(error);
    });
}

//////////// FETCH ALL THE DATA ////////////
const fetchAllTheData = () => {
	return Promise.all([
		fetchUsers(usersApi),
		fetchHydrationData(hydrationApi),
		fetchActivityData(activityApi),
		fetchSleepData(sleepApi),
		
	])
}





/***/ }),
/* 7 */
/***/ ((module) => {

////////////////////* Generate random number *////////////////////
function generateRandomUserID(usersArray) {
  let randomUserId = Math.floor(Math.random() * usersArray.length) + 1;
  return randomUserId;
}

////////////////////* Retrieve user data for Admin *////////////////////
function findUserByEmail(email, users) {
  const foundUser = users.find((user) => {
    return user.email === email;
  });
  if (foundUser) {
    return foundUser;
  } else {
    return "User not found";
  }
}

////////////////////* Create complete userObject card *////////////////////
function addDataToCurrentUser(currentUser, hydrationData, activityData, sleepData) {

  const userHydrationData = hydrationData.filter((hData) => {
    return hData.userID === currentUser.id;
  });

  const userActivityData = activityData.filter((aData) => {
    return aData.userID === currentUser.id;
  });

  const userSleepData = sleepData.filter((sData) => {
    return sData.userID === currentUser.id;
  });

  const completeCurrentUser = {
    ...currentUser,
    hydrationData: userHydrationData || [],
    activityData: userActivityData || [],
    sleepData: userSleepData || []
  };

  return completeCurrentUser;
}

////////////////* Current Day Value *///////////////////////////

const currentDay = (user) => user.hydrationData[user.hydrationData.length - 1].date;

////////////////* Ounces per day *//////////////////////////////////////

function ouncesPerDay(currentUser, date) {

  if (currentUser.hydrationData && currentUser.hydrationData.length > 0) {

    const hydrationDay = currentUser.hydrationData.find((hydrationDate) => {
      return hydrationDate.date === date;
    });
    if (hydrationDay) {
      return hydrationDay.numOunces;
    }
  }
}

////////////////////* Find average step goal amongst all users *////////////////////
function findStepGoalAverage(users) {

  let totalStepCount = 0;

  users.forEach((user) => {
    totalStepCount += user.dailyStepGoal;
  });
  const averageStepCount = (totalStepCount / users.length).toFixed(2);
  return averageStepCount;
}

/////////////////////* LOG HYDRATION FOR 7 DAYS ITERATION 2 *////////////////////////////

function getHydrationFor7Days(currentUser, endDate) {

  let endDateObj = new Date(endDate);

  let startDateObj = new Date(endDateObj);
  startDateObj.setDate(endDateObj.getDate() - 6);

  return currentUser.hydrationData.filter((entry) => {
    let entryDateObj = new Date(entry.date);
    return entryDateObj >= startDateObj && entryDateObj <= endDateObj;
  })
    .map((entry) => {
      return {
        date: entry.date,
        numOunces: entry.numOunces
      };
    });
}

//////////////////////* HYDRATION AVERAGE ITERATION 2 */////////////////////////////

function calculateTotalHydration(currentUser) {
  let totalHydration = 0;

  currentUser.hydrationData.forEach((hydrationEntry) => {
    totalHydration += hydrationEntry.numOunces / currentUser.hydrationData.length
  });

  return totalHydration.toFixed(2);
}

////////////////////* SLEEP ITERATION 4*///////////////////////////

function calculateAverageHoursSlept(currentUser) {
  let totalHoursSlept = 0;

  currentUser.sleepData.forEach((sleepEntry) => {
    totalHoursSlept += sleepEntry.hoursSlept / currentUser.sleepData.length
  });

  return totalHoursSlept.toFixed(2);
}

function calculateAverageSleepQuality(currentUser) {
  let avgSleepQuality = 0;

  currentUser.sleepData.forEach((sleepEntry) => {
    avgSleepQuality += sleepEntry.sleepQuality / currentUser.sleepData.length
  });

  return avgSleepQuality.toFixed(2);
}

function hoursSleptGivenDate(currentUser, date) {

  if (currentUser.sleepData &&
    currentUser.sleepData.length > 0) {

    const sleepDate = currentUser.sleepData.find((sleepDate) => {
      return sleepDate.date === date;
    });
    if (sleepDate) {
      return sleepDate.hoursSlept;
    }
  }
}

function sleepQualityGivenDate(currentUser, date) {

  if (currentUser.sleepData &&
    currentUser.sleepData.length > 0) {

    const sleepDate = currentUser.sleepData.find((sleepDate) => {
      return sleepDate.date === date;
    });
    if (sleepDate) {
      return sleepDate.sleepQuality;
    }
  }
}

function getSleepQualityFor7Days(currentUser, endDate) {
  let endDateObj = new Date(endDate);

  let startDateObj = new Date(endDateObj);
  startDateObj.setDate(endDateObj.getDate() - 6);
  return currentUser.sleepData
    .filter((entry) => {
      let entryDateObj = new Date(entry.date);
      return entryDateObj >= startDateObj && entryDateObj <= endDateObj;
    })
    .map((entry) => {
      return {
        date: entry.date,
        sleepQuality: entry.sleepQuality
      };
    });
}

function getSleepFor7Days(currentUser, endDate) {
  let endDateObj = new Date(endDate);

  let startDateObj = new Date(endDateObj);
  startDateObj.setDate(endDateObj.getDate() - 6);
  return currentUser.sleepData.filter((entry) => {
    let entryDateObj = new Date(entry.date);
    return entryDateObj >= startDateObj && entryDateObj <= endDateObj;
  })
    .map((entry) => {
      return {
        date: entry.date,
        hoursSlept: entry.hoursSlept
      };
    });
}

////////////////////* How far did you walk today miles ITERATION 5 *////////////////////
function findDistanceTraveled(currentUser) {
  const distance = ((currentUser.strideLength * currentUser.activityData[currentUser.activityData.length - 1].numSteps) / 5280).toFixed(2);
  return distance;
}

///////////////*Minutes user was active on given day ITERATION 5*/////////////////////

function minutesActiveGivenDate(currentUser, date) {

  if (currentUser.activityData &&
    currentUser.activityData.length > 0) {

    const activityDate = currentUser.activityData.find((specificDate) => {
      return specificDate.date === date;
    });
    if (activityDate) {
      return activityDate.minutesActive;
    }
  }
}
///////////////*Step goal ITERATION 5*//////////////////////

function checkStepGoal(currentUser) {
  // Checking if empty
  if (currentUser.activityData.length === 0) {
    return 'No!';
  }

  // Sort
  currentUser.activityData.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Retrieving the most recent activity data.
  const latestActivity = currentUser.activityData[0];

  // Comparing steps to goal
  if (latestActivity.numSteps >= currentUser.dailyStepGoal) {
    return 'Success!';
  } else {
    return 'No!';
  }
};

function checkStepGoal7Days(currentUser) {

  if (currentUser.activityData.length === 0) {
    return 'No activity data available!';
  }
  currentUser.activityData.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  const lastWeekActivity = currentUser.activityData.slice(0, 7);

  const results = lastWeekActivity.map((activity) => {
    let metGoal;

    if (activity.numSteps >= currentUser.dailyStepGoal) {
      metGoal = 'You did it!';
    } else {
      metGoal = 'Keep trying!';
    }
    return {
      date: activity.date,
      numSteps: activity.numSteps,
      metGoal: metGoal
    };
  });
  return results;
};


/////////////////*ITERATION 5 num steps on given date*/////////////////

function numberOfStepsGivenDate(currentUser, date) {

  if (currentUser.activityData &&
    currentUser.activityData.length > 0) {

    const activityDate = currentUser.activityData.find((specificDate) => {
      return specificDate.date === date;
    });
    if (activityDate) {
      return activityDate.numSteps;
    }
  }
}

function initializeDatePicker() {
  function handleDateSelection(instance, date) {
    const formattedDate = `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
    dateInput.value = formattedDate;
  }

  const dateInput = document.querySelector('#datepicker');

  // Set the start date to 2023/07/02
  const startDate = new Date('2023-07-03');

  const picker = datepicker(dateInput, {
    minDate: startDate,
    onSelect: handleDateSelection
  });
}


///NEW hydration average
function findBottomDrinkers(hydrationData, users) {
  // Map over users to calculate total ounces and average for each
  let userHydrationDetails = users.map((user) => {
    let userHydrationEntries = hydrationData.filter((entry) => {
      return entry.userID === user.id;
    });

    let totalOunces = userHydrationEntries.reduce((acc, curr) => acc + curr.numOunces, 0);

    // Calculate the average ounces per entry
    let averageOunces = totalOunces / userHydrationEntries.length;

    return { 
      userID: user.id, 
      totalOunces: totalOunces,
      averageOunces: averageOunces
    };
  });

  // Sort users by total ounces
  let sortedByOunces = userHydrationDetails.sort((a, b) => a.totalOunces - b.totalOunces);

  // Slice to get top entries
  let bottomDrinkers = sortedByOunces.slice(0, 10);

  // Map to include user names
  return bottomDrinkers.map((drinker) => {
    // Find the user to include the name
    let user = users.find((u) => u.id === drinker.userID);

    return { 
      ...drinker, 
      userName: user.name,
      averageOunces: drinker.averageOunces
    };
  });
}


// Sleep
function findBottomSleepers(sleepData, users) {
  // Map over users to calculate total hours slept and average hours slept for each
  let userSleepDetails = users.map((user) => {
    // Filter sleep entries for the current user
    let userSleeps = sleepData.filter((sleep) => sleep.userID === user.id);

    // Sum up all hours slept for the user
    let totalHoursSlept = userSleeps.reduce((acc, curr) => acc + curr.hoursSlept, 0);
    // Calculate the average hours slept per entry for the user
    let averageHoursSlept = totalHoursSlept / userSleeps.length;

    // Return object for the user
    return {
      userID: user.id,
      totalHoursSlept: totalHoursSlept,
      averageHoursSlept: averageHoursSlept
    };
  });

  // Sort the summary objects by total hours slept in descending order
  let sortedBySleep = userSleepDetails.sort((a, b) => a.totalHoursSlept - b.totalHoursSlept);
  // Slice the top 10 users with the most hours slept
  let bottomSleepers = sortedBySleep.slice(0, 10);

  // Map over the top sleepers to add user names
  return bottomSleepers.map((sleeper) => {
    // Find the user object to retrieve the user's name
    let user = users.find((u) => u.id === sleeper.userID);
    // Return object including the user's name
    return {
      ...sleeper,
      userName: user.name
    };
  });
}


// Activity
function findBottomStepTakers(activityData, users) {
  // Map over users to calculate total steps and average steps for each
  let userStepDetails = users.map((user) => {
    // Filter activity entries for the current user
    let userActivities = activityData.filter((activity) => activity.userID === user.id);

    // Sum up all steps for the user
    let totalSteps = userActivities.reduce((acc, curr) => acc + curr.numSteps, 0);
    // Calculate the average steps per entry for the user
    let averageSteps = totalSteps / userActivities.length;

    // Return object for the user
    return {
      userID: user.id,
      totalSteps: totalSteps,
      averageSteps: averageSteps
    };
  });

  // Sort the summary objects by total steps in descending order
  let sortedBySteps = userStepDetails.sort((a, b) => a.totalSteps - b.totalSteps);
  // Slice the top 10 users with the most steps
  let bottomStepTakers = sortedBySteps.slice(0, 10);

  // Map over the top step takers to add user names
  return bottomStepTakers.map((taker) => {
    // Find the user object to retrieve the user's name
    let user = users.find((u) => u.id === taker.userID);
    // Return a new object including the user's name
    return {
      ...taker,
      userName: user.name
    };
  });
}



module.exports = {
  generateRandomUserID,
  findUserByEmail,
  addDataToCurrentUser,
  currentDay,
  findStepGoalAverage,
  calculateTotalHydration,
  findDistanceTraveled,
  getHydrationFor7Days,
  ouncesPerDay,
  calculateAverageHoursSlept,
  calculateAverageSleepQuality,
  hoursSleptGivenDate,
  sleepQualityGivenDate,
  getSleepQualityFor7Days,
  getSleepFor7Days,
  minutesActiveGivenDate,
  checkStepGoal,
  checkStepGoal7Days,
  numberOfStepsGivenDate,
  initializeDatePicker,
  findBottomDrinkers,
  findBottomSleepers,
  findBottomStepTakers
};


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   activeMinutesUpdate: () => (/* binding */ activeMinutesUpdate),
/* harmony export */   adminBasicInfoDisplay: () => (/* binding */ adminBasicInfoDisplay),
/* harmony export */   adminSearchButton: () => (/* binding */ adminSearchButton),
/* harmony export */   adminSleepInfoDisplay: () => (/* binding */ adminSleepInfoDisplay),
/* harmony export */   adminStepsInfoDisplay: () => (/* binding */ adminStepsInfoDisplay),
/* harmony export */   adminWaterInfoDisplay: () => (/* binding */ adminWaterInfoDisplay),
/* harmony export */   dateInput: () => (/* binding */ dateInput),
/* harmony export */   displayBottomDrinkers: () => (/* binding */ displayBottomDrinkers),
/* harmony export */   displayBottomSleepers: () => (/* binding */ displayBottomSleepers),
/* harmony export */   displayBottomSteppers: () => (/* binding */ displayBottomSteppers),
/* harmony export */   mainButton: () => (/* binding */ mainButton),
/* harmony export */   mainButton2: () => (/* binding */ mainButton2),
/* harmony export */   overallAdminButton: () => (/* binding */ overallAdminButton),
/* harmony export */   sleepDayUpdate: () => (/* binding */ sleepDayUpdate),
/* harmony export */   sleepLifeUpdate: () => (/* binding */ sleepLifeUpdate),
/* harmony export */   sleepWeekUpdate: () => (/* binding */ sleepWeekUpdate),
/* harmony export */   stepGoalUpdate: () => (/* binding */ stepGoalUpdate),
/* harmony export */   stepsDayUpdate: () => (/* binding */ stepsDayUpdate),
/* harmony export */   stepsGoalCompare: () => (/* binding */ stepsGoalCompare),
/* harmony export */   stepsWeekUpdate: () => (/* binding */ stepsWeekUpdate),
/* harmony export */   submitData: () => (/* binding */ submitData),
/* harmony export */   toggleAdmin: () => (/* binding */ toggleAdmin),
/* harmony export */   toggleAdminData: () => (/* binding */ toggleAdminData),
/* harmony export */   toggleButton: () => (/* binding */ toggleButton),
/* harmony export */   updateUserName: () => (/* binding */ updateUserName),
/* harmony export */   userAdminButton: () => (/* binding */ userAdminButton),
/* harmony export */   userEmailInput: () => (/* binding */ userEmailInput),
/* harmony export */   userHydrationData: () => (/* binding */ userHydrationData),
/* harmony export */   waterDayUpdate: () => (/* binding */ waterDayUpdate),
/* harmony export */   waterWeekUpdate: () => (/* binding */ waterWeekUpdate)
/* harmony export */ });
const userName = document.querySelector('#welcomeMat');
// const userInfo = document.querySelector('#userData');
const waterDay = document.querySelector('#waterDay');
const waterWeek = document.querySelector('#waterWeek')
const sleepDay = document.querySelector('#sleepDay');
const sleepWeek = document.querySelector('#sleepWeek');
const stepGoal = document.querySelector('#stepGoal');
const stepsDay = document.querySelector('#stepsDay');
const activeMinutes = document.querySelector('#activeMinutes');
const stepsAverage = document.querySelector('#avgStepGoal');
const stepsWeek = document.querySelector('#stepsWeek');
const sleepLife = document.querySelector('#sleepLife');
const userPage = document.querySelector('#userWrapper');
const adminPage = document.querySelector('#adminWrapper');
const toggleButton = document.querySelector('#toggleButton');
const userHydrationData = document.querySelector('#hydrationInput');
const submitData = document.querySelector("#submitData");
const dateInput = document.querySelector("#datepicker");
const mainButton = document.querySelector('#mainButton');
const mainButton2 = document.querySelector('#mainButton2');
const userDataWrapper = document.querySelector('#userDataWrapper');
const overallDataWrapper = document.querySelector('#overallDataWrapper');
const userAdminButton = document.querySelector('#userDataButton');
const overallAdminButton = document.querySelector('#overallDataButton');
const bottomSleepersList = document.querySelector('#sleepAverages');
const bottomDrinkersList = document.querySelector('#waterAverages');
const bottomSteppersList = document.querySelector('#stepsAverages');
const adminBasicInfo = document.querySelector('#basicInfo');
const adminSleepInfo = document.querySelector('#sleepInfo');
const adminWaterInfo = document.querySelector('#waterInfo');
const adminStepsInfo = document.querySelector('#stepsInfo');
const userEmailInput = document.querySelector('#userEmail');
const adminSearchButton = document.querySelector('#adminSearch');

const toggleAdmin = () => {
  userPage.classList.toggle('hidden');
  adminPage.classList.toggle('hidden');
}

const toggleAdminData = () => {
  if(userAdminButton.disabled) {
    userAdminButton.style.backgroundColor='#003249';
    userAdminButton.style.color='white';
    overallAdminButton.style.backgroundColor='white';
    overallAdminButton.style.color='black';
    userAdminButton.disabled=!userAdminButton.disabled;
    overallAdminButton.disabled=!overallAdminButton.disabled;
  }
  else if(overallAdminButton.disabled) {
    overallAdminButton.style.backgroundColor='#003249';
    overallAdminButton.style.color='white';
    userAdminButton.style.backgroundColor='white';
    userAdminButton.style.color='black';
    overallAdminButton.disabled=!overallAdminButton.disabled;
    userAdminButton.disabled=!userAdminButton.disabled;
  }
  userDataWrapper.classList.toggle('hidden');
  overallDataWrapper.classList.toggle('hidden');
}

const updateUserName = (userData, date) => {
  userName.innerHTML ='';
  userName.innerHTML += `<h1>Hello ${userData.name}!</h1><h2 class='header-ish'>${date}</h2><p class='rectangle'>${userData.address} / ${userData.email}</p>`;
}

const waterDayUpdate = (date, hydrationData) => {
  waterDay.innerHTML = '';
  waterDay.innerHTML = `<h2>Water Today</h2><p>${hydrationData}oz</p><p class='snarky-remark'>No UTIs today!</p>`
}
const waterWeekUpdate = (hydrationArray) => {
  waterWeek.innerHTML = '';
  const hydrationHTML = hydrationArray.map((oz) => `${oz.numOunces}oz`).join(' / ');
  waterWeek.innerHTML = `<h2>Your Week in Water</h2><p>${hydrationHTML}</p>`;
}

const sleepDayUpdate = (date, sleepHours, sleepQuality) => {
  sleepDay.innerHTML = '';
  sleepDay.innerHTML = `<h2>Sleep Today</h2><p>${sleepHours} hours</p><p>${sleepQuality} quality rating</p>`;
}
 
const sleepWeekUpdate = (sleepTime, sleepQuality) => {
  sleepWeek.innerHTML = '';
  const sleepQualityHTML = sleepQuality.map((html) => `${html.sleepQuality}`).join(' / ');
  const sleepTimeHTML = sleepTime.map((html) => `${html.hoursSlept}h`).join(' / ');
  sleepWeek.innerHTML = `<h2>Your Week in Sleep</h2><p>${sleepTimeHTML}</p><p>${sleepQualityHTML} quality rating</p>`
}

const stepGoalUpdate = (goal) => {
  stepGoal.innerHTML = '';
  stepGoal.innerHTML = `<h2>Your Step Goal</h2><p>${goal} steps</p><p>Just try your best</p>`;
}

const stepsDayUpdate = (date, steps, distance) => {
  stepsDay.innerHTML = '';
  stepsDay.innerHTML = `<h2>Steps Today</h2><p>${steps} steps</p><p>${distance} miles</p>`
}

const activeMinutesUpdate = (time) => {
  activeMinutes.innerHTML = '';
  activeMinutes.innerHTML = `<h2>Active Minutes Today</h2><p>${time} minutes</p><p>ouchie!</p>`;
}

const stepsGoalCompare = (averageGoal) => {
  stepsAverage.innerHTML = '';
  stepsAverage.innerHTML = `<h2>Users' Average Step Goal</h2><p>${averageGoal} steps</p><p>But who's really counting?</p>`;
}

const stepsWeekUpdate = (activityArray) => {
  stepsWeek.innerHTML = '';
  const stepsWeekDay = activityArray.map(day => day.numSteps).join(' steps / ');
  const stepsGoalDay = activityArray.map(day => day.metGoal).join(' / ');
  stepsWeek.innerHTML = `<h2 class='headerIsh'>Your Week in Steps</h2><p class='rectangle'>${stepsWeekDay}</p><p class='rectangle'>${stepsGoalDay}</p>`;
}

const sleepLifeUpdate = (sleepLifeQuality, sleepLifeTime) => {
  sleepLife.innerHTML = '';
  sleepLife.innerHTML = `<h2>Users' Average Sleep</h2><p>${sleepLifeTime}h</p><p>${sleepLifeQuality} quality rating</p>`;
}

const adminBasicInfoDisplay = (basicInfo) => {
  adminBasicInfo.innerHTML = '';
  adminBasicInfo.innerHTML += `<h2>${basicInfo.name}</h2><p>${basicInfo.address} / ${basicInfo.email}</p>`;
}

const adminWaterInfoDisplay = (waterWeek) => {
  adminWaterInfo.innerHTML = '';
  const waterData = waterWeek.map((oz) => `${oz.numOunces}oz`).join(' / ');
  adminWaterInfo.innerHTML = `<h2>Week in Water</h2><p>${waterData}</p>`;
}

const adminStepsInfoDisplay = (stepsWeek) => {
  adminStepsInfo.innerHTML = '';
  const dailySteps = stepsWeek.map(day => day.numSteps).join(' steps / ');
  adminStepsInfo.innerHTML = `<h2>Week in Steps</h2><p>${dailySteps}</p>`
}

const adminSleepInfoDisplay = (sleepTimeWeek, sleepQualityWeek) => {
  adminSleepInfo.innerHTML = '';
  const sleepQualityData = sleepQualityWeek.map((html) => `${html.sleepQuality}`).join(' / ');
  const sleepTimeData = sleepTimeWeek.map((html) => `${html.hoursSlept}h`).join(' / ');
  adminSleepInfo.innerHTML = `<h2>Week in Sleep</h2><p>${sleepTimeData}</p><h2>Week in Sleep Quality</h2><p>${sleepQualityData} quality rating</p>`
}

const displayBottomDrinkers = (bottomDrinkers) => {
  bottomDrinkersList.innerHTML = '';
  const drink10 = bottomDrinkers.map(data => `<li>${data.userName} ${data.averageOunces.toFixed(2)} Ounces`).join('');
  bottomDrinkersList.innerHTML += drink10;
}

const displayBottomSleepers = (bottomSleepers) => {
  bottomSleepersList.innerHTML = '';
  const sleep10 = bottomSleepers.map(data => `<li>${data.userName} ${data.averageHoursSlept.toFixed(2)} hours`).join('');
  bottomSleepersList.innerHTML += sleep10;
}

const displayBottomSteppers = (bottomSteppers) => {
  bottomSteppersList.innerHTML = '';
  const step10 = bottomSteppers.map(data => `<li>${data.userName} ${data.averageSteps.toFixed(2)} Steps`).join('');
  bottomSteppersList.innerHTML += step10;
}



/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _apiCalls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _scriptDefinitions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _scriptDefinitions__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_scriptDefinitions__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _domUpdates__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);
///////////////// Global Variables ///////////////////
let currentUser = null;

/////////// Import CSS File /////////////


//////////// Import fetch call from apiCalls.js //////////////


//////////// Import functions from scriptDefinitions //////////////


///////////// Import from domUpdates.js ///////////////



////////////// Event Listeners //////////
   
window.addEventListener('load', () => {
  (0,_scriptDefinitions__WEBPACK_IMPORTED_MODULE_2__.initializeDatePicker)()
  ;(0,_apiCalls__WEBPACK_IMPORTED_MODULE_1__.fetchAllTheData)()
  .then(data => {
    currentUser = _apiCalls__WEBPACK_IMPORTED_MODULE_1__.allUsers[(0,_scriptDefinitions__WEBPACK_IMPORTED_MODULE_2__.generateRandomUserID)(_apiCalls__WEBPACK_IMPORTED_MODULE_1__.allUsers) - 1];
    const completeCurrentUser = (0,_scriptDefinitions__WEBPACK_IMPORTED_MODULE_2__.addDataToCurrentUser)(currentUser, _apiCalls__WEBPACK_IMPORTED_MODULE_1__.hydrationData, _apiCalls__WEBPACK_IMPORTED_MODULE_1__.activityData, _apiCalls__WEBPACK_IMPORTED_MODULE_1__.sleepData);
    const displayDay = (0,_scriptDefinitions__WEBPACK_IMPORTED_MODULE_2__.currentDay)(completeCurrentUser);
    (0,_domUpdates__WEBPACK_IMPORTED_MODULE_3__.updateUserName)(currentUser, displayDay);
    (0,_domUpdates__WEBPACK_IMPORTED_MODULE_3__.waterDayUpdate)(displayDay, (0,_scriptDefinitions__WEBPACK_IMPORTED_MODULE_2__.ouncesPerDay)(completeCurrentUser, displayDay));
    (0,_domUpdates__WEBPACK_IMPORTED_MODULE_3__.waterWeekUpdate)((0,_scriptDefinitions__WEBPACK_IMPORTED_MODULE_2__.getHydrationFor7Days)(completeCurrentUser, displayDay));
    (0,_domUpdates__WEBPACK_IMPORTED_MODULE_3__.sleepDayUpdate)(displayDay, (0,_scriptDefinitions__WEBPACK_IMPORTED_MODULE_2__.hoursSleptGivenDate)(completeCurrentUser, displayDay), (0,_scriptDefinitions__WEBPACK_IMPORTED_MODULE_2__.sleepQualityGivenDate)(completeCurrentUser, displayDay));
    (0,_domUpdates__WEBPACK_IMPORTED_MODULE_3__.sleepWeekUpdate)((0,_scriptDefinitions__WEBPACK_IMPORTED_MODULE_2__.getSleepFor7Days)(completeCurrentUser, displayDay), (0,_scriptDefinitions__WEBPACK_IMPORTED_MODULE_2__.getSleepQualityFor7Days)(completeCurrentUser, displayDay));
    (0,_domUpdates__WEBPACK_IMPORTED_MODULE_3__.stepGoalUpdate)(completeCurrentUser.dailyStepGoal);
    (0,_domUpdates__WEBPACK_IMPORTED_MODULE_3__.stepsDayUpdate)(displayDay, (0,_scriptDefinitions__WEBPACK_IMPORTED_MODULE_2__.numberOfStepsGivenDate)(completeCurrentUser, displayDay), (0,_scriptDefinitions__WEBPACK_IMPORTED_MODULE_2__.findDistanceTraveled)(completeCurrentUser));
    (0,_domUpdates__WEBPACK_IMPORTED_MODULE_3__.activeMinutesUpdate)((0,_scriptDefinitions__WEBPACK_IMPORTED_MODULE_2__.minutesActiveGivenDate)(completeCurrentUser, displayDay));
    (0,_domUpdates__WEBPACK_IMPORTED_MODULE_3__.stepsWeekUpdate)((0,_scriptDefinitions__WEBPACK_IMPORTED_MODULE_2__.checkStepGoal7Days)(completeCurrentUser));
    (0,_domUpdates__WEBPACK_IMPORTED_MODULE_3__.stepsGoalCompare)((0,_scriptDefinitions__WEBPACK_IMPORTED_MODULE_2__.findStepGoalAverage)(_apiCalls__WEBPACK_IMPORTED_MODULE_1__.allUsers));
    (0,_domUpdates__WEBPACK_IMPORTED_MODULE_3__.sleepLifeUpdate)((0,_scriptDefinitions__WEBPACK_IMPORTED_MODULE_2__.calculateAverageSleepQuality)(completeCurrentUser), (0,_scriptDefinitions__WEBPACK_IMPORTED_MODULE_2__.calculateAverageHoursSlept)(completeCurrentUser));
    (0,_domUpdates__WEBPACK_IMPORTED_MODULE_3__.displayBottomDrinkers)((0,_scriptDefinitions__WEBPACK_IMPORTED_MODULE_2__.findBottomDrinkers)(_apiCalls__WEBPACK_IMPORTED_MODULE_1__.hydrationData, _apiCalls__WEBPACK_IMPORTED_MODULE_1__.allUsers));
    (0,_domUpdates__WEBPACK_IMPORTED_MODULE_3__.displayBottomSleepers)((0,_scriptDefinitions__WEBPACK_IMPORTED_MODULE_2__.findBottomSleepers)(_apiCalls__WEBPACK_IMPORTED_MODULE_1__.sleepData, _apiCalls__WEBPACK_IMPORTED_MODULE_1__.allUsers));
    (0,_domUpdates__WEBPACK_IMPORTED_MODULE_3__.displayBottomSteppers)((0,_scriptDefinitions__WEBPACK_IMPORTED_MODULE_2__.findBottomStepTakers)(_apiCalls__WEBPACK_IMPORTED_MODULE_1__.activityData, _apiCalls__WEBPACK_IMPORTED_MODULE_1__.allUsers));
    (0,_domUpdates__WEBPACK_IMPORTED_MODULE_3__.adminBasicInfoDisplay)(currentUser);
    (0,_domUpdates__WEBPACK_IMPORTED_MODULE_3__.adminWaterInfoDisplay)((0,_scriptDefinitions__WEBPACK_IMPORTED_MODULE_2__.getHydrationFor7Days)(completeCurrentUser, displayDay));
    (0,_domUpdates__WEBPACK_IMPORTED_MODULE_3__.adminStepsInfoDisplay)((0,_scriptDefinitions__WEBPACK_IMPORTED_MODULE_2__.checkStepGoal7Days)(completeCurrentUser));
    (0,_domUpdates__WEBPACK_IMPORTED_MODULE_3__.adminSleepInfoDisplay)((0,_scriptDefinitions__WEBPACK_IMPORTED_MODULE_2__.getSleepFor7Days)(completeCurrentUser, displayDay), (0,_scriptDefinitions__WEBPACK_IMPORTED_MODULE_2__.getSleepQualityFor7Days)(completeCurrentUser, displayDay));
    _domUpdates__WEBPACK_IMPORTED_MODULE_3__.submitData.disabled = false;
  })
  .catch(error => {
    alert("Something went wrong: Failed to get data.")
    console.log(error);
  });
});

_domUpdates__WEBPACK_IMPORTED_MODULE_3__.submitData.addEventListener("click", () => {
  const hydrationInput = _domUpdates__WEBPACK_IMPORTED_MODULE_3__.userHydrationData.value;
  const selectedDate = _domUpdates__WEBPACK_IMPORTED_MODULE_3__.dateInput.value;
  const combinedData = {
    userID: currentUser.id,
    date: selectedDate,
    numOunces: parseInt(hydrationInput),
  };
  if(!combinedData.date || !combinedData.numOunces){
    alert("Please be sure to fill out all submission fields before proceeding.");
  } else {
    (0,_apiCalls__WEBPACK_IMPORTED_MODULE_1__.postHydrationData)(combinedData)
      .then(addedData => {
        const completeCurrentUser = (0,_scriptDefinitions__WEBPACK_IMPORTED_MODULE_2__.addDataToCurrentUser)(currentUser, addedData, _apiCalls__WEBPACK_IMPORTED_MODULE_1__.activityData, _apiCalls__WEBPACK_IMPORTED_MODULE_1__.sleepData);
        const displayDay = (0,_scriptDefinitions__WEBPACK_IMPORTED_MODULE_2__.currentDay)(completeCurrentUser);
        (0,_domUpdates__WEBPACK_IMPORTED_MODULE_3__.waterDayUpdate)(displayDay, (0,_scriptDefinitions__WEBPACK_IMPORTED_MODULE_2__.ouncesPerDay)(completeCurrentUser, displayDay));
        (0,_domUpdates__WEBPACK_IMPORTED_MODULE_3__.waterWeekUpdate)((0,_scriptDefinitions__WEBPACK_IMPORTED_MODULE_2__.getHydrationFor7Days)(completeCurrentUser, displayDay));   
        _domUpdates__WEBPACK_IMPORTED_MODULE_3__.userHydrationData.value = '';
        _domUpdates__WEBPACK_IMPORTED_MODULE_3__.dateInput.value = '';
        _domUpdates__WEBPACK_IMPORTED_MODULE_3__.submitData.disabled = true;
    })
    .catch(error => {
      alert("Something went wrong: Failed to post hydration data.")
      console.log(error);
    });
  }
});

_domUpdates__WEBPACK_IMPORTED_MODULE_3__.adminSearchButton.addEventListener("click", () => {
  (0,_apiCalls__WEBPACK_IMPORTED_MODULE_1__.fetchAllTheData)()
  .then(data => {
    const foundUser = (0,_scriptDefinitions__WEBPACK_IMPORTED_MODULE_2__.findUserByEmail)(_domUpdates__WEBPACK_IMPORTED_MODULE_3__.userEmailInput.value, _apiCalls__WEBPACK_IMPORTED_MODULE_1__.allUsers)
    const completeFoundUser = (0,_scriptDefinitions__WEBPACK_IMPORTED_MODULE_2__.addDataToCurrentUser)(foundUser, _apiCalls__WEBPACK_IMPORTED_MODULE_1__.hydrationData, _apiCalls__WEBPACK_IMPORTED_MODULE_1__.activityData, _apiCalls__WEBPACK_IMPORTED_MODULE_1__.sleepData);
    const displayDay = (0,_scriptDefinitions__WEBPACK_IMPORTED_MODULE_2__.currentDay)(completeFoundUser);
    (0,_domUpdates__WEBPACK_IMPORTED_MODULE_3__.adminBasicInfoDisplay)(foundUser);
    (0,_domUpdates__WEBPACK_IMPORTED_MODULE_3__.adminWaterInfoDisplay)((0,_scriptDefinitions__WEBPACK_IMPORTED_MODULE_2__.getHydrationFor7Days)(completeFoundUser, displayDay));
    (0,_domUpdates__WEBPACK_IMPORTED_MODULE_3__.adminStepsInfoDisplay)((0,_scriptDefinitions__WEBPACK_IMPORTED_MODULE_2__.checkStepGoal7Days)(completeFoundUser));
    (0,_domUpdates__WEBPACK_IMPORTED_MODULE_3__.adminSleepInfoDisplay)((0,_scriptDefinitions__WEBPACK_IMPORTED_MODULE_2__.getSleepFor7Days)(completeFoundUser, displayDay), (0,_scriptDefinitions__WEBPACK_IMPORTED_MODULE_2__.getSleepQualityFor7Days)(completeFoundUser, displayDay));
  })
  .catch(error => {
    alert("Something went wrong: Failed to get data.");
    console.log(error);
  });
});

_domUpdates__WEBPACK_IMPORTED_MODULE_3__.toggleButton.addEventListener('click', _domUpdates__WEBPACK_IMPORTED_MODULE_3__.toggleAdmin);
_domUpdates__WEBPACK_IMPORTED_MODULE_3__.mainButton.addEventListener('click', _domUpdates__WEBPACK_IMPORTED_MODULE_3__.toggleAdmin);
_domUpdates__WEBPACK_IMPORTED_MODULE_3__.mainButton2.addEventListener('click', _domUpdates__WEBPACK_IMPORTED_MODULE_3__.toggleAdmin);
_domUpdates__WEBPACK_IMPORTED_MODULE_3__.userAdminButton.addEventListener('click', _domUpdates__WEBPACK_IMPORTED_MODULE_3__.toggleAdminData);
_domUpdates__WEBPACK_IMPORTED_MODULE_3__.overallAdminButton.addEventListener('click', _domUpdates__WEBPACK_IMPORTED_MODULE_3__.toggleAdminData);

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map