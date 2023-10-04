// <<<<<<< HEAD
/* Custom Element Base */
class CustomElement {
    static defaultProps = {};
    static customElementMap = {};

    constructor(parent, target) {
        this._createObserver(target);
        this.links = [];
        this.target = target;
        this.parent = parent;
        this.indom = true;
        this.timeoutList = [];
        this._createProps();
    }

    _createProps() {
        this.props = {};
        this.attrprops = {};
        for (let aname of this.target.getAttributeNames()) {
            this.attrprops[aname] = this.target.getAttribute(aname);
        }
        Object.assign(this.props, this.constructor.defaultProps);
        Object.assign(this.props, this.attrprops);
    }

    _createObserver(target) {
        this.observer = new MutationObserver((m, o) => this.onMutation(m, o));
        this.observer.observe(target, {
            attributes: true,
            childList: true,
            subtree: true,
        });
    }
    _removeObserver(target) {
        this.observer.disconnect();
    }

    checkInDom() {
        if (!document.body.contains(this.target)) {
            if (this.indom === true) {
                this.indom === false;
                this._removeObserver();
                this.clearAllTimeout();
                this._onRemoved();
            }
            return false;
        } else {
            if (this.target.parentNode != this.parent) {
                this.parent = this.target.parentNode;
                this._createObserver(this.target);
                this._onCreated();
            }
            return true;
        }
    }

    onMutation(mutations, observer) {
        if (this.checkInDom()) {
            for (const mutation of mutations) {
                if (mutation.target === this.target) {
                    if (mutation.type === "attributes") this._onAttributeChange();
                    else if (mutation.type === "childList") this.onChildListChange();
                } else {
                    if (mutation.type === "attributes")
                        this.onChildAttributeChange(this.target);
                    else if (mutation.type === "childList")
                        this.onChildChildListChange(this.target);
                }
            }
        }
    }

    _onAttributeChange() {
        this._createProps();
        this.onAttributeChange();
    }

    /* Timeout */
    setTimeout(time, callback) {
        let id = setTimeout(() => this._doTimeout(callback), time);
        this.timeoutList[id] = 0;
    }
    clearTimeout(id) {
        delete this.timeoutList[id];
        clearTimeout(id);
    }
    clearAllTimeout() {
        for (let k of this.timeoutList.keys()) clearTimeout(k);
        this.timeoutList = [];
    }
    _doTimeout(callback) {
        if (this.checkInDom()) callback();
    }
    /* */

    /* LINKS */
    sendInfo(info) {
        for (let l of this.links) l.receive(info);
    }
    /* */

    _onRemoved() {
        this.onRemoved();
        delete CustomElement.customElementMap[this.nid];
        this.nid = null;
    }

    _onCreated() {
        let nid = new Number(Math.random() * 9999999999999999).toString();
        this.target.setAttribute("ceid", nid);
        this.id = nid;
        CustomElement.customElementMap[nid] = this;
        this.onCreated();
    }

    /* Lifetime */
    onAttributeChange() {}
    onChildListChange(childsAdded, childsRemoved) {}

    onChildAttributeChange(target) {}
    onChildChildListChange(target, childsAdded, childsRemoved) {}

    onCreated() {}
    onMoved() {}
    onRemoved() {}
    onLinked() {}
    receive(info) {}
    /* */
}
function createCustomElement(target, type) {
    let ce = new type(target.parentNode, target);
    ce._onCreated();
    return ce;
}
function associateCustomElement(query, type) {
    let ret = [];
    document
        .querySelectorAll(query)
        .forEach((e) => ret.push(createCustomElement(e, type)));
    return ret;
}
function getAssociated(element) {
    return element.hasAttribute("ceid")
        ? CustomElement.customElementMap[element.getAttribute("ceid")]
        : undefined;
}
function linkElements(target) {
    target.links = [];
    if (target.target.hasAttribute("celink")) {
        let linknames = target.target.getAttribute("celink").split(" ");
        for (let [ceid, celement] of Object.entries(
            CustomElement.customElementMap
        )) {
            if (linknames.includes(celement.target.id)) {
                target.links.push(celement);
            }
        }
    }
    target.onLinked();
}
function linkAll(targets) {
    if (targets === undefined)
        targets = Object.values(CustomElement.customElementMap);
    for (let target of targets) linkElements(target);
}
/* */

/* Carrousel */
class Carrousel extends CustomElement {
    static defaultProps = {
        selected: 0,
        "--time": "9999999999",
    };

    constructor(p, t) {
        super(p, t);
    }

    /* SWAPPING */
    onSwap() {
        this.sendInfo(this.target.firstChild.getAttribute("key"));
    }
    swap() {
        this.target.appendChild(this.target.firstChild);
        this.onSwap();
    }
    backSwap() {
        this.target.insertBefore(this.target.lastChild, this.target.firstChild);
        this.onSwap();
    }
    swap_loop() {
        this.swap();
        this.setTimeout(parseInt(this.props["--time"]), () => this.swap_loop());
    }
    swap_click(clickevent) {
        if (this.props["--controls"] != undefined) {
            if (
                (clickevent.pageX - this.target.offsetLeft) / this.target.offsetWidth >
                0.5
            )
                this.swap();
            else this.backSwap();
        }
    }
    removeText() {
        for (let e of this.target.childNodes) {
            if (!(e instanceof Element)) {
                this.target.removeChild(e);
            }
        }
    }
    /* */

    /* SPECIFIC SELECTION */
    _getFreeId(start) {
        let freeid = start;

        let stop = false;
        while (!stop) {
            stop = true;
            for (let e of this.target.childNodes) {
                if (e.getAttribute("key") == freeid) {
                    freeid++;
                    stop = false;
                }
            }
        }

        return freeid;
    }
    setIds() {
        let nid = 0;
        for (let e of this.target.childNodes) {
            if (!e.hasAttribute("key")) {
                nid = this._getFreeId(nid);
                e.setAttribute("key", nid);
            }
        }
    }
    selectKey(toselect) {
        let limit = 100;
        while (this.target.firstChild.getAttribute("key") != toselect) {
            this.swap();
            limit--;
            if (limit < 0) break;
        }
    }
    /* */
    receive(info) {
        this.selectKey(info);
    }
    onCreated() {
        this.removeText();
        this.setIds();
        this.target.addEventListener("click", (e) => this.swap_click(e));
        this.swap_loop();
        this.onAttributeChange();
    }
    onChildListChange(childsAdded, childsRemoved) {
        this.removeText();
        this.setIds();
    }
    onAttributeChange() {
        if (this.props["selected"] != undefined) {
            this.selectKey(this.props["selected"]);
        }
    }
    onLinked() {
        console.log("LINKED to " + JSON.stringify(this.links));
    }
}
associateCustomElement(".moving.-rotating", Carrousel);
/* */

/* RadioBlocks */
class RadioBlocks extends CustomElement {
    static defaultProps = {
        selected: 0,
        onselection: "",
    };

    constructor(p, t) {
        super(p, t);
        this.onClickSelected = this.onClickSelected.bind(this);
    }

    onCreated() {
        this.onChildListChange(null, null);
        this.onAttributeChange();
    }

    onClickSelected(event) {
        let key = event.currentTarget.getAttribute("key");
        if (this.props.controls != undefined)
            this.target.setAttribute("selected", key);
        new Function("selected", this.props.onselection).call(this, key);
        this.sendInfo(key);
    }

    onAttributeChange() {
        for (let e of this.target.childNodes)
            if (e instanceof Element) {
                if (e.getAttribute("key") == this.props.selected)
                    e.classList.add("_selected");
                else e.classList.remove("_selected");
            }
    }

    onChildListChange(childsAdded, childsRemoved) {
        let numero = 0;
        for (let child of this.target.childNodes) {
            if (child instanceof Element) {
                child.setAttribute("key", numero);
                child.addEventListener("click", this.onClickSelected);
                numero++;
            }
        }
    }

    receive(info) {
        this.target.setAttribute("selected", info);
    }
}
associateCustomElement(".controls.-radio", RadioBlocks);

linkAll();
/* */
// =======
// /* Custom Element Base */
// class CustomElement {

//   static defaultProps = {};

//   constructor(parent, target) {
//     this._createObserver(target);
//     this.target = target;
//     this.parent = parent;
//     this.indom = true;
//     this.timeoutList = [];
//     this._createProps();
//   }

//   _createProps() {
//     this.props = {};
//     this.attrprops = {};
//     for (let aname of this.target.getAttributeNames()) {
//       this.attrprops[aname] = this.target.getAttribute(aname);
//     }
//     Object.assign(this.props, this.constructor.defaultProps);
//     Object.assign(this.props, this.attrprops);
//   }

//   _createObserver(target) {
//     this.observer = new MutationObserver((m, o) => this.onMutation(m, o));
//     this.observer.observe(target, { attributes: true, childList: true, subtree: true });
//   }
//   _removeObserver(target) {
//     this.observer.disconnect();
//   }

//   checkInDom() {
//     if (!document.body.contains(this.target)) {
//       if (this.indom === true) {
//         this.indom === false;
//         this._removeObserver();
//         this.clearAllTimeout();
//         this.onRemoved();
//       }
//       return false;
//     }
//     else {
//       if (this.target.parentNode != this.parent) {
//         this.parent = this.target.parentNode;
//         this._createObserver(this.target);
//         this.onCreated();
//       }
//       return true;
//     }
//   }

//   onMutation(mutations, observer) {
//     if (this.checkInDom()) {
//       for (const mutation of mutations) {
//         if (mutation.target === this.target) {
//           if (mutation.type === "attributes") this._onAttributeChange();
//           else if (mutation.type === "childList") this.onChildListChange();
//         }
//         else {
//           if (mutation.type === "attributes") this.onChildAttributeChange(this.target);
//           else if (mutation.type === "childList") this.onChildChildListChange(this.target);
//         }

//       }
//     }
//   }

//   _onAttributeChange() {
//     this._createProps();
//     this.onAttributeChange();
//   }

//   /* Timeout */
//   setTimeout(time, callback) {
//     let id = setTimeout(() => this._doTimeout(callback), time);
//     this.timeoutList[id] = 0;
//   }
//   clearTimeout(id) {
//     delete this.timeoutList[id];
//     clearTimeout(id);
//   }
//   clearAllTimeout() {
//     for (let k of this.timeoutList.keys()) clearTimeout(k);
//     this.timeoutList = [];
//   }
//   _doTimeout(callback) {
//     if (this.checkInDom()) callback();
//   }
//   /* */

//   /* Lifetime */
//   onAttributeChange() { }
//   onChildListChange(childsAdded, childsRemoved) { }

//   onChildAttributeChange(target) { }
//   onChildChildListChange(target, childsAdded, childsRemoved) { }

//   onCreated() { }
//   onMoved() { }
//   onRemoved() { }
//   /* */
// }

// function createCustomElement(target, type) {
//   let ce = new type(target.parentNode, target);
//   ce.onCreated();
// }
// function associateCustomElement(query, type) {
//   document.querySelectorAll(query).forEach((e) => createCustomElement(e, type));
// }
// /* */

// /* Carrousel */
// class Carrousel extends CustomElement {
//   constructor(p, t) {
//     super(p, t);
//   }

//   /* SWAPPING */
//   swap() {
//     this.target.appendChild(this.target.firstChild);
//   }
//   backSwap() { this.target.insertBefore(this.target.lastChild, this.target.firstChild); }
//   swap_loop() {
//     this.swap();
//     this.setTimeout(
//       parseInt(this.props["--time"]),
//       () => this.swap_loop()
//     );
//   }
//   swap_click(clickevent) {
//     if (this.props["--controls"] != undefined) {
//       console.log((clickevent.pageX - this.target.offsetLeft) / this.target.offsetWidth);
//       if ((clickevent.pageX - this.target.offsetLeft) / this.target.offsetWidth > 0.5) this.swap();
//       else this.backSwap();
//     }
//   }
//   removeText() {
//     for (let e of this.target.childNodes) {
//       if (!(e instanceof Element)) {
//         this.target.removeChild(e);
//       }
//     }
//   }
//   /* */

//   /* SPECIFIC SELECTION */
//   _getFreeId(start) {
//     let freeid = start;

//     let stop = false;
//     while (!stop) {
//       stop = true;
//       for (let e of this.target.childNodes) {
//         if (e.getAttribute("key") == freeid) {
//           freeid++;
//           stop = false;
//         }
//       }
//     }

//     return freeid;
//   }
//   setIds() {
//     let nid = 0;
//     for (let e of this.target.childNodes) {
//       if (!e.hasAttribute("key")) {
//         nid = this._getFreeId(nid);
//         e.setAttribute("key", nid);
//       }
//     }
//   }
//   selectKey(toselect) {
//     let limit = 100;
//     while (this.target.firstChild.getAttribute("key") != toselect) {
//       this.swap();
//       limit--;
//       if (limit < 0) break;
//     }
//   }
//   /* */

//   onCreated() {
//     this.removeText();
//     this.setIds();
//     this.target.addEventListener("click", (e) => this.swap_click(e));
//     this.swap_loop();
//     this.onAttributeChange();
//   }
//   onChildListChange(childsAdded, childsRemoved) {
//     this.removeText();
//     this.setIds();
//   }
//   onAttributeChange() {
//     console.log(this.props);
//     if (this.props["selected"] != undefined) {
//       this.selectKey(this.props["selected"]);
//     }
//   }
// }
// associateCustomElement(".moving.-rotating", Carrousel);
// /* */

// /* RadioBlocks */
// class RadioBlocks extends CustomElement {

//   static defaultProps = {
//     selected: 0,
//     onselection: "console.log(selected+' Selected')"
//   };

//   constructor(p, t) {
//     super(p, t);
//     this.onClickSelected = this.onClickSelected.bind(this);
//   }

//   onCreated() {
//     this.onChildListChange(null, null);
//     this.onAttributeChange();
//   }

//   onClickSelected(event) {
//     let key = event.currentTarget.getAttribute("key");
//     this.target.setAttribute("selected", key);
//     new Function("selected", this.props.onselection).call(this, key);
//   }

//   onAttributeChange() {
//     for (let e of this.target.childNodes) if (e instanceof Element) {
//       if (e.getAttribute("key") == this.props.selected)
//         e.classList.add("_selected");
//       else
//         e.classList.remove("_selected");
//     }
//   }

//   onChildListChange(childsAdded, childsRemoved) {
//     let numero = 0;
//     for (let child of this.target.childNodes) {
//       if (child instanceof Element) {
//         child.setAttribute("key", numero);
//         child.addEventListener("click", this.onClickSelected);
//         numero++;
//       }
//     }
//   }

// }
// associateCustomElement(".controls.-radio", RadioBlocks);
// /* */
// >>>>>>> erik-branch
