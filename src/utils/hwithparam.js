
var normalizeSlots = function normalizeSlots(context) {
    return Object.keys(context.$slots)
                  .reduce((arr, key) => arr.concat(context.$slots[key]), [])
                  .map(vnode => {
                      vnode.context = context._self;
                      return vnode;
                  });
};

// IE9-11 do not support `Object.assign`
var poly = function poly(target) {
    if (target == null) {
        throw new TypeError('Uncaught TypeError: Cannot convert undefined or null to object');
    }

    for (var i = 0, il = arguments.length <= 1 ? 0 : arguments.length - 1; i < il; i += 1) {
        var source = arguments.length <= i + 1 ? undefined : arguments[i + 1];
        if (source == null) {
            continue;
        }

        for (var key in source) {
            if (Object.hasOwnProperty.call(source, key)) {
                Object.defineProperty(target, key, {
                    enumerable: true,
                    writable: true,
                    value: source[key]
                });
            }
        }
    }

  // $FlowFixMe
    return target;
};

var assign = Object.assign || poly;

var isObject = function isObject(test) {
    return test && Object.prototype.toString.call(test) === '[object Object]';
};

var isFunction = function isFunction(test) {
    return typeof test === 'function';
};

var isArray = Array.isArray;

var getComponentOptions = function (Component) {
    return isFunction(Component) ? Component.options : Component;
};

var normalize = function normalize(props) {
    if (!props) {
        return {};
    }
    if (isArray(props)) {
        var result = {};
        props.forEach(function (key) {
            if (typeof key === 'string') {
                result[key] = {};
            }
        });
        return result;
    }
    return assign({}, props);
};

var mergeMixinProps = function mergeMixinProps(mixins) {
    var initial = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (!mixins || !mixins.length) {
        return initial;
    }

    return mixins.reduce(function (result, mixin) {
        var props = assign({}, mergeMixinProps(mixin.mixins, result), normalize(mixin.props));

        return assign({}, result, props);
    }, initial);
};

var getProps = function getProps(Component) {
    var options = getComponentOptions(Component);
    var props = normalize(options.props);
    var mixinProps = mergeMixinProps(options.mixins);

    return assign({}, mixinProps, props);
};

// most options can provide a factory function to calculate the value at render time
// but these options are already menat to be functions, so we don't invoke them
// during the hoc creation phase
var justBindOptions = ['listeners', 'nativeOn', 'scopedSlots'];

var justBindFn = function justBindFn(key) {
    return justBindOptions.indexOf(key) > -1;
};

// ensures the keys always contain listeners/props/attrs
var getOptionsKeys = function getOptionsKeys(options) {
    return Object.keys(options).concat(['listeners', 'props', 'attrs']).filter(function (option, i, arr) {
        return arr.indexOf(option) === i;
    });
};

// for every option, we want to have a factory function that returns
// the actual result
var createOptionHandlers = function createOptionHandlers(originalOptions, keys) {
    var options = {};

    keys.forEach(function (key) {
        var option = originalOptions[key];

    // if option is not provided, default to returning the initial value
        if (!option) {
            options[key] = function (owner) {
                return owner;
            };
            return;
        }

    // option is a factory function
        if (isFunction(option)) {
            options[key] = option;
            return;
        }

    // option is an object, we need to handle each property directly
        if (isObject(option)) {
            var optionKeys = Object.keys(option);
            var hasFactories = optionKeys.some(function (key) {
                return isFunction(option[key]);
            });

      // no factory functions, just merge the parent/child property
            if (!hasFactories) {
                options[key] = function (owner) {
                    return assign({}, owner, option);
                };
                return;
            }

            options[key] = function (owner) {
                var _this = this;

                var result = assign({}, owner);
                var justBind = justBindFn(key);

                optionKeys.forEach(function (key) {
                    var value = option && option[key];

                    if (isFunction(value)) {
            // some properties expect functions
                        if (justBind) {
                            value = value.bind(_this);
              // for everything else, invoke the function to get the value
                        }
                        else {
                            value = value.call(_this, owner);
                        }
                    }
                    result[key] = value;
                });
                return result;
            };
            return;
        }

    // for anything else, just return the option value
        options[key] = function () {
            return option;
        };
    });

    return options;
};

// prepares the options so during render, we can quickly process them
var preprocessOptions = function preprocessOptions(originalOptions) {
    var keys = getOptionsKeys(originalOptions);
    var options = createOptionHandlers(originalOptions, keys);

    return function (context, isFunctional) {
        var result = {
            on: {},
            props: {},
            attrs: {}
        };

        keys.forEach(function (key) {
      // get this component's value
            var owner = isFunctional ? context[key] || context.data[key] : context['$' + key];

      // call the option handler
            var value = options[key].call(context, owner);

      // listeners has to be awkward and be renamed to on
            if (key === 'listeners') {
                key = 'on';
            }

            result[key] = value;
        });

        return result;
    };
};

// any unknown props need to be passed through as attrs
var getUnusedProps = function getUnusedProps(Component, props) {
    var result = {};
    var target = getProps(Component);

    Object.keys(props).forEach(function (prop) {
        if (target[prop] === undefined) {
            result[prop] = props[prop];
        }
    });

    return result;
};

var statelessRenderFn = function statelessRenderFn(Component, getData, h, context, customSlots) {
    var data = getData(context, true);
    var scopedSlots = context.data.scopedSlots;
    var slots = context.children || [];
    if (customSlots) {
        slots = slots.concat(customSlots);
    }
    var unusedProps = getUnusedProps(Component, data.props);

    data.scopedSlots = data.scopedSlots || scopedSlots;
    data.attrs = assign({}, unusedProps, data.attrs);

    return h(Component, data, slots);
};

var statefulRenderFn = function statefulRenderFn(Component, getData, h, context, customSlots) {
    var data = getData(context, false);
    var scopedSlots = context.$scopedSlots;
    var slots = normalizeSlots(context) || [];
    if (customSlots) {
        slots = slots.concat(customSlots);
    }
    var unusedProps = getUnusedProps(Component, data.props);

    data.scopedSlots = data.scopedSlots || scopedSlots;
    data.attrs = assign({}, unusedProps, data.attrs);

    return h(Component, data, slots);
};

var createRenderFn = function createRenderFn(Component, options, customSlots) {
    var getData = preprocessOptions(options || {});

    return function renderHoc(h, context) {
        return context ? statelessRenderFn(Component, getData, h, context, customSlots)
        : statefulRenderFn(Component, getData, h, this, customSlots);
    };
};

var transcomparam = function (context, h, Component, options, customSlots) {
    return createRenderFn(Component, options, customSlots).call(context, h);
};

export default transcomparam;
