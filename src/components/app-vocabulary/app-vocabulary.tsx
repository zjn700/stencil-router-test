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

    // @Prop({ mutable: true }) showFloatingMenu: boolean = false;
    @State() showFloatingMenu: boolean = false;
    @Prop({ mutable: true }) floatingMenuTriggerId: any = null;
    @Prop({ mutable: true }) floatIcon: any
    @State() resetIcons: boolean = false;
    // @State() rePaint: boolean = false;
    @State() start: boolean = true;

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
    async toggleShowCard2(event) {

        console.log("event toggleShowCard2", event)
    }

    async toggleShowCard(event) {
        let element
        if (this.floatingMenuTriggerId) {
            element = document.getElementById("source-word-" + this.floatingMenuTriggerId);
        } else {
            element = document.getElementById("source-word-" + event.srcElement.id);
        }

        if (element.classList.contains('hide-study-word')) {
            await element.classList.remove('hide-study-word');
            await element.classList.add('study-word');

            event.srcElement.src ? event.srcElement.src = "assets/icon/baseline-visibility_off-24px.svg" : event.srcElement.firstChild.src = "assets/icon/baseline-visibility_off-24px.svg"
        } else {
            await element.classList.remove('study-word');
            await element.classList.add('hide-study-word');
            event.srcElement.src ? event.srcElement.src = "assets/icon/outline-visibility-24px.svg" : event.srcElement.firstChild.src = "assets/icon/outline-visibility-24px.svg"
        }
        element.scrollIntoView({ block: "nearest" });
    }

    async toggleFloatingMenu(event) {
        console.log("el", this.el, this.el.getBoundingClientRect().height)

        // event.srcElement.style.color = "#ede123"
        let reOpen = false;
        if (this.start) { this.start = !this.start } else {
            reOpen = !(this.floatingMenuTriggerId == event.srcElement.id)  // check if different menu has been clicked
        }

        this.showFloatingMenu = !this.showFloatingMenu

        // if (this.showFloatingMenu) { event.srcElement.src = "assets/icon/outline-cancel-24px.svg" } else {
        //     event.srcElement.src = "assets/icon/baseline-more_horiz-24px.svg";
        // }
        event.srcElement.src = this.showFloatingMenu ? "assets/icon/outline-cancel-24px.svg" : "assets/icon/baseline-more_horiz-24px-2.svg";
        console.log("event el src XXXXX", event.srcElement.src)

        let element = await document.getElementById("floatingMenu")
        // event.srcElement.src = "assets/icon//outline-cancel-24px.svg"
        console.log("element UUUUU", event, event.srcElement.id)
        console.log("element UUUUU", element.children[0])
        element.children[0].id = event.srcElement.id
        this.floatingMenuTriggerId = event.srcElement.id
        console.log(element.children[0].id)
        // get/set coordinates of floating menu
        const bodyOffsets = document.body.getBoundingClientRect();
        const tempX = event.pageX - bodyOffsets.left;
        const tempY = event.pageY - 32
        // if (element) {
        element.style.position = "fixed"
        element.style.top = tempY + "px"
        element.style.left = tempX + "px"

        if (reOpen) {
            if (this.floatIcon) { this.floatIcon.src = "assets/icon/baseline-more_horiz-24px-2.svg" }

            this.showFloatingMenu = true
            console.log("event src ele src", event.srcElement.src)
            event.srcElement.src = "assets/icon//outline-cancel-24px.svg"
            this.floatIcon = event.srcElement
        }

        // this.rePaint = !this.rePaint
        // } 
    }

    userDidScroll() {
        this.resetIcons = !this.resetIcons;
        setTimeout(() => { this.showFloatingMenu = false; this.floatingMenuTriggerId = null }, 200)
        // this.showFloatingMenu ? event.srcElement.src = "assets/icon/baseline-more_horiz-24px.svg" : event.srcElement.src =  "assets/icon//outline-cancel-24px.svg"

    }


    render() {
        return (
            <ion-content class="no-scroll" scrollEvents fullscreen onIonScrollStart={() => this.userDidScroll()}>
                {/* // <ion-content fullscreen > */}
                <div class="v-content">
                    {this.words.map((word, index) =>
                        <ion-card>
                            <ion-row>
                                <ion-column>
                                    <ion-card
                                        id={"source-word-" + index}
                                        padding
                                        // onClick={(event: UIEvent) => this.toggleFloatingMenu(event)}
                                        class={this.sourceLanguageShow ? "study-word" : "hide-study-word"}>

                                        <div class="more-icon ">
                                            {/* <ion-button color="light"> */}
                                            <img
                                                id={"" + index}
                                                onClick={(event: UIEvent) => this.toggleFloatingMenu(event)}
                                                class={this.showFloatingMenu ? "filter-dim-gray" : "filter-gray"}
                                                // /home/wsz2800/dev/my-pwa/src/assets/icon/baseline-more_horiz-24px.svg
                                                src={!this.resetIcons ? "assets/icon/baseline-more_horiz-24px.svg" : "assets/icon/baseline-more_horiz-24px-2.svg"}
                                                // src="assets/icon/baseline-more_horiz-24px.svg"
                                                alt="show me" />
                                            {/* </ion-button> */}
                                        </div>

                                        <div class="vocab-word">{word.word}</div>
                                    </ion-card>
                                </ion-column>

                                <ion-column>
                                    <ion-card padding>
                                        <div class="vocab-word">{word.meaning}</div>
                                    </ion-card>
                                </ion-column>
                            </ion-row>

                            {/* <ion-row class='word-buttons'>
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
                        </ion-row> */}
                        </ion-card>
                    )}

                    <ion-card
                        id="floatingMenu"
                        class={this.showFloatingMenu ? "shown" : "hidden"}
                    >
                        <span id=""></span>
                        <ion-row class='word-buttons'>

                            <ion-button
                                color="light">
                                <ion-icon name="volume-high"></ion-icon>
                            </ion-button>

                            <ion-button
                                class={this.sourceLanguageShow ? "hidden" : "shown"}
                                onClick={(event: UIEvent) => this.toggleShowCard(event)} ///rd2
                                // id={"" + index}
                                color="light">
                                <img
                                    // id={"" + index}
                                    class="filter-gray"
                                    src="assets/icon/outline-visibility-24px.svg"
                                    alt="show me" />
                            </ion-button>

                            <ion-button color="light">
                                <ion-icon name="search"></ion-icon>
                            </ion-button>
                        </ion-row>
                        {/* </div> */}
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
                </div>
            </ion-content>
        );
    }
}
