// *******************************
// 使用 Linked List 實作 Stack 
// 實作需包含以下方法。 
// push() : 添加新元素。 
// pop()：移除元素並返回被移除的元素。 
// size()：返回所有元素數量。 
// const myStack = new Stack() 
// myStack.push(1) 
// myStack.push(2) 
// myStack.push(3) 
// myStack.pop() // 3 
// myStack.size() // 2 
// *******************************

class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

class Stack {
    constructor() {
        this.first = null;
        this.last = null;
        this.length = 0;
    }

    push(val) {
        var newNode = new Node(val);
        if (this.length === 0) {
            this.first = newNode;
            this.last = newNode;
        } else {
            newNode.next = this.first;
            this.first = newNode;
        }
        this.length++;
    }

    pop() {
        if (this.length === 0) return null;
        const targetNode = this.first;
        if (this.first === this.last) {
            this.last === null;
        }
        this.first = targetNode.next;
        this.length--;
        return targetNode.val;
    }
    size() {
        return this.length;
    }
}

const myStack = new Stack()
myStack.push(1)
myStack.push(2)
myStack.push(3)
console.log(myStack.pop())
console.log(myStack.size())

// *****************************************************
// 請根據字母順序 A, B, C ..., Z 找出 Array 中最順序前面的字母 
// input : [G, H, E, Z, Y]
// output: E
// *****************************************************

function getFirstLetter(array) {
    return array.sort()[0];
}

console.log(getFirstLetter(['G', 'H', 'E', 'Z', 'Y']))

// ***************************************************
// 將 Object key 攤平成 String 
// input : {a: { b: 5, c: {d: 3} }, e: { f: ‘foo’ } } 
// output: { ‘a.b’: 5 , ‘a.c.d’: 3, ‘e.f’: ‘foo’ } 
// ***************************************************

function flatObject(obj) {
    const getObjectKeys = function (obj, prefix = '') {
        return Object.entries(obj).reduce((collector, [key, val]) => {

            const newKeys = [...collector, prefix ? `${prefix}.${key}` : key]
            if (typeof val === 'object') {
                const newPrefix = prefix ? `${prefix}.${key}` : key
                const otherKeys = getObjectKeys(val, newPrefix)
                return [...newKeys, ...otherKeys]
            }

            newObject[prefix ? `${prefix}.${key}` : key] = val
            return newKeys
        }, [])
    }

    var newObject = {};

    getObjectKeys(obj);
    return newObject
}

console.log(flatObject({ a: { b: 5, c: { d: 3 } }, e: { f: 'foo' } }))

// ********************************************************************
// 請根據輸入的數字區間找出數字 1 到 20 間重疊與未包含的數字區間
// input : [[6, 11], [5, 8], [17, 20], [7], [14,17]] 
// output: { overlap: [[6, 8], [17]], notInclude: [[1, 4], [12, 13]] } 
// ********************************************************************

function getInterval(array) {
    // 1 到 20 間
    var origin = []
    for (let i = 1; i < 20 + 1; i++) {
        origin[i] = 0
    }

    array.forEach(element => {
        var first = element[0]
        var last = element.length === 1 ? element[0] : element[1]
        for (let index = first; index < last + 1; index++) {
            origin[index] += 1;
        }
    });


    var overlap = []
    var notInclude = []
    for (let i = 1; i < origin.length + 1; i++) {
        var notIncludeFirst, notIncludeLast;

        if (origin[i] === 0) {
            // notInclude
            if (origin[i - 1] !== 0 && origin[i + 1] !== 0) {
                notInclude.push([i])
            } else if (origin[i] !== origin[i - 1]) {
                notIncludeFirst = i
            } else if (origin[i] !== origin[i + 1]) {
                notIncludeLast = i
                notInclude.push([notIncludeFirst, notIncludeLast])
            }

        } else if (origin[i] > 1) {
            // overlap
            var overlapFirst, overlapLast;
            if (origin[i - 1] === 1 && origin[i + 1] === 1) {
                overlap.push([i])
            } else if (origin[i - 1] === 1) {
                overlapFirst = i
            } else if (origin[i + 1] === 1) {
                overlapLast = i
                overlap.push([overlapFirst, overlapLast])
            }
        }
    }
    return {
        overlap,
        notInclude,
    }
}

console.log(getInterval([[6, 11], [5, 8], [17, 20], [7], [14, 17]]))

// *****************************
// 請使用正規表達式實作數字加上千分位 
// input : -7855948.9527 
// output: -7,855,948.9527 
// *****************************

function regularThousandths(value) {
    const val = String(value)
    const regular = /(\d{1,3})(?=(\d{3})+\.)/g;
    return val.replace(regular, "$1,");
}

console.log(regularThousandths(-7855948.9527))

// *************************************************************
// 擇一實作 Debounce 或 Throttle 
// debounce 是在 delay 時間內如果重新觸發會取消前一次並保留當下觸發的執行。
// throttle 在觸發後的 timeout 時間內只會執行一次。 
// 建立函式 debounce 或 throttle 帶入參數如下範例： 
// const debounceFunc = debounce(func, delay) 
// const throttleFunc = throttle(func, timeout) 
// *************************************************************

const debounceFunc = function debounce(func, delay) {
    let timer = null;

    return function (...args) {
        let context = this;

        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(context, args);
        }, delay);
    }
}

// *****************************************************************
// 使用 Event Loop 結合實際操作範例擇一敘述 Debounce 或 Throttle 的運作方式
// 如文字輸入、scroll 操作與 button 連續點擊，
// 或是其他可結合 Debounce 或 Throttle 的行為都可以拿來當作操作範例。
// *****************************************************************

function handleScroll() {
    console.log(window.scrollY)
}
window.addEventListener('scroll', debounceFunc(handleScroll, 3000));
