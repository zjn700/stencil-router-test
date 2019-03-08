// import { Component, Prop, Event, EventEmitter, Watch } from '@stencil/core';
// import { MatchResults, RouterHistory } from '@stencil/router';
// import { getTestValue, setTestValue, getTestValueO } from '../../../shared/state';
// import { Observable } from "rxjs"

// @Component({
//     tag: 'app-test',
//     styleUrl: 'app-test.css'
// })
// export class TestComponent {

//     // Indicate that name should be a public property on the component
//     @Prop({ mutable: true }) name: string;
//     @Prop({ mutable: true }) nameO: Observable<any>;
//     // @State() reload = false;

//     @Watch('name')
//     async watchHandler(newValue: any, oldValue: any) {
//         console.log('main The old value of authUser is: ', oldValue);

//         console.log('main The new value of authUser is: ', newValue);

//         // this.history.push(`/main`, {});
//         // await this.showToaster()
//     }
//     @Prop() history: RouterHistory;
//     @Prop() match: MatchResults;
//     @Event() emitterTest: EventEmitter;


//     async handleClick(evt) {
//         console.log("test, before setting", getTestValue())
//         await setTestValue("set in test component - voodoo")
//             .then(() => {
//                 // console.log("voodoo???", newValue)
//                 // this.name = newValue
//                 this.history.replace(evt.srcElement.id)
//                 console.log(evt)
//                 // console.log("name", this.name)
//                 this.emitterTest.emit("todo");
//             })

//         // this.history.replace(evt.srcElement.id)
//         // console.log(evt)
//         // this.emitterTest.emit("todo");

//         // this.history.goBack()
//     }

//     async componentWillLoad() {
//         console.log('test will load 1')

//         await getTestValue()
//             .then((temp) => {
//                 console.log('test will load 2', temp);
//                 this.name = temp;
//                 console.log("name - temp", temp);
//             })
//         // console.log('test will load 3', temp)
//         getTestValueO().subscribe((val) => {
//             console.log("observ val test", val);
//             this.name = val
//         })
//     }


//     render() {
//         return (
//             <ion-content padding fullscreen>
//                 <p>
//                     jjj
//                     {/* Hello! My name is {this.match.params.name}. */}
//                     vv {name}
//                 </p>
//                 <h1>bb {name}  {this.name}</h1>
//                 <ion-button id="/" onClick={(event: UIEvent) => this.handleClick(event)}>
//                     Home page
//                 </ion-button>

//             </ion-content>
//         );
//     }
// }

import { Component, Prop, Event, EventEmitter } from '@stencil/core';
import { stall } from '../../../shared/state';


@Component({
    tag: 'app-test',
    styleUrl: 'app-test.css'
})
export class AppTest {
    @Prop() color: string = 'gray';
    @Prop({ mutable: true }) stateValue;
    @Prop({ mutable: true }) loading = false;
    @Event() emitterTest: EventEmitter;

    async componentWillLoad() {
    }

    async handleLogin(event) {
        console.log(event)
        this.loading = true;
        await stall()
        this.emitterTest.emit('Test monkey logged in')
        this.loading = false;

    }

    render() {
        return (
            <ion-page>
                <ion-card padding>
                    <h1>TEST</h1>
                    <h2>My favorite color is {this.color}</h2>
                    <h2>{this.stateValue}</h2>
                </ion-card>
                <ion-img src="/assets/gif/loading-pink.gif"
                    hidden={(this.loading ? false : true)}>
                </ion-img>

                <ion-button expand="full" id="/" onClick={(event: UIEvent) => this.handleLogin(event)}>
                    Login
                </ion-button>
            </ion-page>
        );
    }

}