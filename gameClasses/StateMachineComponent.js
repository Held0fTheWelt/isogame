/**
 * Adds State Machine Capability with a double , double linked list.
 * StateEventList is a list for all states given.
 * it shares the states names and another linked list inside, called StateEventMap,
 * which maps inputevents to a new outputevents.
 * with this StateMachineComponent can switch states via the switchStates method by just
 * cycling through the entries
 * @type {IgeClass}
 */
var StateMachineComponent = IgeEntity.extend({
    classId: 'StateMachineComponent',
    componentId: 'stateMachine',

    /**
     * Initialization
     * @self.list the StateEventList
     * @self.currentState the entities currentState
     * @self.hasFocus manages if the entity hasFocus or not
     */
    init: function () {
        var self = this;
        this._super();
        self.list = new StateList();
        self.currentState = null;
        self.hasFocus = 0;
    },
    /**
     * Sets the given value (0/1) to the given variable in this class
     * @param value
     */
    setFocus: function(value)
    {
        var self = this;
        self.hasFocus = value;
    },
    /**
     * Returns if the entity hasFocus or not
     * @return {Number}
     */
    getFocus: function(){
        var self = this;
        return self.hasFocus;
    },
    /**
     * Adds a new state to the StateList
     * @param value
     */
    addState: function(value){
        var self = this;
        self.list.addState(value);
    },
    /**
     * Adds a new input/output scheme to a named state
     * @param state name of the state, the scheme will be added to
     * @param sInput input event that switches to a new state
     * @param sOutput output state that will be reached with this input event
     */
    addIOScheme: function(state, sInput, sOutput){
        var self = this;

        for(i = 0; i < self.list.size(); i++){
            if(self.list.getStateName(i)== state){
                self.list.addIOScheme(i, sInput, sOutput);
            }
        }
    },
    /**
     * Removes a state from the list
     * @param item
     */
    removeItem: function(item){
        var self = this;
        var value = self.list.removeState(item);
    },
    /** tests the state entries in the list and shows the input/output map*/
    testEntries:function(){
        var self = this;
        for(i = 0; i < self.list.size(); i++){
            ige.log("entry "+i+": "+self.list.getStateName(i));
        }
        self.list.testMaps();
    },
    /** sets the currentState to the new stateName */
    setCurrentState: function(stateName){
        var self = this;
        self.currentState = stateName;
    },
    /** returns the actual stateName */
    getCurrentState: function(){
        var self = this;
        return self.currentState;
    },
    /** switches the states by given inputEvent if possible
     * wrong inputEvents will be ignored
     * @param inputEvent the named input event fired to the state machine.
     */
    switchStates: function(inputEvent){
        var self = this;
        // get the head of the list
        var current = self.list._head;
        // and cycle it
        while(current){
            // if the currentState is the state we are searching for
            if(current.name == self.currentState){
                // get the head of its current i/o map
                var list = current.ioList._head;
                // and cycle it
                while(list){
                    // if the inputEvent is found in the i/o map
                    if(list.inputEvent == inputEvent){
                        // set the currentState to the given output state
                        self.setCurrentState(list.outputState);
                        // and break
                        break;
                    }
                    // otherwise cycle to the next entry
                    list = list.next;
                }
                // and break
                break;
            }
            // otherwise cycle to the next entry
            current = current.next;
        }
    }

});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = StateMachineComponent; }