/**
 * Adds control to the entity this component is added to.
 * @type {IgeClass}
 */
var EntityComponent = IgeClass.extend({
	classId: 'EntityComponent',
	componentId: 'entity',

	init: function (entity, options) {
        var self = this;

        // Store the entity that this component has been added to
        self._entity = entity;

        // Store any options that were passed to us
        self._options = options;

        // state machine access
        self.stateMachine = self._entity.stateMachine;
    },

    // switches the input-listener to gain full control on that movement-case
    switchMouseListener: function(bool){
        var self = this;
        if(bool){
            // Listen for the mouse up event
            ige.input.on('mouseUp', function(event, x, y, button) { self._mouseUp(event, x, y, button); });
        }else {
            // Don't listen for the mouse up event
            ige.input.off('mouseUp', function (event, x, y, button) { self._mouseUp(event, x, y, button); }, true);
        }
    },
	/**
	 * Handles what we do when a mouseUp event is fired from the engine.
	 * @param event
	 * @private
	 */
	_mouseUp: function (event, x, y, button) {
        var self = this;
		// We get the tile's world XY and then convert it from iso to 2d
		// with a call to "to2d()" because the tilemap is isometric and
		// the walkTo method uses 2d co-ordinates!

        if(self.stateMachine.getFocus() == 0){
            self.switchMouseListener(false);
            return this;
        }

		var tilePoint = ige.$('tileMap1').mouseTileWorldXY().to2d();

		self._entity.walkTo(
			tilePoint.x,
			tilePoint.y
		);
	}
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = EntityComponent; }