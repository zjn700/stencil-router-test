import { Component, Prop, Event, EventEmitter } from '@stencil/core';
import { stall } from '../../shared/state';


@Component({
    tag: 'zjn-child',
    styleUrl: 'zjn-child.css'
})
export class ZjnChild {
    @Prop() color: string = 'gray';
    @Prop({ mutable: true }) stateValue;
    // @Prop({ mutable: true }) loading = false;
    @Event() emitterTest: EventEmitter;
    @Event() asyncEvent: EventEmitter;


    async componentWillLoad() {
    }

    async handleLogin(event) {
        console.log(event)
        // this.loading = true;
        this.asyncEvent.emit(true)
        await stall()
        this.asyncEvent.emit(false)
        this.emitterTest.emit('Voodoo chile logged in')
        // this.loading = false;

    }

    render() {
        return (
            <ion-page>
                <ion-card padding>
                    <h1>LOGIN.</h1>
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