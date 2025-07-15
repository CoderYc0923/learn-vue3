import { isFunction } from "@learn-vue3/shared";
import { ReactiveEffect } from './effect'

/**
 * watchEffect
 * 立即运行一个函数，同时响应式地追踪其依赖，并在依赖更改时重新执行
 * @param { (onCleanup) => void } effect
 * @param { { flush: 'pre' | 'post' | 'sync' } } options
 * @returns { { (): void, pause: () => void, resume: () => void, stop: () => void } }
 */

export function watchEffect(effect, options) {
  return watchHandle(effect, options);
}

/**
 * watch处理
 * @param { * } cb
 */

export function watchHandle(cb, options) {
  let getter;

  if (isFunction(cb)) {
    // 函数包装处理
    getter = () => callWithErrorHandling(cb);
  }

  const effect = new ReactiveEffect(getter)

  effect.run()

  const returnHandle = () => {
    effect.stop()
  }

  returnHandle.pause = effect.pause.bind(effect)
  returnHandle.resume = effect.resume.bind(effect)
  returnHandle.stop = returnHandle

  return returnHandle
}

/**
 * 执行函数并对报错进行统一处理
 */

function callWithErrorHandling(fn) {
  var res;
  try {
    res = fn();
  } catch (error) {
    throw new Error(error);
  }

  return res;
}
