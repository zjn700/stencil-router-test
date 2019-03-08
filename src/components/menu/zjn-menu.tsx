import { Component, Event, EventEmitter } from '@stencil/core';

@Component({
    tag: 'zjn-menu',
    styleUrl: 'zjn-menu.css'
})
export class ZjnMenu {
    @Event() menuEvent: EventEmitter;
    handleMenuSelection(event) {
        this.menuEvent.emit(event.srcElement.id)
    }
    render() {

        return (

            <div >
                <ul class="menu-item">
                    <li id="child" onClick={(event: UIEvent) => this.handleMenuSelection(event)}><ion-icon name="log-in"></ion-icon>Login</li>
                    <li id="profile" onClick={(event: UIEvent) => this.handleMenuSelection(event)}><ion-icon name="person"></ion-icon>Profile</li>
                    {/* <ion-item-divider>-<ion-label><hr></ion-label></ion-item-divider> */}
                    <li id="test" onClick={(event: UIEvent) => this.handleMenuSelection(event)}><ion-icon name="search"></ion-icon>Dictionary</li>
                    <li id="test" onClick={(event: UIEvent) => this.handleMenuSelection(event)}><ion-icon name="list-box"></ion-icon>Phrases</li>
                    <li id="test" onClick={(event: UIEvent) => this.handleMenuSelection(event)}><ion-icon name="construct"></ion-icon>Grammar</li>
                    <li id="test" onClick={(event: UIEvent) => this.handleMenuSelection(event)}><ion-icon name="clipboard"></ion-icon>Exercises</li>

                    <li id="test" onClick={(event: UIEvent) => this.handleMenuSelection(event)}><ion-icon name="chatboxes"></ion-icon>Chat</li>
                    <li id="test" onClick={(event: UIEvent) => this.handleMenuSelection(event)}><ion-icon name="help-circle-outline"></ion-icon>Help</li>

                    <li id="ask-kim" onClick={(event: UIEvent) => this.handleMenuSelection(event)}>
                        <div class="label">
                            <ion-thumbnail >
                                <img src="/assets/image/ask-kim.png"></img>
                            </ion-thumbnail>
                        </div>
                        <div class="label">Ask Kim
                        </div>
                    </li>
                </ul>
            </div >

            // <div id="menu"><h1>===</h1>

            //     <ul class="menu-item">
            //         <li>One</li>
            //         <li>Two</li>
            //         <li>Three</li>
            //         <li>Four</li>
            //     </ul>
            // </div>
        )
    }
}