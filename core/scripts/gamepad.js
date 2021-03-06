navigator.getGamepads = function () {
    let gamepads = [];
    navigator.holojs.nativeInterface.gamepadManager.connectedGamepads.forEach(function (value, key) {
        gamepads.push(value);
    });

    return gamepads;
};

function GamepadManager() {
    this.connectedGamepads = new Map();

    window.addEventListener("gamepadconnected", function (connectedGamepad) {
        connectedGamepad.index = navigator.holojs.nativeInterface.gamepadManager.connectedGamepads.size;
        navigator.holojs.nativeInterface.gamepadManager.connectedGamepads.set(navigator.holojs.nativeInterface.gamepadManager.connectedGamepads.size, connectedGamepad);
        console.log("gamepad added");
    });

    window.addEventListener("gamepaddisconnected", function (disconnectedGamepad) {
        navigator.holojs.nativeInterface.gamepadManager.connectedGamepads.delete(disconnectedGamepad.index);
        console.log("gamepad removed");
    });
}

navigator.holojs.nativeInterface.gamepadManager = new GamepadManager();

