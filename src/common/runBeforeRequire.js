'use strict';

// Promise
import promise from 'babel-runtime/core-js/promise';
window.Promise = window.Promise || promise;

// Map
// import map from 'babel-runtime/core-js/map';
// window.Map = window.Map || map;

// Set
import set from 'babel-runtime/core-js/set';
window.Set = window.Set || set;

// Symbol
// import symbol from 'babel-runtime/core-js/symbol';
// window.Symbol = window.Symbol || symbol;

// Array
import array_copyWithin from 'babel-runtime/core-js/array/copy-within';
window.Array.prototype.copyWithin = window.Array.prototype.copyWithin || function () {
    return array_copyWithin(this, ...arguments);
};
import array_entries from 'babel-runtime/core-js/array/entries';
window.Array.prototype.entries = window.Array.prototype.entries || function () {
    return array_entries(this);
};
import array_every from 'babel-runtime/core-js/array/every';
window.Array.prototype.every = window.Array.prototype.every || function () {
    return array_every(this, ...arguments);
};
import array_fill from 'babel-runtime/core-js/array/fill';
window.Array.prototype.fill = window.Array.prototype.fill || function () {
    return array_fill(this, ...arguments);
};
import array_filter from 'babel-runtime/core-js/array/filter';
window.Array.prototype.filter = window.Array.prototype.filter || function () {
    return array_filter(this, ...arguments);
};
import array_findIndex from 'babel-runtime/core-js/array/find-index';
window.Array.prototype.findIndex = window.Array.prototype.findIndex || function () {
    return array_findIndex(this, ...arguments);
};
import array_find from 'babel-runtime/core-js/array/find';
window.Array.prototype.find = window.Array.prototype.find || function () {
    return array_find(this, ...arguments);
};
import array_forEach from 'babel-runtime/core-js/array/for-each';
window.Array.prototype.forEach = window.Array.prototype.forEach || function () {
    return array_forEach(this, ...arguments);
};
import array_from from 'babel-runtime/core-js/array/from';
window.Array.from = window.Array.from || function () {
    return array_from(...arguments);
};
import array_includes from 'babel-runtime/core-js/array/includes';
window.Array.prototype.includes = window.Array.prototype.includes || function () {
    return array_includes(this, ...arguments);
};
import array_indexOf from 'babel-runtime/core-js/array/index-of';
window.Array.prototype.indexOf = window.Array.prototype.indexOf || function () {
    return array_indexOf(this, ...arguments);
};
import array_keys from 'babel-runtime/core-js/array/keys';
window.Array.prototype.keys = window.Array.prototype.keys || function () {
    return array_keys(this);
};
import array_lastIndexOf from 'babel-runtime/core-js/array/last-index-of';
window.Array.prototype.lastIndexOf = window.Array.prototype.lastIndexOf || function () {
    return array_lastIndexOf(this, ...arguments);
};
import array_map from 'babel-runtime/core-js/array/map';
window.Array.prototype.map = window.Array.prototype.map || function () {
    return array_map(this, ...arguments);
};
import array_of from 'babel-runtime/core-js/array/of';
window.Array.of = window.Array.of || function () {
    return array_of(...arguments);
};
import array_reduceRight from 'babel-runtime/core-js/array/reduce-right';
window.Array.prototype.reduceRight = window.Array.prototype.reduceRight || function () {
    return array_reduceRight(this, ...arguments);
};
import array_reduce from 'babel-runtime/core-js/array/reduce';
window.Array.prototype.reduce = window.Array.prototype.reduce || function () {
    return array_reduce(this, ...arguments);
};
import array_some from 'babel-runtime/core-js/array/some';
window.Array.prototype.some = window.Array.prototype.some || function () {
    return array_some(this, ...arguments);
};
import array_values from 'babel-runtime/core-js/array/values';
window.Array.prototype.values = window.Array.prototype.values || function () {
    return array_values(this, ...arguments);
};

// Object
import object_assign from 'babel-runtime/core-js/object/assign';
window.Object.assign = window.Object.assign || function () {
    return object_assign(...arguments);
};
