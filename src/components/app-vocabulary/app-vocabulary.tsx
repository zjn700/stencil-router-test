import { Component, Prop, Event, EventEmitter } from '@stencil/core';
import { stall } from '../../shared/state';
import { wordList } from '../../assets/data/vocabulary'

@Component({
    tag: 'app-vocabulary',
    styleUrl: 'app-vocabulary.css'
})
export class AppVocabulary {
    @Prop() words = wordList;
    // @Prop({ mutable: true }) stateValue;
    // @Prop({ mutable: true }) loading = false;
    @Event() emitterTest: EventEmitter;
    @Event() asyncEvent: EventEmitter;

    async componentWillLoad() {

        console.log(this.words)
    }

    async handleLogin(event) {
        console.log(event)
        this.asyncEvent.emit(true)
        await stall()
        this.emitterTest.emit('Profile User logged in')
        this.asyncEvent.emit(false)
    }

    render() {
        return (
            <ion-content fullscreen>
                <ion-card padding>
                    <h1>VOCABULARY</h1>
                </ion-card>
                {this.words.map((word) =>
                    <ion-card padding>
                        <h2>{word.word} : {word.meaning}</h2>
                    </ion-card>
                )}
                <ion-button expand="full" id="/" onClick={(event: UIEvent) => this.handleLogin(event)}>
                    Login
                    </ion-button>
            </ion-content>
        );
    }
}