/**
 * Adds mouse control to the entity this component is added to.
 * @type {IgeClass}
 */
var PlayerComponent = IgeClass.extend({
	classId: 'PlayerComponent',
	componentId: 'player',

	init: function (entity, options) {
		var self = this;

		// Store the entity that this component has been added to
		this._entity = entity;

		// Store any options that were passed to us
		this._options = options;

	},

	/**
	 * Moves an entity to x and y in 2D-Coordinates
     * @todo: unready !!!
	 */
	move: function ( x, y) {
		// We get the tile's world XY and then convert it from iso to 2d
		// with a call to "to2d()" because the tilemap is isometric and
		// the walkTo method uses 2d co-ordinates!
		var tilePoint = ige.$('tileMap1').mouseTileWorldXY().to2d();

		this._entity.walkTo(
			tilePoint.x,
			tilePoint.y
		);
	}
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = PlayerComponent; }