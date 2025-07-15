export let activeEffect

let eid = 0

export class ReactiveEffect {

    fn = () => {}

    deps = new Set()

    id

    onStop

    constructor(fn) {
        this.fn = fn
        activeEffect = this
        this.id = eid++
    }
    run() {
        try {
            return this.fn()
        } finally {
            
        }
    }

    pause() {}
    resume() {}
    stop() {
        activeEffect = undefined
        cleanupEffect(this)
        this.onStop && this.onStop()
    }
}

function cleanupEffect(effect) {
    const { deps } = effect
    
    deps.forEach((dep) => {
        dep.delete(effect)
    })
}