import { activeEffect } from "./effect";

/**
 * 依赖Set
 */
export class Dep {

    constructor() { }

    /**
     * 当前依赖版本
     */
    version = 0

    effects = new Set()

    track() {
       if (!this.effects.has(activeEffect)) {
            this.effects.add(activeEffect)
            
            activeEffect.deps.push(this)
       } 
    }
    triggr() { 
        this.notify()
    }
    notify() {
        effects.forEach((effect) => effect())
    }
}

export const targetMap = new WeakMap()

/**
 * 追踪对reactive对象属性的所有访问（依赖收集）
 * @param { object } target
 * @param { unknown } key
 */

export function track(target, key) {
    //当前活动的副作用
    if (!activeEffect) return

    //获取目标对象的依赖Map
    let depsMap = targetMap.get(target)
    if (!depsMap) {
        targetMap.set(target, (depsMap = new Map()))
    }

    //获取对应key的依赖Set
    let dep = depsMap.get(key)
    if (!dep) {
        depsMap.set(key, (dep = new Dep()))
    }

    dep.track()
}

/**
 * 执行对应的副作用函数
 * @param { object } target
 * @param { unknown } key
 */

export function trigger(target, key) {
    let depsMap = targetMap.get(target)
    if (!depsMap) return

    let dep = depsMap.get(key)
    if (!dep) return

    dep.trigger()
}