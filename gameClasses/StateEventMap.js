// Define our player character classes
var StateEventMap = IgeEntity.extend({
    classId: 'StateEventMap',

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
     * @param inputEvent The inputEvent of the given state
     * @return (Void)
     * @method addState
     */
    addIOScheme: function(inputEvent, outputState){
        var self = this;
        // create a new item object, place state inputEvent in
        var node = {
            inputEvent: inputEvent,
            outputState: outputState,
            next: null,
            prev: null
        };

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
    /**
     * Retrieves the inputEvent of the state in the given position of the list.
     * @param (int) index The zero-based index of the state whose value should be returned
     * @return The inputEvent of the state of the given item or nnull if the item doesn't exist.
     * @method getStateinputEvent
     */
    getInputEvent: function(index){
        var self = this;
        // check for out-of-bounds values
        if(index > -1 && index < self._length){
            var current = self._head, i = 0;
            while(i++ < index){
                current = current.next;
            }
            return current.inputEvent;
        } else {
            return null;
        }
    },
    /**
     * Retrieves the outputState in the given position of the list.
     * @param (int) index The zero-based index of the state whose value should be returned
     * @return The inputEvent of the state of the given item or nnull if the item doesn't exist.
     * @method getStateinputEvent
     */
    getOutputState: function(index){
        var self = this;
        // check for out-of-bounds values
        if(index > -1 && index < self._length){
            var current = self._head, i = 0;
            while(i++ < index){
                current = current.next;
            }
            return current.outputState;
        } else {
            return null;
        }
    },
    /**
     * Removes the item from the given location in the list.
     * @param (int) index The zero-based index of the item to remove.
     * @return (variant) The inputEvent of the given state at the given position in the list or null if the item doesn't exist
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

            // return the states inputEvent of the removed object
            return current.inputEvent+"/"+current.outputState;
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
     * Converts the list into an array
     * @return (Array) An array containing all data in the list
     * @method toArray
     */
    toArray: function() {
        var self = this;
        var result = [], current = self._head;
        while(current){
            result.push(current.inputEvent+"/"+current.outputState);
            current = current.next;
        }
        return result;
    },

    toString: function() {
        var self = this;
        return self.toArray().toString();
    }

});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = StateEventMap; }