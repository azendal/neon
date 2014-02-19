// @TODO: Make proper spec'ing and testing for these modules
if(typeof require !== 'undefined') {
    console.log("Requiring neon stdlib from file");
    require('neon');
    require('neon/stdlib');
}

console.log("CustomEvent ", typeof CustomEvent !== 'undefined');
console.log("CustomEventSupport ", typeof CustomEventSupport !== 'undefined');
console.log("NodeSupport ", typeof NodeSupport !== 'undefined');
console.log("BubblingSupport ", typeof BubblingSupport !== 'undefined');

console.log("--- node support")

Class('TreeNode').includes(NodeSupport)({
    prototype : {
        init : function(name) {
            this.name = name;
        }
    }
});

var root = new TreeNode('root');

console.log(root);

var left = new TreeNode('left');
var right = new TreeNode('right');

root.appendChild(left);
right.setParent(root);

console.log(root.children.indexOf(left));
console.log(left == right.parent.left);

Class('X').includes(CustomEventSupport)({
    prototype : {
        init : function() {

        }
    }
});

console.log('--- custom event support');

var sender = new X();

sender.dispatch('alert', { message : 'ERROR: nobody should be receiving yet' });
sender.bind('alert', function(event) {
    console.log(event.message == 'TEST');
});

sender.dispatch('alert', { message : 'TEST' });

console.log('--- bubbling support');

Class('BubblingTreeNode').includes(NodeSupport, CustomEventSupport, BubblingSupport)({
    prototype : {
        init : function(name) {
            this.name = name;
            this.bind('alert', function(event) {
                console.log("Bound to alert on init (" + this.name + ")");
            });
        }
    }
});

var root = new BubblingTreeNode('root');
var son = root.appendChild(new BubblingTreeNode('son'));
var grandson = son.appendChild(new BubblingTreeNode('grandson'));

console.log("Bubbles up");
grandson.dispatch('alert');

console.log("Doesn't bubble down");
root.dispatch('alert');

// @ TODO : Leave this tests to azendal, I have to read the browser's propagation spec
// console.log("Prevent default");
// son.bind('alert', function(event) {
//     console.log(event);
//     event.preventImmediatePropagation();
// });
// grandson.dispatch('alert');
