// import { Component, Prop, Event, EventEmitter } from '@stencil/core';
import { Component, Prop, Element, State } from '@stencil/core';
// import { stall } from '../../shared/state';
import { wordList } from '../../assets/data/vocabulary'

@Component({
    tag: 'app-vocabulary',
    styleUrl: 'app-vocabulary.css'
})
export class AppVocabulary {
    @Prop() words = wordList;

    @Prop({ mutable: true }) showFloatingMenu: boolean = false;
    @State() rePaint: boolean = false;

    @Prop({ mutable: true }) sourceLanguageShow: boolean = true;
    @Prop({ mutable: true }) cardShow: boolean = true;
    @Element() el: HTMLElement;
    // @Event() emitterTest: EventEmitter;
    // @Event() asyncEvent: EventEmitter;

    async componentWillLoad() {

        console.log(this.words)
    }

    async handleVocabButton(evt) {
        console.log("vocab -buttonnevt", evt)
        this.sourceLanguageShow = !this.sourceLanguageShow
    }

    async toggleShowCard(event) {
        let element = document.getElementById("source-word-" + event.srcElement.id);
        if (element.classList.contains('hide-study-word')) {
            await element.classList.remove('hide-study-word');
            event.srcElement.src ? event.srcElement.src = "assets/icon/baseline-visibility_off-24px.svg" : event.srcElement.firstChild.src = "assets/icon/baseline-visibility_off-24px.svg"
        } else {
            await element.classList.add('hide-study-word');
            event.srcElement.src ? event.srcElement.src = "assets/icon/outline-visibility-24px.svg" : event.srcElement.firstChild.src = "assets/icon/outline-visibility-24px.svg"
        }
        element.scrollIntoView({ block: "nearest" });
    }

    async toggleFloatingMenu(event) {
        console.log("event", event)
        console.log("floating menu", event.pageY, event.srcElement.top, event.srcElement, window.top)
        this.showFloatingMenu = !this.showFloatingMenu
        event.srcElement.style.color = "#ede123"
        // console.log("floating meny color", event, event.srcElement.style.color)
        // console.log("floating meny color", event, event.screenY)


        let element = await document.getElementById("floatingMenu")

        const bodyOffsets = document.body.getBoundingClientRect();
        const tempX = event.pageX - bodyOffsets.left;
        const tempY = event.pageY
        // + event.srcElement.id);
        if (element) {
            console.log("nnnnnnnnnnnnnnnnnnnnn", element.offsetTop)
            element.style.color = "orange"
            element.style.position = "fixed"
            element.style.top = tempY + "px"
            element.style.left = tempX + "px"
            // console.log("element.style.top", element.pageY)
            this.rePaint = !this.rePaint
        } else {
            console.log("element not found???")
        }

        // setTimeout(() => this.showFloatingMenu = false, 8000)

    }

    userDidScroll() {
        // this.showFloatingMenu = false
        setTimeout(() => this.showFloatingMenu = false, 500)

    }

    // didUserScroll();


    render() {
        return (
            <ion-content scrollEvents fullscreen onIonScrollStart={() => this.userDidScroll()}  >
                {this.words.map((word, index) =>
                    <ion-card>
                        <ion-row>
                            <ion-column>
                                <ion-card
                                    id={"source-word-" + index}
                                    padding
                                    onClick={(event: UIEvent) => this.toggleFloatingMenu(event)}
                                    class={this.sourceLanguageShow ? "study-word" : "hide-study-word"}>
                                    <h2>{word.word}</h2>
                                </ion-card>
                            </ion-column>

                            <ion-column>
                                <ion-card padding>
                                    <h2>{word.meaning}</h2>
                                </ion-card>
                            </ion-column>
                        </ion-row>

                        <ion-row class='word-buttons'>
                            <ion-button
                                color="light">
                                <ion-icon name="volume-high"></ion-icon>
                            </ion-button>

                            <ion-button
                                class={this.sourceLanguageShow ? "hidden" : "shown"}
                                onClick={(event: UIEvent) => this.toggleShowCard(event)}
                                id={"" + index}
                                color="light">
                                <img
                                    id={"" + index}
                                    class="filter-gray"
                                    src="assets/icon/outline-visibility-24px.svg"
                                    alt="show me" />
                            </ion-button>

                            <ion-button color="light">
                                <ion-icon name="search"></ion-icon>
                            </ion-button>
                        </ion-row>
                    </ion-card>
                )}

                <ion-card
                    id="floatingMenu"
                    class={this.showFloatingMenu ? "shown" : "hidden"}
                    padding >
                    <h1>test</h1>
                </ion-card>

                <div class="footer-vocabulary">

                    <div class="tab">
                        <ion-button expand="block"
                            color={this.sourceLanguageShow ? "light" : "medium"}
                            onClick={(event: UIEvent) => this.handleVocabButton(event)}>
                            <img
                                class={this.sourceLanguageShow ? "filter-gray" : "filter-white"}
                                src={this.sourceLanguageShow ? "assets/icon/baseline-visibility_off-24px.svg" : "assets/icon/outline-visibility-24px.svg"}
                                alt="show me" />
                        </ion-button>
                    </div>

                    <div class="tab">
                        <ion-button expand="block"
                            color="light">
                            <img class="filter-gray" src="assets/icon/baseline-visibility_off-24px.svg" alt="show me" />
                            {/* <ion-icon name="apps"></ion-icon> */}
                        </ion-button>
                    </div>
                </div>
            </ion-content>
        );
    }
}
