// import { Component, Prop } from '@stencil/core';
// import { RouterHistory } from '@stencil/router';
// @Component({
//   tag: 'app-home',
//   styleUrl: 'app-home.css'
// })
// export class AppHome {
//   @Prop() history: RouterHistory
//   handleClick() {
//     console.log("han cli")
//     this.history.push("/profile/jim")

//   }
//   render() {
//     return [
//       <ion-header>
//         <ion-toolbar color="primary">
//           <ion-title>Home</ion-title>
//         </ion-toolbar>
//       </ion-header>,

//       <ion-content padding fullscreen>
//         <ion-button href="/profile/ionic" expand="block">Profile page</ion-button>
//         <ion-button onClick={this.handleClick.bind(this)} expand="block">Profile page</ion-button>

//         <p>
//           Welcome to the PWA Toolkit. You can use this starter to build entire
//           apps with web components using Stencil and ionic/core! Check out the
//           README for everything that comes in this starter out of the box and
//           check out our docs on <a href="https://stenciljs.com">stenciljs.com</a> to get started.
//         </p>

//         <ion-button href="/profile/ionic" expand="block">Profile page</ion-button>
//       </ion-content>
//     ];
//   }
// }

import { Component, Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css'
})
export class AppHome {

  @Prop() history: RouterHistory;
  @Prop() docs = { thing1: "thing one" }

  handleClick() {
    console.log("main", this.history.push)
    console.log("main", this.history.location)
    console.log("main", this.history.location.pathname)
    console.log("main", this.history.location.state)
    console.log("main", this.history.location.query)
    console.log("main", this.history.location.hash)
    console.log("main", this.history.location.key)
    console.log("main", this.history.location.search)

    this.history.push("/profile/x", { dad: "money" });
    console.log("main", this.history)

    console.log("main", this.history.push)
    console.log("main", this.history.location)
    console.log("main", this.history.location.pathname)
    console.log("main", this.history.location.state)
    console.log("main", this.history.location.query)
    console.log("main", this.history.location.hash)
    console.log("main", this.history.location.key)
    console.log("main", this.history.location.search)
  }

  render() {
    return ([
      // <ion-page>
      <ion-header>
        <ion-toolbar color='primary'>
          <ion-title>Ionic PWA Toolkit</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content fullscreen padding>
        <p>
          Welcome to the Ionic PWA Toolkit.
          </p>

        <ion-button onClick={this.handleClick.bind(this)}>
          Profile page
          </ion-button>
      </ion-content>
    ]
      // </ion-page>
    );
  }
}
