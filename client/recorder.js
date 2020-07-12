export class RecordingComponent extends HTMLElement {

    connectedCallback() {
        this.playerQueue = [];
        this.render();
        this.setEvents();
    }

    enqueue() {
        this.playerQueue.push('');
    }

    get player() {
        return this.querySelector('audio');
    }

    get microphone() {
        return this.querySelector('i');
    }

    async startRecording() {
        const stream = await navigator.mediaDevices.getUserMedia({audio: true, video: false});

        const options = {mimeType: 'audio/webm'};

        const mediaRecorder = new MediaRecorder(stream, options);
        mediaRecorder.start();
        return mediaRecorder;
    }

    playerQueue;

    play() {
        this.enqueue();
        const promises =  this.playerQueue.map(() => this.player.play());
        Promise.all(promises).then(() => this.playerQueue = []);

    }

    async setEvents() {
        let recording = false;
        let mediaRecorder;
        this.querySelector('button').onclick = async () => {
            this.microphone.classList.toggle('fa-microphone');
            this.microphone.classList.toggle('fa-microphone-slash');
            const recordedChunks = [];

            if (!recording) {
                mediaRecorder = await this.startRecording();

                recording = true;
            } else {
                mediaRecorder.stop();
                recording = false;
            }

            mediaRecorder.addEventListener('dataavailable', function(e) {
                if (e.data.size > 0) {
                    recordedChunks.push(e.data);
                }

            });

            mediaRecorder.addEventListener('stop', () => {

               const audioUrl = URL.createObjectURL(new Blob(recordedChunks));
                this.player.src = audioUrl;
                this.querySelector('a').href = audioUrl;
            });

        }


    }

    render() {
        this.innerHTML = `<button> <i class="fas fa-microphone" style="font-size: 2em;"></i></button>
                                            
                <audio controls id="recorder">
            <a>Download</a>`;
        this.style.display = 'flex';

    }
}

customElements.define('recording-component', RecordingComponent );
