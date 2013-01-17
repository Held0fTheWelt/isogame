/**
 * A character component, which works with the state machines states to
 * execute behaviour. As this will be unique to the special abilities of
 * given objects CharacterBehaviour can only be an abstraction of what it should
 * do exactly
 * @type {IgeClass}
 */
var CharacterBehaviour = IgeEntity.extend({
    classId: 'CharacterBehaviour',
    componentId: 'behaviour',

    init: function () {
        var self = this;
        this._super();
        self.stateMachine = null;

    },
    addStateMachine: function(stateMachine){
      var self = this;
        self.stateMachine = stateMachine;
        ige.log("StateMachine added");
    }

});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = StateMachineComponent; }
