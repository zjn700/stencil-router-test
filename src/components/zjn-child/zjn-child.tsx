import { Component, Prop, Event, EventEmitter } from '@stencil/core';
import { stall } from '../../shared/state';
@Component({
    tag: 'zjn-child',
    styleUrl: 'zjn-child.css'
})
export class ZjnChild {
    @Prop({ mutable: true }) stateValue;
    @Event() emitterTest: EventEmitter;
    @Event() asyncEvent: EventEmitter;

    async componentWillLoad() {
        console.log("entering child/login")
    }

    async componentDidLoad() {
        console.log("child/login did load")
    }

    async handleLogin(event) {
        console.log(event)
        this.asyncEvent.emit(true)
        await stall()
        this.emitterTest.emit('Voodoo chile logged in')
        this.asyncEvent.emit(false)
    }

    render() {
        return (
            <ion-page>
                <ion-card padding>
                    <h1>LOGIN.</h1>
                    <h2>{this.stateValue}</h2>
                </ion-card>

                <ion-button expand="full" id="/" onClick={(event: UIEvent) => this.handleLogin(event)}>
                    Login
                </ion-button>
            </ion-page>
        );
    }
}