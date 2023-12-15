import {VideoTexture, LinearFilter } from 'three';

function Webcam(){

    let texture;
    let video;

    this.createTexture = ()=>{
        texture = new VideoTexture(video);
	    texture.minFilter = LinearFilter;
	    texture.magFilter = LinearFilter;
	    texture.needsUpdate = true;
        return texture;
    }

    this.init = async function() {
	    video = document.createElement("video");

	    video.autoplay = "";
	    video.style = "display:none";
	    video.id = "feedCam";

	    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia && video) {
		    const constraints = {
			    video: {
				    width: 1280,
				    height: 720,
				    facingMode: "user"
			    }
		    };

		    navigator.mediaDevices
			    .getUserMedia(constraints)
			    .then((stream) => {
				    video.srcObject = stream;
				    video.play();

			    })
			    .catch((error) => {
				    console.error("Unable to access the camera/webcam.", error);
			    });
	    } else {
		    console.error("MediaDevices interface not available.");
	    }

    }

}

export default Webcam;
