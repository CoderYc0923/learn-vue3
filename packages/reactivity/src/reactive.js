import { isObject } from '@learn-vue3/shared'
import { mutableReactiveHandler } from './baseHandlers'
import { REACTIVE_FLAGS } from './enum'


export const reactiveMap = new WeakMap() 

/**
 * 实现 reactive
 * 利用proxy对数据进行代理，主要利用set和get，对数据的操作进行收集和触发
 * @param { Object } targrt
 */

export function reactive(target) {
    return createReactiveObject(target, mutableReactiveHandler , reactiveMap)
}

/**
 * 创建reactive代理对象
 * @param { Object } target
 * @param { Function } baseHandler
 * @param { WeakMap } proxyMap
 */

function createReactiveObject(target, baseHandler, proxyMap) {
    //非对象直接返回
    if (!isObject(target)) return target

    //已经是proxy直接返回
    if (target[REACTIVE_FLAGS.IS_REACTIVE]) return target

    //有缓存返回缓存
    const existingProxy = proxyMap.get(target)
    if (existingProxy) return existingProxy
    
    const proxy = new Proxy(target, baseHandler)
    proxyMap.set(target, proxy)
    return proxy
}