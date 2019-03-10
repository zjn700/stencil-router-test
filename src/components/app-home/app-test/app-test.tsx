import { Component, Prop, Event, EventEmitter } from '@stencil/core';
import { stall } from '../../../shared/state';


@Component({
    tag: 'app-test',
    styleUrl: 'app-test.css'
})
export class AppTest {
    @Prop() color: string = 'gray';
    @Prop({ mutable: true }) stateValue;
    // @Prop({ mutable: true }) loading = false;
    @Event() emitterTest: EventEmitter;
    @Event() asyncEvent: EventEmitter;


    async componentWillLoad() {
    }

    async handleLogin(event) {
        console.log(event)
        this.asyncEvent.emit(true)
        await stall()
        this.emitterTest.emit('Test monkey logged in')
        this.asyncEvent.emit(false)

    }

    render() {
        return (
            <ion-page>
                <ion-card padding>
                    <h1>TEST</h1>
                    <h2>My favorite color is {this.color}</h2>
                    <h2>{this.stateValue}</h2>
                </ion-card>
                {/* <ion-img src="/assets/gif/loading-pink.gif"
                    hidden={(this.loading ? false : true)}>
                </ion-img> */}

                <ion-button expand="full" id="/" onClick={(event: UIEvent) => this.handleLogin(event)}>
                    Login
                </ion-button>
            </ion-page>
        );
    }

}