Module('NodeSupport')({
    prototype : {
        parent      : null,

        children    : [],

        appendChild : function appendChild(child) {
            if(child.parent) {
                child.parent.removeChild(child);
            }

            if(!this.hasOwnProperty('children')) {
                this.children = [];
            }

            this.children.push(child);
            this[child.name] = child;
            child.setParent(this);
            return child;
        },

        insertBefore : function insertBefore(child, beforeChild) {
            var position;

            if (child.parent) {
                child.parent.removeChild(child);
            }

            if (!this.hasOwnProperty('children')) {
                this.children = [];
            }

            if (typeof beforeChild === 'undefined') {
                this.appendChild(child);
            } else {
                position = this.children.indexOf(beforeChild);
                this.children.splice(position, 0, child);

                this[child.name] = child;
                child.setParent(this);
            }

            return child;

        },

        insertChild : function insertChild(child, position) {
            console.warn('NodeSupport insertChild method is deprecated, try insertBefore');

            if (child.parent) {
                child.parent.removeChild(child);
            }

            if (!this.hasOwnProperty('children')) {
                this.children = [];
            }

            if (typeof position == 'undefined') {
                this.children.push(child);
                this[child.name] = child;
                child.setParent(this);
                return child;
            }

            this.children.splice(position, 0, child);
            this[child.name] = child;
            child.setParent(this);
            return child;
        },

        removeChild : function removeChild(child) {
            var position = this.children.indexOf(child);

            if (position !== -1) {
                this.children.splice(position, 1);
                delete this[child.name];
                child.parent = null;
            }

            return child;
        },

        setParent : function setParent(parent) {
            this.parent = parent;
            return this;
        },

        getDescendants : function getDescendants() {
            var nodes = [];
            this.children.forEach(function (node) {
                nodes.push(node);
            });
            this.children.forEach(function (node) {
                nodes = nodes.concat(node.getDescendants());
            });
            return nodes;
        },

        getPreviousSibling : function getPreviousSibling() {
            if (typeof this.parent === 'undefined') {
                return;
            }

            if (this.parent.children[0] === this) {
                return;
            }

            return this.parent.children[ this.parent.children.indexOf(this) - 1 ];
        },

        getNextSibling : function getNextSibling() {
            if (typeof this.parent === 'undefined') {
                return;
            }

            if (this.parent.children[ this.parent.children.length - 1 ] === this) {
                return;
            }

            return this.parent.children[ this.parent.children.indexOf(this) + 1 ];
        }
    }
});
