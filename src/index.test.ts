import * as calc from './index'

describe('#default', () => {
    it('datest', () => {
        expect(calc.default(1, 'a')).toBe(1)
    })
})