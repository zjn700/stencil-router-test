// import { Component, Prop, Event, EventEmitter } from '@stencil/core';
import { Component, Prop, Element } from '@stencil/core';
// import { stall } from '../../shared/state';
import { wordList } from '../../assets/data/vocabulary'

@Component({
    tag: 'app-vocabulary',
    styleUrl: 'app-vocabulary.css'
})
export class AppVocabulary {
    @Prop() words = wordList;

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
        console.log("this card show", this.cardShow, "evt", event.srcElement.id, "ele", this.el)
        let element = document.getElementById("source-word-" + event.srcElement.id);
        if (element.classList.contains('hide-study-word')) {
            element.classList.remove('hide-study-word');
        } else {
            element.classList.add('hide-study-word');
        }


        // element.classList.add("hide-study-word");
        // this.cardShow = !this.cardShow
        console.log("this card show 2", this.cardShow, "evt", event)

    }

    render() {
        return (
            <ion-content fullscreen>
                {this.words.map((word, index) =>
                    <ion-card>
                        <ion-row>
                            <ion-column>

                                <ion-card
                                    id={"source-word-" + index}
                                    padding
                                    // onClick={(event: UIEvent) => this.toggleShowCard(event)}
                                    class={this.sourceLanguageShow ? "study-word" : "hide-study-word"}>
                                    <h2>{word.word}</h2>
                                </ion-card>

                                {/* <ion-row class='word-buttons'>
                                    <ion-button
                                        color="light">
                                        <ion-icon name="volume-high"></ion-icon>
                                    </ion-button>
                                    <ion-button
                                        onClick={(event: UIEvent) => this.toggleShowCard(event)}
                                        id={"" + index}
                                        color="light">
                                        <ion-icon name="eye"></ion-icon>
                                    </ion-button>
                                    <ion-button color="light">
                                        <ion-icon name="search"></ion-icon>
                                    </ion-button>
                                </ion-row> */}

                            </ion-column>

                            <ion-column>
                                <ion-card padding>
                                    <h2>{word.meaning}</h2>
                                </ion-card>
                            </ion-column>


                            <ion-row class='word-buttons'>
                                <ion-button
                                    color="light">
                                    <ion-icon name="volume-high"></ion-icon>
                                </ion-button>
                                <ion-button
                                    onClick={(event: UIEvent) => this.toggleShowCard(event)}
                                    id={"" + index}
                                    color="light">
                                    <ion-icon name="eye"></ion-icon>
                                </ion-button>
                                <ion-button color="light">
                                    <ion-icon name="search"></ion-icon>
                                </ion-button>
                            </ion-row>
                        </ion-row>
                    </ion-card>
                )}
                {/* <ion-button expand="full" id="/" onClick={(event: UIEvent) => this.handleLogin(event)}>
                    Login
                    </ion-button> */}


                <div class="footer-vocabulary">
                    {/* <div class="tab">
                        <ion-button expand="block"
                            color="medium"
                            onClick={(event: UIEvent) => this.handleVocabButton(event)}>
                            <ion-icon name="eye">
                            </ion-icon>
                        </ion-button>
                    </div> */}

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
                    {/* <div class="tab"><ion-button expand="block" color="light"><ion-icon name="card"></ion-icon></ion-button></div> */}
                </div>
            </ion-content>
        );
    }
}

    // async handleLogin(event) {
    //     console.log(event)
    //     this.asyncEvent.emit(true)
    //     await stall()
    //     this.emitterTest.emit('Profile User logged in')
    //     this.asyncEvent.emit(false)
    // }