// // import { Component, Prop } from '@stencil/core';
// import { Component, Prop } from '@stencil/core';
// import { MatchResults, RouterHistory } from '@stencil/router';


// @Component({
//   tag: 'app-profile',
//   styleUrl: 'app-profile.css'
// })
// export class AppProfile {
//   @Prop() history: RouterHistory;
//   @Prop() match: MatchResults;
//   @Prop() thingOne: string;
//   @Prop() thingTwo: string;

//   componentDidLoad() {
//     console.log("prof his stat", this.history)
//     // this.thingOne = this.history.location.state.thingOne
//     // this.thingTwo = this.history.location.state.thingTwo
//   }
//   render() {
//     // console.log("prof ", this.match, this.match.params.name)

//     // if (this.match && this.match.params.name) {
//     return ([
//       <ion-page>
//         {/* <ion-header>
//             <ion-toolbar color='primary'>
//               <ion-title>Ionic PWA Toolkit x</ion-title>
//             </ion-toolbar>
//           </ion-header>, */}

//         <ion-content padding fullscreen>
//           <p>
//             {/* Hello! My name is {this.match.params.name}. */}
//             My name was passed in through a route param!
//               {/* And these are my friends, {this.thingOne} and {this.thingTwo}. */}
//           </p>

//         </ion-content>
//       </ion-page>
//     ]);
//     // }
//   }
// }

import { Component, Prop, Event, EventEmitter } from '@stencil/core';
import { stall } from '../../shared/state';


@Component({
  tag: 'app-profile',
  styleUrl: 'app-profile.css'
})
export class AppProfile {
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
    this.emitterTest.emit('Profile User logged in')
    this.loading = false;

  }

  render() {
    return (
      <ion-page>
        <ion-card padding>
          <h1>PROFILE</h1>
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