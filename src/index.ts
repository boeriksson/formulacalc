const ops = ['^', '*', '/', '+', '-']

const splitForumla = (formula: string): Array<string> => {
    let regexStr = `(${ops.map((op) => '\\' + op).join('|')})`
    const regex = new RegExp(regexStr);
    return formula.replace(/ /g, '').split(regex)
};

export const splitElement = (element: string) => {
    const result = []
    let digitMemory = ''
    for (let i = 0; i < element.length; i++) {
        const char = parseInt(element[i])
        if (isNaN(char)) {
            if (digitMemory.length) {
                result.push(digitMemory)
                result.push('*')
                digitMemory = ''
            }
            result.push(element[i])
            result.push('*')
        } else {
            digitMemory += char
        }
    }
    if (digitMemory) {
        result.push(digitMemory)
    } else {
        result.splice(-1, 1)
    }
    return result
}

export const addImplicitMultiply = (formulaArray: string[]) => {
    let ix = 0;
    for (const element of formulaArray) {
        if (element.length > 1) {
            const elements: string[] = splitElement(element)
            if (elements.length > 0) {
                formulaArray.splice(ix, 1, ...elements)
            }
        }
        ix++
    }
};

type extractedParenthesis = {
    subFormula: string[],
    ixStart: number,
    ixEnd: number
}

export const subArray = (array: string[], ixStart: number, ixEnd: number): string[] => {
    const result = []
    array.forEach((elem, ix) => {
        if (ix > ixStart && ix < ixEnd) {
            result.push(elem)
        }
    })
    return result
}

export function extractParenthesis(formulaArray: string[], startSearch: number = 0): extractedParenthesis  {
    const firstParanStart = formulaArray.indexOf('(', startSearch)
    const firstParanEnd = formulaArray.indexOf(')', firstParanStart)
    if (firstParanEnd === -1) {
        throw new Error('End of paranthesis not found!')
    }
    const secondParanStart = formulaArray.indexOf('(', firstParanStart + 1);
    if (secondParanStart > 0 && secondParanStart < firstParanEnd) {
        return extractParenthesis(formulaArray, secondParanStart)
    }

    const subFormula = subArray(formulaArray, firstParanStart, firstParanEnd)
    return {
        subFormula,
        ixStart: firstParanStart,
        ixEnd: firstParanEnd
    }
}

const resolve = (x: number, formulaArray: string[]) => {
    while(formulaArray.includes('(')) {
        const {subFormula, ixStart, ixEnd} = extractParenthesis(formulaArray)
    }
};

export default (x: number, formula: string): number => {
    const formulaArray: string[] = splitForumla(formula);
    addImplicitMultiply(formulaArray)
    resolve(x, formulaArray)

    console.log('regexStr:' + JSON.stringify(formulaArray), {...formulaArray})

    return 1
}