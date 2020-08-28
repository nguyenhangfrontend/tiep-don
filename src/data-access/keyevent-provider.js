export default {
    altDown: false,
    ctrlDown: false,
    shiftDown: false,
    windowsDown: false,
    f4Down: false,
    keycode: {
        keyup: {},
        keydown: {}
    },
    register(keys, target, func, type) {
        let reg = (key) => {
            try {
                type = type || 'keydown';
                if (!this.keycode[type])
                    this.keycode[type] = {};
                if (!this.keycode[type][key]) {
                    this.keycode[type][key] = []
                }
                let temp = this.keycode[type][key].find(item => item.target === target);
                if (temp) {
                    temp.func = func;
                }
                else {
                    this.keycode[type][key] = [{
                        target: target,
                        func: func
                    }, ...this.keycode[type][key]];
                }
            } catch (error) {

            }
        }
        if (Array.isArray(keys)) {
            keys.forEach(item => {
                reg(item);
            })
        } else {
            reg(keys);
        }

    },
    unregister(keys, target, type) {
        let unreg = (key) => {
            type = type || 'keydown';
            if (!this.keycode[type])
                this.keycode[type] = {};
            if (!this.keycode[type][key]) {
                return;
            }
            let temp = this.keycode[type][key].find(item => item.target === target);
            let index = this.keycode[type][key].indexOf(temp);
            this.keycode[type][key].splice(index, 1);
        }
        if (Array.isArray(keys)) {
            keys.forEach(item => {
                unreg(item);
            })
        } else {
            unreg(keys);
        }
    },
    getFunction(key, type) {

        //    if(this.setDisableHotKey().enableHostKey)
        //         return null

        type = type || 'keydown';
        if (!this.keycode[type])
            this.keycode[type] = {};
        if (!this.keycode[type][key]) {
            return null;
        }
        let events = this.keycode[type][key];
        for (let i = 0; i < events.length; i++) {
            if (this.target) {
                if (events[i].target == this.target)
                    return events[i].func;
            } else {
                return events[i].func;
            }
        }
        return null;
    },
    setTarget(target) {
        this.target = target;
    }
    // setDisableHotKey(enable){
    //     
    //    let enableHostKey = enable
    //    return enableHostKey
    // }
}
