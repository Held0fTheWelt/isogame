var Client = IgeClass.extend({
	classId: 'Client',

    setFocus: function(focus){
        var self = this;

        self.player.stateMachine.setFocus(0);
        self.ai1.stateMachine.setFocus(0);
        self.ai2.stateMachine.setFocus(0);
        self.ai3.stateMachine.setFocus(0);
        switch(focus){
            case 0:
                self.player.stateMachine.setFocus(1);
                break;
            case 1:

                self.ai1.stateMachine.setFocus(1);
                break;
            case 2:

                self.ai2.stateMachine.setFocus(1);
                break;
            case 3:

                self.ai3.stateMachine.setFocus(1);
                break;
        }
    },

	init: function () {
		ige.showStats(1);

		// Load our textures
		var self = this;
        self.gameTexture = [];

       // self.gameTexture[0] = new IgeSpriteSheet('green.jpg');
        // The closed lobby
        self.gameTexture[0] = new IgeTexture('green.png');
        self.gameTexture[1] = new IgeTexture('enter.jpg');
        self.gameTexture[2] = new IgeTexture('exit.jpg');
		this.obj = [];

		// Create the HTML canvas
		ige.createFrontBuffer(true);

		// Start the engine
		ige.start(function (success) {
			// Check if the engine started successfully
			if (success) {

                // Create the game scene
                self.mainScene = new IgeScene2d()
                    .id('mainScene')
                    .drawBounds(false)
                    .drawBoundsData(false);

                self.objectScene = new IgeScene2d()
                    .id('objectScene')
                    .depth(0)
                    .drawBounds(false)
                    .drawBoundsData(false)
                  //  .mount(self.mainScene);

                self.uiScene = new IgeScene2d()
                    .id('uiScene')
                    .depth(1)
                    .drawBounds(false)
                    .drawBoundsData(false)
                    .ignoreCamera(true) // We don't want the UI scene to be affected by the viewport's camera
                    .mount(self.mainScene);

                // Create the main viewport
                self.vp1 = new IgeViewport()
                    .id('vp1')
                    .autoSize(true)
                    .scene(self.mainScene)
                    .drawMouse(true)
                    .drawBounds(true)
                    .drawBoundsData(true)
                    .mount(ige);

                self.menu = null;


                // Create the game states
                self.addComponent(StateMachineComponent);
                self.stateMachine.addState("Menu");
                self.stateMachine.addState("Game");
                self.stateMachine.addIOScheme("Menu", "Enter", "Game");
                self.stateMachine.addIOScheme("Game", "Exit", "Menu");
                self.stateMachine.setCurrentState("Menu");

                self.createMenuScene();
                self.createGameScene();

                self.doStateSwitch();


			}
		});
	},

    doStateSwitch: function(){
        var self = this;

        if(self.stateMachine.getCurrentState()==="Game"){
            self.objectScene.mount(self.mainScene);
        }else if(self.stateMachine.getCurrentState()==="Menu"){
            self.menu.mount(self.mainScene);
        }
    },

    createMenuScene: function(){
            var self = this;

            self.menu = new IgeScene2d()
                .id('menu')
                .depth(0)
                .drawBounds(false)
                .drawBoundsData(false)
                .mount(self.mainScene);

            self.enterButton = new GameElement()
                .id('enter')
                .drawMouse(true)
                .drawBounds(false)
                .drawBoundsData(false)
                .depth(1)
                .width(100)
                .height(100)
                .texture(self.gameTexture[1])
                .mouseUp(function () {
                    ige.$('menu').unMount();
                    self.stateMachine.switchStates("Enter");
                    self.doStateSwitch();
                })
                .mount(self.menu);
    },
    /**
     * Creates the game scene
     */
    createGameScene: function(){
        var self = this;

        self.exitButton = new GameElement()
            .id('exit')
            .drawMouse(true)
            .drawBounds(false)
            .drawBoundsData(false)
            .depth(1)
            .width(100)
            .height(100)
            .texture(self.gameTexture[2])
            .translateTo(300, -55, 0)
            .mouseUp(function () {
                self.stateMachine.switchStates("Exit");
                ige.$('objectScene').unMount();
                self.doStateSwitch();
            })
            .mount(self.objectScene);

        // Create an isometric tile map
        self.tileMap1 = new IgeTileMap2d()
            .id('tileMap1')
            .isometricMounts(true)
            .tileWidth(40)
            .tileHeight(40)
            .drawGrid(12)
            .drawMouse(true)
            .drawBounds(false)
            .drawBoundsData(false)
            .mount(self.objectScene);

        // Define a function that will be called when the
        // mouse cursor moves over one of our entities
        overFunc = function () {
            this.highlight(true);
            this.drawBounds(true);
            this.drawBoundsData(true);
        };

        // Define a function that will be called when the
        // mouse cursor moves away from one of our entities
        outFunc = function () {
            this.highlight(false);
            this.drawBounds(false);
            this.drawBoundsData(false);
        };

        // Create the 3d container that the player
        // entity will be mounted to
        self.player = new CharacterContainer(1)
            .id('player')
            .addComponent(PlayerComponent)
            .addComponent(StateMachineComponent)
            .isometric(true)
            .mouseOver(overFunc)
            .mouseOut(outFunc)
            .drawBounds(false)
            .drawBoundsData(false)
            .translateTo(300, -55, 0)
            .mouseUp(function () {
                self.setFocus(0);
            })
            .depth(2)
            .mount(self.objectScene);

        self.player.stateMachine.setFocus(1);
        // Create the 3d container that the player
        // entity will be mounted to
        self.ai1 = new CharacterContainer(2)
            .id('ai1')
            .addComponent(PlayerComponent)
            .addComponent(StateMachineComponent)
            .addComponent(CharacterBehaviour)
            .isometric(true)
            .mouseOver(overFunc)
            .mouseOut(outFunc)
            .drawBounds(false)
            .drawBoundsData(false)
            .translateTo(200, -55, 0)
            .mouseUp(function () {
                self.setFocus(1);
            })
            .depth(2)
            .mount(self.objectScene);

        // Some Teststates
        self.ai1.stateMachine.addState("wait");
        self.ai1.stateMachine.addState("moveToField");
        self.ai1.stateMachine.addState("waitForOrder");
        self.ai1.stateMachine.addState("waitForResource");
        self.ai1.stateMachine.addState("workWithResource");
        self.ai1.stateMachine.addState("rest");
        // Some input/output schemes
        self.ai1.stateMachine.addIOScheme("moveToField","focus","moveToField");
        self.ai1.stateMachine.addIOScheme("moveToField","intersect","waitForOrder");
        // test our entries
        self.ai1.stateMachine.testEntries();
        // set a currentState
        self.ai1.stateMachine.setCurrentState("moveToField");
        // show us the currentState
        ige.log("AI1 current state: "+self.ai1.stateMachine.getCurrentState());
        // switch with a given input event
        self.ai1.stateMachine.switchStates("intersect");
        // show us the currentState
        ige.log("AI1 current state: "+self.ai1.stateMachine.getCurrentState());
        // add the stateMachine to the behaviours
        self.ai1.behaviour.addStateMachine(self.ai1.stateMachine);

        // Create the 3d container that the player
        // entity will be mounted to
        self.ai2 = new CharacterContainer(2)
            .id('ai2')
            .addComponent(PlayerComponent)
            .addComponent(StateMachineComponent)
            .isometric(true)
            .mouseOver(overFunc)
            .mouseOut(outFunc)
            .drawBounds(false)
            .drawBoundsData(false)
            .translateTo(100, -55, 0)
            .mouseUp(function () {
                self.setFocus(2);
            })
            .depth(2)
            .mount(self.objectScene);

        // Create the 3d container that the player
        // entity will be mounted to
        self.ai3 = new CharacterContainer(2)
            .id('ai3')
            .addComponent(PlayerComponent)
            .addComponent(StateMachineComponent)
            .isometric(true)
            .mouseOver(overFunc)
            .mouseOut(outFunc)
            .drawBounds(false)
            .drawBoundsData(false)
            .mouseUp(function () {
                self.setFocus(3);
            })
            .depth(2)

            .mount(self.objectScene);

        // Create the Lobbyman doors
        self.field1 = new GameElement()
            .id('field1')

            .depth(3)
            .width(80)
            .height(80)
            .texture(self.gameTexture[0])
            .size3d(175 , 175, 0)
            .translateTo(0, 20, 0)
            .mount(self.tileMap1);


        // Create the Lobbyman doors
        self.field2 = new GameElement()
            .id('field2')

            .depth(3)
            .width(80)
            .height(80)
            .texture(self.gameTexture[0])
            .size3d(175 , 175, 0)
            .translateTo(-118, 320, 0)
            .mount(self.tileMap1);

        // Create the Lobbyman doors
        self.field3 = new GameElement()
            .id('field3')

            .depth(1)
            .width(80)
            .height(80)
            .texture(self.gameTexture[0])
            .size3d(175 , 175, 0)
            .translateTo(200, 200, 0)
            .mount(self.tileMap1);


        // Create a UI entity so we can test if clicking the entity will stop
        // event propagation down to moving the player. If it's working correctly
        // the player won't move when the entity is clicked.
        self.button1 = new IgeUiEntity()
            .id('testUiEntity')
            .depth(1)
            .backgroundColor('#474747')
            .top(0)
            .left(0)
            .width('100%')
            .height(30)
            .borderTopColor('#666666')
            .borderTopWidth(1)
            .backgroundPosition(0, 0)
            .mouseOver(function () {this.backgroundColor('#49ceff'); ige.input.stopPropagation(); })
            .mouseOut(function () {this.backgroundColor('#474747'); ige.input.stopPropagation(); })
            .mouseMove(function () { ige.input.stopPropagation(); })
            .mouseUp(function () { console.log('Clicked ' + this.id()); ige.input.stopPropagation(); })
            .mount(self.uiScene);

        // Set the camera to track the character with some
        // tracking smoothing turned on (100)
        self.vp1.camera.trackTranslate(self.player, 100);

    }
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = Client; }