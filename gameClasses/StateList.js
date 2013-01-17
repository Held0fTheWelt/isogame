// Define our player character classes
var StateList = IgeEntity.extend({
    classId: 'StateList',

    init: function () {
        var self = this;
        this._super();

        /**
         * Pointer to the first item in the list
         * @property _head
         * @type Object
         * @private
         */
        this._head = null;

        /**
         * Pointer to the last item in the list
         * @property _tail
         * @type Object
         * @private
         */
        this._tail = null;

        /**
         * The number of items in the list
         * @property _length
         * @type int
         * @private
         */
        this._length = 0;
    },

    /**
     * Appends some state to the end of the list. This method traverses
     * the existing list and places the object at the end in a new item.
     * @param name The name of the given state
     * @return (Void)
     * @method addState
     */
    addState: function(name){
        var self = this;
        // create a new item object, place state name in
        var node = {
            name: name,
            ioList: null,
            next: null,
            prev: null
        };
        node.ioList = new StateEventMap();
        // special case: no items in the list yet
        if(self._length == 0){
            self._head = node;
            self._tail = node;
        } else {
            // attach to the tail node
            self._tail.next = node;
            node.prev = self._tail;
            self._tail = node;
        }

        self._length++;
    },
    addIOScheme: function(index, sInput, sOutput){
        var self = this;
        // check for out-of-bounds values
        if(index > -1 && index < self._length){
            var current = self._head, i = 0;
            while(i++ < index){
                current = current.next;
            }
            current.ioList.addIOScheme(sInput, sOutput);
        }
    },
    /**
     * Retrieves the name of the state in the given position of the list.
     * @param (int) index The zero-based index of the state whose value should be returned
     * @return The name of the state of the given item or nnull if the item doesn't exist.
     * @method getStateName
     */
    getStateName: function(index){
        var self = this;
        // check for out-of-bounds values
        if(index > -1 && index < self._length){
            var current = self._head, i = 0;
            while(i++ < index){
                current = current.next;
            }
            return current.name;
        } else {
            return null;
        }
    },
    /**
     * Removes the item from the given location in the list.
     * @param (int) index The zero-based index of the item to remove.
     * @return (variant) The name of the given state at the given position in the list or null if the item doesn't exist
     * @method removeState
     */
    removeState: function(index) {
        var self = this;
        // check for out-of-bounds values
        if(index > -1 && index < self._length){
            var current = self._head, i = 0;

            // special case: removing first item
            if(index === 0){
                self._head = current.next;

                /** if there's only one item in the list and you remove it,
                 * then self._head will be null. In that case, you should
                 * also set self._tail to be null to effectively destroy the list.
                 * Otherwise, set the previous pointer on the new self._head to be null.
                 */
                if(!self._head){
                    self._tail = null;
                } else {
                    self._head.prev = null;
                }
            // special case: removing last item
            } else if(index === self._length -1){
                current = self._tail;
                self._tail = current.prev;
                self._tail.next = null;
            } else {
                // find the right location
                while(i++ < index){
                    current = current.next;
                }
                // skip over the item to remove
                current.prev.next = current.next;
            }

            // decrement the length
            self._length--;

            // return the states name of the removed object
            return current.name;
        } else {
            return null;
        }
    },
    /**
     * Returns the number of items in the list
     * @return (int) The number of items in the list.
     * @method size
     */
    size: function(){
        var self = this;
        return self._length;
    },
    /**
     * Inner routine to test the mapped input/output mechanism
     */
    testMaps: function(){
        var self = this;
        var current = self._head;
        while(current){
            for(i = 0; i < current.ioList.size(); i++){
                ige.log("State: "+current.name+" Input Event  "+i+": "+current.ioList.getInputEvent(i));
                ige.log("State: "+current.name+" Output State "+i+": "+current.ioList.getOutputState(i));
            }
            current = current.next;
        }
    },
    /**
     * Converts the list into an array
     * @return (Array) An array containing all data in the list
     * @method toArray
     */
    toArray: function() {
        var self = this;
        var result = [], current = self._head;
        while(current){
            result.push(current.name);
            current = current.next;
        }

        return result;
    },

    toString: function() {
        var self = this;
        return self.toArray().toString();
    }

});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = StateList; }