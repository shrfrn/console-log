# **_log_** - a browser console utility

**_log_** is console utility for logging formatted output to the browser console. It takes inspiration from the *chalk* npm package and implements a flexible command chaning syntax for outputting formatted text to the console. 

It supports colors, font styling, padding, borders, text decorations and collapsable output grouping.

## Basic Usage

In its simplest form, **_log_** can be used pretty much like your good old console.log(), with any number of arguments like this:

```js
var x = 9

log('Hello')
log('The value of x is', x)
```

But it can also output colored text like this:

```js
log.red('This text is red')
log.bgRed('This text has a red background')
log.red.bgWhite('Red text over white background')
```
All CSS color names are supported. prefix the color name with 'bg' to specify a background color (i.e red => bgRed)

Similarly, use `underline`, `strikethrough`,`italic` or `bold` for more expressive styles

```js
log.red.bgWhite.bold.italic.underline('Red text over white + bold + italic + underline')
```

## Chaining
Every time text is logged to the console, all styling definitions are reset to the defaults. This permits chaining seperately styled outputs like this:

```js
log.red('Red text').blue.bold('Blue bold text')
```

## Function Properties
Some styling properties such as padding or borders, take paramenters. You can use **_log_** with function properties to pass such parameters. 
> Values to all of **_log_**'s function properties can be passed in any order.

### Font
Use the `font()` function as a shorthand to specify a combination of some common font properties such as size, decoration, style and color.
```js
log.font('bold', 'white').bgRed('Hello')
log.font('underline', 15, '#54a3d1')('Hello')
```
Note the use of the last pair of parenthesis in the secons line - just like after a non function property.

Available values:
|Equivalent CSS Property|Allowed Values|
|------------|--------------|
|`color`|Any CSS valid color name 
| |hex code with or without opacity |
| |rgb() or rgba() function call |
|`font-size`|An integer (interpreted as px. value)|
|`font-weight`|`bold`|
|`font-style`|`italic`|
|`text-decoration`|`underline`, `line-through`|

### Padding
Use the `pad()` function to specify padding. Padding is applied on all sides by default but can be modified with a "direction" value:
```js
log.pad(4).red('Hello')
log.pad(4, 'left').red('Hello')
log.pad(4, 'block').red('Hello')
```
Available values:
|Property|Allowed Values|
|------------|--------------|
|size|An integer (interpreted as px. value)|
|direction|`top`, `bottom`,`left`,`right`,`inline`, `block`|

### Borders
Add borders to your output using the `border()` function. It can take any combination of a px. size, style and direction.
|Property|Allowed Values|
|------------|--------------|
|size|An integer (interpreted as px. value)|
|direction|`top`, `bottom`,`left`,`right`,`inline`, `block`|
|style|`solid`, `dotted`, `dashed`|

### Collapsable Grouping
Indent output in a collapsable group with an optional label and initial state
```js
log.group().green('OK')                     // No label
log.group('Test results').green('OK')       // Labeled & Expanded
log.group('Test results', true).green('OK') // Labeled & Collapsed
```
By default, any new group is nested in the previouse one (if any exists). To close one or more groups, use the `groupEnd()` function specifing the number of groups to close or `-1` to close all groups.

```js
log.group('Level 1').green('1')
log.group('Level 2').green('2')
log.groupEnd().green('Level 1 again')
log.groupEnd(-1).green('Closed all groups')
```
Parameters for the `group()` function:
|Property|Allowed Values|
|------------|--------------|
|label|A string label for the group (optional)|
|isCollapsed|A boolean. `true` = group is initialy collapsed (optional. Default is `false`)|

## Utilities

### Headings
### Box


## Under the hood
