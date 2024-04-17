'use strict'

const styleMap = {
	red: 'color: red;',
	green: 'color: lightgreen;',
	orange: 'color: orange;',
	lightblue: 'color: lightsteelblue;',
	gray: 'color: gray;',
	beige: 'color: beige;',
	yellow: 'color: yellow;',
	limegreen: 'color: limegreen;',

    bgRed: 'background-color: red;',
    bgGreen: 'background-color: lightgreen;',
    bgOrange: 'background-color: orange;',
    bgLightblue: 'background-color: lightsteelblue;',
    bgGray: 'background-color: gray;',
    bgBeige: 'background-color: beige;',
    bgYellow: 'background-color: yellow;',
    bgLimegreen: 'background-color: limegreen;',

	underline: 'text-decoration-line: underline;',
	strikethrough: 'text-decoration-line: line-through;',
    italic: 'font-style: italic;',
    bold: 'font-weight: bold;',

    dotted: 'border-style: dotted;',
    dashed: 'border-style: dashed;',
    solid: 'border-style: solid;',

    h1: 'font-size: 20px; font-weight: bold;',
    h2: 'font-size: 18px; font-weight: bold;',
    h3: 'font-size: 16px; font-weight: bold;',

    box: 'border: 1px solid;',
}
const _console = {
    styles: [],
    log(txt) {
        if(typeof txt !== 'string') txt = JSON.stringify(txt, null, 2)
		console.log(`%c${txt}`, this.styles.join(' '))

        this.styles = []
        delete this.group
        return this
	},
    group(label = '', isCollapsed = false) {
        if(isCollapsed) console.groupCollapsed(label)
        else console.group(label)
    },
    groupEnd() { console.groupEnd() },
    border(...args) {
        const dir = ['top', 'bottom', 'right', 'left', 'block', 'inline']
        const style = ['solid', 'dashed', 'dotted']

        var prop = 'border'
        var vals = []

        args.forEach(arg => {
            if(dir.includes(arg)) {
                prop = `border-${arg}`
                return
            }
            if(typeof arg === 'number') vals.push(arg + 'px')
            else vals.push(arg)
        })
        this.styles.push(`${prop}: ${vals.join(' ')};`)
        return this
    },
    pad(...args) {
        const dir = ['top', 'bottom', 'right', 'left', 'block', 'inline']

        var prop = 'padding'
        var vals = []

        args.forEach(arg => {
            if(dir.includes(arg)) {
                prop = `padding-${arg}`
                return
            }
            if(typeof arg === 'number') vals.push(arg + 'px')
        })
        this.styles.push(`${prop}: ${vals.join(' ')};`)
        return this
    },
    font(...args) {
        const style = ['italic']
        const weight = ['bold']
        const decoration = ['underline', 'line-through']

        args.forEach(arg => {
            if(style.includes(arg)) {
                this.styles.push(`font-style: ${arg};`)
            } else if(weight.includes(arg)) {
                this.styles.push(`font-weight: ${arg};`)
            } else if(decoration.includes(arg)) {
                this.styles.push(`text-decoration: ${arg};`)
            } else if(typeof arg === 'number') {
                this.styles.push(`font-size: ${arg}px;`)
            } else if(CSS.supports('color', arg)) {
                this.styles.push(`color: ${arg};`)
            }
        })
        return this
    },
    color(color) {
        if(CSS.supports('color', color)) {
            this.styles.push(`color: ${color};`)
        }    
        return this
    },
    bg(bgcolor) {
        if(CSS.supports('background-color', bgcolor)) {
            this.styles.push(`background-color: ${bgcolor};`)
        }    
        return this
    }, 
}

for (const key in styleMap) {
    Object.defineProperty(_console, key, {
        get() {
            this.styles.push(styleMap[key])
            return this
        },
        set(txt) {
            this[key].log(txt)
            return this
        }
    })
}