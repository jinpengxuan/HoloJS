function VRDisplay() {
    this.displayName = "Synthetic VR display";
    this.isPresenting = true;

    // TODO: these must be set-able
    this.depthNear = 1;
    this.depthFar = 1000;

    this.getFrameData = function (frameData) {
        frameData.timestamp++;
    };

    this.getLayers = function () {
        return [new VRLayerInit()];
    };

    this.submitFrame = function () {

    };

    this.requestAnimationFrame = function (callback) {
        window.requestAnimationFrame(callback);
    };

    this.requestPresent = function () {
        if (nativeInterface.onvrdisplaypresentchange !== undefined) {
            nativeInterface.onvrdisplaypresentchange();
        }

        return Promise.resolve();
    };

    this.getEyeParameters = function () {
        return new VREyeParameters();
    };
}

function VREyeParameters() {
    this.renderWidth = window.innerWidth;
    this.renderHeight = window.innerHeight;
}

function VRPose() {
    this.orientation = nativeInterface.xrOrientation;
    this.position = nativeInterface.xrPosition;
}

function VRFrameData() {
    this.timestamp = 0;

    this.leftProjectionMatrix = nativeInterface.xrLeftProjection;
    this.rightProjectionMatrix = nativeInterface.xrRightProjection;

    this.leftViewMatrix = nativeInterface.xrLeftView;
    this.rightViewMatrix = nativeInterface.xrRightView;

    this.pose = new VRPose();
}

function VRLayerInit() {
    this.leftBounds = [0.0, 0.0, 0.5, 1.0];
    this.rightBounds = [0.5, 0.0, 0.5, 1.0];
}

(function () {
    window.getVRDisplays = function () {
        if (nativeInterface.headsetPresent === true) {
            return Promise.resolve([new VRDisplay()]);
        } else {
            return Promise.resolve([]);
        }
    };
})();