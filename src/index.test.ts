import * as calc from './index'

describe('#default', () => {
    it('datest', () => {
        expect(calc.default(1, 'a + 2b - 33')).toBe(1)
    })
})

describe('#addImplicitMultiply', () => {
    it('should add multiply to "2y"', () => {
        const initialFormulaArray = ['2y']
        const expectedFormulaArray = ['2', '*', 'y']
        calc.addImplicitMultiply(initialFormulaArray)
        expect(initialFormulaArray).toEqual(expectedFormulaArray)
    })
    it('should add multiply to "2 * y2x"', () => {
        const initialFormulaArray = ['2', '*', 'y2x']
        const expectedFormulaArray = ['2', '*', 'y', '*', '2', '*', 'x']
        calc.addImplicitMultiply(initialFormulaArray)
        expect(initialFormulaArray).toEqual(expectedFormulaArray)
    })
    it('should add multiply to "2 * (y2x)"', () => {
        const initialFormulaArray = ['2', '*', '(', 'y2x', ')']
        const expectedFormulaArray = ['2', '*', '(', 'y', '*', '2', '*', 'x', ')']
        calc.addImplicitMultiply(initialFormulaArray)
        expect(initialFormulaArray).toEqual(expectedFormulaArray)
    })
})

describe('#splitElement', () => {
    it('should not split digits', () => {
        expect(calc.splitElement('1234')).toStrictEqual(['1234'])
    })
    it('should split variables', () => {
        expect(calc.splitElement('xyz')).toStrictEqual(['x', '*', 'y', '*', 'z'])
    })
    it('should split variables, but leave digits', () => {
        expect(calc.splitElement('12x34')).toStrictEqual(['12', '*', 'x', '*', '34'])
    })
    it('should split variables, but leave digits, multiple variables', () => {
        expect(calc.splitElement('12xy34')).toStrictEqual(['12', '*', 'x', '*', 'y', '*', '34'])
    })
})

describe('#subArray', () => {
    it('should return parts of an array', () => {
        const inputArray = ['a', 'b', 'c', 'd', 'e', 'f']
        const ixStart = 2
        const ixEnd = 4
        const resultArray = ['c', 'd', 'e']
        expect(calc.subArray(inputArray, 2, 4)).toStrictEqual(resultArray)
    })
})

describe('#extractParethesis', () => {
    it('should extract the content of the first parenthesis', () => {
        expect(calc.extractParenthesis(['(', '2', 'y', ')']))
            .toStrictEqual({
                subFormula: ['2', 'y'],
                ixStart: 0,
                ixEnd: 3
            })
    })
    it('should throw if end of paranthesis cannot be found', () => {
        expect(() => calc.extractParenthesis(['(', '2', 'y'])).toThrow('End of paranthesis not found!')
    })
    it('should extract the content of the first parenthesis further in', () => {
        expect(calc.extractParenthesis(['x', '(', '2', 'y', ')']))
            .toStrictEqual({
                subFormula: ['2', 'y'],
                ixStart: 1,
                ixEnd: 4
            })
    })
    it('should extract the content of the innermost parenthesis', () => {
        expect(calc.extractParenthesis(['x', '(', '(', 'y', ')', ')']))
            .toStrictEqual({
                subFormula: ['y'],
                ixStart: 2,
                ixEnd: 4
            })
    })
    it('should extract the content of the innermost, innermost parenthesis', () => {
        expect(calc.extractParenthesis(['x', '(', '(', 'y', 'x', '(', '123', 'y', ')', ')']))
            .toStrictEqual({
                subFormula: ['123','y'],
                ixStart: 5,
                ixEnd: 8
            })
    })
})