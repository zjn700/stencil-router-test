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
                    <li id="test" onClick={(event: UIEvent) => this.handleMenuSelection(event)}><ion-icon name="clipboard"></ion-icon>Test</li>
                    <li id="test" onClick={(event: UIEvent) => this.handleMenuSelection(event)}><ion-icon name="search"></ion-icon>Dictionary</li>
                    <li id="test" onClick={(event: UIEvent) => this.handleMenuSelection(event)}><ion-icon name="list-box"></ion-icon>Phrases</li>
                </ul>
            </div>

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