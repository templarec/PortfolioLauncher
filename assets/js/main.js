
var app = new Vue({
    el: '#monitor',
    data: {
        avvio: false,
        typing: '',
        info: [
            "--------------------------",
            "|  Nome: Lorenzo",
            "|  Cognome: Bernini",
            "|  Classe: '86",
            "|  Ruolo: Jr Web Developer",
            "---------------------------",
            "end transmission"
        ],
        contacts: [
            "<a href='https://github.com/templarec' title='GitHub'>Github</a>",
            "<a href='https://www.linkedin.com/in/templarec/' title='Linked In'>Linkedin</a>",
            "end transmission"
        ],
        errore: "<span class='errore'>Comando non valido!</span>",
        aiuto: [
            "<span class='commands'>INFO</span> - Informazioni generali",
            "<span class='commands'>PORTFOLIO</span> - I miei lavori",
            "<span class='commands'>CONTATTI</span> - Come contattarmi",
            "<span class='commands'>SKILLS</span> - Le mie Hard Skills",
            "<span class='commands'>HELP</span>- Questo comando :)",
            "end transmission"
        ],
        skills:[
            "html5", "Css3", "Bootstrap", "Scss", "Javascript", "npm",
            "Vue.js", "Php", "Mysql", "Laravel"
        ]
    },

    mounted() {
        window.addEventListener("keypress", function(e) {
            this.typeSound();
            if (e.keyCode === 13) { //invio
                this.parolaChiave(this.typing.toUpperCase());
                this.typing = '';
            } else {
                //console.log(e.keyCode)
                this.typing += String.fromCharCode(e.keyCode);
            }

        }.bind(this));
    },

    computed: {},
    methods: {
        boot: function () {
            this.typer("#titolo", ["Benvenuto nel Portfolio di <span class='lory'>Lorenzo Bernini</span>!", "Digita: INFO, PORTFOLIO, CONTATTI, SKILLS o HELP"], true)
        },
        typer: function (elemento, string, html) {
            new TypeIt(elemento, {
                    strings: string,
                    speed: 66,
                    lifeLike: true,
                    cursor: false,
                    loop: false,
                    cursorChar: "|",
                    html: html
                }).go();

            },
        typec: function (elemento, string, html, speed) {
            new TypeIt(elemento, {
                strings: string,
                speed: speed,
                lifeLike: true,
                cursor: false,
                loop: false,
                cursorChar: "|",
                html: html
            }).go();

        },
        parolaChiave: function (keyword) {
            console.log("passato:", keyword)
            switch (keyword) {
                case "INFO":
                    this.purgeOutput();
                    this.avvio = true;
                    this.readOut(12000)
                    this.typer('#output',this.info, false)
                    break
                case "PORTFOLIO":
                    this.purgeOutput();
                    this.avvio = true;
                    this.typer('#output',"Coming soon!", true)
                    break
                case "CONTATTI":
                    this.purgeOutput();
                    this.avvio = true;
                    this.readOut(2000)
                    this.typer('#output',this.contacts, true)
                    break
                case "":
                    this.purgeOutput();
                    this.avvio = true;
                    this.readOut(6000)
                    this.boot()
                    break
                case "HELP":
                    this.purgeOutput();
                    this.avvio = true;
                    this.readOut(8000)
                    this.typer('#output',this.aiuto, true)
                    break
                case "CLEAR":
                    this.purgeOutput();
                    this.avvio = true;
                    document.getElementById('titolo').innerHTML = '';
                    break
                case "SKILLS":
                    this.purgeOutput();
                    this.avvio = true;
                    this.readOut(12000)
                    this.typec('#output',this.skills, true, 75)
                    break
                default:
                    this.purgeOutput();
                    this.errorSound();
                    this.typer('#output',this.errore, true)
                    break
            }
        },
        purgeOutput: function () {
            document.getElementById('output').innerHTML = '';

        },
        typeSound: function () {
            let keys = [
                new Audio("./assets/sound/key1.mp3"),
                new Audio("./assets/sound/key2.mp3"),
                new Audio("./assets/sound/key3.mp3"),
                new Audio("./assets/sound/key4.mp3"),
            ];
            let i = Math.floor(Math.random()* keys.length);
            keys[i].currentTime = 0;
            keys[i].play();
        },
        readOut: function (seconds) {
            let sound = new Audio("./assets/sound/readout.mp3");
            sound.play();
            soundTimer = setInterval(() => {
                sound.currentTime = 0;
                sound.play();
            },1800)
            let timer = setInterval(()=>{
                clearInterval(soundTimer);
                clearInterval(timer);
            }, seconds)

        },
        errorSound:  function () {
            let sound = new Audio("./assets/sound/error.mp3");
            sound.play();
        }

    }
});
