/**
 * 判断是否是对象
 * @param val
 * @returns { boolean }
 */

export function isObject(val) {
    return val !== null && typeof val === 'object'
}