import { reactive } from './reactive'
import { track, trigger } from './dep'
import { isObject } from '@learn-vue3/shared'

class BaseReactiveHandler {
    constructor() {

    }
    
    /**
     * proxy的get方法
     * @param {object} target 目标对象
     * @param {string | symbol} key 被获取的属性名 
     * @param {object} receiver Proxy 或者继承Proxy的对象 
     */
    get(target, key, receiver) {
        const res = Reflect.get(target, key, receiver)

        //依赖收集
        track(target, key)

        //深度代理
        if (isObject(res)) {
            return reactive(res)
        }

        return res
    }
}

class MutableReactiveHandler extends BaseReactiveHandler {
    constructor() {
        super()
    }

    /**
     * proxy的set方法
     * @param {object} target 目标对象
     * @param {string | symbol} key 将被设置的属性名或 Symbol 
     * @param {unknown} value 新属性值 
     * @param {object} receiver 最初接收赋值的对象。通常是 proxy 本身，但 handler 的 set 方法也有可能在原型链上，或以其他方式被间接地调用（因此不一定是 proxy 本身）。
     * @returns { boolean }
     */
    set(target, key, value, receiver) {
        const res = Reflect.set(target, key, value, receiver)

        //执行对应的副作用
        trigger(target, key)

        return res
    }
}


export const mutableReactiveHandler = new MutableReactiveHandler()