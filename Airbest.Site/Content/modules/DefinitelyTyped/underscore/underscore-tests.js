/// <reference path="underscore.d.ts" />
_.each([1, 2, 3], function (num) { return alert(num.toString()); });
_.each({ one: 1, two: 2, three: 3 }, function (value, key) { return alert(value.toString()); });
_.map([1, 2, 3], function (num) { return num * 3; });
_.map({ one: 1, two: 2, three: 3 }, function (value, key) { return value * 3; });
//var sum = _.reduce([1, 2, 3], (memo, num) => memo + num, 0);	// https://typescript.codeplex.com/workitem/1960
var sum = _.reduce([1, 2, 3], function (memo, num) { return memo + num; }, 0);
sum = _.reduce([1, 2, 3], function (memo, num) { return memo + num; }); // memo is optional #issue 5 github
sum = _.reduce({ 'a': '1', 'b': '2', 'c': '3' }, function (memo, numstr) { return memo + (+numstr); });
var list = [[0, 1], [2, 3], [4, 5]];
//var flat = _.reduceRight(list, (a, b) => a.concat(b), []);	// https://typescript.codeplex.com/workitem/1960
var flat = _.reduceRight(list, function (a, b) { return a.concat(b); }, []);
var TestFind;
(function (TestFind) {
    var array = [{ a: 'a' }, { a: 'b' }];
    var list = { 0: { a: 'a' }, 1: { a: 'b' }, length: 2 };
    var dict = { a: { a: 'a' }, b: { a: 'b' } };
    var context = {};
    {
        var iterator = function (value, index, list) { return value.a === 'b'; };
        var result;
        result = _.find(array, iterator);
        result = _.find(array, iterator, context);
        result = _.find(array, { a: 'b' });
        result = _.find(array, 'a');
        result = _(array).find(iterator);
        result = _(array).find(iterator, context);
        result = _(array).find({ a: 'b' });
        result = _(array).find('a');
        result = _(array).chain().find(iterator).value();
        result = _(array).chain().find(iterator, context).value();
        result = _(array).chain().find({ a: 'b' }).value();
        result = _(array).chain().find('a').value();
        result = _.find(list, iterator);
        result = _.find(list, iterator, context);
        result = _.find(list, { a: 'b' });
        result = _.find(list, 'a');
        result = _(list).find(iterator);
        result = _(list).find(iterator, context);
        result = _(list).find({ a: 'b' });
        result = _(list).find('a');
        result = _(list).chain().find(iterator).value();
        result = _(list).chain().find(iterator, context).value();
        result = _(list).chain().find({ a: 'b' }).value();
        result = _(list).chain().find('a').value();
        result = _.detect(array, iterator);
        result = _.detect(array, iterator, context);
        result = _.detect(array, { a: 'b' });
        result = _.detect(array, 'a');
        result = _(array).detect(iterator);
        result = _(array).detect(iterator, context);
        result = _(array).detect({ a: 'b' });
        result = _(array).detect('a');
        result = _(array).chain().detect(iterator).value();
        result = _(array).chain().detect(iterator, context).value();
        result = _(array).chain().detect({ a: 'b' }).value();
        result = _(array).chain().detect('a').value();
        result = _.detect(list, iterator);
        result = _.detect(list, iterator, context);
        result = _.detect(list, { a: 'b' });
        result = _.detect(list, 'a');
        result = _(list).detect(iterator);
        result = _(list).detect(iterator, context);
        result = _(list).detect({ a: 'b' });
        result = _(list).detect('a');
        result = _(list).chain().detect(iterator).value();
        result = _(list).chain().detect(iterator, context).value();
        result = _(list).chain().detect({ a: 'b' }).value();
        result = _(list).chain().detect('a').value();
    }
    {
        var iterator = function (element, key, list) { return element.a === 'b'; };
        var result;
        result = _.find(dict, iterator);
        result = _.find(dict, iterator, context);
        result = _.find(dict, { a: 'b' });
        result = _.find(dict, 'a');
        result = _(dict).find(iterator);
        result = _(dict).find(iterator, context);
        result = _(dict).find({ a: 'b' });
        result = _(dict).find('a');
        result = _(dict).chain().find(iterator).value();
        result = _(dict).chain().find(iterator, context).value();
        result = _(dict).chain().find({ a: 'b' }).value();
        result = _(dict).chain().find('a').value();
        result = _.detect(dict, iterator);
        result = _.detect(dict, iterator, context);
        result = _.detect(dict, { a: 'b' });
        result = _.detect(dict, 'a');
        result = _(dict).detect(iterator);
        result = _(dict).detect(iterator, context);
        result = _(dict).detect({ a: 'b' });
        result = _(dict).detect('a');
        result = _(dict).chain().detect(iterator).value();
        result = _(dict).chain().detect(iterator, context).value();
        result = _(dict).chain().detect({ a: 'b' }).value();
        result = _(dict).chain().detect('a').value();
    }
    {
        var iterator = function (value, index, list) { return value === 'b'; };
        var result;
        result = _.find('abc', iterator);
        result = _.find('abc', iterator, context);
        result = _('abc').find(iterator);
        result = _('abc').find(iterator, context);
        result = _('abc').chain().find(iterator).value();
        result = _('abc').chain().find(iterator, context).value();
        result = _.detect('abc', iterator);
        result = _.detect('abc', iterator, context);
        result = _('abc').detect(iterator);
        result = _('abc').detect(iterator, context);
        result = _('abc').chain().detect(iterator).value();
        result = _('abc').chain().detect(iterator, context).value();
    }
})(TestFind || (TestFind = {}));
var evens = _.filter([1, 2, 3, 4, 5, 6], function (num) { return num % 2 == 0; });
var capitalLetters = _.filter({ a: 'a', b: 'B', c: 'C', d: 'd' }, function (l) { return l === l.toUpperCase(); });
var listOfPlays = [{ title: "Cymbeline", author: "Shakespeare", year: 1611 }, { title: "The Tempest", author: "Shakespeare", year: 1611 }, { title: "Other", author: "Not Shakespeare", year: 2012 }];
_.where(listOfPlays, { author: "Shakespeare", year: 1611 });
var odds = _.reject([1, 2, 3, 4, 5, 6], function (num) { return num % 2 == 0; });
_.every([true, 1, null, 'yes'], _.identity);
_.any([null, 0, 'yes', false]);
_.some([1, 2, 3, 4], function (l) { return l % 3 === 0; });
_.some({ a: 'a', b: 'B', c: 'C', d: 'd' }, function (l) { return l === l.toUpperCase(); });
_.contains([1, 2, 3], 3);
_.invoke([[5, 1, 7], [3, 2, 1]], 'sort');
var stooges = [{ name: 'moe', age: 40 }, { name: 'larry', age: 50 }, { name: 'curly', age: 60 }];
_.pluck(stooges, 'name');
_.max(stooges, function (stooge) { return stooge.age; });
_.min(stooges, function (stooge) { return stooge.age; });
var numbers = [10, 5, 100, 2, 1000];
_.max(numbers);
_.min(numbers);
_.sortBy([1, 2, 3, 4, 5, 6], function (num) { return Math.sin(num); });
_([1.3, 2.1, 2.4]).groupBy(function (e) { return Math.floor(e); });
_.groupBy([1.3, 2.1, 2.4], function (num) { return Math.floor(num).toString(); });
_.groupBy(['one', 'two', 'three'], 'length');
_.indexBy(stooges, 'age')['40'].age;
_(stooges).indexBy('age')['40'].name;
_(stooges)
    .chain()
    .indexBy('age')
    .value()['40'].age;
_.countBy([1, 2, 3, 4, 5], function (num) { return (num % 2 == 0) ? 'even' : 'odd'; });
_.shuffle([1, 2, 3, 4, 5, 6]);
(function (a, b, c, d) { return _.toArray(arguments).slice(1); })(1, 2, 3, 4);
_.size({ one: 1, two: 2, three: 3 });
_.partition([0, 1, 2, 3, 4, 5], function (num) { return num % 2 == 0; });
var isUncleMoe = _.matches({ name: 'moe', relation: 'uncle' });
_.filter([{ name: 'larry', relation: 'father' }, { name: 'moe', relation: 'uncle' }], isUncleMoe);
///////////////////////////////////////////////////////////////////////////////////////
_.first([5, 4, 3, 2, 1]);
_.initial([5, 4, 3, 2, 1]);
_.last([5, 4, 3, 2, 1]);
_.rest([5, 4, 3, 2, 1]);
_.compact([0, 1, false, 2, '', 3]);
_.flatten([1, 2, 3, 4]);
_.flatten([1, [2]]);
// typescript doesn't like the elements being different
_.flatten([1, [2], [3, [[4]]]]);
_.flatten([1, [2], [3, [[4]]]], true);
_.without([1, 2, 1, 0, 3, 1, 4], 0, 1);
_.union([1, 2, 3], [101, 2, 1, 10], [2, 1]);
_.intersection([1, 2, 3], [101, 2, 1, 10], [2, 1]);
_.difference([1, 2, 3, 4, 5], [5, 2, 10]);
_.uniq([1, 2, 1, 3, 1, 4]);
_.zip(['moe', 'larry', 'curly'], [30, 40, 50], [true, false, false]);
var r = _.object(['moe', 'larry', 'curly'], [30, 40, 50]);
_.object([['moe', 30], ['larry', 40], ['curly', 50]]);
_.indexOf([1, 2, 3], 2);
_.lastIndexOf([1, 2, 3, 1, 2, 3], 2);
_.sortedIndex([10, 20, 30, 40, 50], 35);
_.range(10);
_.range(1, 11);
_.range(0, 30, 5);
_.range(0, 30, 5);
_.range(0);
///////////////////////////////////////////////////////////////////////////////////////
var func = function (greeting) { return greeting + ': ' + this.name; };
// need a second var otherwise typescript thinks func signature is the above func type,
// instead of the newly returned _bind => func type.
var func2 = _.bind(func, { name: 'moe' }, 'hi');
func2();
var buttonView = {
    label: 'underscore',
    onClick: function () { alert('clicked: ' + this.label); },
    onHover: function () { console.log('hovering: ' + this.label); }
};
_.bindAll(buttonView);
$('#underscore_button').bind('click', buttonView.onClick);
var fibonacci = _.memoize(function (n) {
    return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
});
var log = _.bind(console.log, console);
_.delay(log, 1000, 'logged later');
_.defer(function () { alert('deferred'); });
var updatePosition = function (param) { return alert('updating position... Param: ' + param); };
var throttled = _.throttle(updatePosition, 100);
$(window).scroll(throttled);
var calculateLayout = function (param) { return alert('calculating layout... Param: ' + param); };
var lazyLayout = _.debounce(calculateLayout, 300);
$(window).resize(lazyLayout);
var createApplication = function (param) { return alert('creating application... Param: ' + param); };
var initialize = _.once(createApplication);
initialize("me");
initialize("me");
var notes;
var render = function () { return alert("rendering..."); };
var renderNotes = _.after(notes.length, render);
_.each(notes, function (note) { return note.asyncSave({ success: renderNotes }); });
var hello = function (name) { return "hello: " + name; };
// can't use the same "hello" var otherwise typescript fails
var hello2 = _.wrap(hello, function (func) { return "before, " + func("moe") + ", after"; });
hello2();
var greet = function (name) { return "hi: " + name; };
var exclaim = function (statement) { return statement + "!"; };
var welcome = _.compose(exclaim, greet);
welcome('moe');
///////////////////////////////////////////////////////////////////////////////////////
_.keys({ one: 1, two: 2, three: 3 });
_.values({ one: 1, two: 2, three: 3 });
_.pairs({ one: 1, two: 2, three: 3 });
_.invert({ Moe: "Moses", Larry: "Louis", Curly: "Jerome" });
_.functions(_);
_.extend({ name: 'moe' }, { age: 50 });
_.extendOwn({ name: 'moe' }, { age: 50 });
_.assign({ name: 'moe' }, { age: 50 });
_.pick({ name: 'moe', age: 50, userid: 'moe1' }, 'name', 'age');
_.omit({ name: 'moe', age: 50, userid: 'moe1' }, 'name');
_.omit({ name: 'moe', age: 50, userid: 'moe1' }, 'name', 'age');
_.omit({ name: 'moe', age: 50, userid: 'moe1' }, ['name', 'age']);
_.mapObject({ a: 1, b: 2 }, function (val) { return val * 2; }) === _.mapObject({ a: 2, b: 4 }, _.identity);
_.mapObject({ a: 1, b: 2 }, function (val, key, o) { return o[key] * 2; }) === _.mapObject({ a: 2, b: 4 }, _.identity);
_.mapObject({ x: "string 1", y: "string 2" }, 'length') === _.mapObject({ x: "string 1", y: "string 2" }, _.property('length'));
var iceCream = { flavor: "chocolate" };
_.defaults(iceCream, { flavor: "vanilla", sprinkles: "lots" });
_.clone({ name: 'moe' });
_.clone(['i', 'am', 'an', 'object!']);
_([1, 2, 3, 4])
    .chain()
    .filter(function (num) { return num % 2 == 0; })
    .tap(alert)
    .map(function (num) { return num * num; })
    .value();
_.chain([1, 2, 3, 200])
    .filter(function (num) { return num % 2 == 0; })
    .tap(alert)
    .map(function (num) { return num * num; })
    .value();
_.has({ a: 1, b: 2, c: 3 }, "b");
var moe = { name: 'moe', luckyNumbers: [13, 27, 34] };
var clone = { name: 'moe', luckyNumbers: [13, 27, 34] };
moe == clone;
_.isEqual(moe, clone);
_.isEmpty([1, 2, 3]);
_.isEmpty({});
_.isElement($('body')[0]);
(function () { return _.isArray(arguments); })();
_.isArray([1, 2, 3]);
_.isObject({});
_.isObject(1);
_.property('name')(moe);
// (() => { return _.isArguments(arguments); })(1, 2, 3);
_.isArguments([1, 2, 3]);
_.isFunction(alert);
_.isString("moe");
_.isNumber(8.4 * 5);
_.isFinite(-101);
_.isFinite(-Infinity);
_.isBoolean(null);
_.isDate(new Date());
_.isRegExp(/moe/);
_.isNaN(NaN);
isNaN(undefined);
_.isNaN(undefined);
_.isNull(null);
_.isNull(undefined);
_.isUndefined(window.missingVariable);
///////////////////////////////////////////////////////////////////////////////////////
var UncleMoe = { name: 'moe' };
_.constant(UncleMoe)();
typeof _.now() === "number";
var underscore = _.noConflict();
var moe2 = { name: 'moe' };
moe2 === _.identity(moe);
var genie;
var r2 = _.times(3, function (n) { return n * n; });
_(3).times(function (n) { genie.grantWishNumber(n); });
_.random(0, 100);
_.mixin({
    capitalize: function (string) {
        return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
    }
});
_("fabio").capitalize();
_.uniqueId('contact_');
_.escape('Curly, Larry & Moe');
var object = { cheese: 'crumpets', stuff: function () { return 'nonsense'; } };
_.result(object, 'cheese');
_.result(object, 'stuff');
var compiled = _.template("hello: <%= name %>");
compiled({ name: 'moe' });
var list2 = "<% _.each(people, function(name) { %> <li><%= name %></li> <% }); %>";
_.template(list2)({ people: ['moe', 'curly', 'larry'] });
var template = _.template("<b><%- value %></b>");
template({ value: '<script>' });
var compiled2 = _.template("<% print('Hello ' + epithet); %>");
compiled2({ epithet: "stooge" });
var oldTemplateSettings = _.templateSettings;
_.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
};
var template2 = _.template("Hello {{ name }}!");
template2({ name: "Mustache" });
_.template("Using 'with': <%= data.answer %>", oldTemplateSettings)({ variable: 'data' });
_(['test', 'test']).pick(['test2', 'test2']);
//////////////// Chain Tests
function chain_tests() {
    // https://typescript.codeplex.com/workitem/1960
    var numArray = _.chain([1, 2, 3, 4, 5, 6, 7, 8])
        .filter(function (num) { return num % 2 == 0; })
        .map(function (num) { return num * num; })
        .value();
    var strArray = _([1, 2, 3, 4])
        .chain()
        .filter(function (num) { return num % 2 == 0; })
        .tap(alert)
        .map(function (num) { return "string" + num; })
        .value();
    var n = _.chain([1, 2, 3, 200])
        .filter(function (num) { return num % 2 == 0; })
        .tap(alert)
        .map(function (num) { return num * num; })
        .max()
        .value();
    var hoverOverValueShouldBeNumberNotAny = _([1, 2, 3]).chain()
        .map(function (num) { return [num, num + 1]; })
        .flatten()
        .find(function (num) { return num % 2 == 0; })
        .value();
    var firstVal = _.chain([1, 2, 3])
        .first()
        .value();
}
var obj = {
    'test': 5,
    'another': 8,
    'third': 10
}, empty = {};
_.chain(obj).map(function (value, key) {
    empty[key] = value;
    console.log("vk", value, key);
});
