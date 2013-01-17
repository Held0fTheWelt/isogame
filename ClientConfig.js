var igeClientConfig = {
	include: [
		/* Your custom game JS scripts */
		'./gameClasses/ClientNetworkEvents.js',
		'./gameClasses/Character.js',
        './gameClasses/CharacterContainer.js',
		'./gameClasses/EntityComponent.js',
        './gameClasses/EntityControl.js',
        './gameClasses/GameElement.js',
        './gameClasses/StateMachineComponent.js',
        './gameClasses/StateList.js',
        './gameClasses/StateEventMap.js',
		/* Standard game scripts */
		'./client.js',
		'./index.js'
	]
};

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = igeClientConfig; }