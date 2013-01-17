/**
 * User: Yves Tanas
 * Date: 11.01.2013
 * Time: 02:30
 * The EntityControl
 */
var EntityControl = IgeEntity.extend({
    classId:'EntityControl',

    setFocus: function(focus){
        var entityControl = this;

        entityControl.player.setFocus(0);
        entityControl.ai1.setFocus(0);
        entityControl.ai2.setFocus(0);
        entityControl.ai3.setFocus(0);
        switch(focus){
            case 0:
                entityControl.player.setFocus(1);
                break;
            case 1:

                entityControl.ai1.setFocus(1);
                break;
            case 2:

                entityControl.ai2.setFocus(1);
                break;
            case 3:

                entityControl.ai3.setFocus(1);
                break;
        }
    },

    init:function () {

        this._super();
        // Load our textures
        var entityControl = this;
        var hasFocus = 0;

        this.obj = [];



        // Create the 3d container that the player
        // entity will be mounted to
        entityControl.player = new CharacterContainer(1)
            .id('player')
            .addComponent(PlayerComponent)
            .isometric(true)
            .mouseOver(overFunc)
            .mouseOut(outFunc)
            .drawBounds(false)
            .drawBoundsData(false)
            .translateTo(300, -55, 0)
            .mouseUp(function () {
                entityControl.setFocus(0);
            })
            .mount(entityControl);

        entityControl.player.setFocus(1);

        // Create the 3d container that the player
        // entity will be mounted to
        entityControl.ai1 = new CharacterContainer(2)
            .id('ai1')
            .addComponent(PlayerComponent)
            .isometric(true)
            .mouseOver(overFunc)
            .mouseOut(outFunc)
            .drawBounds(false)
            .drawBoundsData(false)
            .translateTo(200, -55, 0)
            .mouseUp(function () {
                entityControl.setFocus(1);
            })
            .mount(entityControl);

        entityControl.ai1.setFocus(0);

        // Create the 3d container that the player
        // entity will be mounted to
        entityControl.ai2 = new CharacterContainer(2)
            .id('ai2')
            .addComponent(PlayerComponent)
            .isometric(true)
            .mouseOver(overFunc)
            .mouseOut(outFunc)
            .drawBounds(false)
            .drawBoundsData(false)
            .translateTo(100, -55, 0)
            .mouseUp(function () {
                entityControl.setFocus(2);
            })
            .mount(entityControl);

        entityControl.ai2.setFocus(0);

        // Create the 3d container that the player
        // entity will be mounted to
        entityControl.ai3 = new CharacterContainer(2)
            .id('ai3')
            .addComponent(PlayerComponent)
            .isometric(true)
            .mouseOver(overFunc)
            .mouseOut(outFunc)
            .drawBounds(false)
            .drawBoundsData(false)
            .mouseUp(function () {
                entityControl.setFocus(3);
            })
            .mount(entityControl);

        entityControl.ai3.setFocus(0);

    }
});


if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = EntityControl; }